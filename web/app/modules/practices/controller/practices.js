(function() {

angular.module('tacit').controller('PracticesController', ['$scope', 'Common', 'AjaxService', function($scope, Common, AjaxService){
	
	console.log('inside PracticesController');

	function init(){
		getPractices();
	}

	var getPractices = function(){
		AjaxService.post(Common.url.getPractices, function(result) {
				$scope.pageContent = result;	
		});
	}

	init();
}])



})();