// Enhanced JavaScript for Rii's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${id}"]`);

            if (scrollPos >= top && scrollPos <= bottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Update navigation on scroll
    window.addEventListener('scroll', updateActiveNav);

    // Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission (replace with your actual form handling)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: '300px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'
        });

        // Add to document
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '18px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.padding = '0';
        closeBtn.style.marginLeft = 'auto';

        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Floating animation for quotes
    const quotes = document.querySelector('.quotes');
    if (quotes) {
        let isHovered = false;

        quotes.addEventListener('mouseenter', () => {
            isHovered = true;
            quotes.style.transform = 'translateY(-5px)';
            quotes.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
        });

        quotes.addEventListener('mouseleave', () => {
            isHovered = false;
            quotes.style.transform = 'translateY(0)';
            quotes.style.boxShadow = 'none';
        });
    }

    // Enhanced skill hover effects
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))';
        });

        skill.addEventListener('mouseleave', function() {
            this.style.background = 'var(--surface-light)';
        });
    });

    // Rotating quotes functionality
    const rotatingQuotes = document.querySelector('.rotating-quotes');
    if (rotatingQuotes) {
        const quotes = rotatingQuotes.querySelectorAll('span');
        let currentQuote = 0;

        // Hide all quotes initially except the first one
        quotes.forEach((quote, index) => {
            if (index !== 0) {
                quote.style.display = 'none';
            }
        });

        // Rotate quotes every 3 seconds
        setInterval(() => {
            quotes[currentQuote].style.display = 'none';
            currentQuote = (currentQuote + 1) % quotes.length;
            quotes[currentQuote].style.display = 'block';
        }, 3000);
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Press 'h' to go to home
        if (e.key === 'h' || e.key === 'H') {
            document.querySelector('a[href="#home"]')?.click();
        }
        // Press 'a' to go to about
        if (e.key === 'a' || e.key === 'A') {
            document.querySelector('a[href="#about"]')?.click();
        }
        // Press 's' to go to skills
        if (e.key === 's' || e.key === 'S') {
            document.querySelector('a[href="#skills"]')?.click();
        }
        // Press 'p' to go to projects
        if (e.key === 'p' || e.key === 'P') {
            document.querySelector('a[href="#projects"]')?.click();
        }
        // Press 'c' to go to contact
        if (e.key === 'c' || e.key === 'C') {
            document.querySelector('a[href="#contact"]')?.click();
        }
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;

    function throttledScroll() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
            setTimeout(() => {
                ticking = false;
            }, 16); // ~60fps
        }
    }

    window.removeEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', throttledScroll);

    console.log('🚀 Rii\'s Portfolio loaded successfully!');
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        background: linear-gradient(135deg, #8b5cf6, #ec4899) !important;
        color: white !important;
        box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
    }

    .notification {
        backdrop-filter: blur(10px);
    }
`;
document.head.appendChild(style);
