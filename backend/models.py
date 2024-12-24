# models.py
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # Ensure this field exists
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def check_active(self, is_active):
        return is_active
    
    def get_id(self):
        return self.id 


class Meme(db.Model):
    # id = db.Column(db.Integer, primary_key=True)
    # owner_name = db.Column(db.String(100), nullable=False)
    # image_url = db.Column(db.String(200), nullable=False)
    # caption = db.Column(db.String(200), nullable=False)
    # category = db.Column(db.String(50), nullable=False)

    # def __repr__(self):
    #     return f'<Meme {self.caption}>'

    __tablename__ = 'meme'
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    image_url = db.Column(db.String(200), nullable=False)
    caption = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    recommend = db.Column(db.Integer)

    owner = db.relationship('User', backref=db.backref('memes', lazy=True))
    
    def __repr__(self):
        return f'<Meme {self.caption} by {self.owner.email}>'
    
    def update_caption(self, new_caption):
        ""
