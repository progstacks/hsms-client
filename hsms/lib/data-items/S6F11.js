/**
 * http://usejsdoc.org/
 */
require('./dataTypeMap.js');
require('./event-report-config.js');

var S6F11 = function (data) {
	eventData = data;
	eventIndexer = { index: 16 };
	eventDataId = {};
	eventCeid = {};
	eventReports = {};
};
var eventIndexer = { index: 15 };
var eventData = {};
var eventDataId = {};// U1,1
var eventCeid = {};// U2,5
var eventReports = {};// U2,5
S6F11.prototype.getEventIndexer = function () {
	return eventIndexer.index;
}

S6F11.prototype.getEventData = function () {
	return eventData;
}
S6F11.prototype.getEventDataId = function () {
	return eventDataId;
}
S6F11.prototype.getEventCeid = function () {
	return eventCeid;
}

S6F11.prototype.startEventFrom = function (index) {
	eventIndexer.index = index;
};

S6F11.prototype.setEventData = function (data) {
	eventData = data;
};

S6F11.prototype.readEventDataId = function () {
	console.log('readEventDataId.index: ' + eventIndexer.index);
	eventDataId = readDataItem(eventIndexer, eventData)
	console.log('eventDataId: ' + eventDataId);
	return this;
};

S6F11.prototype.readEventCeid = function () {
	console.log('readEventCeid.index: ' + eventIndexer.index);
	eventCeid = readDataItem(eventIndexer, eventData)
	console.log('eventCeid: ' + eventCeid);
	if (eventConfig[eventCeid[1]] !== undefined) {
		if (eventConfig[eventCeid[1]].name !== undefined) {
			console.log('Event Received: ' + eventConfig[eventCeid[1]].name)
		} else {
			console.log("undefined: " + eventCeid[1]);
		}
	}else{
		console.log("undefined: " + eventConfig[eventCeid[1]]);
	}
	return this;
};

S6F11.prototype.readReports = function () {

	//eventIndexer.index += 1
	//console.log('readReports.index: '+eventIndexer.index);
	var reportSize = readListLength(eventIndexer, eventData)[1]
	//var reportSize2 = readListLength(eventIndexer,eventData)[1]
	//console.log('reportSize: ' + reportSize)
	//console.log('reportSize2: ' + reportSize2)
	var reports = {}
	for (var i = 0; i < reportSize; i++) {
		var listItemCount = readListLength(eventIndexer, eventData)[1]
		//console.log('listItemCount: ' + listItemCount);

		for (var i1 = 0; i1 < listItemCount - 1; i1++) {
			//eventIndexer.index +=1
			var rptId = readDataItem(eventIndexer, eventData)
			//console.log('rptId: ' + rptId);
			reports[rptId[1]] = {}
			console.log('Report:' + eventConfig[eventCeid[1]].reports[rptId[1]].name);
			var repotVidItemCount = readListLength(eventIndexer, eventData)[1]
			//console.log('repotVidItemCount: ' + repotVidItemCount);
			for (var i2 = 0; i2 < repotVidItemCount; i2++) {
				var varData = readDataItem(eventIndexer, eventData)
				//console.log('varData: ' + varData);
				reports[rptId[1]][i2] = varData
				console.log('Vid ' + eventConfig[eventCeid[1]].reports[rptId[1]].vids[i2].vid + "(" + eventConfig[eventCeid[1]].reports[rptId[1]].vids[i2].type + ") (" + eventConfig[eventCeid[1]].reports[rptId[1]].vids[i2].name + ") =" + varData[1])
			}
		}
	}
	console.log('reports:' + reports)
	for (i = 0; i < reports.length; i++) {
		for (j = 0; j < reports[i].length; j++) {
			console.log(reports[i][j]);
			for (k = 0; k < reports[i][j].length; k++) {
				console.log(reports[i][j][k]);
			}
		}
	}
	eventReports = reports
	return this;
};

exports.S6F11 = S6F11;