(function() {
	angular.module('tacit').directive('owlCarousel', ['$timeout', 'Common', function($timeout, Common) {
		return {
			restrict: 'EA',
			link: function(scope, element) {
				//let customOptions = scope.options;
				scope.initCarousel = function(element, customOptions) {
					// provide any default options you want
					//let customOptions = $(element).attr('data-options');
					// combine the two options objects
					let options = Common.carouselItems[customOptions];
					if (options) {
						$(element).owlCarousel(options);
					}
				}
			}
		};
	}])

	.directive('owlCarouselItem', ['$timeout', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				// wait for the last item in the ng-repeat then call init
				if (scope.$last) {
					let customOptions = $(element).attr('options')
					if (customOptions) {
						scope.initCarousel(element.parent(), customOptions);
					}
				}

			}
		};
	}])
})();