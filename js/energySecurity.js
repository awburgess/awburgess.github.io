let energyMap;

const loadMap = () => {
    energyMap = new L.map('energyMap')
    const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	const osm = new L.TileLayer(osmUrl, {minZoom: 0,  attribution: osmAttrib})

	energyMap.setView(new L.LatLng(0, 0), 4)
	energyMap.addLayer(osm)
}


const formRow = (category, cum, rem, kwn) => {
    return "<tr>" +
            "<td>" + category + "</td>" +
            "<td>" + cum + "</td>" +
            "<td>" + rem + "</td>" +
            "<td>" + kwn + "</td>" +
        "</tr>"
}

const oilStyle = (layer) => {
    const oilRank = parseInt(layer.properties.oil_rank)

    const baseStyle = {
        "weight": 5,
        "opacity": 0.65,
        "fillOpacity": 0.65
    }

    switch (oilRank) {
        case 1:
            baseStyle.fillColor = '#d9d9d9'
            baseStyle.color = '#d9d9d9'
            break
        case 2:
            baseStyle.fillColor =  '#bdbdbd'
            baseStyle.color =  '#bdbdbd'
            break
        case 3:
            baseStyle.fillColor =  '#969696'
            baseStyle.color =  '#969696'
            break
        case 4:
            baseStyle.fillColor =  '#636363'
            baseStyle.color =  '#636363'
            break
        case 5:
            baseStyle.fillColor =  '#252525'
            baseStyle.color =  '#252525'
            break
        default:
            baseStyle.fillColor = '#f7f7f7'
            baseStyle.color = '#f7f7f7'
    }

    return baseStyle
}


const basinPopEvent = function(layer) {
    const properties = layer.feature.properties
    const cumulativeOil = properties.CUM_OIL.toString()
    const remainingOil = properties.REM_OIL.toString()
    const knownOil = properties.KWN_OIL.toString()

    const cumulativeGas = properties.CUM_GAS.toString()
    const remainingGas = properties.REM_GAS.toString()
    const knownGas = properties.KWN_GAS.toString()

    const name = properties.NAME

    return "<h4>" + name + "</h4>" +
            "<table class='table table-hover'>" +
            "<thead>" +
                "<th>Cateogry</th>" +
                "<th>Cumulative</th>" +
                "<th>Remaining</th>" +
                "<th>Known</th>" +
            "<tbody>" +
                formRow('Oil', cumulativeOil, remainingOil, knownOil) +
                formRow('Natural Gas', cumulativeGas, remainingGas, knownGas) +
            "</tbody>" +
            "</thead>" +
           "</table>"
}


const addLayer = (geojson) => {
    const layer = L.geoJSON(geojson, {style: oilStyle}).bindPopup(basinPopEvent, {maxWidth: 1000, maxHeight: 300})
    energyMap.addLayer(layer)
}

const loadData = () => {
    $.ajax({
        url: "data/reservoirs.geojson",
        dataType: "json"
    }).done(addLayer)

}

$(document).ready(() => {
    loadMap()
    loadData()
})