(function() {
	angular.module('tacit').controller('DetailController', ['$scope', '$stateParams', function($scope, $stateParams) {

		console.log('inside Works Detail Controller');

		function init() {
			$scope.projects = $stateParams.projects;
			$scope.project = $stateParams.projects[$stateParams.index - 1];
			$scope.currentIndex = parseInt($stateParams.index);
			saveIndexes();
			console.log($scope.project);
		}

		var saveIndexes = function() {
			$scope.nextIndex = ($scope.currentIndex < $stateParams.projects.length) ? $scope.currentIndex + 1 : null;
			$scope.prevIndex = $scope.currentIndex - 1 ? $scope.currentIndex - 1 : null;
			console.log('prevIndex   ' + $scope.prevIndex);
		}

		init();
	}])
})();