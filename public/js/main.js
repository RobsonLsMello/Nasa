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
var  geojson;

var criarMapa = (isSatelite, dataSet = [], typeData = "", otherType = "") =>{
    
    $.getJSON(myGeoJSONPath,(datas) => {
        let data = datas;
        switch(typeData){
            case 'covid':
                for(key2 in data.features){
                    for(key in dataSet){
                        let dt = dataSet[key];
                        if(dt.Country == data.features[key2].properties.name_sort){
                            data.features[key2].properties.Cumulative_cases = dt.Cumulative_cases;
                            data.features[key2].properties.Cumulative_deaths = dt.Cumulative_deaths;
                        }
                    } 
                }
                
            break;
        }
        console.log(data);

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
            id: `robsonlsmello/${isSatelite ? 'ckatwkkrl0ht61ilg1v47nnt0' : 'ckau3mzng01fw1iof5aesrk3x'}`,
            tileSize: 512,

            zoomOffset: -1
        }).addTo(map);

        map.setMaxBounds(  [[-90,-180],   [90,180]]  );

        let iconDiv = "";
        switch(typeData){
            case "fire":
                iconDiv = '<i class="fas fa-fire" style="color:#e25822;font-size: 50%;"></i>';
            break;
            default:
                iconDiv = "<div style='background-color:#c30b82;' class='marker-pin'></div>";
            break;
        }
        
        
        switch(typeData){
            case 'fire':
                dataSet.forEach(dt => { 
                    let lat = 0;
                    let lon = 0;
                    switch(typeData){
                        case "fire":
                            lat = dt.latitude;
                            lon = dt.longitude;
                        break;
                        default:
                            
                        break;
                    }           
                    icon = L.divIcon({
                        className: 'custom-div-icon',
                        html: iconDiv,
                        iconSize: [30, 30],
                        iconAnchor: [0, 20]
                    });
            
                    L.marker([lat, lon], { icon: icon }).addTo(map);
                })
            break;
            case 'covid':
                var info = L.control();

                info.onAdd = function (map) {
                    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                    this.update();
                    return this._div;
                };

                // method that we will use to update the control based on feature properties passed
                info.update = function (props) {
                    this._div.innerHTML = '<h4>'+(otherType == 'cases' ? 'Cumulative Corona Cases':'Cumulative Corona Deaths')+'</h4>' +  (props ?
                        '<b>' + props.name + '</b><br />' + props.density + ''
                        : '');
                };

                info.addTo(map);

                var getColor = (d) => {
                    switch(otherType){
                        case 'cases':
                            return  d > 1000000 ? '#4d0303' :
                                    d > 400000  ? '#961313' :
                                    d > 200000  ? '#f12c2c' :
                                    d > 100000  ? '#eb3d3d' :
                                    d > 50000   ? '#e47b7b' :
                                    d > 15000   ? '#e3c4c4' :
                                    d > 10      ? '#ffeeee' :
                                          '#fff';
                        case 'death':
                            return  d > 100000 ? '#03054d' :
                                    d > 40000  ? '#1d1396' :
                                    d > 20000  ? '#2c2ef1' :
                                    d > 10000  ? '#3d50eb' :
                                    d > 5000   ? '#7b81e4' :
                                    d > 1500   ? '#c4c6e3' :
                                    d > 10     ? '#e7e8f7' :
                                          '#fff';
                    }
                    
                }
                let style = (e) => {
                    return {
                        fillColor: getColor(otherType == 'cases' ? e.properties.Cumulative_cases:e.properties.Cumulative_deaths),
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    };
                }

                var legend = L.control({position: 'topright'});

                legend.onAdd = function (map) {

                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = otherType == 'cases' ?[0, 10, 15000, 50000, 100000, 200000, 400000, 1000000] : [0, 10, 1500, 5000, 10000, 20000, 40000, 100000],
                        labels = [];
                    // loop through our density intervals and generate a label with a colored square for each interval
                    for (var i = 0; i < grades.length; i++) {
                        div.innerHTML +=
                            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                    }

                    return div;
                };

                legend.addTo(map);
                L.geoJson(data, {style: style}).addTo(map);
            break;
        }
        
        
    
        let highlightFeature = (e) => {
            //console.log(e);
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
            //console.log(e);
            //console.log(e.target.feature.properties.name_long);
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
        console.log(geojson);
    });
}
criarMapa(false);
    



/**
 * @param {*} isZoomIn 
 */
var darZoom = (isZoomIn) =>{
    map.setZoom( map.getZoom() + (isZoomIn ? 1 : -1));  
    if(map.getZoom() == 18){
        btnZoomOut.disabled = false;
        btnZoomIn.disabled = true;
    }
    if(map.getZoom() == 2){
        btnZoomOut.disabled = true;
        btnZoomIn.disabled = false;
    }
    else{
        btnZoomOut.disabled = false;
        btnZoomIn.disabled = false;
    } 
}
var isSatelite = false;

var btnGeo = document.getElementsByClassName('up');
var btnZoomOut = document.getElementById('minusBtn');
var btnZoomIn = document.getElementById('plusBtn');
var btnResize = document.getElementById('resizeBtn');
var btnPrinter = document.getElementById('printerBtn');
var btnShare = document.getElementById('shareBtn');
var btnQuestion = document.getElementById('questionBtn');

btnGeo[0].addEventListener('click', () =>{
    criarMapa(true);
    isSatelite = true;
})

btnGeo[1].addEventListener('click', () =>{
    criarMapa(false);
    isSatelite = false;
})

btnZoomOut.addEventListener('click', () =>{
    darZoom(false);
});

btnZoomIn.addEventListener('click', () =>{
    darZoom(true);
});

btnResize.addEventListener('click', () => {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {  
            document.documentElement.requestFullScreen();  
        } else if (document.documentElement.mozRequestFullScreen) {  
            document.documentElement.mozRequestFullScreen();  
        } else if (document.documentElement.webkitRequestFullScreen) {  
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
        }  
    } else {  
        if (document.cancelFullScreen) {  
            document.cancelFullScreen();  
        } else if (document.mozCancelFullScreen) {  
            document.mozCancelFullScreen();  
        } else if (document.webkitCancelFullScreen) {  
            document.webkitCancelFullScreen();  
        }  
    }  
})

btnShare.addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`);
})

btnPrinter.addEventListener('click', () => {
    window.print();
})

let botoesLaterais = document.getElementsByClassName("stylesButtons");

for(key in botoesLaterais){
    let botao = botoesLaterais[key];
    botao.addEventListener("click", () =>{
        document.querySelector(".analiseContainer").classList.add("analiseContainer-set");
    } );
}