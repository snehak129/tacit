(function() {
	angular.module('tacit').controller('BlogController', ['$scope', 'Common', 'AjaxService', 'PaginationService', function($scope, Common, AjaxService, PaginationService) {

		console.log('inside BlogController');

		function init() {
			$scope.pager = {};
			getBlog();
		}

		var getBlog = function() {
			AjaxService.post(Common.url.getBlog, function(result) {
				$scope.blog = result;
				$scope.setPage(1);
			});
		}

		$scope.setPage = function(page) {
			if (page < 1 || page > $scope.pager.totalPages) {
				return;
			}
			// get pager object from service
			$scope.pager = PaginationService.initPagination($scope.blog.projects.length, page);
			// get current page of items
			$scope.items = $scope.blog.projects.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
		}

		init();

	}]);
})();