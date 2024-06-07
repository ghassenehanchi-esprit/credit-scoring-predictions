from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost/databaseprojetds"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False



db = SQLAlchemy(app)
