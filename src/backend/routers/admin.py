from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List
from jose import JWTError, jwt
from passlib.context import CryptContext
import models, schemas, utils
from database import get_db
import logging
import os
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logger = logging.getLogger(__name__)

router = APIRouter()

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Function to get the current admin from token
async def get_current_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    admin = db.query(models.Admin).filter(models.Admin.email == email).first()
    if admin is None:
        raise credentials_exception
        
    return admin

# Seed initial admin
@router.post("/seed-admin", status_code=status.HTTP_201_CREATED)
async def seed_admin(db: Session = Depends(get_db)):
    # Check if admin already exists
    admin = db.query(models.Admin).filter(models.Admin.email == "zakarialoumaizia@gmail.com").first()
    if admin:
        return {"message": "Admin already seeded"}
    
    # Create super admin
    hashed_password = get_password_hash("Zakaria@2005")
    new_admin = models.Admin(
        email="zakarialoumaizia@gmail.com",
        password=hashed_password,
        full_name="Zakaria Loumaizia",
        is_super_admin=True
    )
    
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    
    return {"message": "Admin seeded successfully"}

# Admin login
@router.post("/admin/login")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    admin = db.query(models.Admin).filter(models.Admin.email == form_data.username).first()
    if not admin or not verify_password(form_data.password, admin.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create login history entry
    login_history = models.AdminLoginHistory(
        admin_id=admin.id,
        login_time=datetime.utcnow(),
        ip_address="127.0.0.1",  # You can get the real IP from the request
        user_agent="Web"  # You can get the real user agent from the request
    )
    db.add(login_history)
    db.commit()
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin.email, "admin_id": admin.id},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Get admin profile
@router.get("/admin/profile")
async def get_admin_profile(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    admin = db.query(models.Admin).filter(models.Admin.email == email).first()
    if admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    return {
        "id": admin.id,
        "email": admin.email,
        "full_name": admin.full_name,
        "is_super_admin": admin.is_super_admin
    }

# Get login history
@router.get("/admin/login-history")
async def get_admin_login_history(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        admin_id: int = payload.get("admin_id")
        if admin_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    login_history = db.query(models.AdminLoginHistory)\
        .filter(models.AdminLoginHistory.admin_id == admin_id)\
        .order_by(models.AdminLoginHistory.login_time.desc())\
        .limit(10)\
        .all()
    
    return login_history

# Get analytics
@router.get("/admin/analytics")
async def get_analytics(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        admin_id: int = payload.get("admin_id")
        if admin_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Get events statistics
        events_total = db.query(models.Event).count()
        events_upcoming = db.query(models.Event).filter(
            models.Event.status == "upcoming"
        ).count()
        events_completed = db.query(models.Event).filter(
            models.Event.status == "completed"
        ).count()

        # Get announcements statistics
        announcements_total = db.query(models.Announcement).count()
        announcements_active = db.query(models.Announcement).filter(
            models.Announcement.status == "active",
            (models.Announcement.expiry_date.is_(None) | (models.Announcement.expiry_date > datetime.utcnow()))
        ).count()
        announcements_priority = db.query(models.Announcement).filter(
            models.Announcement.priority == "high"
        ).count()

        # Get students statistics
        students_total = db.query(models.Student).count()
        students_active = db.query(models.Student).filter(
            models.Student.membership_status == "active"
        ).count()
        students_organizers = db.query(models.Student).filter(
            models.Student.role == "organizer"
        ).count()
        students_new = db.query(models.Student).filter(
            models.Student.join_date >= datetime.utcnow() - timedelta(days=30)
        ).count()

        # Get users statistics
        users_total = db.query(models.User).count()
        users_active = db.query(models.User).filter(
            models.User.is_active == True
        ).count()
        users_new = db.query(models.User).filter(
            models.User.created_at >= datetime.utcnow() - timedelta(days=30)
        ).count()

        return {
            "events": {
                "total": events_total,
                "upcoming": events_upcoming,
                "completed": events_completed,
                "avgParticipants": 0
            },
            "announcements": {
                "total": announcements_total,
                "active": announcements_active,
                "highPriority": announcements_priority
            },
            "students": {
                "total": students_total,
                "active": students_active,
                "organizers": students_organizers,
                "newMembers": students_new
            },
            "users": {
                "total": users_total,
                "active": users_active,
                "newUsers": users_new
            }
        }

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        logger.error(f"Error in get_analytics: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching analytics: {str(e)}"
        ) 