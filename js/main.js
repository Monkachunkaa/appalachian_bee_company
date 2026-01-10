/* ==========================================================================
   Appalachian Bee Company - Main JavaScript
   Handles mobile navigation, form validation, and smooth interactions
   ========================================================================== */

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // Dynamic Copyright Year
    // ==========================================================================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // ==========================================================================
    // Mobile Navigation Toggle
    // ==========================================================================
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const borders = document.querySelectorAll('.border');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            // Toggle the 'active' class to show/hide mobile menu
            const isActive = navList.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Handle border animations
            if (isActive) {
                // Menu is opening - remove unactive class to trigger animations
                borders.forEach(border => {
                    border.classList.remove('unactive');
                });
            } else {
                // Menu is closing - add unactive class to trigger reverse animations
                borders.forEach(border => {
                    border.classList.add('unactive');
                });
            }
            
            // Update aria-expanded for accessibility
            navToggle.setAttribute('aria-expanded', isActive);
        });
        
        // Close mobile menu when clicking a nav link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Add unactive class to borders when closing
                borders.forEach(border => {
                    border.classList.add('unactive');
                });
                
                navToggle.setAttribute('aria-expanded', false);
            });
        });
    }
    
    // ==========================================================================
    // Contact Form Handling
    // ==========================================================================
    const contactForm = document.querySelector('.contact__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // If validation passes, show success message
            // In production, you would send this data to a server
            showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ==========================================================================
    // Form Message Display Helper
    // ==========================================================================
    function showFormMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form__message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form__message form__message--${type}`;
        messageDiv.textContent = message;
        
        // Add styles for the message
        messageDiv.style.padding = '1rem';
        messageDiv.style.marginTop = '1rem';
        messageDiv.style.borderRadius = '4px';
        messageDiv.style.fontWeight = '600';
        
        if (type === 'error') {
            messageDiv.style.backgroundColor = '#ffebee';
            messageDiv.style.color = '#c62828';
            messageDiv.style.border = '1px solid #ef5350';
        } else {
            messageDiv.style.backgroundColor = '#e8f5e9';
            messageDiv.style.color = '#2e7d32';
            messageDiv.style.border = '1px solid #66bb6a';
        }
        
        // Insert message after form
        contactForm.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.style.transition = 'opacity 0.3s';
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    // ==========================================================================
    // Smooth Scroll Enhancement (for older browsers)
    // ==========================================================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Scroll to target with offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // If navigating to contact section, focus the name field
                if (targetId === '#contact') {
                    setTimeout(() => {
                        const nameField = document.getElementById('name');
                        if (nameField) {
                            nameField.focus();
                        }
                    }, 500); // Wait for scroll to complete
                }
            }
        });
    });
    
    // ==========================================================================
    // Header Scroll Effect - Show/Hide on Scroll
    // ==========================================================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    const scrollThreshold = 100; // Show header after scrolling 100px
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Show header when scrolled past threshold
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
            // Add shadow when scrolled
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
        } else {
            header.classList.remove('scrolled');
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
});
