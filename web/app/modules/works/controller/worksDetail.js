(function() {
	angular.module('tacit').controller('WorksDetailController', ['$scope', 'AjaxService', 'Common', '$stateParams', function($scope, AjaxService, Common, $stateParams) {

		console.log('inside Works Detail Controller');


		function init() {
			
			$scope.project = $stateParams.project;

			console.log($scope.project);
			
		}
		
		init();
	}])
})();