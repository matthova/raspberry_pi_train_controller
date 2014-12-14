#!flask/bin/python
from app import app
import os
#try:
#	os.system('sudo service avahi-daemon restart')
#except Exception:
#	print 'avahi restart failed'

try:
	app.run(debug=True, host='0.0.0.0')
except Exception:
	try:
		PWM.cleanup()
	except Exception:
		print "bye"
