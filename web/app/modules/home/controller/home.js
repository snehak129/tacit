(function() {

	angular.module('tacit').controller('HomeController', ['$rootScope', '$scope', 'AjaxService', 'Common', '$timeout', function($rootScope, $scope, AjaxService, Common, $timeout) {

		$scope.content = {};
	//	$scope.content.dataLoad = false;

		console.log('inside HomeController');
		$scope.windowHeight = $(window).height();

		function init() {
			$scope.categories = Common.categories;
			getHomeContent();
			getWorks();
		}



		// $scope.$watch('content.dataLoad', function(newValue, oldValue, scope) {
		// 	if (oldValue !== newValue) {
		// 		if (newValue === true) {
		// 			// $timeout(function() {
		// 			// 	var $container2 = $('.container-grid');
		// 			// 	$container2.isotope('reloadItems');

		// 			// 	var filterValue = $('.container-filter').attr('data-filter');
		// 			// 	$container2.isotope({
		// 			// 		filter: filterValue
		// 			// 	});
		// 			// 	//$container2.isotope('reloadItems');

		// 			// }, 200);
		// 		}
		// 	}
		// }, true);


		var getWorks = function() {
			AjaxService.post(Common.url.getWorks, function(result) {
				// $timeout(function() {
					console.log($scope);
					$scope.projects = result.projects;
					Common.setWorksObj(result);
				//	$scope.$emit('preload', false);
				//	$(window).resize();
				// }, 5000);

			});

		}
		var getHomeContent = function() {
			AjaxService.post(Common.url.getHomeContent, function(result) {
				$scope.content = result;
			});

		}

		function headerDarkLight_with_flexslider() {

			var color = $('.fullscreen-carousel').find('li.flex-active-slide').attr('data-slide');
			if (color == 'dark-slide') {
				$('#header').addClass('header').removeClass('header-light');
				$('#header').removeClass('header-default');
			}
			if (color == 'light-slide') {
				$('#header').addClass('header-light').removeClass('header-dark');
				$('#header').removeClass('header-default');
			}
			if (color == 'default-slide') {
				$('#header').removeClass('header-dark');
				$('#header').removeClass('header-light');
				$('#header').addClass('header');
			}
		};


		$scope.start = function(slider) {
			console.log(slider);
			$('body').removeClass('loading');

			// Header Dark Light
			headerDarkLight_with_flexslider();


		};

		$scope.before = function(slider) {
			$('.ang-slide').find('.intro-content-inner').fadeOut().animate({
				top: '80px'
			}, {
				queue: false,
				easing: 'easeOutQuad',
				duration: 700
			});
			slider.element.slides.eq(slider.element.currentSlide).delay(400);
			slider.element.slides.eq(slider.element.animatingTo).delay(400);
		};

		$scope.after = function(slider) {
			$('.ang-slide').find('.intro-content-inner').fadeIn(2000).animate({
				top: '0'
			}, {
				queue: false,
				easing: 'easeOutQuad',
				duration: 1200
			});
			headerDarkLight_with_flexslider();

		};


		init();
	}]);

})();