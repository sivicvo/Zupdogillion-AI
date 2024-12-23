from flask import Flask
from config import Config
from routes import main, auth_bp
from models import db
from flask_login import LoginManager
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize database
db.init_app(app)

login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

# Register Blueprints
app.register_blueprint(main)
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(port=5328)
