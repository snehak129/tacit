(function() {

	angular.module('tacit').directive('mapDir', ['$timeout', 'Common', '$window', function($timeout, Common, $window) {
		return {
			restrict: 'A',
			scope: {
				coordinates: '='
			},
			link: function(scope, element) {
				if (scope.coordinates) {
					init(scope.coordinates);
				}

				function init(coordinates) {
					var mapOptions = {
						zoom: 15,
						scrollwheel: false, //set to true to enable mouse scrolling while inside the map area
						center: new google.maps.LatLng(coordinates.lat, coordinates.lng),
						// styles: [
						// {
						//     "featureType": "water",
						//     "elementType": "geometry.fill",
						//     "stylers": [
						//         {
						//             "color": "#d3d3d3"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "transit",
						//     "stylers": [
						//         {
						//             "color": "#808080"
						//         },
						//         {
						//             "visibility": "off"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road.highway",
						//     "elementType": "geometry.stroke",
						//     "stylers": [
						//         {
						//             "visibility": "on"
						//         },
						//         {
						//             "color": "#b3b3b3"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road.highway",
						//     "elementType": "geometry.fill",
						//     "stylers": [
						//         {
						//             "color": "#ffffff"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road.local",
						//     "elementType": "geometry.fill",
						//     "stylers": [
						//         {
						//             "visibility": "on"
						//         },
						//         {
						//             "color": "#ffffff"
						//         },
						//         {
						//             "weight": 1.8
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road.local",
						//     "elementType": "geometry.stroke",
						//     "stylers": [
						//         {
						//             "color": "#d7d7d7"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "poi",
						//     "elementType": "geometry.fill",
						//     "stylers": [
						//         {
						//             "visibility": "on"
						//         },
						//         {
						//             "color": "#ebebeb"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "administrative",
						//     "elementType": "geometry",
						//     "stylers": [
						//         {
						//             "color": "#a7a7a7"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road.arterial",
						//     "elementType": "geometry.fill",
						//     "stylers": [
						//         {
						//             "color": "#ffffff"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road.arterial",
						//     "elementType": "geometry.fill",
						//     "stylers": [
						//         {
						//             "color": "#ffffff"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "landscape",
						//     "elementType": "geometry.fill",
						//     "stylers": [
						//         {
						//             "visibility": "on"
						//         },
						//         {
						//             "color": "#efefef"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road",
						//     "elementType": "labels.text.fill",
						//     "stylers": [
						//         {
						//             "color": "#696969"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "administrative",
						//     "elementType": "labels.text.fill",
						//     "stylers": [
						//         {
						//             "visibility": "on"
						//         },
						//         {
						//             "color": "#737373"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "poi",
						//     "elementType": "labels.icon",
						//     "stylers": [
						//         {
						//             "visibility": "off"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "poi",
						//     "elementType": "labels",
						//     "stylers": [
						//         {
						//             "visibility": "off"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road.arterial",
						//     "elementType": "geometry.stroke",
						//     "stylers": [
						//         {
						//             "color": "#d6d6d6"
						//         }
						//     ]
						// },
						// {
						//     "featureType": "road",
						//     "elementType": "labels.icon",
						//     "stylers": [
						//         {
						//             "visibility": "off"
						//         }
						//     ]
						// },
						// {},
						// {
						//     "featureType": "poi",
						//     "elementType": "geometry.fill",
						//     "stylers": [
						//         {
						//             "color": "#dadada"
						//         }
						//     ]
						// }
						// ]
					};
					var mapElement = document.getElementById('map');
					var map = new google.maps.Map(mapElement, mapOptions);
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
						map: map,
						title: 'Tacit',
						icon: 'mazel/img/map-marker.png'

					});
				};

				// $window.resize(function(){
				// 	if(map){
				// 	 var center = map.getCenter();
				// 	 map.setCenter(center);
				// 	}

				// })

				
 				//google.maps.event.trigger(map, "resize");
 					

			}
		};
	}])

})();