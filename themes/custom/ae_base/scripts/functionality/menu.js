$(document).ready(function() {
    // $('.menu-toggle').hide();
    var width = screen.availWidth;
    var height = screen.availHeight;

    var openMobileNav = $('.nav_mobile--show');
    var closeMobileNav = $('.nav_mobile--hide');
    var mobileNav = $('.nav_mobile-container');

    // function toggleMainMenu() {
    $(openMobileNav).on('click', function(e) {
        console.log(mobileNav);
        mobileNav.show(300, 'swing');

        // var menu = $(this).data('show-nav');
        // $('.' + menu).slideToggle(300, 'swing');
    });

    $(closeMobileNav).on('click', function(e) {
        console.log(closeMobileNav);
        $(this)
            .parent()
            .hide(300, 'swing');
    });

    // $('.options-menu-horizontal').click(function() {
    //     $(this)
    //         .closest('.options-menu-horizontal')
    //         .slideUp(300, 'swing');
    // });
    // }

    // if (width <= 1024) {
    //     toggleMainMenu();
    // } else {
    //     $('.menu-toggle').hide();
    // }
});
