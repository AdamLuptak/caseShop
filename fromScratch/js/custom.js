$(document).ready(function() {
    /* wow ======================================= */

    new WOW().init({
        offset: 20
    });
$('#myCarousel').carousel({
  interval: 3000
});
$('.carousel-linked-nav > li > a').click(function() {

    // grab href, remove pound sign, convert to number
    var item = Number($(this).attr('href').substring(1));

    // slide to number -1 (account for zero indexing)
    $('#myCarousel').carousel(item - 1);

    // remove current active class
    $('.carousel-linked-nav .active').removeClass('active');

    // add active class to just clicked on item
    $(this).parent().addClass('active');

    // don't follow the link
    return false;
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
    $('#buttonOrder').append('<a id="btn-order" class="btn btn-store btn-right"  href="#">Order now</a>');
   

// invoke the carousel
$('#myCarousel').carousel({
  interval: 3000
});

/* SLIDE ON CLICK */ 

$('.carousel-linked-nav > li > a').click(function() {

    // grab href, remove pound sign, convert to number
    var item = Number($(this).attr('href').substring(1));

    // slide to number -1 (account for zero indexing)
    $('#myCarousel').carousel(item - 1);

    // remove current active class
    $('.carousel-linked-nav .active').removeClass('active');

    // add active class to just clicked on item
    $(this).parent().addClass('active');

    // don't follow the link
    return false;
});

/* AUTOPLAY NAV HIGHLIGHT */

// bind 'slid' function
$('#myCarousel').bind('slid', function() {

    // remove active class
    $('.carousel-linked-nav .active').removeClass('active');

    // get index of currently active item
    var idx = $('#myCarousel .item.active').index();

    // select currently active item and add active class
    $('.carousel-linked-nav li:eq(' + idx + ')').addClass('active');

});



});

function co() {

    console.log("idem to");
}