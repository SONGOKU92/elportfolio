// Prevent page jumps from anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky header on scroll
const header = document.querySelector('header');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Form input animations
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    // Initial state check
    if (input.value.trim() !== '') {
        input.parentElement.classList.add('filled');
    }

    // Focus event
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focus');
    });

    // Blur event
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focus');
        
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('filled');
        } else {
            input.parentElement.classList.remove('filled');
        }
    });

    // Input event
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('filled');
        } else {
            input.parentElement.classList.remove('filled');
        }
    });
});

// Initialize animations when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hero section animations
    const heroElements = document.querySelectorAll('.hero .animate');
    heroElements.forEach((element, index) => {
        element.classList.add('fadeIn');
        element.style.animationDelay = `${0.2 * (index + 1)}s`;
    });

    // Initialize skill bars animation
    animateSkillBars();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize text typing animation
    if (document.querySelector('.typing-text')) {
        initTypingAnimation();
    }
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 500);
    });
}

// Scroll animations
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Show/hide portfolio items based on filter
        portfolioItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
            } else if (item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
            
            // Trigger animation
            setTimeout(() => {
                item.classList.add('animate');
            }, 100);
        });
    });
});

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'Développeur',
        'Etudiant en BTS SIO',
        'Passionné d\'informatique'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Removing characters
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Adding characters
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If finished typing phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end of phrase
        } 
        // If finished deleting phrase
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
}

// Parallax effect for sections with parallax-bg class
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        
        if (scrollPosition > elementTop - window.innerHeight && 
            scrollPosition < elementTop + elementHeight) {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = (scrollPosition - elementTop) * speed;
            element.style.backgroundPositionY = `${yPos}px`;
        }
    });
});

// Counter animation for numbers
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Initialize counter animation when elements are in viewport
const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(counterSection);
}
