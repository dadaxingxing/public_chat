from flask import Flask, request, session, jsonify
from flask_socketio import join_room, leave_room, send, SocketIO
from pymongo import MongoClient
from uuid import uuid4
from datetime import datetime
import jwt
from dotenv import dotenv_values


client = MongoClient('mongodb://localhost:27017')
db = client.public_chat

app = Flask(__name__)
app.config['SECRET_KEY'] = dotenv_values('login.env')['SECRET_KEY']
socketio = SocketIO(app)


def auth(func):
    @wraps(func)
    def decorated_function(*args, **kws):
        pass

    
    return auth

@app.route('/api/history', methods=['GET'])
@auth
def history():
    messages = list(db.messages.find({}, {'_id': 0}))
    return jsonify({'messages': messages})


@app.route('/api/chat', method=['POST'])
@auth
def chat():
    data = request.get_json()
    userId = data.get('userId')
    message = data.get('message')
    
    if not userId or not message:
        return jsonify({'error': 'User ID and a message is required!'}), 400

    message_data = {
        'userId': userId,
        'message': message,
        'timestamp': datetime.utcnow().isoformat()
    }
    db.messages.insert_one(message_data)



if __name__ == '__main__':
    socketio.run(app, debug=True)




