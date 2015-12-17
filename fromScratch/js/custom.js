$(document).ready(function() {
    /* wow ======================================= */

    new WOW().init({
        offset: 20
    });


    /* Hero slider ======================================= */

    $('#hero-slides').superslides({
        play: 4000,
        animation: 'fade'
    });
    /* owl slide ======================================= */
    var owl = $("#owl-demo");

    owl.owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        margin: 20,
        items: 3,
        pagination: false,
        navigation: false,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        lazyLoad: true

    });

    

    /* slideshowSwitch ======================================= */
    $(".next").click(function() {
        owl.trigger('owl.next');
    })
    $(".prev").click(function() {
        owl.trigger('owl.prev');
    })


    /* countdown ======================================= */
    var days = 3;
    var date = new Date();
    var res = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    $('#countdown').countdown(res, function(event) {
        $(this).text(
            event.strftime('%-d days %H:%M:%S')
        );
    });
    /* show about more  ======================================= */
    $("#show-btn").click(function() {
        $('#showme').slideDown("slow");
        $(this).hide();
        return false;
    });

    /* One Page Navigation Setup ======================================= */
    $('#main-nav').singlePageNav({
        offset: $('.navbar').height(),
        speed: 750,
        currentClass: 'active',
        filter: ':not(.external)',
        beforeStart: function() {},
        onComplete: function() {}
    });
    /* testimonial ======================================= */
    $('.carousel').carousel();
    /* Project Preview  ==============================================*/
  

});

function co() {

    console.log("idem to");
}