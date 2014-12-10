#!flask/bin/python
from app import app
from RPIO import PWM

PWM.setup()
PWM.init_channel(0)
try:
	app.run(debug=True, host='0.0.0.0')
except Exception:
	PWM.cleanup()
