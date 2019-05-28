angular.module('tacit').factory('Common', function() {

	// let preloader = false;
	let works = null;
	return {

		getWorksObj: function() {
			return this.works;
		},

		setWorksObj: function(works) {
			this.works = works;
		},

		mapCoordinates: {
			lat: 12.918960,
			lng: 77.581122
		},

		sendMessageUrl: "https://script.google.com/macros/s/AKfycbwRXqKx-3Ncqa7eKTdpIr0E5fnBBTAAtscscWOuXjRPdWh2xD8/exec",

		// getPreloader : function(){
		// 	return this.preloader;
		// },

		// setPreloader:  function(loading){
		// 	this.preloader = loading;
		// },
		categories: [{
			name: "all",
			active: "active"
		}, {
			name: "identity",
			active: ""
		}, {
			name: "product",
			active: ""
		}, {
			name: "digital",
			active: ""
		}, {
			name: "social",
			active: ""
		}, {
			name: "packaging",
			active: ""
		}, {
			name: "strategy",
			active: ""
		}, {
			name: "book",
			active: ""
		},{
			name: "space",
			active: ""
		}],
		url: {
			getWorks: '../data/works.json',
			getHeaders: '../data/headers.json',
			getHomeContent: '../data/home.json',
			getAboutUs: '../data/aboutus.json',
			getContact: '../data/contact.json',
			getSearch: '../data/search.json'
		},

		carouselItems: {
			"testimonial-carousel": {
				autoPlay: true,
				autoHeight: true,
				stopOnHover: true,
				singleItem: true,
				slideSpeed: 350,
				pagination: true, // Show pagination buttons
				navigation: false, // Hide next and prev buttons
				navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
			},
			"image-slider": {
				navigation: true, // Show next and prev buttons
				pagination: true, // Show pagination buttons
				slideSpeed: 350,
				paginationSpeed: 400,
				singleItem: true,
				navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
				autoPlay: false,
				autoHeight: true,
				responsive: true
			},

			"team-carousel": {
               autoPlay: false,
               stopOnHover: true,
               items: 3,
               itemsDesktop: [1170, 3],
               itemsDesktopSmall: [1024, 2],
               itemsTabletSmall: [768, 1],
               itemsMobile: [480, 1],
               pagination: false,  // Hide pagination buttons
               navigation: false,  // Hide next and prev buttons
               navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
			},

			"content-carousel": {
				autoPlay: true,
				autoHeight: true,
				stopOnHover: true,
				singleItem: true,
				slideSpeed: 500,
				pagination: false, // Hide pagination buttons
				navigation: true, // Show next and prev buttons
				navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
				responsive: true
			},

			"client-carousel": {
				autoPlay: 2500,
				stopOnHover: true,
				items: 5,
				itemsDesktop: [1170, 4],
				itemsDesktopSmall: [1024, 3],
				itemsTabletSmall: [768, 2],
				itemsMobile: [480, 1],
				pagination: false, // hide pagination buttons
				navigation: false, // hide next and prev buttons
				navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
			},
			
			"item3-carousel": {
				autoPlay: false,
				stopOnHover: true,
				items: 3,
				itemsDesktop: [1170, 3],
				itemsDesktopSmall: [1024, 2],
				itemsTabletSmall: [768, 1],
				itemsMobile: [480, 1],
				pagination: true, // show pagination buttons
				navigation: true, // Show next and prev buttons
				navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
			}

		},



	};
});