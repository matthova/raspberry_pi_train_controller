from flask import render_template, request
from app import app
import os

forward_pin = 23
reverse_pin = 24
speed_pin = 25

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/', methods=['POST'])
def form():
	try:
		speed = request.form["speed"]
		os.system('echo "%s=%s" > /dev/pi-blaster' % (speed_pin, speed))
		if int(request.form["direction"]) == 1:
			os.system('echo "%s=1" > /dev/pi-blaster' % (forward_pin))
			os.system('echo "%s=0" > /dev/pi-blaster' % (reverse_pin))
		else:
			os.system('echo "%s=0" > /dev/pi-blaster' % (forward_pin))
			os.system('echo "%s=1" > /dev/pi-blaster' % (reverse_pin))
	except Exception:
		print 'Speed and Direction update error'

	return "Hello"

