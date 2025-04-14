// Modal functionality
const modals = {
    privacy: document.getElementById('privacy-modal'),
    cookies: document.getElementById('cookies-modal'),
    terms: document.getElementById('terms-modal')
};

// Open modal
function openModal(modalId) {
    const modal = modals[modalId];
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = modals[modalId];
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    Object.values(modals).forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Vielen Dank für Ihre Registrierung! Wir werden uns in Kürze bei Ihnen melden.');
    });
}

// News cards expansion
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('click', function() {
        const expandedContent = this.querySelector('.expanded-content');
        if (expandedContent) {
            expandedContent.classList.toggle('show');
        }
    });
});

// News Section Interaction
document.addEventListener('DOMContentLoaded', function() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            // Close all other cards first
            newsCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active');
                    const otherExpandedContent = otherCard.querySelector('.expanded-content');
                    otherExpandedContent.classList.remove('show');
                    const otherReadMore = otherCard.querySelector('.read-more');
                    otherReadMore.textContent = 'Klicken Sie hier für mehr Details';
                }
            });
            
            // Toggle active class for clicked card
            this.classList.toggle('active');
            
            // Toggle expanded content for clicked card
            const expandedContent = this.querySelector('.expanded-content');
            expandedContent.classList.toggle('show');
            
            // Update read more text for clicked card
            const readMore = this.querySelector('.read-more');
            if (this.classList.contains('active')) {
                readMore.textContent = 'Weniger anzeigen';
            } else {
                readMore.textContent = 'Klicken Sie hier für mehr Details';
            }
        });
    });
});

// Initialize Google Maps
function initMap() {
    const location = { lat: 48.2082, lng: 16.3738 }; // Vienna coordinates
    const map = new google.maps.Map(document.querySelector('.map'), {
        zoom: 15,
        center: location
    });
    new google.maps.Marker({
        position: location,
        map: map
    });
}

// Add animation classes on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, section h2');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        
        if (isVisible) {
            element.classList.add('animate-fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Cookie Consent
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const customizeCookies = document.getElementById('customize-cookies');

    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookieConsent')) {
        // Show cookie consent after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }

    // Handle accept all cookies
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
        // Set all cookies
        setCookies(true, true, true);
    });

    // Handle customize cookies
    customizeCookies.addEventListener('click', function() {
        // Here you can implement a more detailed cookie settings modal
        // For now, we'll just accept essential cookies
        localStorage.setItem('cookieConsent', 'customized');
        cookieConsent.classList.remove('show');
        setCookies(true, false, false);
    });

    // Function to set cookies
    function setCookies(essential, analytics, marketing) {
        if (essential) {
            // Set essential cookies
            document.cookie = "essential=true; path=/; max-age=31536000"; // 1 year
        }
        if (analytics) {
            // Set analytics cookies
            document.cookie = "analytics=true; path=/; max-age=31536000";
        }
        if (marketing) {
            // Set marketing cookies
            document.cookie = "marketing=true; path=/; max-age=31536000";
        }
    }
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
}); 