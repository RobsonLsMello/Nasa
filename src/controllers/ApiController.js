var http = require("http");

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

exports.get = (req, res, next) => {
      
    var username = "students_santos";
    var password = "uCQ81FyWabqI4";  
    var options = {
        hostname: `${username}:${password}@api.meteomatics.com`,
        port: 80,
        path: '/2020-05-30T13:15:00ZP1D:PT1H/t_2m:C/50,10/json?model=mix',
        method: 'GET', // <--- aqui podes escolher o método
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            //'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    var req2 = http.request(options, (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            console.log('Terminado! Data:', data);
        });
    });
    
    req2.on('error', (e) => {
        console.log(`Houve um erro: ${e.message}`);
    });
    
    // aqui podes enviar data no POST
    //req2.write();
    req2.end();
    //console.log(req2);
};