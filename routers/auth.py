from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List
from database import get_db
import models, schemas, utils

router = APIRouter()

@router.post("/register", response_model=schemas.UserResponse)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = utils.get_password_hash(user.password)
    otp = utils.generate_otp()
    otp_valid_until = datetime.utcnow() + timedelta(minutes=10)
    
    db_user = models.User(
        **user.dict(exclude={'password'}),
        password=hashed_password,
        otp_code=otp,
        otp_valid_until=otp_valid_until
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Send OTP email
    await utils.send_otp_email(user.email, otp)
    
    return db_user

@router.post("/verify-otp", response_model=schemas.Token)
def verify_otp(otp_data: schemas.OTPVerify, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == otp_data.email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    if user.otp_code != otp_data.otp_code:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP code"
        )
    
    if datetime.utcnow() > user.otp_valid_until:
        raise HTTPException(
            status_code=400,
            detail="OTP code has expired"
        )
    
    # Activate user account
    user.is_active = True
    user.otp_code = None
    user.otp_valid_until = None
    db.commit()
    
    # Create access token
    access_token_expires = timedelta(minutes=utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = utils.create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"} 