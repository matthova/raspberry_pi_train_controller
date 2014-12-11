from flask import render_template, request
from app import app
try:
	from RPIO import PWM
except Exception:
	print 'No RPIO available'

def add_cors_headers(response):
	response.headers['Access-Control-Allow-Origin'] = '*'
	if request.method == 'OPTIONS':
		response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT'
		headers = request.headers.get('Access-Control-Request-Headers')
		if headers:
			response.headers['Access-Control-Allow-Headers'] = headers
	return response
app.after_request(add_cors_headers)

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/', methods=['POST'])
def form():
	try:
		PWM.add_channel_pulse(0, 17, 0, int(request.form["hello"]))
	except Exception:
		print 'No RPIO available'

	print request.form["hello"]
	return "Hello"

