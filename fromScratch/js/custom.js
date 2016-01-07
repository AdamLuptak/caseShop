$(document).ready(function() {


    /**
     * togle text a,b 
     * @param a,b
     *@return object
     */
    jQuery.fn.extend({
        toggleText: function(a, b) {
            var isClicked = false;
            var that = this;
            this.click(function() {
                if (isClicked) {
                    that.text(a);
                    isClicked = false;
                } else {
                    that.text(b);
                    isClicked = true;
                }
            });
            return this;
        }
    });

    /* Navbar colapse ======================================= */
    $(document).on('click.nav', '.navbar-collapse.in', function(e) {
        if ($(e.target).is('a') || $(e.target).is('button')) {
            $(this).collapse('hide');
        }
    });

    /* Smooth Hash Link Scroll ======================================= */
    $('.smooth-scroll').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                // console.log(offset());
                $('html,body').animate({
                    scrollTop: target.offset().top - 60
                }, 1000);
                return false;
            }
        }
    });

    /* wow ======================================= */

    new WOW().init({
        offset: 20
    });
    $('#Carousel').carousel({
        interval: 3000
    });
    $('.carousel-linked-nav > li > a').click(function() {

        // grab href, remove pound sign, convert to number
        var item = Number($(this).attr('href').substring(1));

        // slide to number -1 (account for zero indexing)
        $('#Carousel').carousel(item - 1);

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
    var lableSwitch = false;
    $("#show-btn").click(function() {
        // $('#showme').slideDown("slow");

        // $(this).hide();

        if (lableSwitch) {
            lableSwitch = !lableSwitch;
            $('#label-shop').slideDown("fast");
            $('#label-shop2').hide();
        } else {
            lableSwitch = !lableSwitch;
            $('#label-shop2').slideDown("fast");
            $('#label-shop').hide();
        }
        $('#showme').slideToggle();

        return false;
    });

    $("#hide-btn").click(function() {
        if (lableSwitch) {
            lableSwitch = !lableSwitch;
            $('#label-shop').slideDown("fast");
            $('#label-shop2').hide();
        } else {
            lableSwitch = !lableSwitch;
            $('#label-shop2').slideDown("fast");
            $('#label-shop').hide();
        }
        $('#showme').slideToggle();
    });
    $('#show-btn').toggleText("See all products", "Hide all products");

    /*Show read mi text*/
    $('#show-btn2').click(function() {
        $('#showme2').slideToggle();
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
    $('#Carousel').carousel({
        interval: 3000
    });

    /* SLIDE ON CLICK */

    $('.carousel-linked-nav > li > a').click(function() {

        // grab href, remove pound sign, convert to number
        var item = Number($(this).attr('href').substring(1));

        // slide to number -1 (account for zero indexing)
        $('#Carousel').carousel(item - 1);

        // remove current active class
        $('.carousel-linked-nav .active').removeClass('active');

        // add active class to just clicked on item
        $(this).parent().addClass('active');

        // don't follow the link
        return false;
    });

    /* AUTOPLAY NAV HIGHLIGHT */

    // bind 'slid' function
    $('#Carousel').bind('slid', function() {

        // remove active class
        $('.carousel-linked-nav .active').removeClass('active');

        // get index of currently active item
        var idx = $('#Carousel .item.active').index();

        // select currently active item and add active class
        $('.carousel-linked-nav li:eq(' + idx + ')').addClass('active');

    });

    $('.navbar-inverse .navbar-nav>li>a').click(function() {
        var size = $(window).width();
        if (size < 753) {
            $(this).attr('data-toggle', "collapse");
            $(this).attr('data-target', ".navbar-collapse")
        } else {
            $(this).removeAttr('data-toggle', "collapse");
            $(this).removeAttr('data-target', ".navbar-collapse")
        }
    });

    $('#product-slide').singlePageNav({
        offset: $('.navbar').height(),
        speed: 750,
        currentClass: 'active',
        filter: ':not(.external)',
        beforeStart: function() {},
        onComplete: function() {}
    });

    /**
     * Blinking arrow
     */
    setInterval(function() {
        blink()
    }, 500);


    function blink() {
        $("#blinking-arrow").fadeTo(100, 0.1).fadeTo(200, 1.0);
    }




});

function co() {

    console.log("idem to");
}