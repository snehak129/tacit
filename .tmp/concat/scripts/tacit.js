/* Author: Sneha Kulkarni*/

var app = angular.module('tacit', ['ui.router', 'angular-flexslider']);

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

	.state('practices', {
		url: '/practices',
		templateUrl: 'app/modules/practices/view/practices.html',
		controller: 'PracticesController'
	});
}]);



app.run(['$rootScope', '$anchorScroll', '$trace', '$transitions', function($rootScope, $anchorScroll, $trace, $transitions) {
	// Added as after routing the page retains the previous scroll position	
	$rootScope.$on("$locationChangeSuccess", function() {
		$anchorScroll();
	});

	//Redirect to works tab on refresh of detail tab
	$transitions.onStart({to: 'detail'}, function(trans) {
debugger;
		if(trans.params().index === null){
				trans.abort();
		}
		else if (trans.params().projects === null) {
			return trans.router.stateService.target('works');
		}
	});
	//$trace.enable('TRANSITION');
}]);






angular.module('tacit').factory('AjaxService', ['$http', function($http) {
  return {
    post: function(url, callback) {
      //return the promise directly.
      var promise = $http({
        method: 'GET',
        transformRequest: angular.identity,
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function successCallback(response) {
        console.log(response.data);
        var data = response.data;
        return callback(data);
                  //  return 
          // this callback will be called asynchronously
          // when the response is available
      }, function errorCallback(response) {
        console.log(response);
        //  return 
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
  }
}]);
angular.module('tacit').factory('Common', function() {
	return {
		categories: [{
			name: "all",
			active: "active"
		}, {
			name: "identity",
			active: ""
		}, {
			name: "product",
			active: ""
		}, {
			name: "experience",
			active: ""
		}, {
			name: "social",
			active: ""
		}, {
			name: "kids",
			active: ""
		}, {
			name: "strategy",
			active: ""
		}, {
			name: "place",
			active: ""
		}],
		url: {
			getWorks: '../data/works.json',
			getHeaders: '../data/headers.json',
			getHomeContent: '../data/home.json',
			getAboutUs: '../data/aboutus.json',
			getPractices: '../data/practices.json',
			getBlog : '../data/blog.json'
		}
	};
});
(function() {
  angular.module('tacit').factory('PaginationService', function() {
    return {
      initPagination: function(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;   // can be configured
        //totalItems = $scope.blog.projects.length || 0;
        totalPages = Math.ceil(totalItems / pageSize);
        let startPage =null, endPage = null;

        if (totalPages <= 10) {
          startPage = 1;
          endPage = totalPages;
        } else {

          if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
          } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
          }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [];

        for (var i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        // return object with all pager properties required by the view
        return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: pages
        };

      }
    }
  })
})();
(function() {

	angular.module('tacit').controller('MainController', ['$scope', 'AjaxService', 'Common', function($scope, AjaxService, Common) {

		console.log('inside HomeController');


		var getPageContent= function() {
			AjaxService.post(Common.url.getHeaders, function(result) {
				$scope.pageContent = result;
			});

		}



		function init() {
			getPageContent();
		}
		


		init();
	}]);

})();
(function() {

	angular.module('tacit').controller('HomeController', ['$rootScope','$scope', 'AjaxService', 'Common', function($rootScope, $scope, AjaxService, Common) {

		console.log('inside HomeController');	

		function init() {
			$scope.categories = Common.categories;
			getHomeContent();
			getWorks();
		}
		var getWorks = function() {
			AjaxService.post(Common.url.getWorks, function(result) {
				$scope.projects = result.projects;
			});

		}
		var getHomeContent = function() {
			AjaxService.post(Common.url.getHomeContent, function(result) {
				$scope.content = result;
			});

		}

		

		init();
	}]);

})();
(function() {
	angular.module('tacit').controller('AboutUsController', ['$scope', 'Common', 'AjaxService', function($scope, Common, AjaxService) {

		console.log('inside AboutUsController');

		function init() {
			getAboutUs();
		}

		var getAboutUs = function() {
			AjaxService.post(Common.url.getAboutUs, function(result) {
				$scope.pageContent = result;
			});
		}

		init()
	}]);
})();
(function() {
	angular.module('tacit').controller('BlogController', ['$scope', 'Common', 'AjaxService', 'PaginationService', function($scope, Common, AjaxService, PaginationService) {

		console.log('inside BlogController');

		function init() {
			$scope.pager = {};
			getBlog();
		}

		var getBlog = function() {
			AjaxService.post(Common.url.getBlog, function(result) {
				$scope.blog = result;
				$scope.setPage(1);
			});
		}

		$scope.setPage = function(page) {
			if (page < 1 || page > $scope.pager.totalPages) {
				return;
			}
			// get pager object from service
			$scope.pager = PaginationService.initPagination($scope.blog.projects.length, page);
			// get current page of items
			$scope.items = $scope.blog.projects.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
		}

		init();

	}]);
})();
(function() {
	angular.module('tacit').controller('WorksController', ['$scope', 'AjaxService', 'Common', function($scope, AjaxService, Common) {


		console.log('inside WorksController');

		$scope.clicked = function(cat) {
			if ($scope.selectedCat) {
				$scope.selectedCat.active = "";
			} 
				$scope.selectedCat = cat;
				cat.active = "active";		
		}

		function init() {	
			$scope.categories = Common.categories;
			$scope.selectedCat = $scope.categories[0];
			getWorks();
		}

		var getWorks = function() {
			AjaxService.post(Common.url.getWorks, function(result) {
				$scope.projects = result.projects;	
				//$scope.$parent.projects = angular.copy($scope.projects);
			});
		}
		
		init();
	}])
})();
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
(function() {
    angular.module('tacit').directive('flexslider', ['$timeout', function($timeout) {

        return {
            link: function(scope, element, attrs) {

                $(window).load(function() {

                    // SITE PRELOADER                     ||----------- 

                    $('#loader').fadeOut();
                    $('#preloader').delay(350).fadeOut('slow');
                    $('body').delay(350).css({
                        'overflow': 'visible'
                    });

                    // Portfolio Grid Masonry
                    containerGridMasonry();
                })


                // ---------------------------------------------------------------------------------------------------------------------------->
                // GENERAL SCRIPTS FOR ALL PAGES    ||----------- 
                // ---------------------------------------------------------------------------------------------------------------------------->

                $(document).ready(function() {


                });


                $(window).resize(function() {
                    stickHeader();
                    int_introHeight();
                })


                $(window).scroll(function() {
                    stickHeader();
                });

                // ---------------------------------------------------------------------------------------------------------------------------->
                // SCROLL FUNCTIONS   ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->

                function scroll() {

                    // //Click Event to Scroll to Top
                    $(window).scroll(function() {
                        if ($(this).scrollTop() > 300) {
                            $('.scroll-top').fadeIn();
                        } else {
                            $('.scroll-top').fadeOut();
                        }


                    });
                    $('.scroll-top').click(function() {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 800);
                        return false;
                    });

                    // Scroll Down Elements
                    $('.scroll-down[href^="#"], .scroll-to-target[href^="#"]').on('click', function(e) {
                        e.preventDefault();

                        var target = this.hash;
                        var $target = $(target);

                        $('html, body').stop().animate({
                            'scrollTop': $target.offset().top
                        }, 900, 'swing', function() {
                            window.location.hash = target;
                        });
                    });

                };


                // ---------------------------------------------------------------------------------------------------------------------------->
                // STICKY HEADER FUNCTIONS   ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->
                function stickHeader() {

                    var scrolled = $(window).scrollTop();
                    var windHeight = $(window).height();
                    if (scrolled > 150) {
                        $('.header').addClass('header-prepare');
                    } else {
                        $('.header').removeClass('header-prepare');
                    }

                    if (scrolled > 1) {
                        $('.header').addClass('header-fixed');
                    } else {
                        $('.header').removeClass('header-fixed');
                    }
                };

                // ----------------------------------------------------------------
                // Intro Height
                // ----------------------------------------------------------------
                function int_introHeight() {
                    var windiwHeight = $(window).height();
                    // Intro Height
                    $('.js-fullscreen-height').css('height', windiwHeight);
                };



                // ---------------------------------------------------------------------------------------------------------------------------->
                // FULLSCREEN SLIDER FUNCTIONS  ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->
                function fullScreenSlider() {
                    if ($('.fullscreen-carousel').length > 0) {

                        $('.fullscreen-carousel').flexslider({
                            animation: "slide",
                            //  startAt: 0,
                            animationSpeed: 700,
                            animationLoop: true,
                            slideshow: true,
                            easing: "swing",
                            controlNav: false,
                            before: function(slider) {
                                //Slide Caption Animate
                                $('.fullscreen-carousel .intro-content-inner').fadeOut().animate({
                                    top: '80px'
                                }, {
                                    queue: false,
                                    easing: 'easeOutQuad',
                                    duration: 700
                                });
                                slider.slides.eq(slider.currentSlide).delay(400);
                                slider.slides.eq(slider.animatingTo).delay(400);

                            },
                            after: function(slider) {
                                //Slide Caption Animate
                                $('.fullscreen-carousel .flex-active-slide').find('.intro-content-inner').fadeIn(2000).animate({
                                    top: '0'
                                }, {
                                    queue: false,
                                    easing: 'easeOutQuad',
                                    duration: 1200
                                });

                                // Header Dark Light
                                headerDarkLight_with_flexslider();

                            },
                            start: function(slider) {
                                $('body').removeClass('loading');

                                // Header Dark Light
                                headerDarkLight_with_flexslider();

                            },
                            useCSS: true,
                        });
                    };

                    // Header Dark Light
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

                    // "fullscreen-carousel" height
                    fullScreenCarousel();

                    function fullScreenCarousel() {
                        var windowWidth = $(window).width();
                        var windowHeight = $(window).height();

                        console.log(windowHeight);
                        console.log(windowWidth);

                        if ($(window).width() > 767) {
                            $('.hero-slider-1 .slides .js-Slide-fullscreen-height').css("height", windowHeight);
                        } else {
                            $('.hero-slider-1 .slides .js-Slide-fullscreen-height').css("height", '400px');
                        }

                    };
                    $(window).resize(function() {
                        fullScreenCarousel();
                    });


                };

                // ---------------------------------------------------------------------------------------------------------------------------->
                // SLIDER FUNCTIONS   ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->

                function sliderAll() {

                    // fullwidth Slider
                    $('.fullwidth-slider').owlCarousel({
                        slideSpeed: 400,
                        singleItem: true,
                        autoHeight: true,
                        navigation: true, // Show next and prev buttons
                        pagination: true, // Show pagination buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],

                    });

                    // Image Slider
                    $('.image-slider').owlCarousel({
                        navigation: true, // Show next and prev buttons
                        pagination: true, // Show pagination buttons
                        slideSpeed: 350,
                        paginationSpeed: 400,
                        singleItem: true,
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                        autoPlay: false,
                        autoHeight: true,
                        responsive: true
                    });

                    // Testimonial Slider
                    $('.testimonial-carousel').owlCarousel({
                        autoPlay: true,
                        autoHeight: true,
                        stopOnHover: true,
                        singleItem: true,
                        slideSpeed: 350,
                        pagination: true, // Show pagination buttons
                        navigation: false, // Hide next and prev buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                        //  responsive: true
                    });

                    // Team Carousel
                    $('.team-carousel').owlCarousel({
                        autoPlay: false,
                        stopOnHover: true,
                        items: 3,
                        itemsDesktop: [1170, 3],
                        itemsDesktopSmall: [1024, 2],
                        itemsTabletSmall: [768, 1],
                        itemsMobile: [480, 1],
                        pagination: false, // Hide pagination buttons
                        navigation: false, // Hide next and prev buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                    });

                    // Client Carousel
                    $('.client-carousel').owlCarousel({
                        autoPlay: 2500,
                        stopOnHover: true,
                        items: 5,
                        itemsDesktop: [1170, 4],
                        itemsDesktopSmall: [1024, 3],
                        itemsTabletSmall: [768, 2],
                        itemsMobile: [480, 1],
                        pagination: false, // hide pagination buttons
                        navigation: false, // hide next and prev buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                    });

                    // Content Slider
                    $('.content-carousel').owlCarousel({
                        autoPlay: true,
                        autoHeight: true,
                        stopOnHover: true,
                        singleItem: true,
                        slideSpeed: 500,
                        pagination: false, // Hide pagination buttons
                        navigation: true, // Show next and prev buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                        responsive: true
                    });

                    // Item-5 Carousel
                    $('.item5-carousel').owlCarousel({
                        autoPlay: 2500,
                        stopOnHover: true,
                        items: 5,
                        itemsDesktop: [1170, 3],
                        itemsDesktopSmall: [1024, 2],
                        itemsTabletSmall: [768, 1],
                        itemsMobile: [480, 1],
                        pagination: true, // Show pagination buttons
                        navigation: true, // Show next and prev buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                    });

                    // Item-4 Carousel
                    $('.item4-carousel').owlCarousel({
                        autoPlay: 2500,
                        stopOnHover: true,
                        items: 4,
                        itemsDesktop: [1170, 3],
                        itemsDesktopSmall: [1024, 2],
                        itemsTabletSmall: [768, 1],
                        itemsMobile: [480, 1],
                        pagination: false, // Hide pagination buttons
                        navigation: true, // Show next and prev buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                    });

                    // Item-3 Carousel
                    $('.item3-carousel').owlCarousel({
                        autoPlay: false,
                        stopOnHover: true,
                        items: 3,
                        itemsDesktop: [1170, 3],
                        itemsDesktopSmall: [1024, 2],
                        itemsTabletSmall: [768, 1],
                        itemsMobile: [480, 1],
                        pagination: true, // show pagination buttons
                        navigation: true, // Show next and prev buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                    });

                    // Item-1 Carousel
                    $('.item1-carousel').owlCarousel({
                        autoPlay: false,
                        autoHeight: true,
                        stopOnHover: true,
                        singleItem: true,
                        slideSpeed: 350,
                        pagination: true, // Show pagination buttons
                        navigation: true, // Show next and prev buttons
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                        responsive: true
                    });

                };



                // ---------------------------------------------------------------------------------------------------------------------------->
                // SLIDER-HERO FUNCTIONS   ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->

                function sliderHero() {

                    $('.slider-hero').owlCarousel({
                        navigation: true, // Show next and prev buttons
                        slideSpeed: 700,
                        paginationSpeed: 400,
                        pagination: true,
                        addClassActive: true,

                        touchDrag: true,
                        singleItem: true,
                        navigationText: false,
                        autoPlay: false,
                        autoHeight: false,

                        //responsive: true,
                        //itemsDesktop: [3000, 1],
                        //itemsDesktopSmall: [1440, 1],
                        //itemsTablet: [1024, 1],
                        //itemsTabletSmall: [600, 1],
                        //itemsMobile: [360, 1],

                        beforeMove: beforeMove,
                        afterMove: afterMove,
                        afterInit: afterInit

                    });

                    function beforeMove() {
                        $('.slider-hero .overlay-hero .caption-hero').fadeOut(1);

                    }

                    function afterMove() {
                        $('.slider-hero .owl-item.active ').find('.caption-hero').delay(500).fadeIn(1500);
                        BackgroundCheck.refresh();

                    }

                    function afterInit() {
                        $('.slider-hero .owl-item.active ').find('.caption-hero').delay(500).fadeIn(1500);
                        BackgroundCheck.init({
                            targets: '.full-intro',
                            images: '.owl-carousel .item img',

                        });

                    }

                    $(window).height(function() {
                        heroResize();

                        function heroResize() {
                            var windowHeight = $(window).innerHeight();
                            $('.slider-hero, .full-screen-intro').css('height', windowHeight);
                        };
                        $(window).resize(function() {
                            heroResize();
                        });
                    });

                };



                // ---------------------------------------------------------------------------------------------------------------------------->
                // PLUGIN MEDIA FUNCTIONS  ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->

                function pluginElement() {

                    // Media Player Elements
                    videoElement();

                    function videoElement() {
                        $('.video').mediaelementplayer({
                            loop: true,
                            enableKeyboard: false,
                            iPadUseNativeControls: false,
                            pauseOtherPlayers: false,
                            iPhoneUseNativeControls: false,
                            AndroidUseNativeControls: false,
                            enableAutosize: true
                        });
                        $('.bg-video').mediaelementplayer({
                            loop: true,
                            enableKeyboard: false,
                            iPadUseNativeControls: false,
                            pauseOtherPlayers: false,
                            iPhoneUseNativeControls: false,
                            AndroidUseNativeControls: false,
                            enableAutosize: true,
                            alwaysShowControls: false,
                        });

                        $('.audio').mediaelementplayer({
                            audioWidth: '100%',
                            pauseOtherPlayers: false,
                        });
                    };

                    // Responsive Media Elements
                    $(".video, .audio, .post-media, .post-media iframe").fitVids();



                };


                // ---------------------------------------------------------------------------------------------------------------------------->
                // CONTAINER GRID & MESONRY FUNCTIONS (Portfolio, blog, etc)   ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->

                function containerGridMasonry() {

                    // Gria Element

                    // ISOTOPE MASONRY ELEMENT  ||--------------
                    var $container = $('.container-masonry');
                    $container.imagesLoaded(function() {
                        $container.isotope({
                            itemSelector: '.nf-item',
                            layoutMode: 'masonry',
                            masonry: {
                                columnWidth: 0,
                                gutter: 0
                            },
                        });
                    });

                    // bind filter button click
                    $('.container-filter').on('click', '.categories', function() {
                        var filterValue = $(this).attr('data-filter');
                        $container.isotope({
                            filter: filterValue
                        });
                    });

                    // ISOTOPE GRID ELEMENT  ||--------------
                    var $container2 = $('.container-grid');
                    $container2.imagesLoaded(function() {
                        $container2.isotope({
                            itemSelector: '.nf-item',
                            layoutMode: 'fitRows'
                        });
                    });

                    // bind filter categories click
                    $('.container-filter').on('click', '.categories', function() {
                        var filterValue = $(this).attr('data-filter');
                        $container2.isotope({
                            filter: filterValue
                        });
                    });

                    // change active class on categories
                    $('.categories-filter').each(function(i, buttonGroup) {
                        var $buttonGroup = $(buttonGroup);
                        $buttonGroup.on('click', '.categories', function() {
                            $buttonGroup.find('.active').removeClass('active');
                            $(this).addClass('active');
                        });

                    });


                    // Masonry Element
                    var container = $('.masonry');
                    container.masonry({
                        // columnWidth: 0,
                        itemSelector: '.nf-item'
                    });

                };

                // ---------------------------------------------------------------------------------------------------------------------------->
                // SCROLL CALLBACK FUNCTION  ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->
                function scrollCallbackEle() {
                    //scroll Callback Element
                    $('.load-ele-fade').viewportChecker({
                        classToAdd: 'visible animated fadeIn',
                        offset: 100,
                        callbackFunction: function(elem, action) {}
                    });

                    $(function() {

                        //scroll Animate Element
                        var wow = new WOW({
                            boxClass: 'wow',
                            animateClass: 'animated',
                            offset: 0,
                            mobile: false,
                            live: true
                        })
                        wow.init();
                    });
                };


                // ----------------------------------------------------------------
                // Parallax Function element
                // ----------------------------------------------------------------

                // Parallax Function element
                $('.parallax').each(function() {
                    var $el = $(this);
                    $(window).scroll(function() {
                        parallax($el);
                    });
                    parallax($el);
                });


                function parallax($el) {
                    var diff_s = $(window).scrollTop();
                    var parallax_height = $('.parallax').height();
                    var yPos_p = (diff_s * 0.5);
                    var yPos_m = -(diff_s * 0.5);
                    var diff_h = diff_s / parallax_height;

                    if ($('.parallax').hasClass('parallax-section1')) {
                        $el.css('top', yPos_p);
                    }
                    if ($('.parallax').hasClass('parallax-section2')) {
                        $el.css('top', yPos_m);
                    }
                    if ($('.parallax').hasClass('parallax-static')) {
                        $el.css('top', (diff_s * 1));
                    }
                    if ($('.parallax').hasClass('parallax-opacity')) {
                        $el.css('opacity', (1 - diff_h * 1));
                    }

                    if ($('.parallax').hasClass('parallax-background1')) {
                        $el.css("background-position", 'left' + " " + yPos_p + "px");
                    }
                    if ($('.parallax').hasClass('parallax-background2')) {
                        $el.css("background-position", 'left' + " " + -yPos_p + "px");

                    }
                };

                var parallaxPositionProperty;
                if ($(window).width() >= 1024) {
                    parallaxPositionProperty = "position";
                } else {
                    parallaxPositionProperty = "transform"
                }

                // Parallax Stellar Plugin element
                $(window).stellar({
                    responsive: true,
                    positionProperty: parallaxPositionProperty,
                    horizontalScrolling: false

                });


                // ---------------------------------------------------------------------------------------------------------------------------->
                // SHORTCODE ELEMENTS  ||-----------
                // ---------------------------------------------------------------------------------------------------------------------------->

                shortcodeElements();

                function shortcodeElements() {


                    // Search Overlay Menu
                    $('.search-overlay-menu-btn').on('click', function(eventSearch) {
                        $('.search-overlay-menu').addClass('open');
                        $('.search-overlay-menu > form > input[type="search"]').focus();
                    });
                    $('.search-overlay-close').on('click', function(eventSearch) {
                        $('.search-overlay-menu').removeClass('open');

                    });
                    $('.search-overlay-menu, .search-overlay-menu .search-overlay-close').on('click keyup', function(eventSearch) {
                        if (eventSearch.target == this || eventSearch.target.className == 'search-overlay-close' || eventSearch.keyCode == 27) {
                            $(this).removeClass('open');
                        }
                    });



                    // Portfolio Lightbox Popup Elements
                    lightbox();

                    function lightbox() {
                        $(".cbox-gallary1").colorbox({
                            rel: 'gallary',
                            maxWidth: "95%",
                            maxHeight: "95%"

                        });
                        $(".cbox-iframe").colorbox({
                            iframe: true,
                            maxWidth: "95%",
                            maxHeight: "95%",
                            innerWidth: 640,
                            innerHeight: 390
                        });
                    };

                    // Skills Progressbar Elements
                    skillsProgressBar();

                    function skillsProgressBar() {
                        $('.skillbar').each(function() {
                            $(this).find('.skillbar-bar').animate({
                                width: $(this).attr('data-percent')
                            }, 2000);
                        });
                    };

                    // Tooltip
                    $(".tipped").tipper();

                    //Counter
                    $('.counter').each(function() {
                        var $this = $(this),
                            countTo = $this.attr('data-count');
                        $({
                            countNum: $this.text()
                        }).animate({
                            countNum: countTo
                        }, {
                            duration: 8000,
                            easing: 'linear',
                            step: function() {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function() {
                                $this.text(this.countNum);
                                //alert('finished');
                            }
                        });
                    });

                };


                // Accordion Function Elements
                accordion();

                function accordion() {

                    $('.accordion-title').click(function(e) {

                        $(this).next().slideToggle('easeOut');
                        $(this).toggleClass('active');
                        $("accordion-title").toggleClass('active');
                        $(".accordion-content").not($(this).next()).slideUp('easeIn');
                        $(".accordion-title").not($(this)).removeClass('active');

                    });
                    $(".accordion-content").addClass("defualt-hidden");

                };

                // Jquery UI Elements
                jqueryUi();

                function jqueryUi() {

                    // Tab Function
                    $(function() {
                        $(".tabs").tabs();
                    });

                    // Price Filter Slider
                    $(function() {
                        $("#range-slider").slider({
                            range: true,
                            min: 0,
                            max: 500,
                            values: [0, 300],
                            slide: function(event, ui) {
                                $(".price-amount-from").text("$" + ui.values[0]);
                                $(".price-amount-to").text("$" + ui.values[1]);

                            }
                        });
                        $(".price-amount-from").text("$" + $("#range-slider").slider("values", 0));
                        $(".price-amount-to").text("$" + $("#range-slider").slider("values", 1));
                    });
                };



                $timeout(function() {

                    // fullScreenCarousel();
                    fullScreenSlider();
                    stickHeader();
                    int_introHeight();
                    scroll();
                    pluginElement();
                    sliderHero();

                    containerGridMasonry();
                    scrollCallbackEle();
                    shortcodeElements();
                    // ----------------------------------------------------------------
                    // Backgrounds Image (Slider, Section, etc..)
                    // ----------------------------------------------------------------
                    var pageSection = $('.slide-bg-image, .bg-image');
                    pageSection.each(function(indx) {

                        if ($(this).attr("data-background-img")) {
                            $(this).css("background-image", "url(" + $(this).data("background-img") + ")");
                        }
                    });


                }, 1);

                $timeout(function() {
                    sliderAll();
                }, 2)


            }
        }
    }])
})();
(function() {
	angular.module('tacit').controller('DetailController', ['$scope', '$stateParams', function($scope, $stateParams) {

		console.log('inside Works Detail Controller');

		function init() {
			$scope.projects = $stateParams.projects;
			$scope.project = $stateParams.projects[$stateParams.index - 1];
			$scope.currentIndex = parseInt($stateParams.index);
			saveIndexes();
			console.log($scope.project);
		}

		var saveIndexes = function() {
			$scope.nextIndex = ($scope.currentIndex < $stateParams.projects.length) ? $scope.currentIndex + 1 : null;
			$scope.prevIndex = $scope.currentIndex - 1 ? $scope.currentIndex - 1 : null;
			console.log('prevIndex   ' + $scope.prevIndex);
		}

		init();
	}])
})();
angular.module('tacit').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/aboutus/view/aboutus.html',
    " <!-- Intro Section --> <div flexslider> <section class=\"inner-intro bg-image overlay-light parallax parallax-background1\" data-background-img=\"mazel/img/full/02.jpg\"> <div class=\"container\"> <div class=\"row title\"> <h2 class=\"h2\" ng-bind=\"pageContent.header.title\"></h2> <p ng-bind=\"pageContent.header.desc\"></p> </div> </div> </section> <!-- End Intro Section --> <!-- About Section --> <section class=\"ptb ptb-sm-80\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-md-6\"> <h3>We Creative digital Studio</h3> <p class=\"lead\">Nullam dictum felis eu pede mollis pretium leo eget bibendum sodales augue velit cursus. tellus eget condimentum rhoncus sem quam semper libero.</p> </div> <div class=\"col-md-6\"> <p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p> <p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus.</p> </div> </div> </div> </section> <!-- Team --> <section class=\"pb pb-sm-80\"> <div class=\"container\"> <!--Team Carousel --> <div class=\"row\"> <div class=\"owl-carousel team-carousel nf-carousel-theme\"> <div class=\"item\"> <div class=\"team-item nf-col-padding\"> <div class=\"team-item-img\"> <img src=\"img/team/people-1.jpg\" alt=\"\"> <div class=\"team-item-detail\"> <div class=\"team-item-detail-inner light-color\"> <h5>Mitchell KAPPOS</h5> <p>Similique sunt culpa qui officia deserunt mollitia animi dolorum fuga.</p> <ul class=\"social\"> <li><a href=\"https://www.facebook.com/\" target=\"_blank\"><i class=\"fa fa-facebook\"></i></a></li> <li><a href=\"https://www.twitter.com/\" target=\"_blank\"><i class=\"fa fa-twitter\"></i></a></li> <li><a href=\"https://www.dribbble.com/\" target=\"_blank\"><i class=\"fa fa-dribbble\"></i></a></li> <li><a href=\"https://www.pinterest.com/\" target=\"_blank\"><i class=\"fa fa-pinterest\"></i></a></li> <li><a href=\"https://www.behance.net/\" target=\"_blank\"><i class=\"fa fa-behance\"></i></a></li> </ul> </div> </div> </div> <div class=\"team-item-info\"> <h5>Mitchell KAPPOS</h5> <p class=\"\">Designer</p> </div> </div> </div> <div class=\"item\"> <div class=\"team-item nf-col-padding\"> <div class=\"team-item-img\"> <img src=\"img/team/people-2.jpg\" alt=\"\"> <div class=\"team-item-detail\"> <div class=\"team-item-detail-inner light-color\"> <h5>Leonardo da Vinci</h5> <p>Similique sunt culpa qui officia deserunt mollitia animi dolorum fuga.</p> <ul class=\"social\"> <li><a href=\"https://www.facebook.com/\" target=\"_blank\"><i class=\"fa fa-facebook\"></i></a></li> <li><a href=\"https://www.twitter.com/\" target=\"_blank\"><i class=\"fa fa-twitter\"></i></a></li> <li><a href=\"https://www.dribbble.com/\" target=\"_blank\"><i class=\"fa fa-dribbble\"></i></a></li> <li><a href=\"https://www.pinterest.com/\" target=\"_blank\"><i class=\"fa fa-pinterest\"></i></a></li> <li><a href=\"https://www.behance.net/\" target=\"_blank\"><i class=\"fa fa-behance\"></i></a></li> </ul> </div> </div> </div> <div class=\"team-item-info\"> <h5>Leonardo da Vinci</h5> <p class=\"\">Artist</p> </div> </div> </div> <div class=\"item\"> <div class=\"team-item nf-col-padding\"> <div class=\"team-item-img\"> <img src=\"img/team/people-3.jpg\" alt=\"\"> <div class=\"team-item-detail\"> <div class=\"team-item-detail-inner light-color\"> <h5>John Doe</h5> <p>Similique sunt culpa qui officia deserunt mollitia animi dolorum fuga.</p> <ul class=\"social\"> <li><a href=\"https://www.facebook.com/\" target=\"_blank\"><i class=\"fa fa-facebook\"></i></a></li> <li><a href=\"https://www.twitter.com/\" target=\"_blank\"><i class=\"fa fa-twitter\"></i></a></li> <li><a href=\"https://www.dribbble.com/\" target=\"_blank\"><i class=\"fa fa-dribbble\"></i></a></li> <li><a href=\"https://www.pinterest.com/\" target=\"_blank\"><i class=\"fa fa-pinterest\"></i></a></li> <li><a href=\"https://www.behance.net/\" target=\"_blank\"><i class=\"fa fa-behance\"></i></a></li> </ul> </div> </div> </div> <div class=\"team-item-info\"> <h5>John Doe</h5> <p class=\"\">Project Manager</p> </div> </div> </div> <div class=\"item\"> <div class=\"team-item nf-col-padding\"> <div class=\"team-item-img\"> <img src=\"img/team/people-4.jpg\" alt=\"\"> <div class=\"team-item-detail\"> <div class=\"team-item-detail-inner light-color\"> <h5>Michael Lee</h5> <p>Similique sunt culpa qui officia deserunt mollitia animi dolorum fuga.</p> <ul class=\"social\"> <li><a href=\"https://www.facebook.com/\" target=\"_blank\"><i class=\"fa fa-facebook\"></i></a></li> <li><a href=\"https://www.twitter.com/\" target=\"_blank\"><i class=\"fa fa-twitter\"></i></a></li> <li><a href=\"https://www.dribbble.com/\" target=\"_blank\"><i class=\"fa fa-dribbble\"></i></a></li> <li><a href=\"https://www.pinterest.com/\" target=\"_blank\"><i class=\"fa fa-pinterest\"></i></a></li> <li><a href=\"https://www.behance.net/\" target=\"_blank\"><i class=\"fa fa-behance\"></i></a></li> </ul> </div> </div> </div> <div class=\"team-item-info\"> <h5>Michael Lee</h5> <p class=\"\">Photographer</p> </div> </div> </div> </div> </div> <!--End Team Carousel ---> </div> </section> <!-- End Team --> <!-- Testimonials --> <section id=\"testimonial\" class=\"overlay-dark80 dark-bg ptb ptb-sm-80\" style=\"background-image: url('mazel/img/full/25.jpg')\" data-stellar-background-ratio=\"0.4\"> <div class=\"container\"> <div class=\"owl-carousel testimonial-carousel nf-carousel-theme white\"> <div class=\"item\"> <div class=\"testimonial text-center dark-color\"> <div class=\"container-icon\"><i class=\"fa fa-quote-right\"></i></div> <p class=\"lead\">\" I got a dummy for Christmas and started teaching myself. I got books and records and sat in front of the practising. I did my first show in the third grade and just kept going. \"</p> <h6 class=\"quote-author\">Jeff Dunham <span style=\"font-weight: 400\">( Appel Studio )</span></h6> </div> </div> <div class=\"item\"> <div class=\"testimonial text-center dark-color\"> <div class=\"container-icon\"><i class=\"fa fa-quote-right\"></i></div> <p class=\"lead\">\" It's true, you can never eat a pet you name. And anyway, I did my first show in the third grade it would be like a ventriloquist eating his dummy. \"</p> <h6 class=\"quote-author\">Alexander Theroux <span style=\"font-weight: 400\">( USA )</span></h6> </div> </div> <div class=\"item\"> <div class=\"testimonial text-center dark-color\"> <div class=\"container-icon\"><i class=\"fa fa-quote-right\"></i></div> <p class=\"lead\">\" We're not leaving here without Buster, man. Leave no crash-test dummy behind! \"</p> <h6 class=\"quote-author\">Adam Savage <span style=\"font-weight: 400\">( Artist )</span></h6> </div> </div> </div> </div> </section> <!-- End Testimonials --> <!-- Service --> <section class=\"ptb ptb-sm-80\"> <div class=\"wow fadeIn container text-center\"> <h3>Our Services</h3> <div class=\"spacer-60\"></div> <div class=\"row\"> <div class=\"col-md-4\"> <div class=\"page-icon-top\"><i class=\"ion ion-ios-compose-outline\"></i></div> <h5>Web Design</h5> <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem.</p> </div> <div class=\"col-md-4\"> <div class=\"page-icon-top\"><i class=\"ion ion-ios-gear-outline\"></i></div> <h5>Development</h5> <p>Donec sodales sagittis magna. hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus, augue velit cursus nunc.</p> </div> <div class=\"col-md-4\"> <div class=\"page-icon-top\"><i class=\"ion ion-social-apple-outline\"></i></div> <h5>Branding</h5> <p>Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales.</p> </div> </div> </div> </section> <!-- End Service --> <hr> <!-- Client Logos Section --> <section id=\"client-logos\" class=\"wow fadeIn ptb ptb-sm-80\"> <div class=\"container\"> <div class=\"owl-carousel client-carousel nf-carousel-theme\"> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/01.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/02.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/03.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/04.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/05.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/06.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/08.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/01.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/02.png\" alt=\"\"> </div> </div> <div class=\"item\"> <div class=\"client-logo\"> <img src=\"img/logos/03.png\" alt=\"\"> </div> </div> </div> </div> </section> <!-- End Client Logos Section --> <!-- Statement Section --> <section class=\"dark-bg ptb-60\" id=\"statement\"> <div class=\"container text-center\"> <div class=\"row\"> <div class=\"col-md-8 offset-md-2\"> <h4 class=\"mb-15\">Pellentesque eu pretium quis adipiscing sem?</h4> <a class=\"btn btn-md btn-white\">Buy this Theme</a> </div> </div> </div> </section> </div> <!-- End Statement Section -->"
  );


  $templateCache.put('app/modules/blog/view/blog.html',
    " <!-- CONTENT---------------------------------------------------------------------------------> <!-- Intro Section --> <section class=\"inner-intro bg-image overlay-light parallax parallax-background1\" data-background-img=\"mazel/img/full/20.jpg\"> <div class=\"container\"> <div class=\"row title\"> <h2 class=\"h2\" ng-bind=\"blog.header.title\"></h2> <!-- <div class=\"page-breadcrumb\">\r" +
    "\n" +
    "                        <a>Home</a>/<a>Blog</a>/<span>1 Columns</span>\r" +
    "\n" +
    "                    </div> --> </div> </div> </section> <!-- End Intro Section --> <!-- Blog Post Section --> <section class=\"ptb ptb-sm-80\"> <div class=\"container\"> <div class=\"row\"> <!-- Post Item --> <div class=\"col-md-8 offset-md-2 blog-post-hr\"> <div ng-repeat=\"proj in items track by $index\"> <div class=\"blog-post mb-30\"> <!--   <div   class=\"post-media\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                <div  class=\"owl-carousel item1-carousel nf-carousel-theme\">\r" +
    "\n" +
    "                                    <div  ng-repeat=\"img in proj.images track by $index\" class=\"item\" ng-class=\"{active:!$index}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <img src=\"mazel/img/project/{{proj.name}}/{{img}}\" alt=\"\" />\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    \r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div> --> <div class=\"post-media\"> <img ng-src=\"mazel/img/project/{{proj.name}}/{{proj.images[0]}}\" alt=\"\"> </div> <div class=\"post-meta\"><span>by <a ng-bind=\"proj.author\"></a>,</span> <span ng-bind=\"proj.name\"></span></div> <div class=\"post-header\"> <h4><a href=\"blog-single-slider-post.html\" ng-bind=\"proj.title\"></a></h4> </div> <div class=\"post-entry\"> <p ng-bind=\"proj.desc\"></p> </div> <div class=\"post-tag pull-left\"><span><a ng-bind=\"proj.categories\"></a></span></div> <div class=\"post-more-link pull-right\"><a href=\"\">Read More<i class=\"fa fa-long-arrow-right right\"></i></a></div> </div> <hr ng-if=\"!$last\"> </div> <div class=\"pagination-nav mt-60 mtb-xs-30\"> <ul ng-if=\"pager.pages.length\"> <!--  <li ng-class=\"{disabled:pager.currentPage === 1}\">\r" +
    "\n" +
    "                                    <a ng-click=\"setPage(1)\">First</a>\r" +
    "\n" +
    "                                </li> --> <li ng-class=\"{disabled:pager.currentPage === 1}\"> <a ng-click=\"setPage(pager.currentPage - 1)\"><i class=\"fa fa-angle-left\"></i></a> </li> <li ng-repeat=\"page in pager.pages\" ng-class=\"{active:pager.currentPage === page}\"> <a ng-click=\"setPage(page)\">{{page}}</a> </li> <li ng-class=\"{disabled:pager.currentPage === pager.totalPages}\"> <a ng-click=\"setPage(pager.currentPage + 1)\"><i class=\"fa fa-angle-right\"></i></a> </li> <!-- <li ng-class=\"{disabled:pager.currentPage === pager.totalPages}\">\r" +
    "\n" +
    "                                    <a ng-click=\"setPage(pager.totalPages)\">Last</a>\r" +
    "\n" +
    "                                </li> --> </ul> </div> </div> <!-- End Post Item --> </div> </div> </section> <!-- End Blog Post Section -->"
  );


  $templateCache.put('app/modules/detail/view/detail.html',
    " <!-- Intro Section --> <section class=\"inner-intro bg-image overlay-light parallax parallax-background1\" ng-style=\"{'background-image':'url(mazel/img/project/{{project.name}}/{{project.details.headerImage}})'}\"> <div class=\"container\"> <div class=\"row title\"> <h2 class=\"h2\">{{project.header}}</h2> <div class=\"page-breadcrumb\"> {{project.headerTag}} </div> </div> </div> </section> <!-- End Intro Section --> <!-- Work Detail Section --> <section class=\"pt pt-sm-80\"> <div class=\"container\"> <div class=\"row mb-60 mb-xs-30\"> <div class=\"col-md-4 mb-30\"> <div class=\"project-detail-block\"> <p ng-if=\"project.details.categories\"> <strong class=\"dark-color\">Categories:</strong> <span>{{project.details.categories}}</span> </p> <p ng-if=\"project.details.released\"> <strong class=\"dark-color\">Released :</strong>{{project.details.released}} </p> <p ng-if=\"project.details.client\"> <strong class=\"dark-color\">Client :</strong><a>{{project.details.client}}</a> </p> <p ng-if=\"project.details.link\"> <strong class=\"dark-color\">Link :</strong>{{project.details.link}} </p> <p ng-if=\"project.details.impact\"> <strong class=\"dark-color\">Impact :</strong>{{project.details.impact}} </p> </div> </div> <div class=\"col-md-8\"> <h4>{{project.details.title}}</h4> <p class=\"\"> {{project.details.desc}} </p> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <img class=\"item-container\" ng-src=\"mazel/img/project/{{project.name}}/{{project.image}}\" alt=\"1\"> </div> </div> <div class=\"row mtb-60 mtb-xs-30\"> <div ng-repeat=\"p in project.details.columns track by $index\" class=\"col-md-4 mb-30\"> <h5>{{p.header}}</h5> <p>{{p.content}}</p> </div> </div> <div class=\"row mtb-60 mtb-xs-30\"> <div class=\"testimonial text-center dark-color\"> <div class=\"container-icon\"><i class=\"fa fa-quote-right\"></i></div> <p class=\"lead\"> {{project.details.workQuote[0].quote}}</p> <h6 class=\"quote-author\">{{project.details.workQuote[0].author}}</h6> </div> </div> <!-- End Testimonials --> <div ng-repeat=\"img in project.details.images track by $index\" class=\"row mb-60 mb-xs-30\"> <div class=\"col-md-12\"> <img class=\"item-container\" ng-src=\"mazel/img/project/{{project.name}}/{{img}}\" alt=\"1\"> </div> </div> </div> </section> <!-- <section class=\"ptb ptb-sm-80\">\r" +
    "\n" +
    "            <div class=\"container\">\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-md-8 offset-md-2 text-center\">\r" +
    "\n" +
    "                        <h3 class=\"\">architecto beatae vitae</h3>\r" +
    "\n" +
    "                        <p class=\"mt-15\">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.</p>\r" +
    "\n" +
    "                        <br />\r" +
    "\n" +
    "                        <a class=\"btn btn-lg btn-black\">Download now</a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </section>\r" +
    "\n" +
    " --> <section ng-if=\"project.details.roles.length > 0\" class=\"ptb ptb-sm-80\"> <div class=\"wow fadeIn container text-center\"> <h3>Our Role</h3> <div class=\"spacer-60\"></div> <div class=\"row\"> <div ng-repeat=\"role in project.details.roles\" class=\"col-md-4\"> <div class=\"page-icon-top\"><i class=\"{{role.image}}\"></i></div> <h5 ng-bind=\"role.header\"></h5> <p ng-bind=\"role.desc\"></p> </div> </div> </div> </section> <hr> <section class=\"ptb ptb-sm-80\"> <div class=\"container text-center\"> <h4>Related Project</h4> <div class=\"row\"> <div class=\"col-lg-4 spacing-grid\"> <div class=\"item-box\"> <a> <img alt=\"1\" src=\"img/portfolio/1.jpg\" class=\"item-container\"> <div class=\"item-mask\"> <div class=\"item-caption\"> <h5 class=\"white\">Consequat massa quis</h5> <p class=\"white\">Branding, Design, Coffee</p> </div> </div> </a> </div> </div> <div class=\"col-lg-4 spacing-grid\"> <div class=\"item-box\"> <a> <img alt=\"1\" src=\"img/portfolio/3.jpg\" class=\"item-container\"> <div class=\"item-mask\"> <div class=\"item-caption\"> <h5 class=\"white\">Consequat massa quis</h5> <p class=\"white\">Branding, Design, Coffee</p> </div> </div> </a> </div> </div> <div class=\"col-lg-4 spacing-grid\"> <div class=\"item-box\"> <a> <img alt=\"1\" src=\"img/portfolio/5.jpg\" class=\"item-container\"> <div class=\"item-mask\"> <div class=\"item-caption\"> <h5 class=\"white\">Consequat massa quis</h5> <p class=\"white\">Branding, Design, Coffee</p> </div> </div> </a> </div> </div> </div> </div> </section> <!-- End Work Detail Section --> <!-- Work Next Prev Bar --> <section class=\"mb-60\"> <div class=\"container\"> <div class=\"item-nav\"> <a class=\"item-prev\" ui-sref=\"detail({project:projects, index: prevIndex})\"> <div class=\"prev-btn\"><i class=\"fa fa-angle-left\"></i></div> <div class=\"item-prev-text xs-hidden\"> <h6>Prev Project</h6> </div> </a> <a class=\"item-all-view\"> <h6 ui-sref=\"works\">All Work</h6> </a> <a class=\"item-next\" ui-sref=\"detail({project:projects, index: nextIndex})\"> <div class=\"next-btn\"><i class=\"fa fa-angle-right\"></i></div> <div class=\"item-next-text xs-hidden\"> <h6>Next Project</h6> </div> </a> </div> </div> </section> <!-- End Work Next Prev Bar --> <!-- End CONTENT ------------------------------------------------------------------------------>"
  );


  $templateCache.put('app/modules/home/view/home.html',
    "<section id=\"intro\"> <!-- Hero Slider Section --> <!-- <div class=\"flexslider fullscreen-carousel hero-slider-1 \" > --> <!-- <ul class =\"slides\"> --> <flex-slider flex-slide=\"s in content.slider track by s.index\" animation=\"slide\" class=\"flexslider fullscreen-carousel hero-slider-1\" flexslider> <li data-slide=\"{{s.type}}\"> <div class=\"slide-bg-image overlay-light parallax parallax-section1\" data-background-img=\"{{s.img}}\"> <div class=\"js-Slide-fullscreen-height container\"> <div class=\"intro-content\"> <div class=\"intro-content-inner\"> <h2 class=\"h2\">{{s.header}}</h2> <p class=\"lead\">{{s.content}}</p> <div> <a class=\"btn btn-md btn-black-line\">Read More</a><span class=\"btn-space-10 xs-hidden\"> </span></div> </div> </div> </div> </div> </li> </flex-slider> <!-- </div> --> <!-- </ul> --> <!-- </div> --> <!-- End Hero Slider Section --> </section> <div class=\"clearfix\"></div> <!-- About Section --> <section id=\"about\" class=\"pt pt-sm-80\"> <div class=\"container text-center\"> <div class=\"row\"> <div class=\"col\"> <div class=\"col-md-8 offset-md-2\"></div> <h2> <span class=\"color\">{{:: content.title.part1}}</span> {{:: content.title.part2}}<br> {{:: content.title.part3}} </h2> </div> </div> </div> </section> <section class=\"ptb ptb-sm-80\"> <div class=\"container\"> <!-- work Filter --> <div class=\"row\"> <ul class=\"col container-filter categories-filter\"> <li ng-repeat=\"cat in categories track by $index\"> <a ng-show=\"cat.name == 'all'\" class=\"categories {{cat.active}}\" data-filter=\"*\">{{cat.name}}</a> <a ng-show=\"cat.name !== 'all'\" class=\"categories {{cat.active}}\" data-filter=\".{{cat.name}}\">{{cat.name}}</a> </li> </ul> </div> <!-- End work Filter --> <div class=\"row container-grid nf-col-3\"> <div ng-repeat=\"proj in filteredProj = (projects) track by proj.index\" class=\"nf-item {{proj.categories}} spacing\"> <div class=\"item-box\"> <a ui-sref=\"detail({projects:projects, index: proj.index})\"> <img alt=\"1\" ng-src=\"mazel/img/project/{{proj.name}}/{{proj.image}}\" class=\"item-container\"> <div class=\"item-mask\"> <div class=\"item-caption\"> <h5 class=\"white\" ng-bind=\"proj.header\"></h5> <p class=\"white\">{{proj.headerTag}}</p> </div> </div> </a> </div> </div> <div ng-hide=\"filteredProj.length\">No items found</div> </div> </div> </section>"
  );


  $templateCache.put('app/modules/practices/view/practices.html',
    "<section class=\"inner-intro dark-bg bg-image overlay-dark parallax parallax-background1\" data-background-img=\"mazel/img/full/18.jpg\"> <div class=\"container\"> <div class=\"row title\"> <h2 class=\"h2\" ng-bind=\"pageContent.header.title\"></h2> <!-- <div class=\"page-breadcrumb\">\r" +
    "\n" +
    "                        <a>Home</a>/<span>Service</span>\r" +
    "\n" +
    "                    </div> --> </div> </div> </section> <!-- End Intro Section --> <!-- Service Section --> <section flexslider id=\"service\" class=\"wow fadeIn pt pb-80\"> <div class=\"container text-center\"> <div class=\"row text-center\"> <div class=\"col-md-8 offset-md-2\"> <h3 class=\"h4\" ng-bind=\"pageContent.content.title\"></h3> <div class=\"spacer-15\"></div> <p class=\"lead\" ng-bind=\"pageContent.content.desc\"></p> </div> </div> <div class=\"row mt-60\"> <div ng-repeat=\"practice in pageContent.content.practices track by $index\" class=\"col-md-4 mb-45\"> <div class=\"page-icon-top\"><i class=\"{{practice.image}}\"></i></div> <h5 ng-bind=\"practice.title\"></h5> <p ng-bind=\"practice.desc\"></p> </div> </div> </div> </section> <!-- Statement Section --> <section class=\"dark-bg ptb-60\" id=\"statement\"> <div class=\"container text-center\"> <div class=\"row\"> <div class=\"col-md-8 offset-md-2\"> <h4 class=\"mb-15\" ng-bind=\"pageContent.content.statement\"></h4> </div> </div> </div> </section> <!-- End Statement Section --> <!-- Contant Slider Section --> <section id=\"contant\" class=\"wow fadeIn ptb ptb-sm-80\"> <div class=\"owl-carousel content-carousel content-slider\"> <div class=\"item\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-md-6 mb-sm-30\"> <img src=\"img/moc-1.png\" alt=\"\"> </div> <div class=\"col-md-5 offset-md-1\"> <h3 ng-bind=\"pageContent.content.projects[0].title\"></h3> <div class=\"spacer-15\"></div> <p>{{pageContent.content.projects[0].desc}}</p> <p>porttitor eu consequat vitae Phasellus viverra nulla ut metus varius laoreet</p> <div class=\"spacer-15\"></div> <a class=\"btn btn-md btn-black\">Read More</a> </div> </div> </div> </div> <div class=\"item\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-md-5 mb-sm-30\"> <h3>Multiprapose Theme</h3> <div class=\"spacer-15\"></div> <p>Cras dapibus Vivamus elementum semper nisi Aenean vulputate eleifend tellus Aenean leo ligula, porttitor eu consequat vitae Phasellus viverra nulla ut metus varius laoreet.</p> <p>porttitor eu consequat vitae Phasellus viverra nulla.</p> <div class=\"spacer-15\"></div> <a class=\"btn btn-md btn-black\">Buy Now</a> </div> <div class=\"col-md-6 offset-md-1\"> <img src=\"img/moc-1.png\" alt=\"\"> </div> </div> </div> </div> <div class=\"item\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-md-6 mb-sm-30\"> <img src=\"img/moc-2.png\" alt=\"\"> </div> <div class=\"col-md-5 offset-md-1\"> <h3>Fully Responsive</h3> <div class=\"spacer-15\"></div> <p>Cras dapibus Vivamus elementum semper nisi Aenean vulputate eleifend tellus Aenean leo ligula, porttitor eu consequat vitae Phasellus viverra nulla ut metus varius laoreet.</p> <p>porttitor eu consequat vitae Phasellus viverra nulla ut metus varius laoreet</p> <div class=\"spacer-15\"></div> <a class=\"btn btn-md btn-black\">Buy Now</a> </div> </div> </div> </div> </div> </section> <!-- End Contain Slider Section -->"
  );


  $templateCache.put('app/modules/works/view/works.html',
    " <section class=\"inner-intro dark-bg bg-image overlay-dark parallax parallax-background1\" data-background-img=\"mazel/img/full/25.jpg\"> <div class=\"container\"> <div class=\"row title\"> <h2 class=\"h2\">WORKS</h2> <!--  <div class=\"page-breadcrumb\">\r" +
    "\n" +
    "                        <a>Home</a>/<a>Portfolio</a>/<span>Grid</span>\r" +
    "\n" +
    "                    </div> --> </div> </div> </section> <!-- End Intro Section --> <!-- Work Detail Section --> <section class=\"ptb ptb-sm-80\" flexslider> <div class=\"container\"> <!-- work Filter --> <div class=\"row\"> <ul class=\"col container-filter categories-filter\"> <li ng-repeat=\"cat in categories track by $index\"> <a ng-show=\"cat.name == 'all'\" class=\"categories {{cat.active}}\" data-filter=\"*\">{{cat.name}}</a> <a ng-show=\"cat.name !== 'all'\" class=\"categories {{cat.active}}\" data-filter=\".{{cat.name}}\">{{cat.name}}</a> </li> </ul> </div> <!-- End work Filter --> <div class=\"row container-grid nf-col-3\"> <div ng-repeat=\"proj in filteredProj = (projects) track by proj.index\" class=\"nf-item {{proj.categories}} spacing\"> <div class=\"item-box\"> <a ui-sref=\"detail({projects:projects, index: proj.index})\"> <img alt=\"1\" ng-src=\"mazel/img/project/{{proj.name}}/{{proj.image}}\" class=\"item-container\"> <div class=\"item-mask\"> <div class=\"item-caption\"> <h5 class=\"white\" ng-bind=\"proj.header\"></h5> <p class=\"white\">{{proj.headerTag}}</p> </div> </div> </a> </div> </div> <div ng-hide=\"filteredProj.length\">No items found</div> </div> </div> </section> <!-- End Work Detail Section--> "
  );

}]);
