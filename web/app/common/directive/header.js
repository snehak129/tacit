(function() {
	angular.module('tacit').directive('headerTheme', ['$timeout', function($timeout) {

		return {
			restrict: 'EA',
			scope: {
				'slider': '='

			},

			link: function(scope, element, attrs) {
				var scope = scope;

				console.log(scope);


				function headerDarkLight_with_flexslider() {

					// var color = $('.fullscreen-carousel').find('li.flex-active-slide').attr('data-slide');
					if (scope.slider.type == 'dark-slide') {
						$('#header').addClass('header').removeClass('header-light');
						$('#header').removeClass('header-default');
					}
					if (scope.slider.type == 'light-slide') {
						$('#header').addClass('header-light').removeClass('header-dark');
						$('#header').removeClass('header-default');
					}
					if (scope.slider.type == 'default-slide') {
						$('#header').removeClass('header-dark');
						$('#header').removeClass('header-light');
						$('#header').addClass('header');
					}
				};

				if (scope && scope.slider) {

					headerDarkLight_with_flexslider();
				}


			}
		}
	}])
})();