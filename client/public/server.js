var express = require('express')();
var server = require('http').Server(express);

var io = require("socket.io")(server, {
	handlePreflightRequest: (req, res) => {
		const headers = {
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
			"Access-Control-Allow-Credentials": true
		};
		res.writeHead(200, headers);
		res.end();
	}
});

io.on('connection', (socket) => {

	//User's Leave
	socket.on('RequestUsersLeaveTable', () => {
		io.emit('GetUsersLeaveTable', )
	})

	//For Approval Count
	socket.on('RequestForApprovalCount', () => {
		io.emit('GetForApprovalCount', )
	})

	//Leader's For Approval Table
	socket.on('RequestLeadersForApprovalTable', () => {
		io.emit('GetLeadersForApprovalTable', )
	})

	//Leader's For Approval Employee Table
	socket.on('RequestLeadersForApprovalEmployeeTable', () => {
	io.emit('GetLeadersForApprovalEmployeeTable', )
	})

	//Admin List Count
	socket.on('RequestAdminListCount', () => {
		io.emit('GetAdminListCount', ) // uncommit ko kase naka commit sya
	})

	//Admin List Table
	socket.on('RequestAdminListTable', () => {
		io.emit('GetAdminListTable', )
	})

//================================================================================ SAMPLE
	//Request - Multiple Parameter
	socket.on('RequestLinkMultiple', (Data1, Data2, Data3) => {
		io.emit('SendLinkMultiple', Data1, Data2, Data3)
	})
//================================================================================ SAMPLE
})

//For auto refreshing
server.listen(7001, () => {
	console.log('socket.io server listen at 7001')
})