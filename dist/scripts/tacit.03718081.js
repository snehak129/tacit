var app=angular.module("tacit",["ui.router","angular-flexslider"]);angular.element(document).ready(function(){angular.bootstrap(document,["tacit"])}),app.config(["$compileProvider","$stateProvider","$urlRouterProvider",function(e,a,i){i.otherwise("/"),a.state("home",{url:"/",params:{projects:null,index:null},templateUrl:"app/modules/home/view/home.html",controller:"HomeController"}).state("blog",{url:"/blog",templateUrl:"app/modules/blog/view/blog.html",controller:"BlogController"}).state("aboutus",{url:"/aboutus",templateUrl:"app/modules/aboutus/view/aboutus.html",controller:"AboutUsController"}).state("works",{url:"/works",params:{projects:null,index:null},templateUrl:"app/modules/works/view/works.html",controller:"WorksController"}).state("detail",{url:"/works/detail/:index",params:{projects:null,index:null},templateUrl:"app/modules/detail/view/detail.html",controller:"DetailController"}).state("practices",{url:"/practices",templateUrl:"app/modules/practices/view/practices.html",controller:"PracticesController"})}]),app.run(["$rootScope","$anchorScroll","$trace","$transitions",function(e,a,i,t){e.$on("$locationChangeSuccess",function(){a()}),t.onStart({to:"detail"},function(e){if(null===e.params().index)e.abort();else if(null===e.params().projects)return e.router.stateService.target("works")})}]),angular.module("tacit").factory("AjaxService",["$http",function(e){return{post:function(a,i){e({method:"GET",transformRequest:angular.identity,url:a,headers:{"Content-Type":"application/json"}}).then(function(e){console.log(e.data);var a=e.data;return i(a)},function(e){console.log(e)})}}}]),angular.module("tacit").factory("Common",function(){return{categories:[{name:"all",active:"active"},{name:"identity",active:""},{name:"product",active:""},{name:"experience",active:""},{name:"social",active:""},{name:"kids",active:""},{name:"strategy",active:""},{name:"place",active:""}],url:{getWorks:"../data/works.json",getHeaders:"../data/headers.json",getHomeContent:"../data/home.json",getAboutUs:"../data/aboutus.json",getPractices:"../data/practices.json",getBlog:"../data/blog.json"}}}),angular.module("tacit").factory("PaginationService",function(){return{initPagination:function(e,a,i){a=a||1,i=i||10,totalPages=Math.ceil(e/i);let t=null,s=null;totalPages<=10?(t=1,s=totalPages):a<=6?(t=1,s=10):a+4>=totalPages?(t=totalPages-9,s=totalPages):(t=a-5,s=a+4);for(var l=(a-1)*i,o=Math.min(l+i-1,e-1),n=[],c=t;c<=s;c++)n.push(c);return{totalItems:e,currentPage:a,pageSize:i,totalPages:totalPages,startPage:t,endPage:s,startIndex:l,endIndex:o,pages:n}}}}),angular.module("tacit").controller("MainController",["$scope","AjaxService","Common",function(e,a,i){console.log("inside HomeController");(function(){a.post(i.url.getHeaders,function(a){e.pageContent=a})})()}]),angular.module("tacit").controller("HomeController",["$rootScope","$scope","AjaxService","Common",function(e,a,i,t){console.log("inside HomeController");var s=function(){i.post(t.url.getWorks,function(e){a.projects=e.projects})},l=function(){i.post(t.url.getHomeContent,function(e){a.content=e})};a.categories=t.categories,l(),s()}]),angular.module("tacit").controller("AboutUsController",["$scope","Common","AjaxService",function(e,a,i){console.log("inside AboutUsController");(function(){i.post(a.url.getAboutUs,function(a){e.pageContent=a})})()}]),angular.module("tacit").controller("BlogController",["$scope","Common","AjaxService","PaginationService",function(e,a,i,t){console.log("inside BlogController");var s=function(){i.post(a.url.getBlog,function(a){e.blog=a,e.setPage(1)})};e.setPage=function(a){a<1||a>e.pager.totalPages||(e.pager=t.initPagination(e.blog.projects.length,a),e.items=e.blog.projects.slice(e.pager.startIndex,e.pager.endIndex+1))},e.pager={},s()}]),angular.module("tacit").controller("WorksController",["$scope","AjaxService","Common",function(e,a,i){console.log("inside WorksController"),e.clicked=function(a){e.selectedCat&&(e.selectedCat.active=""),e.selectedCat=a,a.active="active"};var t=function(){a.post(i.url.getWorks,function(a){e.projects=a.projects})};e.categories=i.categories,e.selectedCat=e.categories[0],t()}]),angular.module("tacit").controller("PracticesController",["$scope","Common","AjaxService",function(e,a,i){console.log("inside PracticesController");(function(){i.post(a.url.getPractices,function(a){e.pageContent=a})})()}]),angular.module("tacit").directive("flexslider",["$timeout",function(e){return{link:function(a,i,t){function s(){var e=$(window).scrollTop();$(window).height();e>150?$(".header").addClass("header-prepare"):$(".header").removeClass("header-prepare"),e>1?$(".header").addClass("header-fixed"):$(".header").removeClass("header-fixed")}function l(){var e=$(window).height();$(".js-fullscreen-height").css("height",e)}function o(){var e=$(".container-masonry");e.imagesLoaded(function(){e.isotope({itemSelector:".nf-item",layoutMode:"masonry",masonry:{columnWidth:0,gutter:0}})}),$(".container-filter").on("click",".categories",function(){var a=$(this).attr("data-filter");e.isotope({filter:a})});var a=$(".container-grid");a.imagesLoaded(function(){a.isotope({itemSelector:".nf-item",layoutMode:"fitRows"})}),$(".container-filter").on("click",".categories",function(){var e=$(this).attr("data-filter");a.isotope({filter:e})}),$(".categories-filter").each(function(e,a){var i=$(a);i.on("click",".categories",function(){i.find(".active").removeClass("active"),$(this).addClass("active")})});$(".masonry").masonry({itemSelector:".nf-item"})}function n(e){var a=$(window).scrollTop(),i=.5*a,t=-.5*a,s=a/$(".parallax").height();$(".parallax").hasClass("parallax-section1")&&e.css("top",i),$(".parallax").hasClass("parallax-section2")&&e.css("top",t),$(".parallax").hasClass("parallax-static")&&e.css("top",1*a),$(".parallax").hasClass("parallax-opacity")&&e.css("opacity",1-1*s),$(".parallax").hasClass("parallax-background1")&&e.css("background-position","left "+i+"px"),$(".parallax").hasClass("parallax-background2")&&e.css("background-position","left "+-i+"px")}function c(){$(".search-overlay-menu-btn").on("click",function(e){$(".search-overlay-menu").addClass("open"),$('.search-overlay-menu > form > input[type="search"]').focus()}),$(".search-overlay-close").on("click",function(e){$(".search-overlay-menu").removeClass("open")}),$(".search-overlay-menu, .search-overlay-menu .search-overlay-close").on("click keyup",function(e){e.target!=this&&"search-overlay-close"!=e.target.className&&27!=e.keyCode||$(this).removeClass("open")}),$(".cbox-gallary1").colorbox({rel:"gallary",maxWidth:"95%",maxHeight:"95%"}),$(".cbox-iframe").colorbox({iframe:!0,maxWidth:"95%",maxHeight:"95%",innerWidth:640,innerHeight:390}),$(".skillbar").each(function(){$(this).find(".skillbar-bar").animate({width:$(this).attr("data-percent")},2e3)}),$(".tipped").tipper(),$(".counter").each(function(){var e=$(this),a=e.attr("data-count");$({countNum:e.text()}).animate({countNum:a},{duration:8e3,easing:"linear",step:function(){e.text(Math.floor(this.countNum))},complete:function(){e.text(this.countNum)}})})}$(window).load(function(){$("#loader").fadeOut(),$("#preloader").delay(350).fadeOut("slow"),$("body").delay(350).css({overflow:"visible"}),o()}),$(document).ready(function(){}),$(window).resize(function(){s(),l()}),$(window).scroll(function(){s()}),$(".parallax").each(function(){var e=$(this);$(window).scroll(function(){n(e)}),n(e)});var r;r=$(window).width()>=1024?"position":"transform",$(window).stellar({responsive:!0,positionProperty:r,horizontalScrolling:!1}),c(),$(".accordion-title").click(function(e){$(this).next().slideToggle("easeOut"),$(this).toggleClass("active"),$("accordion-title").toggleClass("active"),$(".accordion-content").not($(this).next()).slideUp("easeIn"),$(".accordion-title").not($(this)).removeClass("active")}),$(".accordion-content").addClass("defualt-hidden"),$(function(){$(".tabs").tabs()}),$(function(){$("#range-slider").slider({range:!0,min:0,max:500,values:[0,300],slide:function(e,a){$(".price-amount-from").text("$"+a.values[0]),$(".price-amount-to").text("$"+a.values[1])}}),$(".price-amount-from").text("$"+$("#range-slider").slider("values",0)),$(".price-amount-to").text("$"+$("#range-slider").slider("values",1))}),e(function(){!function(){function e(){var e=$(".fullscreen-carousel").find("li.flex-active-slide").attr("data-slide");"dark-slide"==e&&($("#header").addClass("header").removeClass("header-light"),$("#header").removeClass("header-default")),"light-slide"==e&&($("#header").addClass("header-light").removeClass("header-dark"),$("#header").removeClass("header-default")),"default-slide"==e&&($("#header").removeClass("header-dark"),$("#header").removeClass("header-light"),$("#header").addClass("header"))}function a(){var e=$(window).width(),a=$(window).height();console.log(a),console.log(e),$(window).width()>767?$(".hero-slider-1 .slides .js-Slide-fullscreen-height").css("height",a):$(".hero-slider-1 .slides .js-Slide-fullscreen-height").css("height","400px")}$(".fullscreen-carousel").length>0&&$(".fullscreen-carousel").flexslider({animation:"slide",animationSpeed:700,animationLoop:!0,slideshow:!0,easing:"swing",controlNav:!1,before:function(e){$(".fullscreen-carousel .intro-content-inner").fadeOut().animate({top:"80px"},{queue:!1,easing:"easeOutQuad",duration:700}),e.slides.eq(e.currentSlide).delay(400),e.slides.eq(e.animatingTo).delay(400)},after:function(a){$(".fullscreen-carousel .flex-active-slide").find(".intro-content-inner").fadeIn(2e3).animate({top:"0"},{queue:!1,easing:"easeOutQuad",duration:1200}),e()},start:function(a){$("body").removeClass("loading"),e()},useCSS:!0}),a(),$(window).resize(function(){a()})}(),s(),l(),$(window).scroll(function(){$(this).scrollTop()>300?$(".scroll-top").fadeIn():$(".scroll-top").fadeOut()}),$(".scroll-top").click(function(){return $("html, body").animate({scrollTop:0},800),!1}),$('.scroll-down[href^="#"], .scroll-to-target[href^="#"]').on("click",function(e){e.preventDefault();var a=this.hash,i=$(a);$("html, body").stop().animate({scrollTop:i.offset().top},900,"swing",function(){window.location.hash=a})}),$(".video").mediaelementplayer({loop:!0,enableKeyboard:!1,iPadUseNativeControls:!1,pauseOtherPlayers:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,enableAutosize:!0}),$(".bg-video").mediaelementplayer({loop:!0,enableKeyboard:!1,iPadUseNativeControls:!1,pauseOtherPlayers:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,enableAutosize:!0,alwaysShowControls:!1}),$(".audio").mediaelementplayer({audioWidth:"100%",pauseOtherPlayers:!1}),$(".video, .audio, .post-media, .post-media iframe").fitVids(),$(".slider-hero").owlCarousel({navigation:!0,slideSpeed:700,paginationSpeed:400,pagination:!0,addClassActive:!0,touchDrag:!0,singleItem:!0,navigationText:!1,autoPlay:!1,autoHeight:!1,beforeMove:function(){$(".slider-hero .overlay-hero .caption-hero").fadeOut(1)},afterMove:function(){$(".slider-hero .owl-item.active ").find(".caption-hero").delay(500).fadeIn(1500),BackgroundCheck.refresh()},afterInit:function(){$(".slider-hero .owl-item.active ").find(".caption-hero").delay(500).fadeIn(1500),BackgroundCheck.init({targets:".full-intro",images:".owl-carousel .item img"})}}),$(window).height(function(){function e(){var e=$(window).innerHeight();$(".slider-hero, .full-screen-intro").css("height",e)}e(),$(window).resize(function(){e()})}),o(),$(".load-ele-fade").viewportChecker({classToAdd:"visible animated fadeIn",offset:100,callbackFunction:function(e,a){}}),$(function(){new WOW({boxClass:"wow",animateClass:"animated",offset:0,mobile:!1,live:!0}).init()}),c();$(".slide-bg-image, .bg-image").each(function(e){$(this).attr("data-background-img")&&$(this).css("background-image","url("+$(this).data("background-img")+")")})},1),e(function(){$(".fullwidth-slider").owlCarousel({slideSpeed:400,singleItem:!0,autoHeight:!0,navigation:!0,pagination:!0,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}),$(".image-slider").owlCarousel({navigation:!0,pagination:!0,slideSpeed:350,paginationSpeed:400,singleItem:!0,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],autoPlay:!1,autoHeight:!0,responsive:!0}),$(".testimonial-carousel").owlCarousel({autoPlay:!0,autoHeight:!0,stopOnHover:!0,singleItem:!0,slideSpeed:350,pagination:!0,navigation:!1,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}),$(".team-carousel").owlCarousel({autoPlay:!1,stopOnHover:!0,items:3,itemsDesktop:[1170,3],itemsDesktopSmall:[1024,2],itemsTabletSmall:[768,1],itemsMobile:[480,1],pagination:!1,navigation:!1,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}),$(".client-carousel").owlCarousel({autoPlay:2500,stopOnHover:!0,items:5,itemsDesktop:[1170,4],itemsDesktopSmall:[1024,3],itemsTabletSmall:[768,2],itemsMobile:[480,1],pagination:!1,navigation:!1,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}),$(".content-carousel").owlCarousel({autoPlay:!0,autoHeight:!0,stopOnHover:!0,singleItem:!0,slideSpeed:500,pagination:!1,navigation:!0,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],responsive:!0}),$(".item5-carousel").owlCarousel({autoPlay:2500,stopOnHover:!0,items:5,itemsDesktop:[1170,3],itemsDesktopSmall:[1024,2],itemsTabletSmall:[768,1],itemsMobile:[480,1],pagination:!0,navigation:!0,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}),$(".item4-carousel").owlCarousel({autoPlay:2500,stopOnHover:!0,items:4,itemsDesktop:[1170,3],itemsDesktopSmall:[1024,2],itemsTabletSmall:[768,1],itemsMobile:[480,1],pagination:!1,navigation:!0,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}),$(".item3-carousel").owlCarousel({autoPlay:!1,stopOnHover:!0,items:3,itemsDesktop:[1170,3],itemsDesktopSmall:[1024,2],itemsTabletSmall:[768,1],itemsMobile:[480,1],pagination:!0,navigation:!0,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}),$(".item1-carousel").owlCarousel({autoPlay:!1,autoHeight:!0,stopOnHover:!0,singleItem:!0,slideSpeed:350,pagination:!0,navigation:!0,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],responsive:!0})},2)}}}]),angular.module("tacit").controller("DetailController",["$scope","$stateParams",function(e,a){console.log("inside Works Detail Controller");var i=function(){e.nextIndex=e.currentIndex<a.projects.length?e.currentIndex+1:null,e.prevIndex=e.currentIndex-1?e.currentIndex-1:null,console.log("prevIndex   "+e.prevIndex)};e.projects=a.projects,e.project=a.projects[a.index-1],e.currentIndex=parseInt(a.index),i(),console.log(e.project)}]),angular.module("tacit").run(["$templateCache",function(e){"use strict";e.put("app/modules/aboutus/view/aboutus.html",' \x3c!-- Intro Section --\x3e <div flexslider> <section class="inner-intro bg-image overlay-light parallax parallax-background1" data-background-img="mazel/img/full/02.jpg"> <div class="container"> <div class="row title"> <h2 class="h2" ng-bind="pageContent.header.title"></h2> <p ng-bind="pageContent.header.desc"></p> </div> </div> </section> \x3c!-- End Intro Section --\x3e \x3c!-- About Section --\x3e <section class="ptb ptb-sm-80"> <div class="container"> <div class="row"> <div class="col-md-6"> <h3>We Creative digital Studio</h3> <p class="lead">Nullam dictum felis eu pede mollis pretium leo eget bibendum sodales augue velit cursus. tellus eget condimentum rhoncus sem quam semper libero.</p> </div> <div class="col-md-6"> <p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p> <p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus.</p> </div> </div> </div> </section> \x3c!-- Team --\x3e <section class="pb pb-sm-80"> <div class="container"> \x3c!--Team Carousel --\x3e <div class="row"> <div class="owl-carousel team-carousel nf-carousel-theme"> <div class="item"> <div class="team-item nf-col-padding"> <div class="team-item-img"> <img src="img/team/people-1.jpg" alt=""> <div class="team-item-detail"> <div class="team-item-detail-inner light-color"> <h5>Mitchell KAPPOS</h5> <p>Similique sunt culpa qui officia deserunt mollitia animi dolorum fuga.</p> <ul class="social"> <li><a href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a></li> <li><a href="https://www.twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a></li> <li><a href="https://www.dribbble.com/" target="_blank"><i class="fa fa-dribbble"></i></a></li> <li><a href="https://www.pinterest.com/" target="_blank"><i class="fa fa-pinterest"></i></a></li> <li><a href="https://www.behance.net/" target="_blank"><i class="fa fa-behance"></i></a></li> </ul> </div> </div> </div> <div class="team-item-info"> <h5>Mitchell KAPPOS</h5> <p class="">Designer</p> </div> </div> </div> <div class="item"> <div class="team-item nf-col-padding"> <div class="team-item-img"> <img src="img/team/people-2.jpg" alt=""> <div class="team-item-detail"> <div class="team-item-detail-inner light-color"> <h5>Leonardo da Vinci</h5> <p>Similique sunt culpa qui officia deserunt mollitia animi dolorum fuga.</p> <ul class="social"> <li><a href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a></li> <li><a href="https://www.twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a></li> <li><a href="https://www.dribbble.com/" target="_blank"><i class="fa fa-dribbble"></i></a></li> <li><a href="https://www.pinterest.com/" target="_blank"><i class="fa fa-pinterest"></i></a></li> <li><a href="https://www.behance.net/" target="_blank"><i class="fa fa-behance"></i></a></li> </ul> </div> </div> </div> <div class="team-item-info"> <h5>Leonardo da Vinci</h5> <p class="">Artist</p> </div> </div> </div> <div class="item"> <div class="team-item nf-col-padding"> <div class="team-item-img"> <img src="img/team/people-3.jpg" alt=""> <div class="team-item-detail"> <div class="team-item-detail-inner light-color"> <h5>John Doe</h5> <p>Similique sunt culpa qui officia deserunt mollitia animi dolorum fuga.</p> <ul class="social"> <li><a href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a></li> <li><a href="https://www.twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a></li> <li><a href="https://www.dribbble.com/" target="_blank"><i class="fa fa-dribbble"></i></a></li> <li><a href="https://www.pinterest.com/" target="_blank"><i class="fa fa-pinterest"></i></a></li> <li><a href="https://www.behance.net/" target="_blank"><i class="fa fa-behance"></i></a></li> </ul> </div> </div> </div> <div class="team-item-info"> <h5>John Doe</h5> <p class="">Project Manager</p> </div> </div> </div> <div class="item"> <div class="team-item nf-col-padding"> <div class="team-item-img"> <img src="img/team/people-4.jpg" alt=""> <div class="team-item-detail"> <div class="team-item-detail-inner light-color"> <h5>Michael Lee</h5> <p>Similique sunt culpa qui officia deserunt mollitia animi dolorum fuga.</p> <ul class="social"> <li><a href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a></li> <li><a href="https://www.twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a></li> <li><a href="https://www.dribbble.com/" target="_blank"><i class="fa fa-dribbble"></i></a></li> <li><a href="https://www.pinterest.com/" target="_blank"><i class="fa fa-pinterest"></i></a></li> <li><a href="https://www.behance.net/" target="_blank"><i class="fa fa-behance"></i></a></li> </ul> </div> </div> </div> <div class="team-item-info"> <h5>Michael Lee</h5> <p class="">Photographer</p> </div> </div> </div> </div> </div> \x3c!--End Team Carousel ---\x3e </div> </section> \x3c!-- End Team --\x3e \x3c!-- Testimonials --\x3e <section id="testimonial" class="overlay-dark80 dark-bg ptb ptb-sm-80" style="background-image: url(\'mazel/img/full/25.jpg\')" data-stellar-background-ratio="0.4"> <div class="container"> <div class="owl-carousel testimonial-carousel nf-carousel-theme white"> <div class="item"> <div class="testimonial text-center dark-color"> <div class="container-icon"><i class="fa fa-quote-right"></i></div> <p class="lead">" I got a dummy for Christmas and started teaching myself. I got books and records and sat in front of the practising. I did my first show in the third grade and just kept going. "</p> <h6 class="quote-author">Jeff Dunham <span style="font-weight: 400">( Appel Studio )</span></h6> </div> </div> <div class="item"> <div class="testimonial text-center dark-color"> <div class="container-icon"><i class="fa fa-quote-right"></i></div> <p class="lead">" It\'s true, you can never eat a pet you name. And anyway, I did my first show in the third grade it would be like a ventriloquist eating his dummy. "</p> <h6 class="quote-author">Alexander Theroux <span style="font-weight: 400">( USA )</span></h6> </div> </div> <div class="item"> <div class="testimonial text-center dark-color"> <div class="container-icon"><i class="fa fa-quote-right"></i></div> <p class="lead">" We\'re not leaving here without Buster, man. Leave no crash-test dummy behind! "</p> <h6 class="quote-author">Adam Savage <span style="font-weight: 400">( Artist )</span></h6> </div> </div> </div> </div> </section> \x3c!-- End Testimonials --\x3e \x3c!-- Service --\x3e <section class="ptb ptb-sm-80"> <div class="wow fadeIn container text-center"> <h3>Our Services</h3> <div class="spacer-60"></div> <div class="row"> <div class="col-md-4"> <div class="page-icon-top"><i class="ion ion-ios-compose-outline"></i></div> <h5>Web Design</h5> <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem.</p> </div> <div class="col-md-4"> <div class="page-icon-top"><i class="ion ion-ios-gear-outline"></i></div> <h5>Development</h5> <p>Donec sodales sagittis magna. hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus, augue velit cursus nunc.</p> </div> <div class="col-md-4"> <div class="page-icon-top"><i class="ion ion-social-apple-outline"></i></div> <h5>Branding</h5> <p>Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales.</p> </div> </div> </div> </section> \x3c!-- End Service --\x3e <hr> \x3c!-- Client Logos Section --\x3e <section id="client-logos" class="wow fadeIn ptb ptb-sm-80"> <div class="container"> <div class="owl-carousel client-carousel nf-carousel-theme"> <div class="item"> <div class="client-logo"> <img src="img/logos/01.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/02.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/03.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/04.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/05.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/06.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/08.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/01.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/02.png" alt=""> </div> </div> <div class="item"> <div class="client-logo"> <img src="img/logos/03.png" alt=""> </div> </div> </div> </div> </section> \x3c!-- End Client Logos Section --\x3e \x3c!-- Statement Section --\x3e <section class="dark-bg ptb-60" id="statement"> <div class="container text-center"> <div class="row"> <div class="col-md-8 offset-md-2"> <h4 class="mb-15">Pellentesque eu pretium quis adipiscing sem?</h4> <a class="btn btn-md btn-white">Buy this Theme</a> </div> </div> </div> </section> </div> \x3c!-- End Statement Section --\x3e'),e.put("app/modules/blog/view/blog.html",' \x3c!-- CONTENT---------------------------------------------------------------------------------\x3e \x3c!-- Intro Section --\x3e <section class="inner-intro bg-image overlay-light parallax parallax-background1" data-background-img="mazel/img/full/20.jpg"> <div class="container"> <div class="row title"> <h2 class="h2" ng-bind="blog.header.title"></h2> \x3c!-- <div class="page-breadcrumb">\r\n                        <a>Home</a>/<a>Blog</a>/<span>1 Columns</span>\r\n                    </div> --\x3e </div> </div> </section> \x3c!-- End Intro Section --\x3e \x3c!-- Blog Post Section --\x3e <section class="ptb ptb-sm-80"> <div class="container"> <div class="row"> \x3c!-- Post Item --\x3e <div class="col-md-8 offset-md-2 blog-post-hr"> <div ng-repeat="proj in items track by $index"> <div class="blog-post mb-30"> \x3c!--   <div   class="post-media">\r\n\r\n                                <div  class="owl-carousel item1-carousel nf-carousel-theme">\r\n                                    <div  ng-repeat="img in proj.images track by $index" class="item" ng-class="{active:!$index}">\r\n\r\n                                        <img src="mazel/img/project/{{proj.name}}/{{img}}" alt="" />\r\n                                    </div>\r\n                                    \r\n                                </div>\r\n                            </div> --\x3e <div class="post-media"> <img ng-src="mazel/img/project/{{proj.name}}/{{proj.images[0]}}" alt=""> </div> <div class="post-meta"><span>by <a ng-bind="proj.author"></a>,</span> <span ng-bind="proj.name"></span></div> <div class="post-header"> <h4><a href="blog-single-slider-post.html" ng-bind="proj.title"></a></h4> </div> <div class="post-entry"> <p ng-bind="proj.desc"></p> </div> <div class="post-tag pull-left"><span><a ng-bind="proj.categories"></a></span></div> <div class="post-more-link pull-right"><a href="">Read More<i class="fa fa-long-arrow-right right"></i></a></div> </div> <hr ng-if="!$last"> </div> <div class="pagination-nav mt-60 mtb-xs-30"> <ul ng-if="pager.pages.length"> \x3c!--  <li ng-class="{disabled:pager.currentPage === 1}">\r\n                                    <a ng-click="setPage(1)">First</a>\r\n                                </li> --\x3e <li ng-class="{disabled:pager.currentPage === 1}"> <a ng-click="setPage(pager.currentPage - 1)"><i class="fa fa-angle-left"></i></a> </li> <li ng-repeat="page in pager.pages" ng-class="{active:pager.currentPage === page}"> <a ng-click="setPage(page)">{{page}}</a> </li> <li ng-class="{disabled:pager.currentPage === pager.totalPages}"> <a ng-click="setPage(pager.currentPage + 1)"><i class="fa fa-angle-right"></i></a> </li> \x3c!-- <li ng-class="{disabled:pager.currentPage === pager.totalPages}">\r\n                                    <a ng-click="setPage(pager.totalPages)">Last</a>\r\n                                </li> --\x3e </ul> </div> </div> \x3c!-- End Post Item --\x3e </div> </div> </section> \x3c!-- End Blog Post Section --\x3e'),e.put("app/modules/detail/view/detail.html",' \x3c!-- Intro Section --\x3e <section class="inner-intro bg-image overlay-light parallax parallax-background1" ng-style="{\'background-image\':\'url(mazel/img/project/{{project.name}}/{{project.details.headerImage}})\'}"> <div class="container"> <div class="row title"> <h2 class="h2">{{project.header}}</h2> <div class="page-breadcrumb"> {{project.headerTag}} </div> </div> </div> </section> \x3c!-- End Intro Section --\x3e \x3c!-- Work Detail Section --\x3e <section class="pt pt-sm-80"> <div class="container"> <div class="row mb-60 mb-xs-30"> <div class="col-md-4 mb-30"> <div class="project-detail-block"> <p ng-if="project.details.categories"> <strong class="dark-color">Categories:</strong> <span>{{project.details.categories}}</span> </p> <p ng-if="project.details.released"> <strong class="dark-color">Released :</strong>{{project.details.released}} </p> <p ng-if="project.details.client"> <strong class="dark-color">Client :</strong><a>{{project.details.client}}</a> </p> <p ng-if="project.details.link"> <strong class="dark-color">Link :</strong>{{project.details.link}} </p> <p ng-if="project.details.impact"> <strong class="dark-color">Impact :</strong>{{project.details.impact}} </p> </div> </div> <div class="col-md-8"> <h4>{{project.details.title}}</h4> <p class=""> {{project.details.desc}} </p> </div> </div> <div class="row"> <div class="col-md-12"> <img class="item-container" ng-src="mazel/img/project/{{project.name}}/{{project.image}}" alt="1"> </div> </div> <div class="row mtb-60 mtb-xs-30"> <div ng-repeat="p in project.details.columns track by $index" class="col-md-4 mb-30"> <h5>{{p.header}}</h5> <p>{{p.content}}</p> </div> </div> <div class="row mtb-60 mtb-xs-30"> <div class="testimonial text-center dark-color"> <div class="container-icon"><i class="fa fa-quote-right"></i></div> <p class="lead"> {{project.details.workQuote[0].quote}}</p> <h6 class="quote-author">{{project.details.workQuote[0].author}}</h6> </div> </div> \x3c!-- End Testimonials --\x3e <div ng-repeat="img in project.details.images track by $index" class="row mb-60 mb-xs-30"> <div class="col-md-12"> <img class="item-container" ng-src="mazel/img/project/{{project.name}}/{{img}}" alt="1"> </div> </div> </div> </section> \x3c!-- <section class="ptb ptb-sm-80">\r\n            <div class="container">\r\n                <div class="row">\r\n                    <div class="col-md-8 offset-md-2 text-center">\r\n                        <h3 class="">architecto beatae vitae</h3>\r\n                        <p class="mt-15">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.</p>\r\n                        <br />\r\n                        <a class="btn btn-lg btn-black">Download now</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </section>\r\n --\x3e <section ng-if="project.details.roles.length > 0" class="ptb ptb-sm-80"> <div class="wow fadeIn container text-center"> <h3>Our Role</h3> <div class="spacer-60"></div> <div class="row"> <div ng-repeat="role in project.details.roles" class="col-md-4"> <div class="page-icon-top"><i class="{{role.image}}"></i></div> <h5 ng-bind="role.header"></h5> <p ng-bind="role.desc"></p> </div> </div> </div> </section> <hr> <section class="ptb ptb-sm-80"> <div class="container text-center"> <h4>Related Project</h4> <div class="row"> <div class="col-lg-4 spacing-grid"> <div class="item-box"> <a> <img alt="1" src="img/portfolio/1.jpg" class="item-container"> <div class="item-mask"> <div class="item-caption"> <h5 class="white">Consequat massa quis</h5> <p class="white">Branding, Design, Coffee</p> </div> </div> </a> </div> </div> <div class="col-lg-4 spacing-grid"> <div class="item-box"> <a> <img alt="1" src="img/portfolio/3.jpg" class="item-container"> <div class="item-mask"> <div class="item-caption"> <h5 class="white">Consequat massa quis</h5> <p class="white">Branding, Design, Coffee</p> </div> </div> </a> </div> </div> <div class="col-lg-4 spacing-grid"> <div class="item-box"> <a> <img alt="1" src="img/portfolio/5.jpg" class="item-container"> <div class="item-mask"> <div class="item-caption"> <h5 class="white">Consequat massa quis</h5> <p class="white">Branding, Design, Coffee</p> </div> </div> </a> </div> </div> </div> </div> </section> \x3c!-- End Work Detail Section --\x3e \x3c!-- Work Next Prev Bar --\x3e <section class="mb-60"> <div class="container"> <div class="item-nav"> <a class="item-prev" ui-sref="detail({project:projects, index: prevIndex})"> <div class="prev-btn"><i class="fa fa-angle-left"></i></div> <div class="item-prev-text xs-hidden"> <h6>Prev Project</h6> </div> </a> <a class="item-all-view"> <h6 ui-sref="works">All Work</h6> </a> <a class="item-next" ui-sref="detail({project:projects, index: nextIndex})"> <div class="next-btn"><i class="fa fa-angle-right"></i></div> <div class="item-next-text xs-hidden"> <h6>Next Project</h6> </div> </a> </div> </div> </section> \x3c!-- End Work Next Prev Bar --\x3e \x3c!-- End CONTENT ------------------------------------------------------------------------------\x3e'),e.put("app/modules/home/view/home.html",'<section id="intro"> \x3c!-- Hero Slider Section --\x3e \x3c!-- <div class="flexslider fullscreen-carousel hero-slider-1 " > --\x3e \x3c!-- <ul class ="slides"> --\x3e <flex-slider flex-slide="s in content.slider track by s.index" animation="slide" class="flexslider fullscreen-carousel hero-slider-1" flexslider> <li data-slide="{{s.type}}"> <div class="slide-bg-image overlay-light parallax parallax-section1" data-background-img="{{s.img}}"> <div class="js-Slide-fullscreen-height container"> <div class="intro-content"> <div class="intro-content-inner"> <h2 class="h2">{{s.header}}</h2> <p class="lead">{{s.content}}</p> <div> <a class="btn btn-md btn-black-line">Read More</a><span class="btn-space-10 xs-hidden"> </span></div> </div> </div> </div> </div> </li> </flex-slider> \x3c!-- </div> --\x3e \x3c!-- </ul> --\x3e \x3c!-- </div> --\x3e \x3c!-- End Hero Slider Section --\x3e </section> <div class="clearfix"></div> \x3c!-- About Section --\x3e <section id="about" class="pt pt-sm-80"> <div class="container text-center"> <div class="row"> <div class="col"> <div class="col-md-8 offset-md-2"></div> <h2> <span class="color">{{:: content.title.part1}}</span> {{:: content.title.part2}}<br> {{:: content.title.part3}} </h2> </div> </div> </div> </section> <section class="ptb ptb-sm-80"> <div class="container"> \x3c!-- work Filter --\x3e <div class="row"> <ul class="col container-filter categories-filter"> <li ng-repeat="cat in categories track by $index"> <a ng-show="cat.name == \'all\'" class="categories {{cat.active}}" data-filter="*">{{cat.name}}</a> <a ng-show="cat.name !== \'all\'" class="categories {{cat.active}}" data-filter=".{{cat.name}}">{{cat.name}}</a> </li> </ul> </div> \x3c!-- End work Filter --\x3e <div class="row container-grid nf-col-3"> <div ng-repeat="proj in filteredProj = (projects) track by proj.index" class="nf-item {{proj.categories}} spacing"> <div class="item-box"> <a ui-sref="detail({projects:projects, index: proj.index})"> <img alt="1" ng-src="mazel/img/project/{{proj.name}}/{{proj.image}}" class="item-container"> <div class="item-mask"> <div class="item-caption"> <h5 class="white" ng-bind="proj.header"></h5> <p class="white">{{proj.headerTag}}</p> </div> </div> </a> </div> </div> <div ng-hide="filteredProj.length">No items found</div> </div> </div> </section>'),e.put("app/modules/practices/view/practices.html",'<section class="inner-intro dark-bg bg-image overlay-dark parallax parallax-background1" data-background-img="mazel/img/full/18.jpg"> <div class="container"> <div class="row title"> <h2 class="h2" ng-bind="pageContent.header.title"></h2> \x3c!-- <div class="page-breadcrumb">\r\n                        <a>Home</a>/<span>Service</span>\r\n                    </div> --\x3e </div> </div> </section> \x3c!-- End Intro Section --\x3e \x3c!-- Service Section --\x3e <section flexslider id="service" class="wow fadeIn pt pb-80"> <div class="container text-center"> <div class="row text-center"> <div class="col-md-8 offset-md-2"> <h3 class="h4" ng-bind="pageContent.content.title"></h3> <div class="spacer-15"></div> <p class="lead" ng-bind="pageContent.content.desc"></p> </div> </div> <div class="row mt-60"> <div ng-repeat="practice in pageContent.content.practices track by $index" class="col-md-4 mb-45"> <div class="page-icon-top"><i class="{{practice.image}}"></i></div> <h5 ng-bind="practice.title"></h5> <p ng-bind="practice.desc"></p> </div> </div> </div> </section> \x3c!-- Statement Section --\x3e <section class="dark-bg ptb-60" id="statement"> <div class="container text-center"> <div class="row"> <div class="col-md-8 offset-md-2"> <h4 class="mb-15" ng-bind="pageContent.content.statement"></h4> </div> </div> </div> </section> \x3c!-- End Statement Section --\x3e \x3c!-- Contant Slider Section --\x3e <section id="contant" class="wow fadeIn ptb ptb-sm-80"> <div class="owl-carousel content-carousel content-slider"> <div class="item"> <div class="container"> <div class="row"> <div class="col-md-6 mb-sm-30"> <img src="img/moc-1.png" alt=""> </div> <div class="col-md-5 offset-md-1"> <h3 ng-bind="pageContent.content.projects[0].title"></h3> <div class="spacer-15"></div> <p>{{pageContent.content.projects[0].desc}}</p> <p>porttitor eu consequat vitae Phasellus viverra nulla ut metus varius laoreet</p> <div class="spacer-15"></div> <a class="btn btn-md btn-black">Read More</a> </div> </div> </div> </div> <div class="item"> <div class="container"> <div class="row"> <div class="col-md-5 mb-sm-30"> <h3>Multiprapose Theme</h3> <div class="spacer-15"></div> <p>Cras dapibus Vivamus elementum semper nisi Aenean vulputate eleifend tellus Aenean leo ligula, porttitor eu consequat vitae Phasellus viverra nulla ut metus varius laoreet.</p> <p>porttitor eu consequat vitae Phasellus viverra nulla.</p> <div class="spacer-15"></div> <a class="btn btn-md btn-black">Buy Now</a> </div> <div class="col-md-6 offset-md-1"> <img src="img/moc-1.png" alt=""> </div> </div> </div> </div> <div class="item"> <div class="container"> <div class="row"> <div class="col-md-6 mb-sm-30"> <img src="img/moc-2.png" alt=""> </div> <div class="col-md-5 offset-md-1"> <h3>Fully Responsive</h3> <div class="spacer-15"></div> <p>Cras dapibus Vivamus elementum semper nisi Aenean vulputate eleifend tellus Aenean leo ligula, porttitor eu consequat vitae Phasellus viverra nulla ut metus varius laoreet.</p> <p>porttitor eu consequat vitae Phasellus viverra nulla ut metus varius laoreet</p> <div class="spacer-15"></div> <a class="btn btn-md btn-black">Buy Now</a> </div> </div> </div> </div> </div> </section> \x3c!-- End Contain Slider Section --\x3e'),e.put("app/modules/works/view/works.html",' <section class="inner-intro dark-bg bg-image overlay-dark parallax parallax-background1" data-background-img="mazel/img/full/25.jpg"> <div class="container"> <div class="row title"> <h2 class="h2">WORKS</h2> \x3c!--  <div class="page-breadcrumb">\r\n                        <a>Home</a>/<a>Portfolio</a>/<span>Grid</span>\r\n                    </div> --\x3e </div> </div> </section> \x3c!-- End Intro Section --\x3e \x3c!-- Work Detail Section --\x3e <section class="ptb ptb-sm-80" flexslider> <div class="container"> \x3c!-- work Filter --\x3e <div class="row"> <ul class="col container-filter categories-filter"> <li ng-repeat="cat in categories track by $index"> <a ng-show="cat.name == \'all\'" class="categories {{cat.active}}" data-filter="*">{{cat.name}}</a> <a ng-show="cat.name !== \'all\'" class="categories {{cat.active}}" data-filter=".{{cat.name}}">{{cat.name}}</a> </li> </ul> </div> \x3c!-- End work Filter --\x3e <div class="row container-grid nf-col-3"> <div ng-repeat="proj in filteredProj = (projects) track by proj.index" class="nf-item {{proj.categories}} spacing"> <div class="item-box"> <a ui-sref="detail({projects:projects, index: proj.index})"> <img alt="1" ng-src="mazel/img/project/{{proj.name}}/{{proj.image}}" class="item-container"> <div class="item-mask"> <div class="item-caption"> <h5 class="white" ng-bind="proj.header"></h5> <p class="white">{{proj.headerTag}}</p> </div> </div> </a> </div> </div> <div ng-hide="filteredProj.length">No items found</div> </div> </div> </section> \x3c!-- End Work Detail Section--\x3e ')}]);