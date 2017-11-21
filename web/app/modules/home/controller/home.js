(function() {

	angular.module('tacit').controller('HomeController', ['$rootScope','$scope', 'AjaxService', 'Common', function($rootScope, $scope, AjaxService, Common) {

		console.log('inside HomeController');	

		function init() {
			$scope.categories = Common.categories;
			getHomeContent();
			getWorks();
		}
		var getWorks = function() {
			AjaxService.post(Common.url.getWorks, function(result) {
				$scope.projects = result.projects;
			});

		}
		var getHomeContent = function() {
			AjaxService.post(Common.url.getHomeContent, function(result) {
				$scope.content = result;
			});

		}

		

		init();
	}]);

})();