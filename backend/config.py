import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://avnadmin:AVNS_zmyBW-fe42QZfAvNK2o@pg-142144db-bitbanana717-de0b.h.aivencloud.com:22158/defaultdb?sslmode=require') or 'sqlite:///site.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
