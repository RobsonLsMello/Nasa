/*
http://localhost:2000/api/meteomatics
*/

var response = (urlStr, call) =>{   
    $.ajax({
        type: "GET",
        url: urlStr,
        dataType: 'json',           
        success: function (data) {
            call(data)
        },
        error: function (error) {
            console.log(error);
        }
    });
}