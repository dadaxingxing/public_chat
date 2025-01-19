from flask import Flask, request, redirect, session
from flask_socketio import join_room, leave_room, send, SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'abc'
socketio = SocketIO(app)

@app.route('/', methods=['POST', 'GET'])
def home():
    pass

@app.route('/chat', methods=['POST', 'GET'])
def chat():
    pass


if __name__ == '__main__':
    socketio.run(app, debug=True)




