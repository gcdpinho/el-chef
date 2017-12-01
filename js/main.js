jQuery(function ($) {
	'use strict';

	// Navigation Scroll
	$(window).scroll(function (event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function () {
		var offset = 5;
		if ($(window).width() > 1024)
			offset = 117;
		else
		if ($(window).width() <= 320)
			offset = 82;
		else
		if ($(window).width() >= 768)
			offset = 101;
		else
			offset = 92;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top - offset
		}, 1000);
		return false;

	});

	// User define function
	function Scroll() {
		var contentTop = [];
		var contentBottom = [];
		var winTop = $(window).scrollTop();
		var rangeTop = 200;
		var rangeBottom = 500;
		$('.navbar-collapse').find('.nav-item a').each(function () {
			contentTop.push($($(this).attr('href')).offset().top);
			contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
		})
		$.each(contentTop, function (i) {
			if (winTop > contentTop[i] - rangeTop) {
				$('.navbar-collapse li.nav-item a')
					.removeClass('active')
					.eq(i).addClass('active');
			}
		})
		if (($(window).scrollTop() + window.innerHeight == $(document).height()) && $(window).width() > 768) {
			$('.nav-item').find('.nav-link[href="#about"]').removeClass('active');
			$('.nav-item').find('.nav-link[href="#contact"]').addClass('active');
		}
	};

	$('#tohash').on('click', function () {
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top - 5
		}, 1000);
		return false;
	});

	// accordian
	$('.accordion-toggle').on('click', function () {
		$(this).closest('.panel-group').children().each(function () {
			$(this).find('>.panel-heading').removeClass('active');
		});

		$(this).closest('.panel-heading').toggleClass('active');
	});

	//Map
	function init_map1() {
		var myLocation = new google.maps.LatLng(-26.9116093, -48.9145721);
		var mapOptions = {
			center: myLocation,
			zoom: 16
		};
		var marker = new google.maps.Marker({
			position: myLocation,
			title: "JK'D Malhas"
		});
		var map = new google.maps.Map(document.getElementById("map1"),
			mapOptions);
		marker.setMap(map);
	}
	init_map1();

	//Slider
	$(document).ready(function () {
		//Init the carousel
		initSlider();

		function initSlider() {
			$('#main-slider').find('.owl-carousel').owlCarousel({
				items: 1,
				loop: true,
				autoplay: true,
				nav: true,
				dots: false,
				autoplayTimeout: 7000,
				onInitialized: startProgressBar,
				onTranslate: resetProgressBar,
				onTranslated: startProgressBar
			});
		}

		function startProgressBar() {
			// apply keyframe animation 
			$('.slide-progress').css({
				'width': '100%',
				'transition': 'width 7000ms'
			});
		}

		function resetProgressBar() {
			$('.slide-progress').css({
				'width': 0,
				'transition': 'width 0s'
			});
		}
		$('#slider-fotos').find('.owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			autoplay: true,
			nav: true,
			dots: false,
			autoplayTimeout: 15000,
			onInitialized: startProgressBar1,
			onTranslate: resetProgressBar1,
			onTranslated: startProgressBar1
		});

		function startProgressBar1() {
			// apply keyframe animation 
			$('.slider-progress').css({
				'width': '100%',
				'transition': 'width 15000ms'
			});
		}

		function resetProgressBar1() {
			$('.slider-progress').css({
				'width': 0,
				'transition': 'width 0s'
			});
		}
	});
	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();

	// portfolio filter
	$(window).on("load", function () {
		'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector: '.portfolio-item',
			layoutMode: 'fitRows'
		});

		$portfolio_selectors.on('click', function () {
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({
				filter: selector
			});
			return false;
		});
	});

	$(document).ready(function () {
		//Animated Progress
		$('.progress-bar').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$(this).css('width', $(this).data('width') + '%');
				$(this).unbind('inview');
			}
		});

		//Animated Number
		$.fn.animateNumbers = function (stop, commas, duration, ease) {
			return this.each(function () {
				var $this = $(this);
				var start = parseInt($this.text().replace(/,/g, ""));
				commas = (commas === undefined) ? true : commas;
				$({
					value: start
				}).animate({
					value: stop
				}, {
					duration: duration == undefined ? 1000 : duration,
					easing: ease == undefined ? "swing" : ease,
					step: function () {
						$this.text(Math.floor(this.value));
						if (commas) {
							$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
						}
					},
					complete: function () {
						if (parseInt($this.text()) !== stop) {
							$this.text(stop);
							if (commas) {
								$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
							}
						}
					}
				});
			});
		};

		$('.animated-number').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
			var $this = $(this);
			if (visible) {
				$this.animateNumbers($this.data('digit'), false, $this.data('duration'));
				$this.unbind('inview');
			}
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function (event) {
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function () {
				form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
			}
		}).done(function (data) {
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});

	if ($(window).width() < 768) {
		$("#contato").css('margin-top', $("#map1").height() + 50);
	}

	if ($(window).width() < 992) {
		$('.portfolio-link').removeAttr('href');
	}

	$('section#main-slider').css('padding-top', $('nav.navbar').height());

	var titles = [$("#portfolioModal1").find('.section-title').text(),
		$("#portfolioModal2").find('.section-title').text(),
		$("#portfolioModal3").find('.section-title').text()
	];
	var imgs = [$("#portfolioModal1").find('.img-fluid').attr('src'),
		$("#portfolioModal2").find('.img-fluid').attr('src'),
		$("#portfolioModal3").find('.img-fluid').attr('src')
	];
	var indexPortifolio = 0;

	$('.caption').click(function () {
		indexPortifolio = parseInt($(this).closest('.portfolio-link').attr('href').split('#portfolioModal')[1]);
		$('#portfolioModal' + indexPortifolio).find('.section-title').text(titles[indexPortifolio - 1]);
		$('#portfolioModal' + indexPortifolio).find('.img-fluid').attr('src', imgs[indexPortifolio - 1]);
	});

	$('.previous').click(function () {
		var port = $(this).closest('.portfolio-modal');

		if (indexPortifolio == 1)
			indexPortifolio = 3;
		else
			indexPortifolio--;

		port.find('.section-title').text(titles[indexPortifolio - 1]);
		port.find('.img-fluid').attr('src', imgs[indexPortifolio - 1]);

	});

	$('.next').click(function () {
		var port = $(this).closest('.portfolio-modal');

		if (indexPortifolio == 3)
			indexPortifolio = 1;
		else
			indexPortifolio++;

		port.find('.section-title').text(titles[indexPortifolio - 1]);
		port.find('.img-fluid').attr('src', imgs[indexPortifolio - 1]);

	});

	$('.portfolio-modal .close-modal').hover(function () {
		$('.portfolio-modal .close-modal .lr').css("background-color", '#3b7256');
		$('.portfolio-modal .close-modal .lr .rl').css("background-color", '#3b7256');
	}, function () {
		$('.portfolio-modal .close-modal .lr').css("background-color", '#212529');
		$('.portfolio-modal .close-modal .lr .rl').css("background-color", '#212529');
	});

});