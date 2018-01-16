(function() {

	angular.module('tacit').controller('MainController', ['$scope', 'AjaxService', 'Common', '$window', function($scope, AjaxService, Common, $window) {

		console.log('inside HomeController');

		$scope.main = {};

		var getPageContent = function() {
			AjaxService.post(Common.url.getHeaders, function(result) {
				$scope.pageContent = result;
			});

		};

		// const setPreloadEvent = function() {
		// 	$scope.$on('preload', function(target, value) {
		// 		console.log(value);
		// 		$scope.main.preloader = value;
		// 		// $(window).resize();
		// 	});
		// 	$scope.$on('dataLoad', function(target, value) {
		// 		console.log(value);
		// 		$scope.main.dataLoad = value;
		// 		// $(window).resize();
		// 	});
		// }



		function init() {
			//	$scope.main.preloader = true;
			//	$scope.main.dataLoad = false;
			//	setPreloadEvent();
			//	Common.setPreloader(true);
			getPageContent();
		}

		$scope.main.redirect = function() {
			$window.open($scope.pageContent.common.storiesUrl, '_blank');
		};

		init();
	}]);

})();