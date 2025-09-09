from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)  # Enable CORS for all origins

    # Import and register blueprints for routing
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app
