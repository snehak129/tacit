angular.module('tacit').factory('Common', function() {
	return {
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
			name: "experience",
			active: ""
		}, {
			name: "social",
			active: ""
		}, {
			name: "kids",
			active: ""
		}, {
			name: "strategy",
			active: ""
		}, {
			name: "place",
			active: ""
		}],
		url: {
			getWorks: '../data/works.json',
			getHeaders: '../data/headers.json',
			getHomeContent: '../data/home.json',
			getAboutUs: '../data/aboutus.json',
			getContact: '../data/contact.json',
			getBlog: '../data/blog.json'
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
				center: true,
				autoPlay: false,
				//autoWidth: true,
				stopOnHover: true,
				items: 3,
				itemsDesktop: [1170, 3],
				itemsDesktopSmall: [1024, 3],
				itemsTabletSmall: [768, 1],
				itemsMobile: [480, 1],
				pagination: false, // Hide pagination buttons
				navigation: false, // Hide next and prev buttons
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
			}
		}



	};
});