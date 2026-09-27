import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Tenant

DB_PATH = os.getenv("DB_PATH", "/app/data/tenants.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def init_db():
    """Создаёт таблицы и добавляет тестовых тенантов."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    Base.metadata.create_all(bind=engine)

    session = SessionLocal()
    try:
        if session.query(Tenant).count() == 0:
            t1 = Tenant(
                code="barber_main",
                name="Парикмахерская на Ленина",
                type="barbershop",
                address="г. Москва, ул. Ленина, д. 1",
                phone="+7 (999) 123-45-67",
                onec_url="http://178.21.11.91/booking/hs/booking",
                onec_user=os.getenv("ONEC_USER"),
                onec_password=os.getenv("ONEC_PASSWORD"),
                is_active=True,
            )
            t2 = Tenant(
                code="barber_center",
                name="Парикмахерская в центре",
                type="barbershop",
                address="г. Москва, ул. Тверская, д. 10",
                phone="+7 (999) 765-43-21",
                onec_url="http://178.21.11.91/booking2/hs/booking",
                onec_user=os.getenv("ONEC_USER"),
                onec_password=os.getenv("ONEC_PASSWORD"),
                is_active=True,
            )
            session.add_all([t1, t2])
            session.commit()
            print("✅ Добавлены тестовые тенанты: barber_main, barber_center")
    finally:
        session.close()


def get_tenant_by_code(code: str):
    session = SessionLocal()
    try:
        return session.query(Tenant).filter(
            Tenant.code == code, Tenant.is_active == True
        ).first()
    finally:
        session.close()


def get_all_tenants():
    session = SessionLocal()
    try:
        return session.query(Tenant).filter(Tenant.is_active == True).all()
    finally:
        session.close()