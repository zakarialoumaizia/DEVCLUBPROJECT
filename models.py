from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
from datetime import datetime
import enum

class EventStatus(str, enum.Enum):
    upcoming = "upcoming"
    ongoing = "ongoing"
    completed = "completed"
    cancelled = "cancelled"

class AnnouncementPriority(str, enum.Enum):
    low = "low"
    normal = "normal"
    high = "high"

class StudentRole(str, enum.Enum):
    member = "member"
    organizer = "organizer"
    leader = "leader"

class AlgeriaCity(Base):
    __tablename__ = "algeria_cities"

    id = Column(Integer, primary_key=True, index=True)
    commune_name = Column(String(255))
    commune_name_ascii = Column(String(255))
    daira_name = Column(String(255))
    daira_name_ascii = Column(String(255))
    wilaya_code = Column(String(4))
    wilaya_name = Column(String(255))
    wilaya_name_ascii = Column(String(255))

class Faculty(Base):
    __tablename__ = "faculties"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    faculty_name = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    departments = relationship("Department", back_populates="faculty")

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    department_name = Column(String(100))
    faculty_id = Column(Integer, ForeignKey("faculties.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    faculty = relationship("Faculty", back_populates="departments")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    registration_number = Column(String(50), unique=True, index=True)
    registration_year = Column(String(4))
    full_name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255))
    wilaya_code = Column(String(4))
    commune_name = Column(String(255))
    faculty_id = Column(Integer, ForeignKey("faculties.id"))
    department_id = Column(Integer, ForeignKey("departments.id"))
    level = Column(String(50))
    is_active = Column(Boolean, default=False)
    otp_code = Column(String(6))
    otp_valid_until = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    faculty = relationship("Faculty")
    department = relationship("Department")

class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(100), nullable=False)
    full_name = Column(String(100), nullable=False)
    is_super_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Login history relationship
    login_history = relationship("AdminLoginHistory", back_populates="admin")


class AdminLoginHistory(Base):
    __tablename__ = "admin_login_history"
    
    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("admins.id"))
    login_time = Column(DateTime, default=datetime.utcnow)
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(255), nullable=True)
    
    # Relationship with Admin
    admin = relationship("Admin", back_populates="login_history")

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    event_date = Column(DateTime, nullable=False)
    location = Column(String(255))
    max_participants = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum(EventStatus), default=EventStatus.upcoming)
    organizer_id = Column(Integer, ForeignKey("admins.id"))

    # Relationships
    organizer = relationship("Admin")
    registrations = relationship("EventRegistration", back_populates="event")

class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    student_id = Column(Integer, ForeignKey("students.id"))
    registration_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="registered")
    attendance_status = Column(String(50), default="pending")

    # Relationships
    event = relationship("Event", back_populates="registrations")
    student = relationship("Student", back_populates="event_registrations")

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    publish_date = Column(DateTime, default=datetime.utcnow)
    expiry_date = Column(DateTime)
    priority = Column(Enum(AnnouncementPriority), default=AnnouncementPriority.normal)
    admin_id = Column(Integer, ForeignKey("admins.id"))
    status = Column(String(50), default="active")

    # Relationships
    admin = relationship("Admin")

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    student_id = Column(String(50), unique=True)
    department = Column(String(100))
    year_of_study = Column(Integer)
    join_date = Column(DateTime, default=datetime.utcnow)
    membership_status = Column(String(50), default="active")
    role = Column(Enum(StudentRole), default=StudentRole.member)

    # Relationships
    event_registrations = relationship("EventRegistration", back_populates="student") 