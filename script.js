// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '🌙';
    }

    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Close mobile menu if open
            const nav = document.querySelector('.nav-container');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (window.innerWidth <= 768 && mobileMenuBtn.style.display !== 'none') {
                nav.style.display = 'none';
            }

            // Handle 'Home' link separately to scroll to the very top
            if (targetId === '#home') {
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 100);
                return;
            }

            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Small delay to ensure menu closes before scrolling
                setTimeout(() => {
                    const headerHeight = window.innerWidth <= 768 ? 60 : 80; // Smaller header on mobile
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // Form submission
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Create mailto link
            const subject = encodeURIComponent('Portfolio Contact Form Submission');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:jaheeth.offi0@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            form.reset();
        });
    }

    // Add active nav styling
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--accent-color) !important;
            background: rgba(255, 107, 0, 0.1) !important;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Animate elements on scroll
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

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Mobile menu toggle (if needed in future)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1001;
        font-size: 18px;
    `;
    
    document.body.appendChild(mobileMenuBtn);
    
    // Show mobile menu button on small screens
    function checkMobileMenu() {
        const nav = document.querySelector('.nav-container');
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            // Hide navigation by default on mobile
            nav.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            // Show navigation on desktop
            nav.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        const nav = document.querySelector('.nav-container');
        const isHidden = nav.style.display === 'none';
        nav.style.display = isHidden ? 'flex' : 'none';
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const optimizedScroll = debounce(function() {
    // Scroll-based optimizations here
}, 10);

window.addEventListener('scroll', optimizedScroll);
