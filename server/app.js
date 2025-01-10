const express = require('express')
const port = 6001; // 6001
const router = require('./routes/controller.js')
const app = express()

app.use('/api', router)
 
app.listen(port,'10.169.142.40', () => {
	console.log('listening to port ' + port);
})