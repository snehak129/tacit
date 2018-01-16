/* Author: Sneha Kulkarni*/

var app = angular.module('tacit', ['ui.router', 'angular-flexslider', 'ngSanitize']);

//Manually Bootstrapping the application
angular.element(document).ready(function() {
	angular.bootstrap(document, ['tacit']);

});


// This sets up ui router 
app.config(['$compileProvider', '$stateProvider', '$urlRouterProvider', function($compileProvider, $stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('home', {
		url: '/',
		params: {
			projects: null,
			index: null
		},
		templateUrl: 'app/modules/home/view/home.html',
		controller: 'HomeController'
	})

	// ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	// .state('blog', {
	// 	url: '/blog',
	// 	templateUrl: 'app/modules/blog/view/blog.html',
	// 	controller: 'BlogController'
	// })

	.state('aboutus', {
		url: '/aboutus',
		templateUrl: 'app/modules/aboutus/view/aboutus.html',
		controller: 'AboutUsController'
	})

	.state('works', {
		url: '/works',
		params: {
			projects: null,
			index: null
		},
		templateUrl: 'app/modules/works/view/works.html',
		controller: 'WorksController'
	})

	.state('detail', {
		url: '/works/detail/:index',
		params: {
			projects: null,
			index: null
		},
		templateUrl: 'app/modules/detail/view/detail.html',
		controller: 'DetailController'
	})

	.state('contact', {
		url: '/contact',
		templateUrl: 'app/modules/contact/view/contact.html',
		controller: 'ContactController'
	});
}]);



app.run(['$rootScope', '$anchorScroll', '$trace', '$transitions', function($rootScope, $anchorScroll, $trace, $transitions) {
	// Added as after routing the page retains the previous scroll position	
	$rootScope.$on("$locationChangeSuccess", function() {
		$anchorScroll();
	});

	//Redirect to works tab on refresh of detail tab
	$transitions.onStart({to: 'detail'}, function(trans) {
		if(trans.params().index === null){
				trans.abort();
		}
		else if (trans.params().projects === null) {
			return trans.router.stateService.target('works');
		}
	});
	//$trace.enable('TRANSITION');
}]);





