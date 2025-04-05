from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class CityBase(BaseModel):
    commune_name: str
    wilaya_code: str
    wilaya_name: str

class CityResponse(CityBase):
    id: int
    commune_name_ascii: str
    daira_name: str
    daira_name_ascii: str
    wilaya_name_ascii: str

    class Config:
        from_attributes = True

class FacultyBase(BaseModel):
    faculty_name: str

class FacultyCreate(FacultyBase):
    pass

class FacultyResponse(FacultyBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class DepartmentBase(BaseModel):
    department_name: str
    faculty_id: int

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentResponse(DepartmentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    registration_number: str
    registration_year: str
    full_name: str
    email: EmailStr
    wilaya_code: str
    commune_name: str
    faculty_id: int
    department_id: int
    level: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class OTPVerify(BaseModel):
    email: EmailStr
    otp_code: str

# Admin schemas
class AdminBase(BaseModel):
    email: str
    full_name: str

class AdminCreate(AdminBase):
    password: str
    is_super_admin: bool = False

class AdminLogin(BaseModel):
    email: str
    password: str

class AdminResponse(AdminBase):
    id: int
    is_super_admin: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AdminLoginHistoryBase(BaseModel):
    admin_id: int
    login_time: datetime
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class AdminLoginHistoryCreate(AdminLoginHistoryBase):
    pass

class AdminLoginHistoryResponse(AdminLoginHistoryBase):
    id: int

    class Config:
        from_attributes = True 