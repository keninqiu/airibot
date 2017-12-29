module.exports = {
  getSessionClientRequest : function(query) {
    const projectId = 'airi-b9eae'; //https://dialogflow.com/docs/agents#settings
    const sessionId = 'quickstart-session-id';
    const languageCode = 'en-US';

    // Instantiate a DialogFlow client.
    const dialogflow = require('dialogflow');
    const sessionClient = new dialogflow.SessionsClient();

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };    
    return {
      sessionClient:sessionClient,
      request:request
    };
  },

  updateIntent: function(intentName,UserSaysArray) {
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');
    const intentsClient = new dialogflow.IntentsClient();

    const request = {
      name: intentName,
    };

    return intentsClient
      .getIntent(request)
      .then(responses => {
        var intent = responses[0];




        for(var i=0; i < UserSaysArray.length; i++) {
          var phrase = {
            type: 'TYPE_EXAMPLE',
            parts: UserSaysArray[i]
          };
          intent.trainingPhrases.push(phrase);
        }

    console.log('updated intent');
    console.log(intent);

        const updateIntentRequest = {
          intent: intent,
        };      
      intentsClient
        .updateIntent(updateIntentRequest)
        .then(responses => {
        })
        .catch(err => {
          console.error('ERROR:', err);
        });        
        




      })
      .catch(err => {
        console.error(`Failed to get intent ${intent.displayName}`, err);
      });


  },

  deleteIntent:function(name) {
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const intentsClient = new dialogflow.IntentsClient();

  const request = {name: name};

  // Send the request for retrieving the intent.
  return intentsClient
    .deleteIntent(request)
    .then(() => {
      console.log(`Intent ${intent.displayName} deleted`);
    })
    .catch(err => {
      console.error(`Failed to delete intent ${intent.displayName}:`, err);
    });
  },
  createIntent: function(name) {
    const projectId = 'airi-b9eae';
    const dialogflow = require('dialogflow');
    const contextsClient = new dialogflow.ContextsClient();
    const intentsClient = new dialogflow.IntentsClient();
    const agentPath = intentsClient.projectAgentPath(projectId);


    const airiInputContexts = [
      contextsClient.contextPath(projectId, '*' /* sessionId */, 'airi_intent'),
    ];

    const airiResult = {};

    const airiPhrases = [];

    const airiIntent = {
      displayName: name,
      webhookState: 'WEBHOOK_STATE_DISABLED',
      trainingPhrases: airiPhrases,
      inputContexts: airiInputContexts,
      mlEnabled: true,
      priority: 500000,
      result: airiResult,
    };

    const airiRequest = {
      parent: agentPath,
      intent: airiIntent,
    };

    return intentsClient
      .createIntent(airiRequest);
    /*
      .then(responses => {
        console.log('response from createIntent');
        console.log(responses);
        var intent = responses[0];
        return intent.name;
      })
      .catch(err => {
        console.error('ERROR:', err);
      });  
    */  
  }
}