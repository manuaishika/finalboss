# Portfolio Website

A clean, modern portfolio website inspired by minimalist design principles. Features a subtle dot pattern background, left sidebar profile section, and responsive design with dark/light theme toggle.

## Features

- ✨ **Modern Design**: Clean, minimalist interface with subtle animations
- 🌓 **Theme Toggle**: Switch between light and dark themes
- 📱 **Responsive**: Mobile-friendly design that works on all devices
- 🎨 **Customizable**: Easy to modify colors, fonts, and content
- ⚡ **Fast**: Optimized for performance with smooth animations
- 🔧 **Interactive**: Hover effects, smooth scrolling, and live timestamps

## File Structure

```
finalboss/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Quick Start

1. **Open the website**: Simply open `index.html` in your web browser
2. **Customize content**: Edit the HTML to add your personal information
3. **Modify styling**: Update `styles.css` to change colors and layout
4. **Add functionality**: Enhance `script.js` with additional features

## Customization Guide

### Personal Information

Edit these sections in `index.html`:

```html
<!-- Profile Section -->
<h1 class="name">Your Name</h1>
<p class="handle">@yourhandle</p>
<div class="location">
    <i class="fas fa-map-marker-alt"></i>
    <span>Your Location</span>
</div>
<p class="title">Your Title</p>
```

### Profile Photo

Replace the placeholder image:
```html
<img src="path/to/your/photo.jpg" alt="Your Photo">
```

### About Section

Update your personal description:
```html
<p class="about-text">
    Your personal description here...
</p>
```

### Projects

Modify the projects section with your own work:
```html
<div class="project-item">
    <i class="fas fa-briefcase"></i>
    <span class="project-text">Your project description</span>
    <span class="project-date">Date</span>
</div>
```

### Work Experience

Add your work history:
```html
<div class="experience-item">
    <div class="company-header">
        <h4 class="company-name">Company Name</h4>
        <span class="remote-tag">Remote</span>
    </div>
    <p class="role">Your Role</p>
    <p class="duration">Month Year - Present</p>
    <p class="description">Your job description...</p>
</div>
```

### Skills

Update your skills list:
```html
<div class="skills-grid">
    <span class="skill-tag">Skill 1</span>
    <span class="skill-tag">Skill 2</span>
    <!-- Add more skills -->
</div>
```

### Social Links

Update your contact information:
```html
<div class="social-item">
    <span class="social-label">email</span>
    <span class="social-value">your.email@example.com</span>
    <i class="fas fa-copy copy-icon"></i>
</div>
```

## Styling Customization

### Colors

Modify the color scheme in `styles.css`:

```css
:root {
    --primary-color: #000000;
    --secondary-color: #666666;
    --background-color: #ffffff;
    --accent-color: #10b981;
}
```

### Fonts

Change the font family:
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

### Background Pattern

Customize the dot pattern:
```css
body {
    background-image: radial-gradient(circle, #f0f0f0 1px, transparent 1px);
    background-size: 20px 20px; /* Adjust dot spacing */
}
```

## Features

### Theme Toggle
- Click the moon/sun icon in the footer
- Keyboard shortcut: `Ctrl/Cmd + K`
- Theme preference is saved in localStorage

### Copy Email
- Click the copy icon next to your email
- Visual feedback with checkmark icon

### Animations
- Smooth scroll animations
- Hover effects on projects and experience items
- Fade-in animations for sections
- Parallax effect on sidebar

### Keyboard Shortcuts
- `Ctrl/Cmd + K`: Toggle theme
- `Ctrl/Cmd + J`: Open command menu (placeholder)

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## Performance Tips

1. **Optimize images**: Use compressed JPG/PNG files
2. **Minimize CSS/JS**: Consider minifying for production
3. **Lazy loading**: Add lazy loading for images if needed
4. **CDN**: Use CDN for external fonts and icons

## Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployments on every push

### Vercel
1. Import your GitHub repository
2. Automatic deployments
3. Custom domain support

## Customization Examples

### Change Background Pattern
```css
/* Dots */
background-image: radial-gradient(circle, #f0f0f0 1px, transparent 1px);

/* Lines */
background-image: linear-gradient(90deg, #f0f0f0 1px, transparent 1px);

/* Grid */
background-image: 
    linear-gradient(90deg, #f0f0f0 1px, transparent 1px),
    linear-gradient(0deg, #f0f0f0 1px, transparent 1px);
```

### Add Custom Animations
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
}
```

## Troubleshooting

### Common Issues

1. **Fonts not loading**: Check internet connection for Google Fonts
2. **Icons missing**: Ensure Font Awesome CDN is accessible
3. **Theme not saving**: Check if localStorage is enabled
4. **Mobile layout issues**: Verify viewport meta tag

### Debug Mode

Open browser console to see:
- Loading status
- Theme changes
- Animation triggers
- Error messages

## Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit improvements
- Share your customizations

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🚀**

Your portfolio website is ready to showcase your skills and experience. Customize it with your personal information and make it uniquely yours!
