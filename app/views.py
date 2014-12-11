from flask import render_template, request
from app import app
from app import crossdomain
try:
	from RPIO import PWM
except Exception:
	print 'No RPIO available'

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/', methods=['POST'])
@crossdomain(origin='*')
def form():
	try:
		PWM.add_channel_pulse(0, 17, 0, int(request.form["hello"]))
	except Exception:
		print 'No RPIO available'

	print request.form["hello"]
	return "Hello"
