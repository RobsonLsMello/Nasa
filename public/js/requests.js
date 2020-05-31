/*
http://localhost:2000/api/meteomatics
http://localhost:2000/api/fireReportsData?date=2020-05-31
*/

var response = (urlStr, call, data = {}) =>{   
    $.ajax({
        type: "GET",
        url: urlStr,
        data: data,
        dataType: 'json',    
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },   
        success: function (data) {
            call(data)
        },
        error: function (error) {
            console.log(error);
        }
    });
}   

var fireReports = (date) =>{
    response(`http://localhost:2000/api/fireReportsData?date=${date}`,(data) =>{
        criarMapa(isSatelite, data, 'fire');
    });
}

var covid19 = (othertype) =>{
    response(`http://localhost:2000/api/covidData`,(data) =>{
        criarMapa(isSatelite, JSON.parse(data), 'covid', othertype);
    });
}
//response("http://localhost:2000/api/meteomatics", (data)=>console.log(data));