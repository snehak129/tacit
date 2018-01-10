(function() {
	angular.module('tacit').controller('ContactController', ['$scope', 'Common', 'AjaxService', function($scope, Common, AjaxService) {
		$scope.contact = {};
		const getContact = function() {
			AjaxService.post(Common.url.getContact, function(result) {
				$scope.contact = result;
			});
		}

		function triggerFormSubmit() {

			console.log('contact form submission handler loaded successfully');
			// bind to the submit event of our form
			var form = document.getElementById('gform');
			form.addEventListener("submit", handleFormSubmit, false);

		}

		function init() {
			triggerFormSubmit();
			getContact();
		}
		init();
	}])
})();