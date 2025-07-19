// Page Navigation and Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Page management
    const pages = {
        'home': 'marketing-page',
        'support': 'support-page'
    };

    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pages[pageId] || 'marketing-page');
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL hash
        history.pushState({}, '', `#${pageId}`);
    }

    // Smooth scrolling for anchor links
    function smoothScroll(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Handle navigation clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('[data-page], [data-scroll]');
        if (!link) return;
        
        e.preventDefault();
        
        if (link.hasAttribute('data-page')) {
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        } else if (link.hasAttribute('data-scroll')) {
            const targetId = link.getAttribute('data-scroll');
            // Make sure we're on the marketing page first
            if (!document.getElementById('marketing-page').classList.contains('active')) {
                showPage('home');
                // Wait for page transition, then scroll
                setTimeout(() => smoothScroll(targetId), 100);
            } else {
                smoothScroll(targetId);
            }
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash && pages[hash]) {
            showPage(hash);
        } else {
            showPage('home');
        }
    });

    // Initialize page based on URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && pages[initialHash]) {
        showPage(initialHash);
    } else {
        showPage('home');
    }

    // FAQ Toggle Functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        lastScrollY = currentScrollY;
    });

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

    // Observe feature cards and other elements
    document.querySelectorAll('.feature-card, .step, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading animation to app store button
    const appStoreBtn = document.querySelector('.app-store-btn');
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalImg = this.querySelector('img');
            originalImg.style.opacity = '0.7';
            
            // Simulate app store redirect (replace with actual link when ready)
            setTimeout(() => {
                originalImg.style.opacity = '1';
                // window.open('https://apps.apple.com/app/dialed', '_blank');
                console.log('App Store link clicked - add actual URL when app is live');
            }, 500);
        });
    }

    // Email links with subject lines
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href');
            let subject = '';
            
            if (email.includes('support@')) {
                subject = '?subject=Dialed App Support Request';
            } else if (email.includes('bugs@')) {
                subject = '?subject=Dialed App Bug Report';
            } else if (email.includes('feedback@')) {
                subject = '?subject=Dialed App Feature Request';
            } else if (email.includes('privacy@')) {
                subject = '?subject=Privacy Policy Inquiry';
            } else if (email.includes('contact@')) {
                subject = '?subject=General Inquiry';
            }
            
            this.setAttribute('href', email + subject);
        });
    });

    // Add smooth hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });

    console.log('Dialed website loaded successfully! 🚴⚡');
}); 
