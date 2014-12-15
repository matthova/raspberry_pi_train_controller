#!flask/bin/python
from app import app

try:
	app.run(debug=True, host='0.0.0.0')
except Exception:
	print "bye"
