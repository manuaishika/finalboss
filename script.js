// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', savedTheme === 'dark');

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to light theme';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to dark theme';
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
});

// Initialize theme icon
updateThemeIcon();

// Live timestamp updates
function updateTimestamp() {
    const now = new Date();
    
    // Format time (12-hour format)
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    // Format date
    const dateString = now.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    // Update DOM
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateElement.textContent = `${now.getDate() + getOrdinalSuffix(now.getDate())} of ${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
}

// Helper function for ordinal suffixes
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// Update timestamp every second
setInterval(updateTimestamp, 1000);
updateTimestamp(); // Initial update

// Copy functionality for email
const copyIcon = document.querySelector('.copy-icon');
if (copyIcon) {
    copyIcon.addEventListener('click', async () => {
        const emailElement = copyIcon.parentElement.querySelector('.social-value');
        const email = emailElement.textContent;
        
        try {
            await navigator.clipboard.writeText(email);
            
            // Visual feedback
            const originalIcon = copyIcon.className;
            copyIcon.className = 'fas fa-check';
            copyIcon.style.color = '#10b981';
            
            setTimeout(() => {
                copyIcon.className = originalIcon;
                copyIcon.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
    });
});

// Add some subtle animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add hover effects to project items
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Add hover effects to experience items
document.querySelectorAll('.experience-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
});

// Add click functionality to footer control buttons
document.querySelectorAll('.control-btn').forEach(btn => {
    if (!btn.classList.contains('theme-toggle')) {
        btn.addEventListener('click', () => {
            // Add visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            // You can add specific functionality for each button here
            const title = btn.getAttribute('title');
            console.log(`${title} button clicked`);
        });
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.sidebar');
    
    if (parallax) {
        const speed = scrolled * 0.1;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Ctrl/Cmd + J to open command menu (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault();
        console.log('Command menu opened');
        // You can implement a command palette here
    }
});

// Add tooltip functionality
document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.getAttribute('title');
        tooltip.style.cssText = `
            position: absolute;
            background: #000;
            color: #fff;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        e.target.addEventListener('mouseleave', () => {
            tooltip.remove();
        }, { once: true });
    });
});

// Dynamic rotating titles
const titles = [
    "design engineer, etc.",
    "problem solver",
    "creative developer",
    "tech enthusiast",
    "innovation seeker",
    "code artist"
];

let currentTitleIndex = 0;
const titleElement = document.getElementById('title-text');

function rotateTitle() {
    if (titleElement) {
        titleElement.style.opacity = '0';
        titleElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            titleElement.textContent = titles[currentTitleIndex];
            titleElement.style.opacity = '1';
            titleElement.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Rotate title every 3 seconds
setInterval(rotateTitle, 3000);

// Add smooth reveal animation for skills
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
    
    setTimeout(() => {
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
    }, 500 + (index * 100));
});

// Custom cursor functionality
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');

// Update cursor position
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay for trail effect
    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 100);
});

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-item, .experience-item, .copy-icon');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorTrail.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorTrail.style.opacity = '1';
});

console.log('Portfolio website loaded successfully! 🚀');
