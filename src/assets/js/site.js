/*
 *   Beetle
 *   Written by Pasquale Vitiello (pasqualevitiello@gmail.com),
 *   mokaine.com
 */

jQuery(document).ready(function ($) {


    /* Define some vars */

    var win = $(window),
        doc = $(document),
        body = $('body'),
        header = $('header'),
        headerHeight = header.outerHeight(true),
        headerNav = $('nav'),
        content = $('main'),
        pxWrapper = $('#intro-wrap'),
        pxContainer = $('#intro'),
        pxImg = $('.intro-item'),
        pxImgCaption = pxContainer.find('.caption'),
        testimonial = $('.testimonial-slider'),
        cCarousel = $('.custom-carousel'),
        loaderIntro = '<div class="landing landing-slider"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
        loader = '<div class="landing landing-els"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
        loaderLightbox = '<div class="landing landing-els lightbox"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
        darkover = '<div class="darkover"></div>',
        moreBtnIcon = '<div class="more"><a href="#main"><i class="fa fa-chevron-down"></i></a></div>';


    /* Determine viewport width matching with media queries */

    function viewport() {

        var e = window,
            a = 'inner';

        if (!('innerWidth' in window)) {

            a = 'client';
            e = document.documentElement || document.body;

        }

        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        };

    }


    /* Toggle "mobile" class */

    function mobileClass() {

        var vpWidth = viewport().width; // This should match media queries

        if ((vpWidth <= 768) && (!body.hasClass('mobile'))) {

            body.addClass('mobile');

        } else if ((vpWidth > 768) && (body.hasClass('mobile'))) {

            body.removeClass('mobile');

        }

    }

    mobileClass();
    $(window).resize(mobileClass);


    /* Intro Height */

    function introHeight() {

        var $this = pxWrapper,
            dataHeight = $this.data('height');

        if ($this.hasClass('full-height')) {

            var recalcHeaderH = header.outerHeight(true);

            if (!body.hasClass('mobile')) {

                $this.css({
                    'height': (win.height())
                });

            } else {

                $this.css({
                    'height': (win.height() - recalcHeaderH)
                });

            }

        } else {

            $this.css({
                'height': dataHeight + 'em'
            });

        }

    }


    /* Initialize Intro */

    function initIntro() {

        var $this = pxContainer;

        $this.append(loaderIntro);

        $this.addClass(function () {
            return $this.find('.intro-item').length > 1 ? "big-slider" : "";
        });

        $this.waitForImages({

            finished: function () {

                // console.log('All images have loaded.');
                $('.landing-slider').remove();

                if ($this.hasClass('big-slider')) {

                    var autoplay = $this.data('autoplay'),
                        navigation = $this.data('navigation'),
                        pagination = $this.data('pagination'),
                        transition = $this.data('transition');

                    $this.owlCarousel({
                        singleItem: true,
                        autoPlay: autoplay || false, // || = if data- is empty or if it does not exists
                        transitionStyle: transition || false,
                        stopOnHover: true,
                        responsiveBaseWidth: ".slider",
                        responsiveRefreshRate: 0,
                        addClassActive: true,
                        navigation: navigation || false,
                        navigationText: [
                            "<i class='icon icon-arrow-left-simple'></i>",
                            "<i class='icon icon-arrow-right-simple'></i>"
                        ],
                        pagination: pagination || false,
                        rewindSpeed: 2000,
                    });

                }

                $this.removeClass('preload');

                if ($this.hasClass('darken')) {
                    pxImg.append(darkover);
                }

                if (pxWrapper.length && $this.hasClass('more-button') && $this.attr('data-pagination') !== 'true') {
                    $this.append(moreBtnIcon);
                    smoothScroll();
                }

            },
            waitForAll: true
        });

    }

    if (pxContainer.length) {

        initIntro();
        introHeight();
        $(window).resize(introHeight);

    }

    if($('#service-box-1').length){
      $('#service-box-1, #service-box-2').matchHeight();
      $('#service-box-3, #service-box-4').matchHeight();
      $('#service-box-5, #service-box-6').matchHeight();
    }

    /* Smooth scroll */

    function smoothScroll() {

        $('a[href*=#]:not([href=#])').click(function () {

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);

                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {

                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 500);

                    return false;

                }

            }

        });

    }

    smoothScroll();


    /* Fixed header if there's no Big slider */

    if (!pxWrapper.length) {

        header.addClass('fixed-header');

    }


    /* Parallax data attributes according to #intro's height */

    function parallax() {

        if (pxWrapper.length) {

            var touchDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (touchDevice) {

                body.addClass('no-parallax');

            } else if (!body.hasClass('mobile') && !body.hasClass('no-parallax')) {

                pxContainer.attr('data-anchor-target', '#intro-wrap');
                pxContainer.attr('data-top', 'transform:translateY(0px);');
                header.attr('data-anchor-target', '#intro-wrap');
                header.attr('data-top', 'transform:translateY(0px);');
                if (touchDevice) {
                    pxContainer.attr('data-top-bottom', 'transform:translateY(0px);');
                    header.attr('data-top-bottom', 'transform:translateY(0px);');
                    header.addClass('transition');
                    // console.log('Disable Parallax');

                } else {
                    pxContainer.attr('data-top-bottom', 'transform:translateY(' + '-' + pxWrapper.height() / 4 + 'px);');
                    header.attr('data-top-bottom', 'transform:translateY(' + '-' + pxWrapper.height() / 4 + 'px);');
                }
                animDone = false;

                skrollr.init({
                    forceHeight: false,
                    smoothScrolling: false,
                    mobileCheck: function () {
                        //hack - forces mobile version to be off
                        return false;
                    }
                    /* easing: 'swing', */
                    /*
                    render: function(data) {
                        //Log the current scroll position.
                        console.log(data.curTop);
                    }
                    */
                }).refresh();

                pxImgCaption.each(function () {

                    var $this = $(this);

                    $this.css({
                        top: ((pxWrapper.height() + headerHeight / 2) - $this.outerHeight()) / 2
                    });

                });

            } else {

                skrollr.init().destroy();
                content.css({
                    marginTop: 0 + 'px'
                });

                var parallaxEls = $('header, #intro'),
                    attrs = parallaxEls[0].attributes,
                    name,
                    index;

                for (index = attrs.length - 1; index >= 0; --index) {
                    name = attrs[index].nodeName;

                    if (name.substring(0, 5) === "data-") {
                        parallaxEls.removeAttr(name);
                    }

                }

                parallaxEls.css({
                    '-webkit-transform': '',
                    '-moz-transform': '',
                    'transform': '',
                    'backgroundPosition': ''
                }).removeClass('skrollable-after');

                pxImgCaption.each(function () {

                    var $this = $(this);

                    if (!body.hasClass('mobile') && body.hasClass('no-parallax')) {

                        $this.css({
                            top: ((pxWrapper.height() + headerHeight) - $this.outerHeight()) / 2
                        });

                    } else {

                        $this.css({
                            top: (pxWrapper.height() - $this.outerHeight()) / 2
                        });

                    }

                });

            }

        } else {

            if (!body.hasClass('mobile')) {

                content.css({
                    marginTop: headerHeight + 'px'
                });

            } else {

                content.css({
                    marginTop: 0
                });

            }

        }

    }

    parallax();
    $(window).resize(parallax);


    /* Fixed Header */
    function fixedHeader() {
      var lastY = win.scrollTop(),
          iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
          headerVisible = 0;

      var scrollUp = function (){
        if (header.hasClass('skrollable-after')) {
          if(!headerVisible){
            header.addClass('fixed-header').css({
              'display': 'none'
            }).fadeIn(300);

            headerVisible = 1;
          }
        }
        else {
          header.removeClass('fixed-header');
        }
      };

      var scrollDown = function (){
        if (headerVisible) {
          header.removeClass('fixed-header');
          headerVisible = 0;
        }
      };

      // iOS can't handle momentum scroll properly (See discussion on
      // http://stackoverflow.com/questions/2863547).
      if (!iOS) {
        win.on('scroll', function() {
          var y = win.scrollTop();

          // Ignore elastic scrolling.
          if (y < 0 || y > (doc.height() - win.height())) {
            return;
          }

          if (y < lastY) { // Scrolling up
            scrollUp();
          } else if (y > lastY) { // Scrolling down
            scrollDown();
          }

          lastY = y;
        })

      }
      else {
        win.on('touchstart', function () {
          lastY = win.scrollTop();
        });

        win.on('touchend', function () {
          var y = win.scrollTop();
          if (y < lastY) { // Scrolling up
            scrollUp();
          } else if (y > lastY) { // Scrolling down
            scrollDown();
          }

          lastY = y;
        })
      }
    }

    fixedHeader();

    /* Submenus */

    var menuToggle = $('#menu-toggle'),
        headerNavUl = headerNav.children('ul'),
        liWithSub = headerNavUl.children('li:has(ul.sub-menu)'),
        ulSub = $('ul.sub-menu'),
        parent = ulSub.children('li:has(ul.sub-menu)').children('a'),
        menuArrow = '<span class="sub-arrow"><i class="fa fa-chevron-down"></i></span>';

    liWithSub.addClass('parent').children('a').append(menuArrow);
    parent.addClass('parent');

    menuToggle.click(function () {

        headerNavUl.slideToggle(200);
        $(this).children('i').toggleClass('active');

        return false;

    });

    $(window).resize(function () {

        if (!body.hasClass('mobile')) {

            headerNavUl.removeAttr('style');
            menuToggle.children('i').removeClass('active');

        }

    });


    /* Make page's odd sections darker */

    var page = $('.page'),
        pageSections = page.find('.section'),
        oddSections = pageSections.filter(':odd');

    if (body.hasClass('page') && pageSections.length > 1) {
        oddSections.addClass('greyish');
    }


    /* Overlay content absolute centering */

    function centerOverlay() {

        var PortfolioOverlay = $('.overlay-content'),
            BlogOverlay = $('.blog-overlay');

        if (PortfolioOverlay.length) {

            PortfolioOverlay.each(function () {

                var $this = $(this),
                    itemPortfolioHeight = $this.closest('.item').height(),
                    PortfolioOverlayHeight = $this.height(),
                    PortfolioIcon = $this.children('.post-type');
                PortfolioIconHeight = PortfolioIcon.children('i').height();

                if ((PortfolioOverlayHeight + 30) > itemPortfolioHeight) {

                    $this.children('p').css({
                        'visibility': 'hidden'
                    });
                    $this.children('h2').css({
                        'visibility': 'hidden'
                    });

                    $this.css({
                        marginTop: (itemPortfolioHeight - PortfolioIconHeight) / 2
                    });

                } else {

                    $this.children('p').css({
                        'visibility': 'visible'
                    });
                    $this.children('h2').css({
                        'visibility': 'visible'
                    });
                    $this.css({
                        marginTop: (itemPortfolioHeight - PortfolioOverlayHeight) / 2
                    });

                }

            });

        }

        if (BlogOverlay.length) {

            BlogOverlay.each(function () {

                var $this = $(this),
                    itemBlogHeight = $this.prev('img').height(),
                    BlogOverlayIcon = $this.children('i'),
                    BlogOverlayIconHeight = BlogOverlayIcon.height();

                BlogOverlayIcon.css({
                    top: (itemBlogHeight - BlogOverlayIconHeight) / 2
                });

            });

        }

    }

    centerOverlay();
    $(window).on('load', centerOverlay);
    $(window).on('resize', centerOverlay);


    /* fix Blog Excerpt Heights */

    var blogExcerpt = $('.item.column.three .blog-excerpt');

    function fixBlogH() {

        var gridW = parseInt($('.grid-items').width()),
            sizerBigW = (gridW / 100) * 48,
            sizerBigH = sizerBigW * 0.75,
            sizerSmallW = (gridW / 100) * 22.05,
            sizerSmallH = sizerSmallW * 0.75,
            difference = sizerBigH - sizerSmallH + 0.5;

        // console.log(difference);

        if (!body.hasClass('mobile')) {

            blogExcerpt.css({
                'height': difference
            });

        } else {

            blogExcerpt.css({
                'height': 'auto'
            });

        }

    }

    if (blogExcerpt.length) {

        fixBlogH();
        $(window).on('resize', fixBlogH);

    }

    /* Timeline's circle color */

    var timeline = $('.timeline'),
        circle = timeline.find('.circle');

    if (timeline.length) {

        circle.each(function () {

            var circleColor = $(this).parents('section').css('background-color');
            $(this).css({
                backgroundColor: circleColor
            });

        });

    }

    /* Testimonial Carousel */

    function initTestimonial() {

        testimonial.each(function () {

            var $this = $(this),
                autoplay = $this.data('autoplay'),
                pagination = $this.data('pagination'),
                transition = $this.data('transition'),
                autoheight = $this.data('autoheight');

            $this.owlCarousel({
                singleItem: true,
                autoPlay: autoplay || false,
                transitionStyle: transition || false,
                autoHeight: autoheight || false,
                stopOnHover: true,
                responsiveBaseWidth: ".slider",
                responsiveRefreshRate: 0,
                addClassActive: true,
                pagination: pagination || false,
                rewindSpeed: 2000,
            });

        });

    }

    if (testimonial.length) {

        initTestimonial();

    }


    /* Custom Carousel */

    function initCCarousel() {

        cCarousel.each(function () {

            var $this = $(this),
                autoplay = $this.data('autoplay'),
                pagination = $this.data('pagination'),
                transition = $this.data('transition'),
                autoheight = $this.data('autoheight');

            $this.owlCarousel({
                singleItem: true,
                autoPlay: autoplay || false,
                transitionStyle: transition || false,
                autoHeight: autoheight || false,
                stopOnHover: true,
                responsiveBaseWidth: ".slider",
                responsiveRefreshRate: 0,
                addClassActive: true,
                pagination: pagination || false,
                rewindSpeed: 2000,
            });

        });

    }

    if (cCarousel.length) {

        initCCarousel();

    }


    /* onScreen Animations */

    var onScreenAnims = $('.animation');

    if (onScreenAnims.length) {

        onScreenAnims.onScreen({
            toggleClass: false,
            doIn: function () {
                $(this).addClass('onscreen')
            }
        });

    }


    /* Return the right mockup according to the class & initialize sliders */

    var findDevice = $('.slider');

    function useMockup() {

        findDevice.each(function () {

            var $this = $(this),
                slideHeight = $this.find('.owl-item').outerHeight(true),
                iphoneBlack = '<div class="mockup iphone-mockup black"></div>',
                iphoneWhite = '<div class="mockup iphone-mockup white"></div>',
                iphoneGrey = '<div class="mockup iphone-mockup grey"></div>',
                ipadBlack = '<div class="mockup ipad-mockup black"></div>',
                ipadWhite = '<div class="mockup ipad-mockup white"></div>',
                ipadGrey = '<div class="mockup ipad-mockup grey"></div>',
                desktop = '<div class="mockup desktop-mockup"></div>',
                deviceWrapper = $this.parent('.row-content'),
                mockupslider = $this.children('figure'),
                autoplay = $this.data('autoplay');

            if (!$this.parent('div').hasClass('side-mockup')) {

                mockupslider.owlCarousel({
                    singleItem: true,
                    autoPlay: autoplay || false,
                    stopOnHover: true,
                    responsiveBaseWidth: ".slider",
                    responsiveRefreshRate: 0,
                    addClassActive: true,
                    navigation: true,
                    navigationText: [
                        "<i class='fa fa-chevron-left'></i>",
                        "<i class='fa fa-chevron-right'></i>"
                    ],
                    pagination: false,
                    rewindSpeed: 2000,
                });

            } else {

                mockupslider.owlCarousel({
                    singleItem: true,
                    autoPlay: autoplay || false,
                    stopOnHover: true,
                    transitionStyle: "fade",
                    responsiveBaseWidth: ".slider",
                    responsiveRefreshRate: 0,
                    addClassActive: true,
                    navigation: false,
                    pagination: true,
                    rewindSpeed: 2000,
                    mouseDrag: false,
                    touchDrag: false
                });

            }

            if ($this.hasClass('iphone-slider black')) {

                $this.find('.owl-wrapper-outer').after(iphoneBlack);

            } else if ($this.hasClass('iphone-slider white')) {

                $this.find('.owl-wrapper-outer').after(iphoneWhite);

            } else if ($this.hasClass('iphone-slider grey')) {

                $this.find('.owl-wrapper-outer').after(iphoneGrey);

            } else if ($this.hasClass('ipad-slider black')) {

                $this.find('.owl-wrapper-outer').after(ipadBlack);

            } else if ($this.hasClass('ipad-slider white')) {

                $this.find('.owl-wrapper-outer').after(ipadWhite);

            } else if ($this.hasClass('ipad-slider grey')) {

                $this.find('.owl-wrapper-outer').after(ipadGrey);

            } else if ($this.hasClass('desktop-slider')) {

                $this.find('.owl-wrapper-outer').after(desktop);

            }

            $this.waitForImages({

                finished: function () {

                    $this.fadeIn('slow');

                },
                waitForAll: true
            });

            deviceWrapper.css({
                'padding-left': '0',
                'padding-right': '0'
            })


        });

    }

    if ((findDevice.length) && (!findDevice.hasClass('gallery'))) {

        useMockup();

        function fixArrowPos() {

            findDevice.each(function () {

                var slideHeight = $(this).find('.owl-item').outerHeight(true);

                $(this).find('.owl-prev, .owl-next').css('top', slideHeight / 2);

            });

        }

        fixArrowPos();
        $(window).resize(fixArrowPos);

    }


    /* Side mockups fixes */

    var sideMockup = $('.side-mockup');

    function sideMockups() {

        sideMockup.each(function () {

            var $this = $(this),
                sideMockupHeight = parseInt($this.find('.slider').height()),
                sideMockupParent = $this.parent('.row-content'),
                sideMockupParentPad = parseInt(sideMockupParent.css('padding-top')),
                sideMockupFix = sideMockupHeight + (sideMockupParentPad * 2) + 'px';

            if (!body.hasClass('mobile')) {

                if ($this.hasClass('right-mockup')) {

                    $this.css({
                        'position': 'absolute',
                        'left': '52%'
                    });

                } else if ($this.hasClass('left-mockup')) {

                    $this.css({
                        'position': 'absolute',
                        'right': '52%'
                    });

                }

                sideMockupParent.css({
                    'position': 'relative',
                    'min-height': sideMockupFix
                });

            } else {

                $this.css({
                    'position': 'relative',
                    'left': 'auto',
                    'right': 'auto'
                });

                sideMockupParent.css({
                    'position': 'relative',
                    'min-height': '0'
                });

            }

        });

    }


    if (sideMockup.length) {

        sideMockups();
        $(window).resize(sideMockups);

    }


    /* Initialize Gallery Sliders */

    var galleryslidercontainer = $('.gallery.slider');

    function gallerySlider() {

        galleryslidercontainer.each(function () {

            var $this = $(this),
                galleryslider = $this.children('figure'),
                autoplay = $this.data('autoplay'),
                autoheight = $this.data('autoheight');

            galleryslider.owlCarousel({
                singleItem: true,
                autoHeight: autoheight || false,
                autoPlay: autoplay || false,
                transitionStyle: "fade",
                stopOnHover: true,
                responsiveBaseWidth: ".slider",
                responsiveRefreshRate: 0,
                addClassActive: true,
                navigation: true,
                navigationText: [
                    "<i class='fa  fa-arrow-up'></i>",
                    "<i class='fa fa-arrow-down'></i>"
                ],
                pagination: false,
                rewindSpeed: 2000,
            });

            $this.fadeIn('slow');

        });

    }

    if (galleryslidercontainer.length) {

        gallerySlider();

    }


    /* Create unique data-lightbox attributes http://stackoverflow.com/questions/11044876/how-to-auto-generate-id-for-child-div-in-jquery */

    var lightboxContainer = $('.lightbox');

    if (lightboxContainer.length) {

        var $this = lightboxContainer;

        for (var i = 0; i < $this.length; i++) {

            $($this[i]).find('.item a').attr("data-lightbox", "gallery-" + i);

        }

        lightboxContainer.each(function () {

            var $this = $(this);

            var activityIndicatorOn = function () {
                $(loaderLightbox).appendTo('body');
            },
                activityIndicatorOff = function () {
                    $('.landing-els').remove();
                },
                overlayOn = function () {
                    $('<div id="imagelightbox-overlay"></div>').appendTo('body');
                },
                overlayOff = function () {
                    $('#imagelightbox-overlay').remove();
                },
                closeButtonOn = function (instance) {
                    $('<a href="#" id="imagelightbox-close"><i class="icon icon-close"></i></a>').appendTo('body').on('click', function () {
                        $(this).remove();
                        instance.quitImageLightbox();
                        return false;
                    });
                },
                closeButtonOff = function () {
                    $('#imagelightbox-close').remove();
                },
                captionOn = function () {
                    var description = $('a[href="' + $('#imagelightbox').attr('src') + '"]').find('h2').html();
                    if (description.length > 0)
                        $('<div id="imagelightbox-caption"><h3>' + description + '</h3></div>').appendTo('body');
                },
                captionOff = function () {
                    $('#imagelightbox-caption').remove();
                };


            var instance = $this.find('.item a[data-lightbox^="gallery-"]').imageLightbox({
                onStart: function () {
                    overlayOn();
                    closeButtonOn(instance);
                },
                onEnd: function () {
                    overlayOff();
                    captionOff();
                    closeButtonOff();
                    activityIndicatorOff();
                },
                onLoadStart: function () {
                    captionOff();
                    activityIndicatorOn();
                },
                onLoadEnd: function () {
                    captionOn();
                    activityIndicatorOff();
                }
            });

        });

    }

    // Contact Form

    $('#send-message').click(function(e){
      e.preventDefault();

      var $btn = $(this),
          $successEl = $('#contact-form').find('.message-success'),
          $errorEl = $('#contact-form').find('.message-error'),
          formData = $('#contact-form').serialize();

      $.ajax({
        url: "//formspree.io/contact@mdkholy.me",
        method: "POST",
        data: formData,
        dataType: "json",
        beforeSend: function(xhr, settings){
          $btn.val('Sending ...');
          $btn.attr('disabled', 'disabled');
          $successEl.hide();
          $errorEl.hide();
        },
        success: function(data, textStatus, xhr){
          $successEl.fadeIn();
        },
        complete: function(xhr, textStatus){
          $btn.val('Send a Message');
          $btn.removeAttr('disabled');
        },
        error: function(xhr, textStatus, errorThrown){
          $errorEl.find('.message-error').fadeIn();
        }
      });

      return false;
    });

    /* Add some "last" classes */

    headerNav.find('.menu-item').last('li').addClass('last');
    $('#top-footer').find('.column').last('.column').addClass('last');
    $('.blog.list-style').find('article').last('article').addClass('last');
    $('.search.list-style').find('article').last('article').addClass('last');

    /* Clear columns */
    var lastColumn = $('.column.last');
    if (lastColumn.length) {
        lastColumn.after('<div class="clear"></div>');
    }
});