/**
 * http://usejsdoc.org/
 */
require('./hsms-utils.js');
var HsmsHost = function() {
};
var hsmsAddress = null;
var hsmsPort = 0;
var net = null;
var hsmsName="";
HsmsHost.prototype.connected = function(name){};
HsmsHost.prototype.construct = function(address, port) {
	net = require('net');
	hsmsAddress = address;
	hsmsPort = port;
};

HsmsHost.prototype.setName = function(name) {
	hsmsName = name;
};
HsmsHost.S5F3 = function(alrmId, setClear) {
};
HsmsHost.S6F11 = function(eventId, reports) {
};
HsmsHost.Disconnected = function(name) {
};
HsmsHost.prototype.setConnectedCallback = function(callBack) {
	connected = callBack(hsmsName);
};


HsmsHost.prototype.start = function() {
	// Create a server instance, and chain the listen function to it
	// The function passed to net.createServer() becomes the event handler for
	// the 'connection' event
	// The sock object the callback function receives UNIQUE for each connection
	net
			.createServer(
					function(sock) {

						// We have a connection - a socket object is assigned to
						// the
						// connection automatically
						console.log('CONNECTED: ' + sock.remoteAddress + ':'
								+ sock.remotePort);
						//connected(hsmsName);
						
						// Add a 'data' event handler to this instance of socket
						sock
								.on(
										'data',
										function(data) {
											// console.log('DATA ' +
											// sock.remoteAddress + ': ' +
											// data);
											// Write the data back to the
											// socket, the client will
											// receive it as data from the
											// server
											// sock.write('You said "' + data +
											// '"');
											parseSnF(data)
											var w = (data[6] > 128);
											console.log('w:' + w);
											if (data[9] === 1) {
												data[9] = 2;
												sock.write(data);
											} else if (data[9] === 3) {
												data[9] = 4;
												sock.write(data);
											} else if (data[9] === 5) {
												data[9] = 6;
												sock.write(data);
											} else if (data[9] === 9) {
												data[9] = 6;
												sock.write(data);
											} else if (data[9] === 0) {
												// S1
												var s = data[6] - 128;
												var callBackStr = 's' + s + "f"
														+ data[7];
												// sock.write(s(data));
												if (s === 1) {
													// F3
													if (data[7] === 3) {
														data[7] = 4;
														sock.write(data);
													} else if (data[7] === 13) {
														data[7] = 14;
														sock.write(data);
													}
												} else if (s === 2) {
													// F3
													if (data[7] === 2) {
														data[7] = 4;
														sock.write(data);
													}
												} else if (s === 5) {
													if (data[7] === 3) {

													}
												} else if (s === 6) {
													// F11 - event
													if (data[7] === 11) {
														var reply = data.slice(
																0, 14);
														reply[3] = 0x0a
														reply[7] = 12;
														sock.write(reply);
														var S6F11 = require('./data-items/S6F11.js').S6F11;
														var event = new S6F11(
																data);
														event
																.readEventDataId()
																.readEventCeid()
																.readReports();
														console
																.log("event reply sent")
													}
												}
											}
										});

						// Add a 'close' event handler to this instance of
						// socket
						sock.on('close', function(data) {
							console.log('CLOSED: ' + sock.remoteAddress + ' '
									+ sock.remotePort);
						});

					}).listen(hsmsPort, hsmsAddress);
};

exports.HsmsHost = HsmsHost;