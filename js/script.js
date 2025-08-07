// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const body = document.body;

    // Function to open mobile menu
    function openMobileMenu() {
        mobileMenuToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent body scrolling
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.style.overflow = ''; // Restore body scrolling
    }

    // Toggle mobile menu when hamburger button is clicked
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close mobile menu when overlay is clicked
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when a menu link is clicked
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Handle keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Add smooth scrolling to navbar links
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar when scrolling down, show when scrolling up (only on desktop)
        if (window.innerWidth > 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            // Always show navbar on mobile
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Enhanced form handling for new contact form
    const enhancedContactForm = document.querySelector('#enhanced-contact-form');
    if (enhancedContactForm) {
        enhancedContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEnhancedFormSubmission(this);
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission(this);
        });
    }

    // Partner cards animation and interaction
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach((card, index) => {
        // Staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stats counter animation
    const enhancedStatsNumbers = document.querySelectorAll('.achievement-number');
    const animateEnhancedStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent.replace(/\D/g, ''));
                animateNumber(target, finalNumber);
                observer.unobserve(target);
            }
        });
    };

    const enhancedStatsObserver = new IntersectionObserver(animateEnhancedStats, { threshold: 0.5 });
    enhancedStatsNumbers.forEach(stat => enhancedStatsObserver.observe(stat));

    // Contact cards animation
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Update active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`#navbar a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('#contact form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !phone || !message) {
            showNotification('Please fill in all fields!', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
    });

    // Order Now button functionality
    const orderButtons = document.querySelectorAll('.btn-primary, .btn');
    
    orderButtons.forEach(button => {
        if (button.textContent.includes('Order Now')) {
            button.addEventListener('click', function() {
                showNotification('🍕 Order feature coming soon! Call us at +91-9999999999 to place your order now!', 'info');
            });
        }
    });

    // View Menu button functionality
    const menuButtons = document.querySelectorAll('.btn-secondary');
    
    menuButtons.forEach(button => {
        if (button.textContent.includes('View Menu')) {
            button.addEventListener('click', function() {
                // Scroll to services section to show food options
                const servicesSection = document.querySelector('#services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                showNotification('📋 Check out our services below! Full menu coming soon.', 'info');
            });
        }
    });

    // Add parallax effect to floating cards
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.innerHTML;
            typeWriter(heroTitle, 'Delicious Food Delivered Fast', 80);
        }
    }, 1500);

    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add click effects to floating food cards
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.addEventListener('click', function() {
            const foodName = this.querySelector('h4').textContent;
            showNotification(`🍽️ ${foodName} looks delicious! Order feature coming soon.`, 'info');
        });
    });

    // Enhanced stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
                
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    if (finalNumber.includes('K')) {
                        target.textContent = Math.floor(current / 1000) + 'K+';
                    } else {
                        target.textContent = Math.floor(current) + '+';
                    }
                }, 30);
                
                observer.unobserve(target);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Service box animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Ensure service cards are visible and set up animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        // Make sure cards are visible
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Set up staggered animation delay
        card.style.setProperty('--animation-delay', `${index * 0.2}s`);
        
        // Observe for scroll animation
        observer.observe(card);
    });

    // Observe stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.setProperty('--animation-delay', `${index * 0.1}s`);
        observer.observe(card);
    });

    // Observe client items
    const clientItems = document.querySelectorAll('.client-item');
    clientItems.forEach(item => {
        observer.observe(item);
    });

    // Enhanced service button interactions
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceType = serviceCard.getAttribute('data-service');
            
            let message = '';
            switch(serviceType) {
                case 'ordering':
                    message = '🍕 Ready to order? Our delicious menu awaits! Call +91-9999999999';
                    break;
                case 'catering':
                    message = '🎉 Planning an event? Contact us for custom catering at +91-9999999999';
                    break;
                case 'bulk':
                    message = '📦 Need bulk orders? Get special rates! Call +91-9999999999';
                    break;
                default:
                    message = '📞 Contact us at +91-9999999999 for more information';
            }
            
            showNotification(message, 'info');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Service card click interactions
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button
            if (e.target.classList.contains('service-btn')) return;
            
            const serviceType = this.getAttribute('data-service');
            let message = '';
            
            switch(serviceType) {
                case 'ordering':
                    message = '🍽️ Explore our quick ordering system! Fast, easy, and reliable.';
                    break;
                case 'catering':
                    message = '🎊 Professional catering for all your special events and occasions.';
                    break;
                case 'bulk':
                    message = '🏢 Perfect for corporate events and large gatherings with special pricing.';
                    break;
            }
            
            showNotification(message, 'info');
        });
    });

    // Animate stats when they come into view
    const animateStatValues = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                const finalValue = statValue.textContent;
                
                if (finalValue.includes('.')) {
                    // For decimal values like 4.8
                    const numValue = parseFloat(finalValue);
                    animateDecimalCounter(statValue, numValue);
                } else {
                    // For whole numbers
                    const numValue = parseInt(finalValue);
                    animateCounter(statValue, numValue);
                }
                
                observer.unobserve(entry.target);
            }
        });
    };

    const statsCardsObserver = new IntersectionObserver(animateStatValues, {
        threshold: 0.5
    });

    statCards.forEach(card => {
        statsCardsObserver.observe(card);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 50);
    }

    function animateDecimalCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(1);
        }, 50);
    }
});

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
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontSize: '14px',
        fontFamily: '"Bree Serif", serif',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

// Enhanced form submission handler
function handleEnhancedFormSubmission(form) {
    const formData = new FormData(form);
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

    // Simulate form submission
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Newsletter submission handler
function handleNewsletterSubmission(form) {
    const email = form.querySelector('.newsletter-input').value;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    const submitBtn = form.querySelector('.newsletter-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Successfully subscribed to our newsletter!', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Number animation for stats
function animateNumber(element, finalNumber) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentNumber = Math.floor(progress * finalNumber);
        element.textContent = currentNumber + (finalNumber >= 100 ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'info':
            notification.style.background = '#3498db';
            break;
        default:
            notification.style.background = '#95a5a6';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});
