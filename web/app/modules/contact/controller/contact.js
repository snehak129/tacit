(function() {
	angular.module('tacit').controller('ContactController', ['$scope', 'Common', 'AjaxService', 'SendMessageService', function($scope, Common, AjaxService, SendMessageService) {
		$scope.contact = {};
		$scope.contact.coordinates = Common.mapCoordinates;
		$scope.contact.showSuccess = false;

		const getContact = function() {
			AjaxService.post(Common.url.getContact, function(result) {
				$scope.contact = result;
			});
		}

		$scope.triggerFormSubmit = function() {
			console.log('contact form submission handler loaded successfully');
				SendMessageService.handleFormSubmit(function(data) {
					$scope.contact.showSuccess = true;
				}, Common.sendMessageUrl);

			// bind to the submit event of our form
			//var form = document.getElementById('gform');
			//form.addEventListener("submit", handleFormSubmit, false);

		}

		function init() {
			//	triggerFormSubmit();
			//var form = document.getElementById('gform');
			$("#gform").validate();
			getContact();
		}


		init();
	}])
})();