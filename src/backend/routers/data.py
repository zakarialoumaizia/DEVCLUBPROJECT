from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/cities", response_model=List[schemas.CityResponse])
def get_cities(db: Session = Depends(get_db)):
    try:
        cities = db.query(models.AlgeriaCity).all()
        logger.info(f"Retrieved {len(cities)} cities")
        return cities
    except Exception as e:
        logger.error(f"Error retrieving cities: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve cities"
        )

@router.get("/cities/{wilaya_code}", response_model=List[schemas.CityResponse])
def get_cities_by_wilaya(wilaya_code: str, db: Session = Depends(get_db)):
    try:
        cities = db.query(models.AlgeriaCity).filter(
            models.AlgeriaCity.wilaya_code == wilaya_code
        ).all()
        logger.info(f"Retrieved {len(cities)} cities for wilaya {wilaya_code}")
        return cities
    except Exception as e:
        logger.error(f"Error retrieving cities for wilaya {wilaya_code}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve cities for wilaya {wilaya_code}"
        )

@router.get("/faculties", response_model=List[schemas.FacultyResponse])
def get_faculties(db: Session = Depends(get_db)):
    try:
        faculties = db.query(models.Faculty).all()
        logger.info(f"Retrieved {len(faculties)} faculties")
        return faculties
    except Exception as e:
        logger.error(f"Error retrieving faculties: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve faculties"
        )

@router.get("/departments/{faculty_id}", response_model=List[schemas.DepartmentResponse])
def get_departments_by_faculty(faculty_id: int, db: Session = Depends(get_db)):
    try:
        departments = db.query(models.Department).filter(
            models.Department.faculty_id == faculty_id
        ).all()
        logger.info(f"Retrieved {len(departments)} departments for faculty {faculty_id}")
        return departments
    except Exception as e:
        logger.error(f"Error retrieving departments for faculty {faculty_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve departments for faculty {faculty_id}"
        ) 