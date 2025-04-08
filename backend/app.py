from flask import Flask, request, session, jsonify
from flask_socketio import disconnect, SocketIO, emit
from pymongo import MongoClient
from datetime import datetime, timezone
from dotenv import dotenv_values
from google.auth.transport import requests as google_requests
from functools import wraps
import requests
from flask_cors import CORS
from bson.json_util import dumps
import os

# google_client_id = dotenv_values('login.env')['CLIENT_ID']
# mongo_url = os.getenv("MONGO_URI", "mongodb://db:27017/public_chat")
# client = MongoClient(mongo_url)
# db = client.get_database()

google_client_id = dotenv_values('login.env')['CLIENT_ID']
client = MongoClient('mongodb://localhost:27017')
db = client.public_chat

app = Flask(__name__)
app.config['SECRET_KEY'] = dotenv_values('login.env')['SECRET_KEY']
socketio = SocketIO(app, cors_allowed_origins="*")


# allowing access at specific host
CORS(app)


def auth(func):
    @wraps(func)
    def decorated_function(*args, **kws):
        auth_header = request.headers.get('Token')

        if not auth_header:
            return jsonify({'error': 'Missing Token'}), 400

        token = auth_header
        try:
            response = requests.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                headers={'Authorization': f'Bearer {token}'}
            )

            if response.status_code != 200:
                return jsonify({'error': 'Invalid Token or Token Expired'}), 400

            user_info = response.json()
            user_email = user_info['email']

            
        except Exception as e:
            return jsonify({'error': 'Unknown error occured'}), 400

        return func(user_email, *args, **kws)
    
    return decorated_function

@socketio.on('connect')
def handle_connect():
    token = request.headers.get('Token')
    if not token:
        print('Token is  missing')
        disconnect()
        return

    try:

        response = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {token}'}
        )

        if response.status_code != 200:
            print("Invalid Token or Token Expired")
            disconnect()
            return
        
        user_info = response.json()
        user_email = user_info['email']

    except Exception as e:
        print(f"Unknown error occurred: {e}")
        disconnect()
        return

    print(f"User {user_email} authenticated successfully.")


@socketio.on('new_chat_message')
def handle_sending_new_message(data):
    message = data['message']
    userId = data['userId']

    emit('new_chat_message', {'message': message, 'userId': userId}, broadcast=True)


@app.route('/api/chat', methods=['POST'])
@auth
def chat(user):

    data = request.json
    message = data['Message']

    
    if not user or not message:
        return jsonify({'error': 'Did not receive userID or message'}), 400
    

    message_data = {
        'userId': user,
        'message': message,
        'timestamp': datetime.now(timezone.utc).isoformat()
    }

    db.messages.insert_one(message_data)

    return jsonify({'message': 'Message insert complete!'}), 200

@app.route('/api/history', methods=['GET'])
@auth
def history(user):
    try:
        incoming_data = request.args
        page = int(incoming_data.get('page', 1))
        limit = int(incoming_data.get('limit', 25))
        
        messages = list(db.messages.find({})
                        .sort('timestamp', -1)
                        .skip((page - 1) * limit)
                        .limit(limit))

        return dumps(messages[::-1]), 200
    
    except Exception as e:
        return jsonify({'error': f'{e}'}), 400

@app.route('/api/admin', methods=['POST'])
@auth
def bug_report(user):
    data = request.json
    message = data['Message']

    if not user or not message:
        return jsonify({'error': 'Did not receive feature/bug requests!'}), 400
    
    message_data = {
        'userId': user,
        'message': message,
        'timestamp': datetime.now(timezone.utc).isoformat()
    }
    
    db.features.insert_one(message_data)
    return jsonify({'Message': 'bug/feature requests successfully sent!'}), 200

@app.route('/api/secret/admin', methods=['GET'])
def admin_panel():
    try:
        messages = list(db.features.find({}))
        return dumps(messages), 200
    except Exception as e:
        return jsonify({'error': f'{e}'}), 500


if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'False') == 'True'
    app.run(debug=debug_mode, host='0.0.0.0')