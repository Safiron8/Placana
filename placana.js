const fetch = require("node-fetch");
const readline = require('readline');

var placs = [
	{"0000": "Plác"},
	{"0000": "Zrcadlový plác"},
	{"0101": "Plác"},
	{"0102": "Minuty dvakrát plác"},
	{"0110": "Zrcadlový plác"},
	{"0123": "Postupka plác"},
	{"0201": "Hodiny dvakrát plác"},
	{"0202": "Plác"},
	{"0204": "Minuty dvakrát plác"},
	{"0220": "Zrcadlový plác"},
	{"0303": "Plác"},
	{"0306": "Minuty dvakrát plác"},
	{"0330": "Zrcadlový plác"},
	{"0402": "Hodiny dvakrát plác"},
	{"0404": "Plác"},
	{"0408": "Minuty dvakrát plác"},
	{"0430": "Vltava plác"},
	{"0440": "Zrcadlový plác"},
	{"0500": "Říp plác"},
	{"0505": "Plác"},
	{"0510": "Minuty dvakrát plác"},
	{"0550": "Zrcadlový plác"},
	{"0603": "Hodiny dvakrát plác"},
	{"0606": "Plác"},
	{"0612": "Minuty dvakrát plác"},
	{"0700": "Zrcadlový plác"},
	{"0707": "Plác"},
	{"0714": "Minuty dvakrát plác"},
	{"0804": "Hodiny dvakrát plác"},
	{"0808": "Plác"},
	{"0810": "Zrcadlový plác"},
	{"0816": "Minuty dvakrát plác"},
	{"0909": "Plác"},
	{"0918": "Minuty dvakrát plác"},
	{"0920": "Zrcadlový plác"},
	{"1001": "Zrcadlový plác"},
	{"1005": "Hodiny dvakrát plác"},
	{"1010": "Plác"},
	{"1020": "Minuty dvakrát plác"},
	{"1030": "Zrcadlový plác"},
	{"1111": "Plác"},
	{"1111": "Zrcadlový plác"},
	{"1122": "Minuty dvakrát plác"},
	{"1134": "Labe plác"},
	{"1206": "Hodiny dvakrát plác"},
	{"1212": "Plác"},
	{"1221": "Zrcadlový plác"},
	{"1224": "Minuty dvakrát plác"},
	{"1234": "Postupka plác"},
	{"1313": "Plác"},
	{"1323": "Lysá hory plác"},
	{"1326": "Minuty dvakrát plác"},
	{"1331": "Zrcadlový plác"},
	{"1348": "Založení Karlovy univerzity plác"},
	{"1357": "Založení Karlova mostu plác"},
	{"1407": "Hodiny dvakrát plác"},
	{"1414": "Plác"},
	{"1415": "Upálení mistra Jana Husa plác"},
	{"1424": "Kralický Sněžník plác"},
	{"1428": "Minuty dvakrát plác"},
	{"1441": "Zrcadlový plác"},
	{"1514": "Převrácené upáleni Mistra Jana Husa plác"},
	{"1515": "Plác"},
	{"1530": "Minuty dvakrát plác"},
	{"1531": "Praděd plác"},
	{"1551": "Zrcadlový plác"},
	{"1603": "Sněžka plác"},
	{"1608": "Hodiny dvakrát plác"},
	{"1616": "Plác"},
	{"1620": "Bílá hora plác"},
	{"1632": "Minuty dvakrát plác"},
	{"1701": "Zrcadlový plác"},
	{"1717": "Plác"},
	{"1734": "Minuty dvakrát plác"},
	{"1809": "Hodiny dvakrát plác"},
	{"1811": "Zrcadlový plác"},
	{"1818": "Plác"},
	{"1836": "Minuty dvakrát plác"},
	{"1919": "Plác"},
	{"1921": "Zrcadlový plác"},
	{"1938": "Minuty dvakrát plác"},
	{"2002": "Zrcadlový plác"},
	{"2010": "Hodiny dvakrát plác"},
	{"2020": "Plác"},
	{"2031": "Zrcadlový plác"},
	{"2040": "Minuty dvakrát plác"},
	{"2112": "Zrcadlový plác"},
	{"2119": "Převrácený zrcadlový plác"},
	{"2121": "Plác"},
	{"2142": "Minuty dvakrát plác"},
	{"2211": "Hodiny dvakrát plác"},
	{"2222": "Plác"},
	{"2222": "Zrcadlový plác"},
	{"2244": "Minuty dvakrát plác"},
	{"2323": "Plác"},
	{"2332": "Zrcadlový plác"},
	{"2345": "Postupka plác"},
	{"2346": "Minuty dvakrát plác"}
];

console.clear();

if(!process.argv[2]){
	logError("Uživatelský token nebyl specifikován.");
	logWarn("Usage: node placana.js [token=value] [chance=value] [channel=value] [activeHours=value]");
	process.exit();
}

var placSettings = {
	"token": process.argv[2].replace('token=', ''),
	"chance": parseInt(process.argv[3] ? process.argv[3].replace('chance=', '') : 100),
	"channel": process.argv[4] ? process.argv[4].replace('channel=', '') : "FALLBACK_CHANNEL_ID",
	"activeHours": process.argv[5] ? process.argv[5].replace('activeHours=', '') : "0-23",
	"state": "ready"
}

var timerSettings = {
	"interval": 1000,
	"expected": null,
	"running": false
}

var nextPlac = {
	"message": "",
	"hours": 0,
	"minutes": 0
}

var d = null;
var currentPlacs = [];
var h, m, s, ms, randomSec = 0;

function checkPlac() {
	d = new Date();
	h = d.getHours();
	m = d.getMinutes();
	s = d.getSeconds();
	ms = d.getMilliseconds();

	switch(placSettings.state){
		case "skipped":
		case "waitingForNewMinute":
			if(s == 0)
				placSettings.state = "ready";
		case "inProgress":
			return;
	}

	currentPlacs = getCurrentPlacs();

	if(currentPlacs.length > 0 && randomSec == s) {
		if ((placSettings.chance >= (Math.floor(Math.random() * 99) + 1)) && (placSettings.activeHourFrom <= h && placSettings.activeHourTo >= h)) {
			placSettings.state = "inProgress";	
			doPendingPlacs();
		}
		else {
			placSettings.state = "skipped";
			logMessage("Přeskočeno");
			setNextPlac();
		}
	}
}

function doPendingPlacs() {
	sendMessage(Object.values(currentPlacs.shift())[0]);

	if(currentPlacs.length == 0) {
		placSettings.state = "waitingForNewMinute";
		setNextPlac();
	}
	else {
		setTimeout(function() { doPendingPlacs(); }, (Math.floor(Math.random() * 3) + 1) * 1000);	
	}
}

function sendMessage(message) {
	logMessage(message);

	fetch("https://discord.com/api/v9/channels/" + placSettings.channel + "/messages", {
		"headers": {
			"authorization": placSettings.token,
			"content-type": "application/json"
		},
		"body": "{\"content\":\"" + message + "\"}",
		"method": "POST"
	});
}

function logMessage(message) {
	let logmessage = getFormatedCurrentTime() + " " + message;

	logSuccess("-".repeat(logmessage.length));
	logSuccess(logmessage);
	logSuccess("-".repeat(logmessage.length));
}

function getCurrentPlacs() {
	if (s == randomSec) {
		return placs.filter(plac => plac[format(h) + format(m)]).sort(() => .5 - Math.random());
	}
	else {
		return [];
	}
}

function getFormatedCurrentTime() {
	return "[" + format(h) + ":" + format(m) + ":" + format(s) + ":" + ('00' + ms.toString()).slice(-3) + "] ";	
}

function formatTime(h, m, s) {
	return "[" + format(h) + ":" + format(m) + ":" + format(s) + "] ";	
}

function format(val) {
	return ('0' + val.toString()).slice(-2);
}

function logWarn(message) {
	console.log("\x1b[33m%s\x1b[0m", message);
}

function logError(message) {
	console.log("\x1b[31m%s\x1b[0m", message);
}

function logSuccess(message) {
	console.log("\x1b[32m%s\x1b[0m", message);
}

function setNextPlac() {
	randomSec = Math.floor(Math.random() * 40) + 5;

	let d = new Date();

	h = d.getHours();
	m = d.getMinutes();

	let tempH = h;
	let tempM = m;

	if(placSettings.state == "waitingForNewMinute" || placSettings.state == "skipped")
		tempM += 1;

	for(var hodiny = tempH; hodiny < 24; hodiny++) {
		for(var minuty = tempM; minuty < 60; minuty++) {
			let filtered = placs.filter(plac => plac[format(hodiny) + format(minuty)]);

			if(filtered.length > 0) {
				nextPlac.message = Object.values(filtered[0])[0];
				nextPlac.hours = hodiny;
				nextPlac.minutes = minuty;
				return;
			}
		}
		tempM = 0;
	}
	
	nextPlac.message = "Plác";
	nextPlac.hours = 0;
	nextPlac.minutes = 0;
}

function getOdpocetNextPlac() {
	var nextPlacDate = new Date();
	nextPlacDate.setHours(nextPlac.hours);
	nextPlacDate.setMinutes(nextPlac.minutes);
	nextPlacDate.setSeconds(randomSec);

	var delta = Math.abs(nextPlacDate - d) / 1000;
	var days = Math.floor(delta / 86400);
	delta -= days * 86400;
	var hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;
	var minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;
	var seconds = delta % 60;

	return "(" + format(minutes) + "m " + format(Math.floor(seconds)) + "s)";
}

function getNextPlac() {
	return formatTime(nextPlac.hours, nextPlac.minutes, randomSec) + nextPlac.message + " " + getOdpocetNextPlac();
}

function togglePlac() {
	if(timerSettings.running) {
		logWarn("Plácání bylo zastaveno.");
	}
	else {
		setNextPlac();
		timerSettings.expected = Date.now() + timerSettings.interval;
		setTimeout(timer, timerSettings.interval);
		logWarn("Plácání bylo spuštěno.\t\tŠance na plácnutí: " + placSettings.chance + "%\t\t\t\tAktivní hodiny: " + placSettings.activeHours);
	}

	timerSettings.running = !timerSettings.running;
}

function timer() {
	if(!timerSettings.running)
		return;

    let dt = Date.now() - timerSettings.expected;

    if (dt < timerSettings.interval) {
	    checkPlac();
		console.log(getFormatedCurrentTime() + "Next: " + getNextPlac());
    }

    timerSettings.expected += timerSettings.interval;

    setTimeout(timer, Math.max(0, timerSettings.interval - dt));	
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
	if (key.ctrl && key.name === 'c') {
		process.exit();
	}

	if(key.sequence === "p") {
		console.log(placSettings);
		console.log(timerSettings);
		console.log(randomSec);
		console.log(nextPlac);
	}

	if (key.sequence === ";") {
		togglePlac();
	}
});

function init() {
	placSettings.activeHourFrom = parseInt(placSettings.activeHours.split('-')[0]);
	placSettings.activeHourTo = parseInt(placSettings.activeHours.split('-')[1]);

	togglePlac();
}

logWarn("Plácaná v1.3 by Safiron\t\tZapnutí/Vypnutí pomocí středníku (;)\t\tUkončit pomocí Ctrl+C");
init();
