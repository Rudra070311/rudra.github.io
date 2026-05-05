// ==================== Scroll Progress Bar ====================
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ==================== Mobile Menu Toggle ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ==================== Active Navigation Link on Scroll ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Counter Animation ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ==================== Intersection Observer for Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            
            // Trigger counter animation when hero section is visible
            if (entry.target.classList.contains('hero')) {
                animateCounters();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and elements
const elementsToObserve = document.querySelectorAll('.project-card, .achievement-card, .skill-tag, .feature-item, .timeline-item, .highlight-card');
elementsToObserve.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ==================== Smooth Scroll for All Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== Typing Animation ====================
const typingElement = document.querySelector('.typing-cursor');
const text = 'Full Stack Developer & AI Specialist';
let charIndex = 0;
let isDeleting = false;

function typeText() {
    if (!typingElement) return;
    
    const textSpan = typingElement.querySelector('span') || typingElement;
    
    if (!isDeleting && charIndex < text.length) {
        textSpan.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, 50);
    } else if (isDeleting && charIndex > 0) {
        textSpan.textContent = text.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeText, 30);
    } else if (charIndex === text.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (charIndex === 0) {
        isDeleting = false;
        setTimeout(typeText, 500);
    }
}

// Start typing animation with delay
setTimeout(typeText, 500);

// ==================== Parallax Effect for Hero ====================
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrollPosition = window.scrollY;
        heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ==================== Button Click Effects ====================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Remove existing ripple if any
        const ripple = this.querySelector('.ripple');
        if (ripple) ripple.remove();
        
        // Create ripple effect
        const rippleEl = document.createElement('span');
        rippleEl.classList.add('ripple');
        rippleEl.style.width = rippleEl.style.height = '20px';
        rippleEl.style.left = (e.clientX - this.getBoundingClientRect().left - 10) + 'px';
        rippleEl.style.top = (e.clientY - this.getBoundingClientRect().top - 10) + 'px';
        this.appendChild(rippleEl);
        
        setTimeout(() => rippleEl.remove(), 600);
    });
});

// ==================== Floating Animation Pause on Scroll ====================
let scrollTimeout;
window.addEventListener('scroll', () => {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.style.animationPlayState = 'paused';
    });
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        floatingCards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }, 1500);
});

// ==================== Add Ripple Animation Style ====================
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Smooth Reveal on Load ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease-in';
});

// ==================== Mobile Responsive Menu Height ====================
function updateMenuHeight() {
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (navMenu && navbar) {
        const items = navMenu.querySelectorAll('.nav-link').length;
        const itemHeight = 50;
        const maxHeight = items * itemHeight;
        navMenu.style.maxHeight = navMenu.classList.contains('active') ? maxHeight + 'px' : '0px';
    }
}

window.addEventListener('resize', updateMenuHeight);

// ==================== Add Fade-in Animation to Body ====================
document.body.style.opacity = '0';
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
});

// ==================== Enhanced Touch Support for Mobile ====================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    const difference = touchStartX - touchEndX;
    
    if (difference > 50 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) hamburger.classList.remove('active');
    }
}

// ==================== Console Welcome Message ====================
console.log(
    '%c✨ Welcome to Rudra.dev ✨', 
    'font-size: 20px; font-weight: bold; color: #667eea; text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);'
);
console.log(
    '%cFull Stack Developer & AI Specialist',
    'font-size: 14px; color: #764ba2; font-weight: 600;'
);
console.log(
    '%cCheck out the amazing projects and achievements!',
    'font-size: 12px; color: #666; font-style: italic;'
);

// Add ripple effect to buttons
const buttons_ripple = document.querySelectorAll('.btn');
buttons_ripple.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add fade-in animation when page loads
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease';
});