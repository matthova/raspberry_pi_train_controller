#!flask/bin/python
from app import app
try:
	from RPIO import PWM
	PWM.setup()
	PWM.init_channel(0)
except Exception:
	print 'No RPIO available'
    
try:
	app.run(debug=True, host='0.0.0.0', port=80)
except Exception:
	try:
		PWM.cleanup()
	except Exception:
		print "bye"
