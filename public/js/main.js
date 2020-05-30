var myGeoJSONPath = 'json/custom.geo.json';
var myCustomStyle = {
    stroke: true,
    weight: 1,
    fill: true,
    color: "#fff",
    fillColor: '#fff',
    fillOpacity: 0
}
var map;

var criarMapa = (isSatelite) =>{
    $.getJSON(myGeoJSONPath,(data) => {
        try{
            map.remove();
        }
        catch(e){

        }
        console.log(data);
        
        map = L.map('map',{
            zoomControl: false
            //... other options
        }).setView([0, 0], 2);
        let acessToken = "pk.eyJ1Ijoicm9ic29ubHNtZWxsbyIsImEiOiJjamRheGs5dTkzbjYxMnFxcnY4Y2V2cjdpIn0.DpOln_BahHo_3c4lFKSQYQ";
        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${acessToken}`, {
            maxZoom: 18,
            minZoom:2,
            id: `robsonlsmello/${isSatelite ? 'ckatwkkrl0ht61ilg1v47nnt0':'ckau3mzng01fw1iof5aesrk3x'}`,
            tileSize: 512,

            zoomOffset: -1
        }).addTo(map);
        map.setMaxBounds(  [[-90,-180],   [90,180]]  );
        geojson = L.geoJson(data).addTo(map);
    
        
    
        let highlightFeature = (e) => {
            var layer = e.target;
    
            layer.setStyle({
                weight: 1,
                color: '#fff',
                dashArray: '',
                fillColor: '#6436d6',
                
                fillOpacity: 0.7
            });
    
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        }
        var resetHighlight = (e) => {
            geojson.resetStyle(e.target);
        }
    
        var zoomToFeature = (e) => {
            map.fitBounds(e.target.getBounds());
            console.log(e);
            console.log(e.target.feature.properties.name_long);
        }
        var onEachFeature = (feature, layer) => {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }
        geojson = L.geoJson(data, {
            clickable: true,
            style: myCustomStyle,
            onEachFeature: onEachFeature
        }).addTo(map);
    });
}

var zoomValue = 2;
/**
 * 
 * @param {*} isZoomIn 
 * @param {HTMLButtonElement} button 
 */
var darZoom = (isZoomIn, button) =>{
    if(isZoomIn+1 <= 18 || isZoomIn-1 >= 2){
        if(isZoomIn)
            zoomValue++;
        else
            zoomValue--;
        let botoes = document.getElementsByName(button.className);
        for(key in botoes){
            let botao = botoes[key];
            botao.disabled = false;
        }
    }
    else{
        button.disabled = true;
    }    
}

criarMapa(false);