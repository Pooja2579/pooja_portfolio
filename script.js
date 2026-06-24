// Smooth scrolling for navigation links
// ===== HEADER SCROLL EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== HAMBURGER MENU =====
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav-link');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close menu on overlay click
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Project card hover effect (enhanced)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(122, 49, 191, 0.3)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        });
    });

    // Navbar active link highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '#ffff';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#7a31bf';
            }
        });
    });

    // ===== TECH STACK CAROUSEL =====
    const slide = document.querySelector('.tech-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!slide) return;
    
    const items = slide.querySelectorAll('.tech-item');
    let currentIndex = 0;
    
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width < 480) return 3;
        if (width < 768) return 4;
        if (width < 1024) return 5;
        return 6;
    }
    
    function getTotalSlides() {
        return Math.ceil(items.length / getItemsPerView());
    }
    
    function createDots() {
        const total = getTotalSlides();
        dotsContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateSlide() {
        if (items.length === 0) return;
        const itemWidth = items[0].offsetWidth + 20;
        const itemsPerViewCurrent = getItemsPerView();
        const offset = currentIndex * itemsPerViewCurrent * itemWidth;
        slide.style.transform = `translateX(-${offset}px)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function goToSlide(index) {
        const total = getTotalSlides();
        const maxIndex = total - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateSlide();
    }
    
    function nextSlide() {
        const total = getTotalSlides();
        if (currentIndex >= total - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + 1);
        }
    }
    
    function prevSlide() {
        const total = getTotalSlides();
        if (currentIndex <= 0) {
            goToSlide(total - 1);
        } else {
            goToSlide(currentIndex - 1);
        }
    }
    
    // Initialize
    createDots();
    setTimeout(updateSlide, 200);
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    const carousel = document.querySelector('.tech-carousel');
    
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
        }, { passive: true });
    }
    
    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newTotal = getTotalSlides();
            const currentDots = dotsContainer.querySelectorAll('.dot');
            if (currentDots.length !== newTotal) {
                createDots();
            }
            currentIndex = 0;
            updateSlide();
        }, 300);
    });
});

// ===== PROJECT CAROUSEL =====
// ===== PROJECT FILTER =====
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const track = document.querySelector('.projects-track');
    const prevBtn = document.querySelector('.prev-project-btn');
    const nextBtn = document.querySelector('.next-project-btn');
    const dotsContainer = document.querySelector('.projects-dots');
    
    let currentFilter = 'all';
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            
            // Filter cards
            let visibleCount = 0;
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (currentFilter === 'all' || category === currentFilter) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset carousel position
            currentIndex = 0;
            
            // Recalculate dots
            const total = Math.ceil(visibleCount / getCardsPerView());
            createDots();
            updateSlide();
            
            // Update buttons
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex >= total - 1;
        });
    });
    
    // Override getCardsPerView to only count visible cards
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width < 480) return 1;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }
    
    // Override createDots to only count visible cards
    function createDots() {
        const visibleCards = Array.from(projectCards).filter(card => card.style.display !== 'none');
        const total = Math.ceil(visibleCards.length / getCardsPerView());
        dotsContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.classList.add('project-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Override updateSlide to work with visible cards
    function updateSlide() {
        const visibleCards = Array.from(projectCards).filter(card => card.style.display !== 'none');
        if (visibleCards.length === 0) return;
        
        const cardWidth = visibleCards[0].offsetWidth + 25;
        const cardsPerViewCurrent = getCardsPerView();
        const offset = currentIndex * cardsPerViewCurrent * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
        
        // Update dots
        const total = Math.ceil(visibleCards.length / getCardsPerView());
        const dots = dotsContainer.querySelectorAll('.project-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Update buttons
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= total - 1;
    }
    
    // Override goToSlide
    function goToSlide(index) {
        const visibleCards = Array.from(projectCards).filter(card => card.style.display !== 'none');
        const total = Math.ceil(visibleCards.length / getCardsPerView());
        const maxIndex = total - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateSlide();
    }
    
    // Override nextSlide and prevSlide
    function nextSlide() {
        const visibleCards = Array.from(projectCards).filter(card => card.style.display !== 'none');
        const total = Math.ceil(visibleCards.length / getCardsPerView());
        if (currentIndex < total - 1) {
            goToSlide(currentIndex + 1);
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }
    
    // Store references to the overridden functions
    window.projectCarousel = {
        getCardsPerView,
        createDots,
        updateSlide,
        goToSlide,
        nextSlide,
        prevSlide,
        currentIndex: 0
    };
    
    // Re-assign event listeners to use the new functions
    if (nextBtn) {
        nextBtn.removeEventListener('click', nextSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.removeEventListener('click', prevSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Override the resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const visibleCards = Array.from(projectCards).filter(card => card.style.display !== 'none');
            const newTotal = Math.ceil(visibleCards.length / getCardsPerView());
            const currentDots = dotsContainer.querySelectorAll('.project-dot');
            if (currentDots.length !== newTotal) {
                createDots();
            }
            currentIndex = 0;
            updateSlide();
        }, 300);
    });
});