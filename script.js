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
    backgroundDiv.style.backgroundImage = `url('${bgToUse}')`;
}

// Update on load
updateBackgroundImage();

// Update on window resize
window.addEventListener('resize', updateBackgroundImage);

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

window.addEventListener('load', function() {
    content.classList.add('active');
    document.body.classList.add('content-active');

    const aboutText = document.querySelector('.section-content p');
    const originalText = aboutText.textContent;
    aboutText.classList.add('typing');

    setTimeout(() => {
        typeWriter(aboutText, originalText, 20).then(() => {
            setTimeout(() => {
                aboutText.style.transition = 'opacity 1s ease';
                aboutText.style.opacity = '0';
            }, 15000);
        });
    }, 500);
});

aboutToggle.addEventListener('click', function(e) {
    e.preventDefault();

    isContentVisible = !isContentVisible;

    if (isContentVisible) {
        content.classList.add('active');
        document.body.classList.add('content-active');
        localStorage.removeItem('aboutClosed');
    } else {
        content.classList.remove('active');
        document.body.classList.remove('content-active');
        localStorage.setItem('aboutClosed', 'true');
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isContentVisible) {
        content.classList.remove('active');
        document.body.classList.remove('content-active');
        isContentVisible = false;
    }

    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement === aboutToggle) {
        e.preventDefault();
        aboutToggle.click();
    }
});

// Mobile touch device detection and handling
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    aboutToggle.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.click();
    });

    // Mobile sidebar toggle with arrow trigger
    const arrowTrigger = document.querySelector('.arrow-trigger');
    const sidebarRight = document.querySelector('.sidebar-right');
    let sidebarVisible = false;

    if (arrowTrigger && sidebarRight) {
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
            // Don't close if clicking about toggle or content
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

// Konami Code Easter Egg - Down Down Up Up Left Left Right Right
const konamiCode = ['ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp', 'ArrowLeft', 'ArrowLeft', 'ArrowRight', 'ArrowRight'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    // Check for Konami code
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
        // Reset if wrong key pressed
        konamiIndex = 0;
    }
});
