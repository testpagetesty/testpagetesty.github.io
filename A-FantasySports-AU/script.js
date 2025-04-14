document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 500);
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.transform = 'translateY(0)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;

    if (mobileMenuToggle && navList) {
        console.log('Mobile menu elements found:', { mobileMenuToggle, navList });

        mobileMenuToggle.addEventListener('click', function() {
            console.log('Menu button clicked');
            console.log('Current state:', {
                isActive: this.classList.contains('active'),
                menuOpen: navList.classList.contains('active'),
                bodyLocked: body.classList.contains('menu-open')
            });

            this.classList.toggle('active');
            navList.classList.toggle('active');
            body.classList.toggle('menu-open');

            console.log('New state:', {
                isActive: this.classList.contains('active'),
                menuOpen: navList.classList.contains('active'),
                bodyLocked: body.classList.contains('menu-open')
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            console.log('Document clicked:', event.target);
            if (!event.target.closest('.nav') && !event.target.closest('.mobile-menu-toggle')) {
                console.log('Click outside menu detected');
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('Navigation links found:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Navigation link clicked:', this.textContent);
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    } else {
        console.error('Mobile menu elements not found:', { mobileMenuToggle, navList });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Animate Elements on Scroll
    const animateElements = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateElements);
    animateElements();

    // Animate Stats Counter
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let count = 0;
            const increment = target / speed;

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // Start counter animation when stats section is visible
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(statsSection);
    }

    // Form Validation
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }

            if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                input.classList.add('is-invalid');
            }
        });

        return isValid;
    };

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                showNotification('Proszę podać poprawny adres e-mail', 'error');
                return;
            }

            showNotification('Dziękujemy za zapisanie się do newslettera!', 'success');
            this.reset();
        });
    }

    // Helper Functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Image Hover Effect
    const heroImage = document.querySelector('.main-image');
    if (heroImage) {
        heroImage.addEventListener('mouseover', () => {
            heroImage.style.transform = 'scale(1.05)';
        });

        heroImage.addEventListener('mouseout', () => {
            heroImage.style.transform = 'scale(1)';
        });
    }

    // Инициализация Owl Carousel
    $('.hero-post-slides').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: true
    });

    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section-heading');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Загрузка новостей
    const loadLatestNews = async () => {
        const newsContainer = document.querySelector('#latest-news');
        if (!newsContainer) return;

        try {
            const demoNews = [
                {
                    title: 'Top strategie Fantasy Football 2024',
                    date: '2024-03-15',
                    excerpt: 'Poznaj najnowsze trendy i strategie w świecie Fantasy Football',
                    image: 'img/sport1.jpg'
                },
                {
                    title: 'Analiza wyników Fantasy Basketball sezonu',
                    date: '2024-03-14',
                    excerpt: 'Szczegółowy przegląd najlepszych graczy i drużyn sezonu',
                    image: 'img/sport2.jpg'
                },
                {
                    title: 'Nowe funkcje w Fantasy Baseball',
                    date: '2024-03-13',
                    excerpt: 'Odkryj nowe możliwości w najnowszej wersji Fantasy Baseball',
                    image: 'img/sport3.jpeg'
                }
            ];

            newsContainer.innerHTML = demoNews.map(news => `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100">
                        <img src="${news.image}" class="card-img-top" alt="${news.title}">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <div class="text-muted mb-3">${new Date(news.date).toLocaleDateString()}</div>
                            <p class="card-text">${news.excerpt}</p>
                            <a href="#" class="btn btn-primary">Czytaj więcej</a>
                        </div>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Błąd podczas ładowania wiadomości:', error);
            showNotification('Wystąpił błąd podczas ładowania wiadomości', 'error');
        }
    };

    // Inicjalizacja
    loadLatestNews();

    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Инициализация слайдера
    showSlide(0);

    // Автоматическая смена слайдов каждые 8 секунд
    setInterval(nextSlide, 8000);
}); 