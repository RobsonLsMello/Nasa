var AssistantV1 = require('ibm-watson/assistant/v1');

const assistant = new AssistantV1({
    username: 'vitor_palmarin@hotmail.com',
    password: 'Zordon*123',
    url: 'https://gateway.watsonplatform.net/assistant/api/',
    apikey:'dT6xqHdD1kW66ymYvumdU3-M9vF-MMJuZ7FjsNIFfQkh',
    version: '2018-02-16',
  });

exports.post = (req, res, next) => {
    const { text, context = {} } = req.body;
    const params = {
    input: { text },
    workspace_id:'dT6xqHdD1kW66ymYvumdU3-M9vF-MMJuZ7FjsNIFfQkh',
    context,
    };
    assistant.message(params, (err, response) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        } else {
            res.json(response);
        }
    });
};

exports.post = (req, res, next) => {}