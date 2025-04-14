(function ($) {
    "use strict";

    // Preloader
    $(window).on('load', function () {
        $('.preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // Mobile Menu
    $('.classy-navbar-toggler').on('click', function () {
        $('.classy-menu').toggleClass('menu-on');
    });

    // Hero Slider
    $('.hero-post-slides').owlCarousel({
        items: 1,
        margin: 0,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000
    });

    // Smooth Scroll
    $('a[href*="#"]:not([href="#"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                return false;
            }
        }
    });

    // Sticky Header
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('.header-area').addClass('sticky');
        } else {
            $('.header-area').removeClass('sticky');
        }
    });

    // Form Validation
    $('.contact-form-area form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var formData = form.serialize();
        
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            success: function (response) {
                alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                form[0].reset();
            },
            error: function () {
                alert('Wystąpił błąd. Spróbuj ponownie później.');
            }
        });
    });

    // News Filtering Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const categoryButtons = document.querySelectorAll('.sport-category');
        const newsCards = document.querySelectorAll('.news-card, .featured-news');

        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const selectedCategory = this.textContent.trim();
                
                newsCards.forEach(card => {
                    const cardCategory = card.querySelector('.badge').textContent.trim();
                    
                    if (selectedCategory === 'Все' || cardCategory === selectedCategory) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('fade-in');
                    }
                });
            });
        });
    });

})(jQuery); 