(function() {
	angular.module('tacit').controller('WorksController', ['$scope', 'AjaxService', 'Common', '$timeout', function($scope, AjaxService, Common, $timeout) {

		//$scope.works = {};
		console.log('inside WorksController');

		$scope.clicked = function(cat) {
			if ($scope.selectedCat) {
				$scope.selectedCat.active = "";
			}
			$scope.selectedCat = cat;
			cat.active = "active";
		}

		function init() {
			$scope.categories = Common.categories;
			$scope.selectedCat = $scope.categories[0];
			getWorks();
		}

		var getWorks = function() {
			AjaxService.post(Common.url.getWorks, function(result) {
				// $timeout(function() {
					$scope.projects = result.projects;
					$scope.works = result;

				// }, 3000)

			});
		}

		init();
	}])
})();