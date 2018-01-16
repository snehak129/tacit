

function init() {
    var mapOptions = {
        zoom: 15,
        scrollwheel: false, //set to true to enable mouse scrolling while inside the map area
        center: new google.maps.LatLng(12.918960, 77.581122), 
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(12.918960, 77.581122),
        map: map,
        title: 'Tacit',
        icon: 'mazel/img/map-marker.png'

    });
};
