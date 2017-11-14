/* Author: Sneha Kulkarni*/

var app = angular.module('tacit', ['ui.router', 'angular-flexslider']);

// This sets up ui router 
app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider

	// HOME STATES AND NESTED VIEWS ========================================
		.state('home', {
		url: '/home',
		templateUrl: 'app/modules/home/view/home.html',
		controller: 'HomeController'
	})



	// ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	.state('blog', {
		url: '/blog',
		templateUrl: 'app/modules/blog/view/blog.html',
		controller: 'BlogController'
	})

	.state('aboutus', {
		url: '/aboutus',
		templateUrl: 'app/modules/aboutus/view/aboutus.html',
		controller: 'AboutUsController'
	})


	.state('works', {
			url: '',
			abstract: true,
			//template: '<div ui-view></div>',
			controller: function() {
				console.log('inside parent');
			}
		})
		.state('works.tab', {
			url: '/works',
			templateUrl: 'app/modules/works/view/works.html',
			controller: 'WorksController'
		})
		.state('works.detail', {
			url: '/works/detail',
			 params: {
            project: null
        	},
			templateUrl: 'app/modules/works/view/works.detail.html',
			controller: 'WorksDetailController'
		})

	.state('practices', {
		url: '/practices',
		templateUrl: 'app/modules/practices/view/practices.html',
		controller: 'PracticesController'
	});
});

// app.directive('flexslider', function($timeout) {

// 	return {
// 		link: function(scope, element, attrs) {

// 				 function fullScreenCarousel() {
//             var windowWidth = $(window).width();
//             var windowHeight = $(window).height();

//             if ($(window).width() > 767) {
//                 $('.hero-slider-1 .slides .js-Slide-fullscreen-height').css("height", windowHeight);
//             }
//             else {
//                 $('.hero-slider-1 .slides .js-Slide-fullscreen-height').css("height", '400px');
//             }

//              var pageSection = $('.slide-bg-image, .bg-image');
//     pageSection.each(function (indx) {

//         if ($(this).attr("data-background-img")) {
//             $(this).css("background-image", "url(" + $(this).data("background-img") + ")");
//         }
//     });

//         };

//         $timeout(function(){
// 				fullScreenCarousel();
// 			}, 1);


// 		}
// 	}
// });


//Manually Bootstrapping the application
angular.element(document).ready(function() {
	angular.bootstrap(document, ['tacit']);

});
// Added as after routing the page retains the previous scroll position
app.run(["$rootScope", "$anchorScroll" , '$state','$stateParams', function ($rootScope, $anchorScroll, $state, $stateParams) {
    $rootScope.$on("$locationChangeSuccess", function() {
                $anchorScroll();
    });
}]);



app.config(['$compileProvider', function($compileProvider) {
	$compileProvider.debugInfoEnabled(true);
}]);