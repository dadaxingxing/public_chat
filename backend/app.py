from flask import Flask, request, session, jsonify
from flask_socketio import join_room, leave_room, send, SocketIO
from pymongo import MongoClient
from datetime import datetime, timezone
from dotenv import dotenv_values
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from functools import wraps
import requests
from flask_cors import CORS
from bson.json_util import dumps



google_client_id = dotenv_values('login.env')['CLIENT_ID']
client = MongoClient('mongodb://localhost:27017')
db = client.public_chat

app = Flask(__name__)
app.config['SECRET_KEY'] = dotenv_values('login.env')['SECRET_KEY']
socketio = SocketIO(app)


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

@app.route('/api/history', methods=['GET'])
@auth
def history(user):
    try:
            
        messages = db.messages.find({}).sort('timestamp', 1)
        return dumps(messages), 200
    
    except Exception as e:
        return jsonify({'error': f'{e}'}), 400

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

# remember to delete the line below
if __name__ == '__main__':
    socketio.run(app, debug=True)




