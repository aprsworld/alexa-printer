//our global variables - primarily node libraries
var http       = require('http')
  , request    = require('request')
  , AlexaSkill = require('./AlexaSkill')
  , APP_ID     = 'amzn1.echo-sdk-ams.app.0f82ff69-f29c-499f-be38-74c8a1b58e45';

var resultsObj = {};
//constructor
var LabelPrinter = function(){
	AlexaSkill.call(this, APP_ID);
};
//extend the alexaSkill prototype
LabelPrinter.prototype = Object.create(AlexaSkill.prototype);
LabelPrinter.prototype.constructor = LabelPrinter;

//intent handlers
LabelPrinter.prototype.intentHandlers = {
	"printer": function(intent, session, response){
		
		handleNextPrintRequest(intent, session, response);
		
		
	},
	"AMAZON.StopIntent":function(intent, session, response){
		var speechOutput = "Ending Session";	
		response.tell(speechOutput);
	},
	"AMAZON.HelpIntent":function(intent, session, response){
		var speechOutput = "Say the name of a part number and the quantity. For example. please print two copies of six five seven three";
		var repromptOutput = "Say the name of a part and quantity that you wish to print."
		response.ask(speechOutput, repromptOutput);

	},
	"AMAZON.CancelIntent":function(intent, session, response){
		var speechOutput = "Listening for a new part number and quantity...";
		var repromptOutput = "Say the name of a part number and the quantity. For example. please print two copies of six five seven three"
		response.ask(speechOutput, repromptOutput);

	}
};



//function in charge of posting to the URL once the part number and qty are established via the voice command
var postToUrl = function(intent, session, responsetwo, callback){
	//our dynamic url
	var partNo = intent.slots.partNo.value;
	var qty =  intent.slots.qty.value;
	var printUrl = function(partNo, qty){
		//return "http://charlie.aprsworld.com/glabel/bin/?partNumber=APRS"+partNo+"&nCopies="+qty+"&printer=0";
		return "http://92068.aprsworld.com:8160/glabel/bin/?partNumber=APRS"+partNo+"&nCopies="+qty+"&printer=0";
	};
	request(printUrl(partNo, qty), function ( error, response, body) {
		//check if error
		if(error){
			resultsObj.error = error;

			return console.log('Error:', error);	
		}
		//check for 200 status code
		if(response.statusCode !== 200){
			resultsObj.statusCode = response.statusCode;

        	return console.log('Invalid Status Code Returned:', response.statusCode);
		}
		//nothing failed - print body
		console.log(body);
		if(parseInt(intent.slots.qty.value, 10) < 1 || typeof parseInt(intent.slots.qty.value, 10) === "undefined" || isNaN(parseInt(intent.slots.qty.value, 10))){
		intent.slots.qty.value = 1;	
			var speechOutput = "Printing "+intent.slots.qty.value+" copy of the label "+intent.slots.partNo.value+". You may now print another part.";
		}
		else{
			var speechOutput = "Printing "+intent.slots.qty.value+" copies of the label "+intent.slots.partNo.value+". You may now print another part.";

		}
		var repromptOut = "Say another part Number or tell me to stop.";
		responsetwo.ask(speechOutput,repromptOut);
	});
};


var handleNextPrintRequest = function(intent, session, response){	
	/*if(session.application.applicationId !== APP_ID){
		return;	
	}*/
	
	var result = postToUrl( intent,session, response , function(){
		
	});
	
	
};



//event handler that is called when a user has launched the skill but hasn’t specified which intent they want. 
LabelPrinter.prototype.eventHandlers.onLaunch = function(launchRequest, session, response){
	//var output = 'Welcome to the APRS World Label Printer. ' +
	//			 'Say the number of the part that you wish to print';
	var output = 'Welcome!';
	var reprompt = 'Which label do you wish to print?';

	response.ask(output, reprompt);
};

LabelPrinter.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
	
}
	



exports.handler = function(event, context) {
    var skill = new LabelPrinter();
    skill.execute(event, context);
};

