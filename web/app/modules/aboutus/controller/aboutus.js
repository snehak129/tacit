(function() {
	angular.module('tacit').controller('AboutUsController', ['$scope', 'Common', 'AjaxService', function($scope, Common, AjaxService) {

		console.log('inside AboutUsController');

		function init() {
			getAboutUs();
		}

		var getAboutUs = function() {
			AjaxService.post(Common.url.getAboutUs, function(result) {
				$scope.pageContent = result;
			});
		}

		init()
	}]);
})();