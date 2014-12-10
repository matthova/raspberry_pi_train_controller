from flask import render_template, request
from app import app
from RPIO import PWM

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/', methods=['POST'])
def form():
	PWM.add_channel_pulse(0, 17, 0, int(request.form["hello"]))
	print request.form["hello"]
	return "Hello"
