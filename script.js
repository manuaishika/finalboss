// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to system preference
const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const savedTheme = localStorage.getItem('theme') || 'system';

// Apply theme
const applyTheme = (theme) => {
    if (theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark')) {
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.checked = true;
    } else {
        body.classList.remove('dark-theme');
        if (themeToggle) themeToggle.checked = false;
    }
};

// Initialize theme
applyTheme(savedTheme);

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'system') {
        applyTheme('system');
    }
});

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

// Command palette / quick navigation
const commandPaletteItems = [
    { title: 'home', description: 'return to the landing page', path: 'index.html', keywords: ['home', 'main', 'landing'] },
    { title: 'about', description: 'learn more about me', path: 'about.html', keywords: ['about', 'me', 'info'] },
    { title: 'now / current', description: 'see what i am working on', path: 'now.html', keywords: ['now', 'current', 'resume', 'cv', 'experience', 'work'] },
    { title: 'what was', description: 'past experiences and work', path: 'what-was.html', keywords: ['past', 'was', 'history', 'previous', 'resume', 'cv'] },
    { title: 'notes', description: 'long-form writing and lists', path: 'notes/index.html', keywords: ['notes', 'writing', 'blog'] },
    { title: '[in]Sites', description: 'web experiments & builds', path: 'insites/index.html', keywords: ['insites', 'projects', 'project', 'experiments', 'builds', 'github', 'code'] },
    { title: 'theme', description: 'songs, hobbies, inspirations', path: 'theme.html', keywords: ['theme', 'songs', 'music', 'hobbies', 'inspirations'] },
    { title: 'college chronicles', description: 'semester-by-semester notes', path: 'college-chronicles.html', keywords: ['college', 'chronicles', 'university', 'education'] },
    { title: 'what do you want to be', description: 'living note in notes', path: 'someday/what-do-you-want-to-be.html', keywords: ['want', 'be', 'identity', 'aims', 'notes'] },
    { title: 'sites i often visit', description: 'internet rabbit holes i revisit', path: 'notes/sites-article.html', keywords: ['sites', 'visit', 'links', 'resources'] },
    { title: 'substack', description: 'read up on my substack', path: 'https://substack.com/@sillysnoopies?utm_source=user-menu', external: true, keywords: ['substack', 'blog', 'writing'] },
    { title: 'github', description: 'manuaishika on github', path: 'https://github.com/manuaishika', external: true, keywords: ['github', 'code', 'projects', 'repos'] }
];

const projectMarker = '/finalboss/';
const fullHref = window.location.href;
const basePath = fullHref.includes(projectMarker)
    ? `${fullHref.split(projectMarker)[0]}${projectMarker}`
    : (window.location.origin && window.location.origin !== 'null' ? `${window.location.origin}/` : './');

const resolvePath = (path) => path.startsWith('http') ? path : `${basePath}${path.replace(/^\//, '')}`;

const commandOverlay = document.createElement('div');
commandOverlay.className = 'command-overlay';
commandOverlay.innerHTML = `
    <div class="command-dialog" role="dialog" aria-modal="true">
        <div class="command-header">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input type="text" id="command-input" placeholder="jump to a page, note, or link..." aria-label="Command palette search" autocomplete="off" />
            <button class="command-close" type="button">esc</button>
        </div>
        <div class="command-list"></div>
    </div>
`;
document.body.appendChild(commandOverlay);

const commandButton = document.createElement('button');
commandButton.className = 'command-button';
commandButton.setAttribute('aria-label', 'Open quick navigation');
commandButton.innerHTML = '<i class="fas fa-search"></i>';
document.body.appendChild(commandButton);

const commandInput = commandOverlay.querySelector('#command-input');
const commandList = commandOverlay.querySelector('.command-list');
const commandCloseBtn = commandOverlay.querySelector('.command-close');

let filteredCommands = [...commandPaletteItems];
let activeCommandIndex = 0;

const renderCommandList = () => {
    commandList.innerHTML = '';

    if (!filteredCommands.length) {
        const emptyState = document.createElement('div');
        emptyState.className = 'command-empty';
        emptyState.textContent = 'no matches yet. try another keyword.';
        commandList.appendChild(emptyState);
        return;
    }

    filteredCommands.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'command-item';
        button.innerHTML = `
            <div class="command-item-text">
                <span class="command-item-title">${item.title}</span>
                <span class="command-item-desc">${item.description}</span>
            </div>
            <span class="command-item-hint">${item.external || item.path.startsWith('http') ? '↗' : '↵'}</span>
        `;
        if (index === activeCommandIndex) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => handleCommandSelection(item));
        commandList.appendChild(button);
    });
};

const openCommandPalette = () => {
    commandOverlay.classList.add('open');
    document.body.classList.add('command-open');
    commandInput.value = '';
    filteredCommands = [...commandPaletteItems];
    activeCommandIndex = 0;
    renderCommandList();
    setTimeout(() => commandInput.focus(), 0);
};

const closeCommandPalette = () => {
    commandOverlay.classList.remove('open');
    document.body.classList.remove('command-open');
    commandInput.blur();
};

const handleCommandSelection = (item) => {
    closeCommandPalette();
    const destination = resolvePath(item.path);
    if (item.external || item.path.startsWith('http')) {
        window.open(destination, '_blank');
    } else {
        window.location.href = destination;
    }
};

const moveCommandSelection = (direction) => {
    if (!filteredCommands.length) return;
    activeCommandIndex = (activeCommandIndex + direction + filteredCommands.length) % filteredCommands.length;
    const buttons = commandList.querySelectorAll('.command-item');
    buttons.forEach((btn, index) => btn.classList.toggle('active', index === activeCommandIndex));
    const activeButton = buttons[activeCommandIndex];
    if (activeButton) {
        activeButton.scrollIntoView({ block: 'nearest' });
    }
};

// Fuzzy matching function for better search
const fuzzyMatch = (query, text) => {
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Exact match gets highest priority
    if (textLower.includes(queryLower)) return 2;
    
    // Check if all query characters appear in order
    let queryIndex = 0;
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
        if (textLower[i] === queryLower[queryIndex]) {
            queryIndex++;
        }
    }
    if (queryIndex === queryLower.length) return 1;
    
    // Check for similar sounding words (simple version)
    const similarWords = {
        'resume': ['now', 'current', 'work', 'experience', 'cv'],
        'cv': ['now', 'current', 'work', 'experience', 'resume'],
        'project': ['insites', 'projects', 'experiments', 'builds'],
        'projects': ['insites', 'project', 'experiments', 'builds'],
        'code': ['insites', 'github', 'projects'],
        'repo': ['insites', 'github', 'projects'],
        'repos': ['insites', 'github', 'projects']
    };
    
    if (similarWords[queryLower]) {
        return similarWords[queryLower].some(word => textLower.includes(word)) ? 1 : 0;
    }
    
    return 0;
};

commandInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
        filteredCommands = [...commandPaletteItems];
    } else {
        filteredCommands = commandPaletteItems
            .map(item => {
                let score = 0;
                
                // Check title
                score += fuzzyMatch(query, item.title) * 3;
                
                // Check description
                score += fuzzyMatch(query, item.description) * 2;
                
                // Check keywords if they exist
                if (item.keywords) {
                    item.keywords.forEach(keyword => {
                        if (fuzzyMatch(query, keyword)) {
                            score += 2;
                        }
                    });
                }
                
                return { item, score };
            })
            .filter(result => result.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(result => result.item);
    }
    
    activeCommandIndex = 0;
    renderCommandList();
});

const handleCommandNavigation = (e) => {
    if (!commandOverlay.classList.contains('open')) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveCommandSelection(1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveCommandSelection(-1);
    } else if (e.key === 'Enter') {
        if (document.activeElement !== commandInput) {
            e.preventDefault();
        }
        const targetItem = filteredCommands[activeCommandIndex];
        if (targetItem) {
            handleCommandSelection(targetItem);
        }
    } else if (e.key === 'Escape') {
        closeCommandPalette();
    }
};

document.addEventListener('keydown', handleCommandNavigation);

commandOverlay.addEventListener('click', (e) => {
    if (e.target === commandOverlay) {
        closeCommandPalette();
    }
});

commandButton.addEventListener('click', openCommandPalette);
commandCloseBtn.addEventListener('click', closeCommandPalette);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K toggles the command palette
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (commandOverlay.classList.contains('open')) {
            closeCommandPalette();
        } else {
            openCommandPalette();
        }
        return;
    }
    
    // Ctrl/Cmd + T toggles the theme
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 't') {
        e.preventDefault();
        if (themeToggle) {
            themeToggle.click();
        }
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
    "design engineer",
    "problem solver",
    "creative developer"
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

// Custom cursor functionality removed - using default browser cursor

console.log('Portfolio website loaded successfully! 🚀');
