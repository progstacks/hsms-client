/**
 * http://usejsdoc.org/
 */

parseSnF = function (data) {
	var snf = {
		length : parseToHexString(data, 0) + " " + parseToHexString(data, 1)
				+ " " + parseToHexString(data, 2) + " "
				+ parseToHexString(data, 3),
		deviceId : parseToHexString(data, 4) + " " + parseToHexString(data, 5),
		stream : parseToHexString(data, 6),
		func : parseToHexString(data, 7),
		sType : parseToHexString(data, 8) + " " + parseToHexString(data, 9),
		sysBytes : parseToHexString(data, 10) + " "
				+ parseToHexString(data, 11) + " " + parseToHexString(data, 12)
				+ " " + parseToHexString(data, 13)

	}

	if (data.length > 14) {
		for(var i=14;i < data.length; i++){
			
		}
	}

	console.log('length: ' + snf.length)
	console.log('deviceId: ' + snf.deviceId)
	console.log('stream: ' + snf.stream)
	console.log('func: ' + snf.func)
	console.log('sType: ' + snf.sType)
	console.log('sysBytes: ' + snf.sysBytes)
	return snf
}

parseToHexString = function(data, index) {
	var h = data[index];
	if (data[index] < 16) {
		h = "0" + h;
	}
	return h
}
readDataItem = function(eventIndexer,eventData){
	//console.log(eventIndexer)
	//console.log(eventData[eventIndexer.index])
	//console.log(dataType[eventData[eventIndexer.index]])
	var reply = []
	if (dataType[eventData[eventIndexer.index]] === 'U1') {
		reply = [dataType[eventData[eventIndexer.index]],
			eventData[eventIndexer.index+=2]];
	}else if (dataType[eventData[eventIndexer.index]] === 'U2') {
		reply = [dataType[eventData[eventIndexer.index]],
			parseInt(d2h(eventData[eventIndexer.index+=2]) + d2h(eventData[eventIndexer.index+=1]),16)];
	}else if (dataType[eventData[eventIndexer.index]] === 'U4') {
		reply = [dataType[eventData[eventIndexer.index]],
			parseInt(d2h(eventData[eventIndexer.index+=2]) + d2h(eventData[eventIndexer.index+=1]) + d2h(eventData[eventIndexer.index+=1]) + d2h(eventData[eventIndexer.index+=1]),16)];
	}else if(dataType[eventData[eventIndexer.index]] === 'A'){
		var len = eventData[eventIndexer.index+=1];
		var maxIndex = eventIndexer.index + len
		var ascii = "";
		//console.log('maxIndex: ' + maxIndex +"; len: " + len + "; eventIndexer.index: " + eventIndexer.index)
		while(eventIndexer.index < maxIndex){
			ascii +=String.fromCharCode(eventData[eventIndexer.index+=1]);
		}
		reply = ['A',ascii];
	}
	eventIndexer.index+=1
	return reply;
}

readListLength = function(eventIndexer,eventData){

	//console.log('list: ' + eventData[eventIndexer.index] + ":" + (eventIndexer.index));
	var result =[];
	if (dataType[eventData[eventIndexer.index]] === 'L') {
		result = ['L', eventData[eventIndexer.index+=1]];
	}
	//console.log('result: '+ result)
	eventIndexer.index += 1
	return result;
}

d2h = function (d) { return (+d).toString(16); }