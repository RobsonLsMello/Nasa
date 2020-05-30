var http = require("http");
const querystring = require('querystring');

exports.post = (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!');
};
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição recebida com sucesso! ${id}`);
};

exports.meteomatics = (req, res, next) => {
    
    var username = "students_santos";
    var password = "uCQ81FyWabqI4";  

    var options = {
        hostname: `api.meteomatics.com`,
        port: 80,
        path: '/2020-05-30T13:15:00ZP1D:PT1H/t_2m:C/50,10/json?model=mix',
        method: 'GET', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic c3R1ZGVudHNfc2FudG9zOnVDUTgxRnlXYWJxSTQ='
        },
        
    };
    
    var request = http.request(options, (response) => {
        response.setEncoding('utf8');
        let data = '';
        response.on('data', d => data += d);
        response.on('end', () => {
            let json = JSON.parse(data);
            res.status(200).send(json.data);
        });
    });
    
    request.on('error', (e) => {
        console.log(`Houve um erro: ${e.message}`);
    });

    request.end();
};
