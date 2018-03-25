/* Author: Sneha Kulkarni*/

var app = angular.module('tacit', ['ui.router', 'angular-flexslider', 'ngSanitize']);

//Manually Bootstrapping the application
angular.element(document).ready(function() {
	angular.bootstrap(document, ['tacit']);

});




// This sets up ui router 
app.config(['$compileProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($compileProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
	$compileProvider.debugInfoEnabled(false);
	$urlRouterProvider.otherwise('/');
	$locationProvider.hashPrefix('');

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
	.state('search', {
		url: '/search',
		params: {
			searchValue: null
		},
		templateUrl: 'app/modules/search/view/search.html',
		controller: 'BlogController'
	})

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


	if(window.history && window.history.pushState){
            //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

         // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

         // if you don't wish to set base URL then use this
         $locationProvider.html5Mode({
                 enabled: true//,
                 //requireBase: false
          });
     }
	// $locationProvider.html5Mode(true);
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
			return trans.router.stateService.target('home');
		}
	});


	$transitions.onStart({to: 'search'}, function(trans) {
		 if (trans.params().searchValue === null) {
			return trans.router.stateService.target('home');
		}
	});
	//$trace.enable('TRANSITION');
}]);

app.filter('filterPrefix', function () {
  return function (item) {
      return item.replace(/(^\w+:|^)\/\//, '');
  };
});





