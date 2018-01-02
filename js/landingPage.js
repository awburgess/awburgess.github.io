let baseMap
let worldGeoJSON

const worldColors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99',
    '#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928']

const renderBaseMap = () => {
    const layer = new L.StamenTileLayer("terrain")
    baseMap = new L.Map("landingMap", {
        center: new L.LatLng(0, 0),
        zoom: 5
    })
    baseMap.addLayer(layer)
}

const makeCountryStyle = (feature) => {
    const colorChoice = worldColors[Math.floor(Math.random() * worldColors.length)]
    return {
        fillColor: colorChoice,
        color: colorChoice,
        opacity: 0.3,
        weight: 1
    }
}

const getIsoToGecJSON = () => {
    $.getJSON('data/country_codes.json', (data) => {

    })
}

const getWorldGeoJSON = () => {
    $.getJSON('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson', (data) => {
        L.geoJson(data,
            {style: makeCountryStyle,
            onEachFeature: attributeClickHandler}
            ).addTo(baseMap)
    })
}

const attributeClickHandler = (feature, layer) => {
    layer.on('click', (e) => {
        const iso2 = feature.properties.iso_a2.toLowerCase()

        $.getJSON('data/wfb_json/' + iso2 + '.json', (data) => {
            console.log(data)
            $.get('templates/worldFactBookModal.html', (temp) => {
                const template = _.template(temp)
                $('#geoInfo').html(template({countryData: data}))
                $('#infoModal').modal('show')
            })
        })
    })
}

$(window).ready(() => {
    renderBaseMap()
    getWorldGeoJSON()
})