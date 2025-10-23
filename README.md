# Denys Tsinyk - Personal Portfolio

A modern, responsive personal portfolio website with dynamic theming and mobile-friendly design.

## Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dynamic Background** - Different images for desktop (`horizontal.png`) and mobile (`vertical.png`)
- **Color Themes** - 6 color themes to choose from (Rust Orange, Blue, Purple, Green, Pink, Teal)
- **Typewriter Effect** - Animated text introduction
- **Easter Egg** - Hidden Konami code animation (↓↓↑↑←←→→)
- **Accessibility** - Keyboard navigation and focus states
- **LocalStorage** - Remembers your theme and about section preferences

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive functionality and animations
- `horizontal.png` - Desktop background image
- `vertical.png` - Mobile background image
- `steam-1-logo-black-and-white.png` - Steam icon

## How to Use

1. Open `index.html` in a web browser
2. Click the arrow (^) at the bottom to show/hide social links
3. Click the info icon (ⓘ) to toggle the about section
4. Click the palette icon to change color themes
5. Press ESC to close the about section

## Customization

### Change Background Images
Edit the `data-desktop-bg` and `data-mobile-bg` attributes in `index.html`:
```html
<div class="background-static"
     data-desktop-bg="your-desktop-image.png"
     data-mobile-bg="your-mobile-image.png">
```

### Change About Text
Edit the paragraph in `index.html`:
```html
<p>Your text here</p>
```

### Change Social Links
Update the links in the `<aside class="sidebar-right">` section of `index.html`

### Add More Colors
1. Add a new color button in `index.html`
2. Add the color to `colorMap` in `script.js`
3. Add the Steam filter to `steamFilterMap` in `script.js`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Personal project - feel free to use as inspiration!

---

Built with vanilla HTML, CSS, and JavaScript
