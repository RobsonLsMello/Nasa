var myGeoJSONPath = 'json/custom.geo.json';
var myCustomStyle = {
    stroke: true,
    fill: true,
    color: "#fff",
    fillColor: '#fff',
    fillOpacity: 0.3
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
        
        map = L.map('map').setView([39.74739, -105], 2);
        let acessToken = "pk.eyJ1Ijoicm9ic29ubHNtZWxsbyIsImEiOiJjamRheGs5dTkzbjYxMnFxcnY4Y2V2cjdpIn0.DpOln_BahHo_3c4lFKSQYQ";
        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${acessToken}`, {
            maxZoom: 18,
            id: isSatelite ? 'robsonlsmello/ckatwkkrl0ht61ilg1v47nnt0':'robsonlsmello/ckatusa93237m1iqbdp7xyfmp',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);
    
        geojson = L.geoJson(data).addTo(map);
    
        
    
        let highlightFeature = (e) => {
            var layer = e.target;
    
            layer.setStyle({
                weight: 1,
                color: '#666',
                dashArray: '',
                fillColor: '#ff0',
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

criarMapa(false);