(function() {

	angular.module('tacit').controller('MainController', ['$scope', 'AjaxService', 'Common', function($scope, AjaxService, Common) {

		console.log('inside HomeController');


		var getPageContent= function() {
			AjaxService.post(Common.url.getHeaders, function(result) {
				$scope.pageContent = result;
			});

		}



		function init() {
			getPageContent();
		}
		


		init();
	}]);

})();