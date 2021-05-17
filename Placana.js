var staticTypes = {
	"0430": "Vltava plác",
	"0500": "Říp plác",
	"0700": "Zrcadlový plác",
	"0810": "Zrcadlový plác",
	"0920": "Zrcadlový plác",
	"1030": "Zrcadlový plác",
	"1134": "Labe plác",
	"1323": "Lysá hora plác",
	"1348": "Založení Karlovy univerzity plác",
	"1357": "Založení Karlova mostu plác",
	"1415": "Upálení mistra Jana Husa plác",
	"1424": "Kralický sněžník plac",
	"1531": "Praděd plác",
	"1603": "Sněžka plác",
	"1620": "Bílá hora plác",
	"1701": "Zrcadlový plác",
	"1811": "Zrcadlový plác",
	"1921": "Zrcadlový plác",
	"2031": "Zrcadlový plác",
	"2119": "Převrácený zrcadlový plác",
};

var timer = null;

function GetPlacByTime() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();

    if(h == m && s == 1){
    	sendMessage("Plác", h, m);
    }

    if(h*2 == m && !(h == 0 && m == 0) && s == 1){
    	sendMessage("Minuty dvakrát plác", h, m);
    }

    if(h == m*2 && !(h == 0 && m == 0) && s == 1){
    	sendMessage("Hodiny dvakrát plác", h, m);
    }

    if(('0' + h.toString()).slice(-2) == ('0' + m.toString()).slice(-2).split("").reverse().join("") && s == 1) {
    	sendMessage("Zrcadlový plác", h, m);
    }

    if(isPostupka(h, m) && s == 1) {
    	sendMessage("Postupka plác", h, m);
    }

    if(staticTypes[('0' + h.toString()).slice(-2) + ('0' + m.toString()).slice(-2)] && s == 1){
    	sendMessage(staticTypes[('0' + h.toString()).slice(-2) + ('0' + m.toString()).slice(-2)], h, m);
    }
}

function toggleTimer() {
	if(timer == null){
		timer = setInterval(GetPlacByTime, 1000);
		console.log("Timer started ID: " + timer);
	}
	else {
		clearInterval(timer)
		timer = null;
		console.log("Timer stopped");
	}
}

function isPostupka(h, m) {
	var postupkaPole = (('0' + h.toString()).slice(-2) + ('0' + m.toString()).slice(-2)).split("")
	for(var i = 0; i < postupkaPole.length - 1; i++) {
	    if(!((parseInt(postupkaPole[i]) + 1) == parseInt(postupkaPole[i + 1]))){
	        return false;
	    }
	}

	return true;
}

function sendMessage(message, h, m) {
	console.log("[" + h + ":" + m + "] " + message);

	fetch("https://discord.com/api/v9/channels/CHANNELID/messages", {
	  "headers": {
	    "accept": "*/*",
	    "accept-language": "cs",
	    "authorization": "AUTH-TOKEN",
	    "content-type": "application/json",
	    "sec-fetch-dest": "empty",
	    "sec-fetch-mode": "cors",
	    "sec-fetch-site": "same-origin",
	    "x-super-properties": "TOKEN"
	  },
	  "referrer": "https://discord.com/channels/GUILDID/CHANNELID",
	  "referrerPolicy": "no-referrer-when-downgrade",
	  "body": "{\"content\":\"" + message + "\",\"tts\":false}",
	  "method": "POST",
	  "mode": "cors",
	  "credentials": "include"
	});
}

