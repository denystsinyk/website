// ========================================
// Static Background (no slideshow needed)
// ========================================

// ========================================
// About Toggle Functionality
// ========================================

const aboutToggle = document.getElementById('about-toggle');
const content = document.querySelector('.content');
let isContentVisible = false;

// Toggle content visibility when About is clicked
aboutToggle.addEventListener('click', function(e) {
    e.preventDefault();

    isContentVisible = !isContentVisible;

    if (isContentVisible) {
        content.classList.add('active');
        document.body.classList.add('content-active');
    } else {
        content.classList.remove('active');
        document.body.classList.remove('content-active');
    }
});

// ========================================
// Static Background (no preloading needed)
// ========================================

// ========================================
// Mobile Menu Enhancement
// ========================================

// Add touch support for better mobile experience
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    // Prevent double-tap zoom on About toggle
    aboutToggle.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.click();
    });
}

// ========================================
// Keyboard Navigation Support
// ========================================

document.addEventListener('keydown', function(e) {
    // Toggle About with Escape key
    if (e.key === 'Escape' && isContentVisible) {
        content.classList.remove('active');
        document.body.classList.remove('content-active');
        isContentVisible = false;
    }

    // Toggle About with Space or Enter on focused About link
    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement === aboutToggle) {
        e.preventDefault();
        aboutToggle.click();
    }
});

// ========================================
// Page Load Animation
// ========================================

window.addEventListener('load', function() {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');

    // Fade in About link
    aboutToggle.style.opacity = '0';
    aboutToggle.style.transform = 'translateX(-20px)';
    aboutToggle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
        aboutToggle.style.opacity = '1';
        aboutToggle.style.transform = 'translateX(0)';
    }, 400);

    // Stagger social links animation
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(20px)';
        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 400 + (index * 100));
    });
});

// ========================================
// Console Easter Egg
// ========================================

console.log('%c🦀 Built with Rust-inspired design 🦀', 'color: #CE422B; font-size: 16px; font-weight: bold;');
console.log('%cInterested in working together? Reach out!', 'color: #b8b8b8; font-size: 12px;');
