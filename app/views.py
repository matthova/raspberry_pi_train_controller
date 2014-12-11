from flask import render_template, request
from app import app

forward_pin = 7
reverse_pin = 8
speed_pin = 17
try:
	import RPIO
	from RPIO import PWM
	
	RPIO.setup(forward_pin, RPIO.OUT)
	RPIO.setup(reverse_pin, RPIO.OUT)
	RPIO.output(forward_pin, False)
	RPIO.output(reverse_pin, False)

except Exception:
	print 'No RPIO available mmk'

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/', methods=['POST'])
def form():
	try:
		PWM.add_channel_pulse(0, speed_pin, 0, int(request.form["hello"]))
		print request.form["direction"]
		if int(request.form["direction"]) == 1:
			RPIO.output(forward_pin, True)
			RPIO.output(reverse_pin, False)
		else:
			RPIO.output(forward_pin, False)
			RPIO.output(reverse_pin, True)
	except Exception:
		print 'No RPIO available'

	print request.form["hello"]
	return "Hello"

