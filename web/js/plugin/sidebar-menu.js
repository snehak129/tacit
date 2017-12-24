
$(document).ready(function () {
    $menuSidebar = $('.pushmenu-right');
    $menusidebarNav = $('#menu-sidebar-list-icon');
    $menuSidebarclose = $('#menu-sidebar-close-icon');
    $menusidebarNav.click(function () {
        $(this).toggleClass('active');
        $('.pushmenu-push').toggleClass('pushmenu-push-toleft pushmenu-active');
        $menuSidebar.toggleClass('pushmenu-open');


    });
    $menuSidebarclose.click(function () {
        $menusidebarNav.removeClass('active');
        $('.pushmenu-push').removeClass('pushmenu-push-toleft');
        $menuSidebar.removeClass('pushmenu-open');

    });
    $('html').click(function (sMenuOutsite) {
        var target = $(sMenuOutsite.target);
        if ((target.closest($menusidebarNav).length === 0) && (target.closest($menuSidebarclose).length === 0) && (target.closest('.pushmenu').length === 0)) {
            $menusidebarNav.removeClass('active');
            $('.pushmenu-push').removeClass('pushmenu-push-toleft');
            $menuSidebar.removeClass('pushmenu-open')
        }
    });

    if ($(document).find('#pushmenu-right').hasClass('pushmenu')) {
        $('body').addClass('pushmenu-push pushmenu-push-left');
        $('body').removeClass('pushmenu-push-right');
    }

});

$(document).ready(function () {
    $menuLeftSidebar = $('.pushmenu-left');
    $menuLeftsidebarNav = $('#menu-left-sidebar-list-icon');
    $menuLeftSidebarclose = $('#menu-left-sidebar-close-icon');
    $menuLeftsidebarNav.click(function () {
        $(this).toggleClass('active');
        $('.pushmenu-push').toggleClass('pushmenu-push-toright pushmenu-active');
        $menuLeftSidebar.toggleClass('pushmenu-open');


    });
    $menuLeftSidebarclose.click(function () {
        $menuLeftsidebarNav.removeClass('active');
        $('.pushmenu-push').removeClass('pushmenu-push-toright');
        $menuLeftSidebar.removeClass('pushmenu-open');

    });
    $('html').click(function (sMenuOutsite) {
        var target = $(sMenuOutsite.target);
        if ((target.closest($menuLeftsidebarNav).length === 0) && (target.closest($menuLeftSidebarclose).length === 0) && (target.closest('.pushmenu').length === 0)) {
            $menuLeftsidebarNav.removeClass('active');
            $('.pushmenu-push').removeClass('pushmenu-push-toright');
            $menuLeftSidebar.removeClass('pushmenu-open')
        }
    });

    if ($(document).find('.pushmenu-left').hasClass('pushmenu')) {
        $('body').addClass('pushmenu-push pushmenu-push-right');
        $('body').removeClass('pushmenu-push-left');
    }


});

