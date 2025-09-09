from flask import Blueprint, request, jsonify
from . import db
from .models import Radcheck, Radgroupcheck, NasDevice

main = Blueprint('main', __name__)

# ----------------- User Endpoints -----------------
@main.route('/user', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    new_user = Radcheck(username=username, attribute='Cleartext-Password', op=':=', value=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'}), 201

@main.route('/user', methods=['GET'])
def get_users():
    users = Radcheck.query.all()
    result = [{
        'id': user.id,
        'username': user.username,
        'attribute': user.attribute,
        'op': user.op,
        'value': user.value
    } for user in users]
    return jsonify(result), 200

@main.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = Radcheck.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user.username = data.get('username', user.username)
    user.value = data.get('password', user.value)
    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200

@main.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = Radcheck.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

# ----------------- Group Endpoints -----------------
@main.route('/group', methods=['POST'])
def add_group():
    data = request.get_json()
    groupname = data.get('groupname')
    if not groupname:
        return jsonify({'error': 'Groupname is required'}), 400
    new_group = Radgroupcheck(groupname=groupname, attribute='Auth-Type', op=':=', value='Reject')
    db.session.add(new_group)
    db.session.commit()
    return jsonify({'message': 'Group added successfully'}), 201

@main.route('/group', methods=['GET'])
def get_groups():
    groups = Radgroupcheck.query.all()
    result = [{
        'id': g.id,
        'groupname': g.groupname,
        'attribute': g.attribute,
        'op': g.op,
        'value': g.value
    } for g in groups]
    return jsonify(result), 200

@main.route('/group/<int:group_id>', methods=['PUT'])
def update_group(group_id):
    data = request.get_json()
    group = Radgroupcheck.query.get(group_id)
    if not group:
        return jsonify({'error': 'Group not found'}), 404
    group.groupname = data.get('groupname', group.groupname)
    group.attribute = data.get('attribute', group.attribute)
    group.op = data.get('op', group.op)
    group.value = data.get('value', group.value)
    db.session.commit()
    return jsonify({'message': 'Group updated successfully'}), 200

@main.route('/group/<int:group_id>', methods=['DELETE'])
def delete_group(group_id):
    group = Radgroupcheck.query.get(group_id)
    if not group:
        return jsonify({'error': 'Group not found'}), 404
    db.session.delete(group)
    db.session.commit()
    return jsonify({'message': 'Group deleted successfully'}), 200

# ----------------- NAS Device Endpoints -----------------
@main.route('/nas', methods=['POST'])
def add_nas():
    data = request.get_json()
    nasname = data.get('nasname')
    if not nasname:
        return jsonify({'error': 'NAS name is required'}), 400
    new_nas = NasDevice(
        nasname=nasname,
        shortname=data.get('shortname'),
        type=data.get('type'),
        ports=data.get('ports'),
        secret=data.get('secret'),
        server=data.get('server'),
        community=data.get('community'),
        description=data.get('description')
    )
    db.session.add(new_nas)
    db.session.commit()
    return jsonify({'message': 'NAS device added successfully'}), 201

@main.route('/nas', methods=['GET'])
def get_nas():
    nas_devices = NasDevice.query.all()
    result = [{
        'id': nas.id,
        'nasname': nas.nasname,
        'shortname': nas.shortname,
        'type': nas.type,
        'ports': nas.ports,
        'secret': nas.secret,
        'server': nas.server,
        'community': nas.community,
        'description': nas.description
    } for nas in nas_devices]
    return jsonify(result), 200

@main.route('/nas/<int:nas_id>', methods=['PUT'])
def update_nas(nas_id):
    data = request.get_json()
    nas = NasDevice.query.get(nas_id)
    if not nas:
        return jsonify({'error': 'NAS device not found'}), 404
    nas.nasname = data.get('nasname', nas.nasname)
    nas.shortname = data.get('shortname', nas.shortname)
    nas.type = data.get('type', nas.type)
    nas.ports = data.get('ports', nas.ports)
    nas.secret = data.get('secret', nas.secret)
    nas.server = data.get('server', nas.server)
    nas.community = data.get('community', nas.community)
    nas.description = data.get('description', nas.description)
    db.session.commit()
    return jsonify({'message': 'NAS device updated successfully'}), 200

@main.route('/nas/<int:nas_id>', methods=['DELETE'])
def delete_nas(nas_id):
    nas = NasDevice.query.get(nas_id)
    if not nas:
        return jsonify({'error': 'NAS device not found'}), 404
    db.session.delete(nas)
    db.session.commit()
    return jsonify({'message': 'NAS device deleted successfully'}), 200
