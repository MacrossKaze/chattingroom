import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("submit")
def vote(data):
    message = data["selection"]
    emit("announce", {"selection": message}, broadcast=True)
    #print('hello')

if __name__ == '__main__':
	app.run(debug=True, host="127.0.0.1")
	
	# 加入新功能 1.为每条信息编号 2.输入为空时不让enter