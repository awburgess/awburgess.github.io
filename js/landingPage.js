let baseMap;

const renderBaseMap = () => {
    const layer = new L.StamenTileLayer("watercolor");
    baseMap = new L.Map("landingPage", {
        center: new L.LatLng(37.7, -122.4),
        zoom: 12,
        zoomControl:false
    });
    baseMap.addLayer(layer);
}

const backgroundPanFeatures = () => {
    /* Todo: This is the function to pan to a new lat/lon on a timer, displaying a "fancy" collection of data visualiations representing where it landed
     */
}

const populate = function

$(window).ready(() => {
    renderBaseMap();
})

