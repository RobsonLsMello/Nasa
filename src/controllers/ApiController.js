var csv = require("csvtojson");
const querystring = require('querystring');
const fs = require('fs');

var lerCsvETransformaEmJson = (data, nome) =>{
    csv()
    .fromString(data)
    .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
        
        fs.writeFile(`data/${nome}.json`, JSON.stringify(jsonArrayObj), function(erro) {
            if(erro) {
                throw erro;
            }        
            console.log("Arquivo salvo");
        }); 
     })
}

var requisicao = (url, call) =>{
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': url,
    'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic c3R1ZGVudHNfc2FudG9zOnVDUTgxRnlXYWJxSTQ='
    }
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
            call(response.body);
    });
}
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
    requisicao('https://api.meteomatics.com/2020-05-30T13:15:00ZP1D:PT1H/t_2m:C/50,10/json?model=mix', (data)=>{
        let json = JSON.parse(data);
        res.status(200).send(json.data);
    });
};

exports.fireReports = (req, res, next) => {
    requisicao('https://firms.modaps.eosdis.nasa.gov/data/active_fire/noaa-20-viirs-c2/csv/J1_VIIRS_C2_Global_24h.csv', (data) =>{
        // Convert a csv file with csvtojson
        lerCsvETransformaEmJson(data, 'fireReports');            
    });
    res.status(200).send('sucesso'); 
};

exports.fireReportsData = (req, res, next) => {
    let json = {};
    let date = req.query.date;
    let i = 0;
    fs.readFile('data/fireReports.json','utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        let queimada = []; 
        JSON.parse(data).forEach(queima => {
            if(queima.acq_date == date){
                queimada.push(queima);
            }
        });
        res.status(200).send(JSON.stringify(queimada));
    });
    
    
};

exports.covidData = (req, res, next) => {
    let json = {};
    let i = 0;
    fs.readFile('data/covid.json','utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        res.status(200).send(JSON.stringify(data));
    });
};


