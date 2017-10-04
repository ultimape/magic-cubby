/*
	timecode - a point in time
	region - a named (important?) time between two regions
		or as defined by a start timecode and a duration? (duration and end timecode can be interchangeable?)
		
		{"description": "",	"start":"",	"end":""},
		{"description": "",	"start":"",	"end":""},
		{"description": "",	"start":"",	"end":""},
		{"description": "",	"start":"",	"end":""},
	
	*/

function Timecode( ) {
	if (arguments.length == 1) {
		if(arguments[0] instanceof Array) {
			var args = arguments[0];
			this.description = args[0];
			this.start = args[1];
			this.end = args[2];
		} else {
			console.error("Timecode was passed one argument, but it was not an object of type Array");
			this.description = null;
			this.start = null;
			this.end = null;
		}
	} else {
		this.description = arguments[0];
		this.start = arguments[1];
		this.end = arguments[2];
	}
}

var timecodeList = 
{ "episode" : [
		{ "id" : 21,	"timecodes" : [ 
		{"description": "entire-show",	"start":"00:00",	"end":"04:25.599"},
		{"description": "splash",	"start": "00:00.000",	"end": "00:00.600"},
		{"description": "intro",	"start": "00:00.600",	"end": "00:04.967"},
		{"description": "segment-intro",	"start": "00:04.967",	"end": "00:08.736"},
		{"description": "segement-resposne",	"start":"00:08.736",	"end":"00:12.182"},
		{"description": "segment-body",	"start": "00:12.182",	"end": "02:35.523"},
		{"description": "separator-splash",	"start":"02:35.523",	"end":"02:36.667"},
		{"description": "Bill Wadman Winner",	"start":"02:36.667",	"end":"03:04.828"},
		{"description": "Bill Wadman New Assignment",	"start":"03:04.828",	"end":"03:27.561"},
		{"description": "Lee Hall intro",	"start":"03:27.561",	"end":"03:30.744"},
		{"description": "Animated Dream",	"start":"03:30.744",	"end":"03:54.550"},
		{"description": "separator-splash",	"start":"03:54.550",	"end":"03:54.629"},
		{"description": "bye-bye song",	"start":"03:54.629",	"end":"04:01.227"},
		{"description": "Lee Hall Animated Dream Credits",	"start":"04:01.227",	"end":"04:26.599"},
		{"description": "Hot Duck Goose",	"start":"04:26.599",	"end":"04:26.599"},
	] },
], };
