(function() {

	angular.module('tacit').controller('MainController', ['$scope', 'AjaxService', 'Common', '$window', '$state', function($scope, AjaxService, Common, $window, $state) {

		console.log('inside HomeController');
		$scope.main = {};
		//let transitions = $transitions;

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

		$scope.onsearch = function(searchValue) {

			$state.go('blog', { 'searchValue': searchValue});
			$('.search-overlay-menu').removeClass('open');
		}

		init();
	}]);

})();