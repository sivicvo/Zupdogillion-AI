from flask import Blueprint, render_template, request, jsonify, session
from flask_login import logout_user, login_required, current_user
import uuid
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, create_refresh_token
from models import Meme, User, db
from flask_mail import Mail, Message
import requests

#degine the main bludprint for general app functionality
main = Blueprint('main', __name__)

#define the auth blueprint for authentication related routes
auth_bp = Blueprint('auth', __name__)
mail = Mail()

@main.route('/')
def home():
    latest_memes = Meme.query.order_by(Meme.id.desc()).limit(5).all()
    popular_memes = Meme.query.order_by(Meme.id.desc()).limit(5).all()  # Replace with actual popularity logic
    return render_template('home.html', latest=latest_memes, popular=popular_memes)

@main.route('/api/generate', methods=['POST'])
def generate():
    data = request.get_json()
    text_input = data.get('text_input')

    username = "bitbanana"
    password = "bitbanana717@gmail.com"
    template_id = '12345678'
    payload = {
        'template_id': template_id,
        'username': username,
        'password': password,
    }
    
    # Example response after meme generation (replace with actual logic)
    return jsonify({"message": "Meme generated!", "text": text_input})

@main.route('/api/all_memes', methods=['GET'])
def all_memes():
    responses = requests.get('https://api.imgflip.com/get_memes')
    memes_data = responses.json()
    return jsonify(memes_data)

# @main.route('/pricing')
# def pricing():
#     return render_template('pricing.html')

# @main.route('/about')
# def about():
#     return render_template('about.html')

# @auth_bp.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     email = data['email']
#     password = data['password']

#     #check if user already exists
#     if User.query.filter_by(email=email).first():
#         return jsonify({"message" : "User already exists!"}), 400
    
#     #create a new user
#     new_user = User(email=email)
#     new_user.set_password(password) #assume set_password hashes the password
#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({"message": "User registed successfully!"}), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()

#     if not data or 'email' not in data or 'password' not in data:
#         return jsonify({"message": "Missing email or password."}), 400
    
#     email = data['email']
#     password = data['password']

#     user = User.query.filter_by(email=email).first()

#     if user and user.check_password(password):
#         if not user.is_active:
#             return jsonify({"message": "Account is inactive."}), 403
#         access_token = create_access_token(identity=user.id)
#         refresh_token = create_refresh_token(identity=user.id)
#         return jsonify({
#                     "access_token": access_token,
#                     "refresh_token": refresh_token,
#                     "user": {
#                         "id": user.id,
#                         "email": user.email
#                     }
#                 }), 200
#     return jsonify({"message": "Invalid credentials"}), 401

# @auth_bp.route('/logout', methods=['POST'])
# @login_required
# def logout():
#     logout_user()
#     session.clear()
#     return jsonify({"message": "Logged out successfully!"}), 200

@auth_bp.route('/protected', methods=['GET'])
@login_required
def protected():
    return jsonify({"message": f"Hello {current_user.email}!"}), 200

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data['email']

    user = User.query.filter_by(email=email).first()
    if user:
        reset_token = str(uuid.uuid4())
        expiration_time = datetime.utcnow() + timedelta(hours=1)

        user.reset_token = reset_token
        user.token_expiration = expiration_time
        db.session.commit()

        msg = Message('Password Reset Request', sender='jackpassiondev07@gmail.com', recipients=[email])
        msg.body = f'Click the link to reset your password: http://localhost:3000/auth/reset-password/{reset_token}'
        mail.send(msg)
    
    return jsonify({"Message": "If that email is registered, you will receive a password reset link."}), 200

@auth_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    data = request.get_json()
    password = data['password']

    user = User.query.filter_by(reset_token=token).first()

    if user and user.token_expiration > datetime.utcnow():
        user.set_password(password)
        user.reset_token = None
        user.token_expiration = None
        db.session.commit()

        return jsonify({"message": "Password has been updated successfully."}), 200
    
    return jsonify({"message": "Invalid or expired token."}), 400

