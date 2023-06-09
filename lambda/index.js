/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to the Strands Bank Application. Can I help you with anything?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const consultIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultIntent';
    },
    async handle(handlerInput) {
    let query = null;
    let outputSpeech = 'I did not hear you correctly, Can you repeat?';  
    if ((handlerInput.requestEnvelope.request.intent.slots.query.value).length > 0) {   
        query = encodeURIComponent(handlerInput.requestEnvelope.request.intent.slots.query.value);
    }
    if(query) {
        await getRemoteData('http://example.com/consultai/'+query)
          .then((response) => {  
            outputSpeech = JSON.parse(response);
         })  
         .catch((err) => {  
            console.log(`ERROR: ${err.message}`);  
        });  
    }
  
    return handlerInput.responseBuilder  
      .speak(outputSpeech)
      .reprompt()
      .getResponse();  
    }
};

const alertIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'alertIntent';
    },
    async handle(handlerInput) {
        let query = null;
        let outputSpeech = 'I am having trouble connecting to the API. This is a typical live demo problem.';
        await getRemoteData('http://example.com/alerts')
          .then((response) => {  
            outputSpeech = JSON.parse(response);
         })  
         .catch((err) => {  
            console.log(`ERROR: ${err.message}`);  
        });
  
    return handlerInput.responseBuilder  
      .speak(outputSpeech)
      .reprompt()
      .getResponse();  
    }
};


const transactionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'transactionIntent';
    },
    async handle(handlerInput) {
        let query = null;
        let outputSpeech = 'I am having trouble connecting to the API. This is a typical live demo problem.';
        await getRemoteData('http://example.com/simplified/transaction')
          .then((response) => {  
            outputSpeech = JSON.parse(response);
         })  
         .catch((err) => {  
            console.log(`ERROR: ${err.message}`);  
        });
  
    return handlerInput.responseBuilder  
      .speak(outputSpeech)
      .reprompt()
      .getResponse();  
    }
};

const endMonthIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'endMonthIntent';
    },
    async handle(handlerInput) {
        let query = null;
        let outputSpeech = 'I am having trouble connecting to the API. This is a typical live demo problem.';
        await getRemoteData('http://example.com/transactions/month/current')
          .then((response) => {  
            outputSpeech = JSON.parse(response);
         })  
         .catch((err) => {  
            console.log(`ERROR: ${err.message}`);  
        });
  
    return handlerInput.responseBuilder  
      .speak(outputSpeech)
      .reprompt()
      .getResponse();  
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thank you for using Strand bank application!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Can you repeat? I did not understand`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const getRemoteData = (url) => new Promise((resolve, reject) => {  
  const client = url.startsWith('https') ? require('https') : require('http');  
  const request = client.get(url, (response) => {  
    if (response.statusCode < 200 || response.statusCode > 299) {  
      reject(new Error(`Failed with status code: ${response.statusCode}`));  
    }  
    const body = [];  
    response.on('data', (chunk) => body.push(chunk));  
    response.on('end', () => resolve(body.join('')));  
  });  
  request.on('error', (err) => reject(err));  
});

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        consultIntentHandler,
        transactionIntentHandler,
        alertIntentHandler,
        endMonthIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();