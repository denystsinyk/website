const aboutToggle = document.getElementById('about-toggle');
const content = document.querySelector('.content');
let isContentVisible = true;

// Handle responsive background image switching
function updateBackgroundImage() {
    const backgroundDiv = document.querySelector('.background-static');
    if (!backgroundDiv) return;

    const desktopBg = backgroundDiv.getAttribute('data-desktop-bg');
    const mobileBg = backgroundDiv.getAttribute('data-mobile-bg');

    // Check if screen is mobile (768px or less)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const bgToUse = isMobile ? mobileBg : desktopBg;
    const currentBg = backgroundDiv.style.backgroundImage;
    const newBg = `url('${bgToUse}')`;

    // Only update if different to avoid unnecessary repaints
    if (currentBg !== newBg) {
        backgroundDiv.style.backgroundImage = newBg;
    }
}

// Debounce function for performance
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

// Update on load
updateBackgroundImage();

// Update on window resize with debounce for performance
window.addEventListener('resize', debounce(updateBackgroundImage, 250));

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.classList.add('started');

    return new Promise((resolve) => {
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed + Math.random() * 15);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Store original text globally to preserve it
let originalAboutText = '';

window.addEventListener('load', function() {
    // Store the original text before any modifications
    const aboutText = document.querySelector('.section-content p');
    if (aboutText && !originalAboutText) {
        originalAboutText = aboutText.textContent;
    }

    // Check localStorage for about section state
    const aboutClosed = localStorage.getItem('aboutClosed');

    if (!aboutClosed) {
        content.classList.add('active');
        document.body.classList.add('content-active');
        isContentVisible = true;

        if (aboutText) {
            aboutText.classList.add('typing');
            setTimeout(() => {
                typeWriter(aboutText, originalAboutText, 20);
                // Removed auto-fade after 15 seconds - let users control when to close
            }, 500);
        }
    } else {
        isContentVisible = false;
    }
});

aboutToggle.addEventListener('click', function(e) {
    e.preventDefault();

    isContentVisible = !isContentVisible;

    if (isContentVisible) {
        content.classList.add('active');
        document.body.classList.add('content-active');
        localStorage.removeItem('aboutClosed');

        // Run typewriter effect when opening
        const aboutText = document.querySelector('.section-content p');
        if (aboutText && originalAboutText) {
            aboutText.classList.add('typing');
            aboutText.style.opacity = '1'; // Reset opacity
            typeWriter(aboutText, originalAboutText, 20);
        }
    } else {
        content.classList.remove('active');
        document.body.classList.remove('content-active');
        localStorage.setItem('aboutClosed', 'true');
    }
});

// Consolidated keydown handler
document.addEventListener('keydown', function(e) {
    // Handle Escape key to close about section
    if (e.key === 'Escape' && isContentVisible) {
        content.classList.remove('active');
        document.body.classList.remove('content-active');
        isContentVisible = false;
        localStorage.setItem('aboutClosed', 'true');
        return;
    }

    // Handle Space/Enter on about toggle
    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement === aboutToggle) {
        e.preventDefault();
        aboutToggle.click();
        return;
    }
});

// Detect if device is mobile (touch + small screen)
const isMobileDevice = () => {
    return ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
           window.matchMedia('(max-width: 768px)').matches;
};

// Mobile sidebar toggle with arrow trigger
const arrowTrigger = document.querySelector('.arrow-trigger');
const sidebarRight = document.querySelector('.sidebar-right');
let sidebarVisible = false;

if (arrowTrigger && sidebarRight) {
    // Only add mobile touch handlers if on mobile device
    if (isMobileDevice()) {
        document.body.classList.add('touch-device');

        arrowTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sidebarVisible = !sidebarVisible;

            if (sidebarVisible) {
                sidebarRight.classList.add('mobile-visible');
            } else {
                sidebarRight.classList.remove('mobile-visible');
            }
        });

        // Close sidebar when tapping outside on mobile
        document.addEventListener('click', function(e) {
            // Don't close if clicking about toggle or content or color picker
            if (aboutToggle.contains(e.target) || content.contains(e.target)) {
                return;
            }

            if (sidebarVisible &&
                !sidebarRight.contains(e.target) &&
                !arrowTrigger.contains(e.target)) {
                sidebarRight.classList.remove('mobile-visible');
                sidebarVisible = false;
            }
        });

        // Prevent clicks inside sidebar from closing it (except about toggle)
        sidebarRight.addEventListener('click', function(e) {
            if (!aboutToggle.contains(e.target)) {
                e.stopPropagation();
            }
        });
    }
}

const themeToggle = document.getElementById('theme-toggle');
const colorPicker = document.getElementById('color-picker');
const colorOptions = document.querySelectorAll('.color-option');

const colorMap = {
    rust: '#CE422B',
    blue: '#4A90E2',
    purple: '#9B59B6',
    green: '#2ECC71',
    pink: '#E91E63',
    teal: '#1ABC9C'
};

const steamFilterMap = {
    rust: 'invert(35%) sepia(89%) saturate(1738%) hue-rotate(349deg) brightness(92%) contrast(89%)',
    blue: 'invert(52%) sepia(53%) saturate(1566%) hue-rotate(189deg) brightness(95%) contrast(87%)',
    purple: 'invert(42%) sepia(63%) saturate(1037%) hue-rotate(240deg) brightness(93%) contrast(89%)',
    green: 'invert(64%) sepia(41%) saturate(1456%) hue-rotate(98deg) brightness(96%) contrast(88%)',
    pink: 'invert(29%) sepia(86%) saturate(2695%) hue-rotate(326deg) brightness(93%) contrast(94%)',
    teal: 'invert(64%) sepia(42%) saturate(934%) hue-rotate(125deg) brightness(95%) contrast(88%)'
};

function setThemeColor(colorName) {
    const color = colorMap[colorName];
    const steamFilter = steamFilterMap[colorName];
    document.documentElement.style.setProperty('--accent-color', color);
    document.documentElement.style.setProperty('--steam-filter', steamFilter);
    localStorage.setItem('themeColor', colorName);

    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.color === colorName) {
            option.classList.add('active');
        }
    });
}

const savedColor = localStorage.getItem('themeColor') || 'rust';
setThemeColor(savedColor);

themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    colorPicker.classList.toggle('active');
});

colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        const colorName = this.dataset.color;
        setThemeColor(colorName);
        setTimeout(() => {
            colorPicker.classList.remove('active');
        }, 300);
    });
});

document.addEventListener('click', function(e) {
    if (!colorPicker.contains(e.target) && !themeToggle.contains(e.target)) {
        colorPicker.classList.remove('active');
    }
});

// Konami Code Easter Egg - Integrated into main keydown handler
const konamiCode = ['ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp', 'ArrowLeft', 'ArrowLeft', 'ArrowRight', 'ArrowRight'];
let konamiIndex = 0;

// Add to existing keydown handler
document.addEventListener('keydown', function(e) {
    // Check for Konami code (only for arrow keys)
    if (e.key.startsWith('Arrow')) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;

            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;

                // Trigger shake animation
                document.body.classList.add('shake-mode');
                console.log('🎮 Easter Egg Activated! Page Shake! 🎮');

                // Remove shake class after animation completes
                setTimeout(() => {
                    document.body.classList.remove('shake-mode');
                }, 500);
            }
        } else {
            // Reset if wrong arrow key pressed
            konamiIndex = 0;
        }
    }
}, true); // Use capture phase to not interfere with other handlers
