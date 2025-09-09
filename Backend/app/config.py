# config.py
import os

class Config:
    # Update with your actual MySQL credentials and IP address
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://radius:radpass@172.19.100.110/radius"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a-very-secret-key'
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "your_jwt_secret_here"  # New for JWT
