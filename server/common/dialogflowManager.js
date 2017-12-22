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

  updateIntent: function(name,UserSaysArray) {
    const projectId = 'airi-b9eae';
    const dialogflow = require('dialogflow');

    // Instantiates clients
    const intentsClient = new dialogflow.IntentsClient();
    const projectAgentPath = intentsClient.projectAgentPath(projectId);
    const request = {
      // By default training phrases are not returned. If you want training
      // phrases included in the returned intent, uncomment the line below.
      //
      parent: projectAgentPath,
    };

    intentsClient
    .listIntents(request)
    .then(responses => {
      var intents = responses[0];
      if(intents.length == 0) {
        return;
      }
      var intent = intents[0];
      for(var i = 1; i < intents.length;i++){
        intent = intents[i];
        if(intent.displayName == name) {
          break;
        }
      }
    console.log('before intent update');
    console.log(intent);

    if(!intent.trainingPhrases) {
      intent.trainingPhrases = [];
    }
    for(var i=0; i < UserSaysArray.length; i++) {
      var phrase = {
        type: 'TYPE_EXAMPLE',
        parts: []   
      };
      phrase.parts.push({text: 'aabcde'});
      intent.trainingPhrases.push(phrase);
    }


    console.log('intent found=');
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

/*

*/  
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

    intentsClient
      .createIntent(airiRequest)
      .then(responses => {
      })
      .catch(err => {
        console.error('ERROR:', err);
      });    
  }
}