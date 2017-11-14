(function() {

	angular.module('tacit').controller('HomeController', ['$scope', 'AjaxService', 'Common', function($scope, AjaxService, Common) {

		console.log('inside HomeController');

		$scope.slider = [{
				header: 'WELCOME TO TACIT',
				content: 'We carry a passion for inclusive design',
				type: 'light-slide',
				img: 'mazel/img/project/1-LV.png',
				index: 0
			}, {
				header: 'WELCOME TO TACIT2',
				content: 'We carry a passion for inclusive design2',
				type: 'light-slide',
				img: 'mazel/img/project/Header-mv.png',
				index: 1
			} 

		];


		function init() {
			$scope.categories = Common.categories;
			getWorks();
		}
		var getWorks = function() {
			AjaxService.post(Common.url.getWorks, function(result) {
				$scope.projects = result.projects;
			});

		}


		init();
	}]);

})();