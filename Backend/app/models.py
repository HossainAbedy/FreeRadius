from . import db

class Radcheck(db.Model):
    __tablename__ = 'radcheck'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False)
    attribute = db.Column(db.String(64), nullable=False)
    op = db.Column(db.String(2), nullable=False, default=':=')
    value = db.Column(db.String(253), nullable=False)

class Radgroupcheck(db.Model):
    __tablename__ = 'radgroupcheck'
    id = db.Column(db.Integer, primary_key=True)
    groupname = db.Column(db.String(64), nullable=False)
    attribute = db.Column(db.String(64), nullable=False)
    op = db.Column(db.String(2), nullable=False, default=':=')
    value = db.Column(db.String(253), nullable=False)

class Radusergroup(db.Model):
    __tablename__ = 'radusergroup'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False)
    groupname = db.Column(db.String(64), nullable=False)
    priority = db.Column(db.Integer, nullable=False, default=1)

class NasDevice(db.Model):
    __tablename__ = 'nas'
    id = db.Column(db.Integer, primary_key=True)
    nasname = db.Column(db.String(128), nullable=False)
    shortname = db.Column(db.String(64))
    type = db.Column(db.String(30))
    ports = db.Column(db.Integer)
    secret = db.Column(db.String(60))
    server = db.Column(db.String(64))
    community = db.Column(db.String(50))
    description = db.Column(db.String(200))
