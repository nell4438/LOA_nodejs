var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: 'LOA',
  description: 'LOA SYSTEM',
  script: "C:\\Users\\qad225\\Desktop\\Employee's Leave of Absence (WEB)\\(WEB) Employees Leave of Absence\\server\\app.js"
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start();
});

svc.install();