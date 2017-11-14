angular.module('tacit').factory('Common', function() {
	return {


		categories: [{
			name: "all",
			active : "active"
		}, {
			name: "identity",
			active : ""
		}, {
			name: "product",
			active : ""
		}, {
			name: "experience",
			active : ""
		}, {
			name: "social",
			active : ""
		}, {
			name: "kids",
			active : ""
		}, {
			name: "strategy",
			active : ""
		}, {
			name: "place",
			active : ""
		}],
		url: {
			getWorks: '/data/works.json'
		}



	};
});