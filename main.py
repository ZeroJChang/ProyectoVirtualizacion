from flask import Flask, jsonify
from datetime import datetime
import pytz
import random

app = Flask(__name__)

@app.route('/')
def get_datetime():
    now = datetime.now(pytz.timezone('America/Guatemala'))
    return jsonify({
        'date': now.strftime("%Y-%m-%d"),
        'time': now.strftime("%H:%M:%S"),
        'timeZone' : now.tzinfo.zone
    })

@app.route('/hello')
def hello_world():
    return "Hello World!"

@app.route('/random_phrase')
def random_phrase():
    phrases = ["Un verano sin ti", "Nadie sabe lo que va a pasar mañana", "X100pre"]
    return random.choice(phrases)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
