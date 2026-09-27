from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(200), nullable=False)
    type = Column(String(50), nullable=False, default="barbershop")
    address = Column(String(300), nullable=True)
    phone = Column(String(50), nullable=True)
    onec_url = Column(String(300), nullable=False)
    onec_user = Column(String(100), nullable=True)
    onec_password = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    subscription_until = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Tenant {self.code} ({self.name})>"