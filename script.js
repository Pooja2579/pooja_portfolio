// Smooth scrolling for navigation links
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