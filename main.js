document.addEventListener('DOMContentLoaded', function () {
    // Navigation functionality
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const skillBars = document.querySelectorAll('.skill-progress');

    // Back to top button functionality
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contact form (Formspree)
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById('form-message').innerHTML = "<span style='color:green;'>Thank you! Your message has been sent.</span>";
                    contactForm.reset();
                } else {
                    document.getElementById('form-message').innerHTML = "<span style='color:red;'>Oops! Something went wrong. Please try again.</span>";
                }
            })
            .catch(() => {
                document.getElementById('form-message').innerHTML = "<span style='color:red;'>Oops! Something went wrong. Please try again.</span>";
            });
        });
    }

    // Interactive Contact Buttons
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        emailBtn.onclick = function () {
            const userEmail = prompt("Enter your email address to proceed:");
            if (userEmail && /\S+@\S+\.\S+/.test(userEmail)) {
                window.location.href = `mailto:adarshpandey6364@gmail.com?cc=${encodeURIComponent(userEmail)}`;
            }
        };
    }

    const callBtn = document.getElementById('call-btn');
    if (callBtn) {
        callBtn.onclick = function () {
            if (confirm("Do you want to call Adarsh Pandey?")) {
                const userNumber = prompt("Enter your mobile number to proceed:");
                if (userNumber && /^\d{10,}$/.test(userNumber)) {
                    window.location.href = "tel:+916306747203";
                }
            }
        };
    }

    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.onclick = function () {
            if (confirm("Do you want to chat on WhatsApp?")) {
                window.open("https://wa.me/916306747203", "_blank");
            }
        };
    }

    const telegramBtn = document.getElementById('telegram-btn');
    if (telegramBtn) {
        telegramBtn.onclick = function () {
            if (confirm("Do you want to connect on Telegram?")) {
                window.open("https://t.me/adarshpandey007", "_blank");
            }
        };
    }

    const linkedinBtn = document.getElementById('linkedin-btn');
    if (linkedinBtn) {
        linkedinBtn.onclick = function () {
            if (confirm("Do you want to visit LinkedIn profile?")) {
                window.open("https://www.linkedin.com/in/adarsh-pandey-314074241", "_blank");
            }
        };
    }

    // Typing animation for hero section (if you want to keep it)
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = [
        'Competitive Programmer',
        'Algorithm Enthusiast',
        'Full Stack Developer',
        'Problem Solver',
        'Code Optimizer'
    ];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 1200;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (typedTextSpan) {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }
    }

    function erase() {
        if (typedTextSpan) {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 200);
            }
        }
    }

    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }

    const mapContainer = document.getElementById('contact-map');
    if (mapContainer && typeof L !== 'undefined') {
        // Greater Noida coordinates
        const myCoords = [28.4744, 77.5040];
        const map = L.map('contact-map').setView(myCoords, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        const marker = L.marker(myCoords).addTo(map);
        marker.bindPopup("<b>Adarsh Pandey</b><br>Greater Noida, UP").openPopup();
    }
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Animate elements on scroll
const animateOnScrollOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, animateOnScrollOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll('.project-card, .achievement-card, .skill-category, .about-text, .profile-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// Smooth scrolling for anchor links
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

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section (disabled on mobile for performance)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add hover effects for project cards (disabled on touch devices)
if (!('ontouchstart' in window)) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        // Change icon
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        // Save preference
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Theme Color Picker
const colorPickerBtn = document.createElement('button');
colorPickerBtn.className = 'theme-toggle-btn color-picker-btn';
colorPickerBtn.title = 'Pick Accent Color';
colorPickerBtn.innerHTML = '<i class="fas fa-palette"></i>';
colorPickerBtn.style.position = 'fixed';
colorPickerBtn.style.bottom = '5.5rem';
colorPickerBtn.style.left = '2.5rem';
colorPickerBtn.style.zIndex = '1200';
document.body.appendChild(colorPickerBtn);

const colorInput = document.createElement('input');
colorInput.type = 'color';
colorInput.style.display = 'none';
colorInput.value = localStorage.getItem('accentColor') || '#10b981';
document.body.appendChild(colorInput);

colorPickerBtn.addEventListener('click', () => colorInput.click());
colorInput.addEventListener('input', (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty('--accent-green', color);
    localStorage.setItem('accentColor', color);
});
// Load saved accent color
const savedAccent = localStorage.getItem('accentColor');
if (savedAccent) {
    document.documentElement.style.setProperty('--accent-green', savedAccent);
}

// Add ripple effect to buttons (only on desktop)
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

if (window.innerWidth > 768) {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console easter egg
console.log(
`%c🚀 Welcome to Adarsh Pandey's Portfolio!
%c────────────────────────────────────────────
%cThanks for checking out my code! 
If you're interested in collaborating, have questions, or just want to connect,
reach out at %cadarshpandey6364@gmail.com%c or find me on %cLinkedIn%c.

Happy coding! 💻
`,
"color: #fff; background: #1e90ff; font-size: 1.3em; font-weight: bold; padding: 8px 0;",
"color: #1e90ff; font-size: 1.1em;",
"color: #222; font-size: 1.1em;",
"color: #e67e22; font-weight: bold;",
"color: #222;",
"color: #0077b5; font-weight: bold;",
"color: #222;"
);

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Advanced lazy loading for images with fade-in
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.style.opacity = '0';
    img.addEventListener('load', () => {
        img.style.transition = 'opacity 0.6s';
        img.style.opacity = '1';
    });
});

// Optimize animations for mobile devices
const isMobile = window.innerWidth <= 768;
if (isMobile) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--transition-smooth', 'all 0.2s ease');
    document.documentElement.style.setProperty('--transition-bounce', 'all 0.2s ease');
}

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Re-select hamburger and navMenu to avoid ReferenceError
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        // Recalculate viewport height
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }, 100);
});

// Set initial viewport height for mobile
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Improve scroll performance on mobile
let ticking = false;
function updateScrollPosition() {
    // Update scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
});

// Responsive font size adjustment
function adjustFontSize() {
    const screenWidth = window.innerWidth;
    const baseSize = 16;
    
    if (screenWidth < 360) {
        document.documentElement.style.fontSize = '14px';
    } else if (screenWidth < 480) {
        document.documentElement.style.fontSize = '15px';
    } else if (screenWidth > 1920) {
        document.documentElement.style.fontSize = '18px';
    } else {
        document.documentElement.style.fontSize = `${baseSize}px`;
    }
}

// Call on load and resize
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

// Handle viewport changes for mobile browsers
function handleViewportChange() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', handleViewportChange);
window.addEventListener('orientationchange', () => {
    setTimeout(handleViewportChange, 100);
});

// Initialize
handleViewportChange();

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
function showTimelineItems() {
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            item.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', showTimelineItems);
window.addEventListener('load', showTimelineItems);

// Animated skill charts
function animateSkillCharts() {
    document.querySelectorAll('.skill-chart').forEach(chart => {
        const percent = chart.getAttribute('data-percent');
        const progress = chart.querySelector('.progress');
        const radius = 15.9155;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference * (1 - percent / 100);
        progress.setAttribute('d', "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831");
        progress.style.strokeDasharray = `${circumference} ${circumference}`;
        progress.style.strokeDashoffset = circumference;
        setTimeout(() => {
            progress.style.strokeDashoffset = offset;
        }, 300);
    });
}
function handleSkillChartAnimation() {
    const grid = document.querySelector('.skill-chart-grid');
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        animateSkillCharts();
        window.removeEventListener('scroll', handleSkillChartAnimation);
    }
}
window.addEventListener('scroll', handleSkillChartAnimation);
window.addEventListener('load', handleSkillChartAnimation);

// Animated Stats Counter
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
}

function handleStatsCounter() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        if (!counter.classList.contains('counted')) {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                animateCounter(counter, 0, parseInt(counter.getAttribute('data-count')), 1200);
                counter.classList.add('counted');
            }
        }
    });
}
window.addEventListener('scroll', handleStatsCounter);
window.addEventListener('load', handleStatsCounter);

// === PWA Install Button Placement ===
let installBtn = document.getElementById('pwa-install-btn');
if (!installBtn) {
    installBtn = document.createElement('button');
    installBtn.className = 'btn btn-primary pwa-install-btn';
    installBtn.style.display = 'none';
    installBtn.setAttribute('aria-label', 'Install this app');
    installBtn.id = 'pwa-install-btn';
    document.body.appendChild(installBtn);
}
// Make the install button a small, round, floating action button (FAB) with only an icon
installBtn.innerHTML = '<i class="fas fa-plus-square" style="font-size:1.3em;"></i>';
installBtn.style.position = 'fixed';
installBtn.style.bottom = '1.5rem';
installBtn.style.right = '1.5rem';
installBtn.style.zIndex = '1200';
installBtn.style.boxShadow = '0 4px 16px rgba(30,144,255,0.18)';
installBtn.style.borderRadius = '50%';
installBtn.style.padding = '0.7em';
installBtn.style.width = '48px';
installBtn.style.height = '48px';
installBtn.style.display = 'none'; // will be shown when available
installBtn.style.justifyContent = 'center';
installBtn.style.alignItems = 'center';
installBtn.style.fontWeight = 'bold';
installBtn.style.fontSize = '1.1em';
installBtn.style.background = 'var(--accent-green, #10b981)';
installBtn.style.color = '#fff';
installBtn.style.border = 'none';
installBtn.style.transition = 'box-shadow 0.18s, transform 0.18s';
installBtn.onmouseenter = () => installBtn.style.boxShadow = '0 8px 24px rgba(30,144,255,0.28)';
installBtn.onmouseleave = () => installBtn.style.boxShadow = '0 4px 16px rgba(30,144,255,0.18)';

// PWA Install Prompt (improved)
let deferredPrompt;

installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                installBtn.style.display = 'none';
                console.log('PWA installed by user');
            } else {
                console.log('PWA install dismissed');
            }
            deferredPrompt = null;
        });
    } else {
        alert('Install prompt not available. Make sure you are on HTTPS or localhost and meet PWA requirements.');
    }
});

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired');
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-flex';
});

// Optionally, hide the button if app is already installed
window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
    console.log('PWA was installed');
});

// Confetti animation for resume download
function launchConfetti(x, y) {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
        confetti.style.transform = `rotate(${Math.random()*360}deg)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1200);
    }
}

// === Resume Buttons Logic ===
// Find the resume button and update it
const resumeBtn = Array.from(document.querySelectorAll('a.btn.btn-primary')).find(btn => btn.textContent.includes('Download Resume'));
if (resumeBtn) {
    // Change text and behavior
    resumeBtn.textContent = 'View Resume';
    resumeBtn.setAttribute('href', 'resume.j.pdf');
    resumeBtn.setAttribute('target', '_blank');
    resumeBtn.setAttribute('rel', 'noopener');
    resumeBtn.removeAttribute('download');
    resumeBtn.onclick = null;
    // Create or get the download button
    let downloadBtn = document.getElementById('resume-download-btn');
    if (!downloadBtn) {
        downloadBtn = document.createElement('button');
        downloadBtn.id = 'resume-download-btn';
        downloadBtn.title = 'Download Resume';
        downloadBtn.setAttribute('aria-label', 'Download Resume');
        downloadBtn.style.border = 'none';
        downloadBtn.style.background = 'var(--accent-green, #10b981)';
        downloadBtn.style.color = '#fff';
        downloadBtn.style.width = '44px';
        downloadBtn.style.height = '44px';
        downloadBtn.style.borderRadius = '50%';
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.style.alignItems = 'center';
        downloadBtn.style.justifyContent = 'center';
        downloadBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
        downloadBtn.style.cursor = 'pointer';
        downloadBtn.style.transition = 'transform 0.18s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.18s';
        downloadBtn.style.marginLeft = '1em';
        downloadBtn.innerHTML = '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>';
        // Bouncy animation on click
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadBtn.style.transform = 'scale(1.18)';
            downloadBtn.style.boxShadow = '0 4px 16px rgba(16,185,129,0.18)';
            setTimeout(() => {
                downloadBtn.style.transform = '';
                downloadBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
            }, 220);
            // Download the PDF
            const link = document.createElement('a');
            link.href = 'resume.j.pdf';
            link.download = 'Adarsh-Pandey-Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    // Create a wrapper div for both buttons if not already present
    let wrapper = document.getElementById('resume-btn-wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.id = 'resume-btn-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'row';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '1em';
        wrapper.style.margin = '2em 0 0 0';
        // Insert wrapper after the resumeBtn's parent (or at a suitable place)
        resumeBtn.parentNode.insertBefore(wrapper, resumeBtn.nextSibling);
    }
    // Move the buttons into the wrapper
    wrapper.appendChild(resumeBtn);
    wrapper.appendChild(downloadBtn);
}

// === Animated Section Transitions ===
// Add CSS for section transitions
const sectionTransitionStyle = document.createElement('style');
sectionTransitionStyle.textContent = `
    section {
        transition: opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1);
        opacity: 1;
        transform: none;
    }
    section.section-exit {
        opacity: 0;
        transform: translateY(40px);
        pointer-events: none;
    }
    section.section-enter {
        opacity: 0;
        transform: translateY(-40px);
        pointer-events: none;
    }
    section.section-active {
        opacity: 1;
        transform: none;
        pointer-events: auto;
    }
`;
document.head.appendChild(sectionTransitionStyle);

// Helper to get all main sections (assumes <section id="..."> for each main area)
const mainSections = Array.from(document.querySelectorAll('section[id]'));

// Function to show a section with animation
function showSection(sectionId) {
    mainSections.forEach(sec => {
        if (sec.id === sectionId) {
            sec.classList.remove('section-exit', 'section-enter');
            sec.classList.add('section-active');
        } else if (sec.classList.contains('section-active')) {
            sec.classList.remove('section-active');
            sec.classList.add('section-exit');
        } else {
            sec.classList.remove('section-active', 'section-exit', 'section-enter');
        }
    });
}

// Animate on nav link click (if anchor links to section)
document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            // Animate out current, animate in target
            mainSections.forEach(sec => {
                if (sec.classList.contains('section-active')) {
                    sec.classList.remove('section-active');
                    sec.classList.add('section-exit');
                }
            });
            targetSection.classList.add('section-enter');
            setTimeout(() => {
                mainSections.forEach(sec => sec.classList.remove('section-enter', 'section-exit'));
                targetSection.classList.add('section-active');
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        }
    });
});

// On page load, mark the first visible section as active
window.addEventListener('DOMContentLoaded', () => {
    let found = false;
    mainSections.forEach(sec => {
        if (!found && sec.offsetParent !== null) {
            sec.classList.add('section-active');
            found = true;
        } else {
            sec.classList.remove('section-active', 'section-exit', 'section-enter');
        }
    });
});

// === Animated Background (Floating Blobs) ===
// Remove previous particles canvas if present
const oldParticles = document.getElementById('particles-bg');
if (oldParticles) oldParticles.remove();

const blobsCanvas = document.createElement('canvas');
blobsCanvas.id = 'particles-bg';
blobsCanvas.style.position = 'fixed';
blobsCanvas.style.top = '0';
blobsCanvas.style.left = '0';
blobsCanvas.style.width = '100vw';
blobsCanvas.style.height = '100vh';
blobsCanvas.style.zIndex = '0';
blobsCanvas.style.pointerEvents = 'none';
document.body.insertBefore(blobsCanvas, document.body.firstChild);

function resizeBlobsCanvas() {
    blobsCanvas.width = window.innerWidth;
    blobsCanvas.height = window.innerHeight;
}
resizeBlobsCanvas();
window.addEventListener('resize', resizeBlobsCanvas);

const ctx = blobsCanvas.getContext('2d');
const BLOB_COUNT = Math.max(6, Math.floor(window.innerWidth / 320));
const blobs = [];
for (let i = 0; i < BLOB_COUNT; i++) {
    const baseR = 60 + Math.random() * 60;
    blobs.push({
        x: Math.random() * blobsCanvas.width,
        y: Math.random() * blobsCanvas.height,
        r: baseR,
        baseR,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.18,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: `hsla(${140 + Math.random()*40}, 70%, 60%, 0.18)`
    });
}

function drawBlobs() {
    ctx.clearRect(0, 0, blobsCanvas.width, blobsCanvas.height);
    for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        // Animate radius for organic effect
        const t = Date.now() * 0.001 * b.speed + b.phase;
        const r = b.baseR + Math.sin(t) * 18 + Math.cos(t * 1.7) * 8;
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, 2 * Math.PI);
        ctx.fillStyle = b.color;
        ctx.shadowColor = 'var(--accent-green, #10b981)';
        ctx.shadowBlur = 32;
        ctx.fill();
        ctx.restore();
        // Move
        b.x += b.dx;
        b.y += b.dy;
        // Bounce off edges
        if (b.x < -b.baseR) b.x = blobsCanvas.width + b.baseR;
        if (b.x > blobsCanvas.width + b.baseR) b.x = -b.baseR;
        if (b.y < -b.baseR) b.y = blobsCanvas.height + b.baseR;
        if (b.y > blobsCanvas.height + b.baseR) b.y = -b.baseR;
    }
    requestAnimationFrame(drawBlobs);
}
drawBlobs();

// Ensure main content is above the background
const mainContent = document.getElementById('main') || document.body;
mainContent.style.position = 'relative';
mainContent.style.zIndex = '1';

// Accessibility: reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    blobsCanvas.style.display = 'none';
}

// Add floating software engineering themed icons (e.g., code, gear, terminal, cloud, database)
const shapeTypes = [
    'star', 'triangle', 'bracket', 'circle', 'diamond',
    'code', 'gear', 'terminal', 'cloud', 'database'
];

// Recreate shapes array with new types and more density
const SHAPE_COUNT = Math.max(24, Math.floor(window.innerWidth / 48));
const shapes = [];
for (let i = 0; i < SHAPE_COUNT; i++) {
    shapes.push({
        x: Math.random() * blobsCanvas.width,
        y: Math.random() * blobsCanvas.height,
        size: 18 + Math.random() * 22,
        dx: (Math.random() - 0.5) * 0.22,
        dy: (Math.random() - 0.5) * 0.22,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: (Math.random() > 0.5)
            ? 'var(--accent-green, #10b981)'
            : `hsla(${120 + Math.random()*60}, 80%, 55%, 0.22)`
    });
}

function drawShapes() {
    for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        ctx.save();
        ctx.globalAlpha = 0.7;
        switch (s.type) {
            case 'star':
                drawStar(ctx, s.x, s.y, s.size * 0.5, s.color, s.rot);
                break;
            case 'triangle':
                drawTriangle(ctx, s.x, s.y, s.size * 0.6, s.color, s.rot);
                break;
            case 'bracket':
                drawBracket(ctx, s.x, s.y, s.size * 0.7, s.color, s.rot);
                break;
            case 'diamond':
                drawDiamond(ctx, s.x, s.y, s.size * 0.5, s.color, s.rot);
                break;
            case 'code':
                drawCodeIcon(ctx, s.x, s.y, s.size * 0.6, s.color, s.rot);
                break;
            case 'gear':
                drawGearIcon(ctx, s.x, s.y, s.size * 0.6, s.color, s.rot);
                break;
            case 'terminal':
                drawTerminalIcon(ctx, s.x, s.y, s.size * 0.6, s.color, s.rot);
                break;
            case 'cloud':
                drawCloudIcon(ctx, s.x, s.y, s.size * 0.6, s.color, s.rot);
                break;
            case 'database':
                drawDatabaseIcon(ctx, s.x, s.y, s.size * 0.6, s.color, s.rot);
                break;
            default:
                // circle
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * 0.45, 0, 2 * Math.PI);
                ctx.fillStyle = s.color;
                ctx.shadowColor = s.color;
                ctx.shadowBlur = 8;
                ctx.fill();
        }
        ctx.restore();
        // Move and rotate
        s.x += s.dx;
        s.y += s.dy;
        s.rot += s.rotSpeed;
        // Wrap around edges
        if (s.x < -s.size) s.x = blobsCanvas.width + s.size;
        if (s.x > blobsCanvas.width + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = blobsCanvas.height + s.size;
        if (s.y > blobsCanvas.height + s.size) s.y = -s.size;
    }
}

// Animation loop for blobs and shapes
function animateBackground() {
    drawBlobs();
    drawShapes();
    requestAnimationFrame(animateBackground);
}
requestAnimationFrame(animateBackground);

// === Hamburger Menu (Floating, Modern) ===
document.addEventListener('DOMContentLoaded', function createHamburgerMenuOnLoad() {
    if (document.getElementById('hamburger')) return; // Already exists
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.id = 'hamburger';
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.style.position = 'fixed';
    hamburger.style.top = '1.2rem';
    hamburger.style.right = '1.2rem';
    hamburger.style.zIndex = '1300';
    hamburger.style.width = '48px';
    hamburger.style.height = '48px';
    hamburger.style.background = 'var(--accent-green, #10b981)';
    hamburger.style.border = 'none';
    hamburger.style.borderRadius = '50%';
    hamburger.style.display = 'flex';
    hamburger.style.alignItems = 'center';
    hamburger.style.justifyContent = 'center';
    hamburger.style.boxShadow = '0 2px 12px rgba(16,185,129,0.18)';
    hamburger.style.cursor = 'pointer';
    hamburger.style.transition = 'background 0.18s, box-shadow 0.18s';
    hamburger.innerHTML = `
      <span style="display:block;width:24px;height:2.8px;background:#fff;border-radius:2px;box-shadow:0 8px 0 #fff,0 16px 0 #fff;position:relative;"></span>
    `;
    document.body.appendChild(hamburger);
    console.log('[DEBUG] Hamburger menu button created');

    // Style the theme toggle button to match hamburger
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.position = 'fixed';
        themeToggle.style.top = '1.2rem';
        themeToggle.style.left = '1.2rem';
        themeToggle.style.zIndex = '1300';
        themeToggle.style.width = '48px';
        themeToggle.style.height = '48px';
        themeToggle.style.background = 'var(--accent-green, #10b981)';
        themeToggle.style.border = 'none';
        themeToggle.style.borderRadius = '50%';
        themeToggle.style.display = 'flex';
        themeToggle.style.alignItems = 'center';
        themeToggle.style.justifyContent = 'center';
        themeToggle.style.boxShadow = '0 2px 12px rgba(16,185,129,0.18)';
        themeToggle.style.cursor = 'pointer';
        themeToggle.style.transition = 'background 0.18s, box-shadow 0.18s';
        themeToggle.querySelector('i').style.fontSize = '1.3em';
        themeToggle.querySelector('i').style.color = '#fff';
        themeToggle.onmouseenter = () => themeToggle.style.boxShadow = '0 8px 24px rgba(16,185,129,0.28)';
        themeToggle.onmouseleave = () => themeToggle.style.boxShadow = '0 2px 12px rgba(16,185,129,0.18)';
    }

    // Create nav menu if not present
    let navMenu = document.getElementById('nav-menu');
    if (!navMenu) {
        navMenu = document.createElement('nav');
        navMenu.id = 'nav-menu';
        navMenu.style.position = 'fixed';
        navMenu.style.top = '0';
        navMenu.style.right = '0';
        navMenu.style.height = '100vh';
        navMenu.style.width = '0';
        navMenu.style.background = 'rgba(15,23,42,0.98)';
        navMenu.style.overflow = 'hidden';
        navMenu.style.transition = 'width 0.32s cubic-bezier(.4,0,.2,1)';
        navMenu.style.zIndex = '1299';
        navMenu.innerHTML = `
          <ul style="list-style:none;padding:3.5rem 2.5rem 0 2.5rem;margin:0;display:flex;flex-direction:column;gap:2.2rem;font-size:1.25em;">
            <li><a class="nav-link" href="#home">Home</a></li>
            <li><a class="nav-link" href="#about">About</a></li>
            <li><a class="nav-link" href="#skills">Skills</a></li>
            <li><a class="nav-link" href="#projects">Projects</a></li>
            <li><a class="nav-link" href="#contact">Contact</a></li>
          </ul>
        `;
        document.body.appendChild(navMenu);
    }

    // Hamburger click toggles menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navMenu.style.width === '0px' || navMenu.style.width === '0') {
            navMenu.style.width = '260px';
        } else {
            navMenu.style.width = '0';
        }
    });

    // Close menu on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.style.width = '0';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.style.width = '0';
        }
    });
});

// === Hero Section Animated Code Window & Typing ===
document.addEventListener('DOMContentLoaded', function () {
    // Animated code lines for hero
    const codeLines = [
        'function greet(name) {',
        '    return `Hello, ${name}!`;',
        '}',
        '',
        'const skills = ["React", "Node.js", "Python", "C++", "ML"];',
        'for (const skill of skills) {',
        '    console.log(`🚀 Mastering ${skill}...`);',
        '}',
        '',
        '// Let\'s build something amazing together!'
    ];
    const codeEl = document.getElementById('hero-code-animation');
    let codeIndex = 0, charIndex = 0;
    function typeCode() {
        if (!codeEl) return;
        if (codeIndex < codeLines.length) {
            if (charIndex <= codeLines[codeIndex].length) {
                codeEl.innerHTML =
                    codeLines.slice(0, codeIndex).join('\n') +
                    (codeIndex > 0 ? '\n' : '') +
                    `<span style="color:#facc15;">${codeLines[codeIndex].slice(0, charIndex)}</span>`;
                charIndex++;
                setTimeout(typeCode, 32 + Math.random() * 32);
            } else {
                charIndex = 0;
                codeIndex++;
                setTimeout(typeCode, 350);
            }
        } else {
            setTimeout(() => {
                codeIndex = 0; charIndex = 0; codeEl.innerHTML = '';
                setTimeout(typeCode, 600);
            }, 1200);
        }
    }
    if (codeEl) typeCode();

    // Animated role typing
    const roles = [
        'Full Stack Developer',
        'Competitive Programmer',
        'Open Source Enthusiast',
        'Tech Blogger',
        'Problem Solver'
    ];
    const roleEl = document.getElementById('hero-typed-role');
    let roleIdx = 0, roleChar = 0, erasing = false;
    function typeRole() {
        if (!roleEl) return;
        if (!erasing && roleChar <= roles[roleIdx].length) {
            roleEl.textContent = roles[roleIdx].slice(0, roleChar);
            roleChar++;
            setTimeout(typeRole, 80);
        } else if (!erasing) {
            setTimeout(() => { erasing = true; typeRole(); }, 1200);
        } else if (erasing && roleChar > 0) {
            roleEl.textContent = roles[roleIdx].slice(0, roleChar - 1);
            roleChar--;
            setTimeout(typeRole, 36);
        } else {
            erasing = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(typeRole, 300);
        }
    }
    if (roleEl) typeRole();
});

// Remove unused CSS rules
const unusedCSS = `
  /* Unused CSS rules removed for performance */
  @keyframes ripple-animation {
      to {
          transform: scale(4);
          opacity: 0;
      }
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = unusedCSS;
document.head.appendChild(styleSheet);

// === Always Add Animated Download Resume Button in Hero ===
    // Find the first resume button in the hero section
    const heroResumeBtn = document.querySelector('.hero-buttons a.btn.btn-primary[href$="resume.j.pdf"]');
    if (heroResumeBtn) {
        // Create or get the download button
        let downloadBtn = document.getElementById('resume-download-btn');
        if (!downloadBtn) {
            downloadBtn = document.createElement('button');
            downloadBtn.id = 'resume-download-btn';
            downloadBtn.title = 'Download Resume';
            downloadBtn.setAttribute('aria-label', 'Download Resume');
            downloadBtn.style.border = 'none';
            downloadBtn.style.background = 'var(--accent-green, #10b981)';
            downloadBtn.style.color = '#fff';
            downloadBtn.style.width = '44px';
            downloadBtn.style.height = '44px';
            downloadBtn.style.borderRadius = '50%';
            downloadBtn.style.display = 'inline-flex';
            downloadBtn.style.alignItems = 'center';
            downloadBtn.style.justifyContent = 'center';
            downloadBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
            downloadBtn.style.cursor = 'pointer';
            downloadBtn.style.transition = 'transform 0.18s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.18s';
            downloadBtn.style.marginLeft = '0.5em';
            downloadBtn.innerHTML = '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>';
            // Bouncy animation on click
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                downloadBtn.style.transform = 'scale(1.18)';
                downloadBtn.style.boxShadow = '0 4px 16px rgba(16,185,129,0.18)';
                setTimeout(() => {
                    downloadBtn.style.transform = '';
                    downloadBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
                }, 220);
                // Download the PDF
                const link = document.createElement('a');
                link.href = 'resume.j.pdf';
                link.download = 'Adarsh-Pandey-Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
        // Insert the download button right after the resume button
        if (heroResumeBtn.nextSibling !== downloadBtn) {
            heroResumeBtn.parentNode.insertBefore(downloadBtn, heroResumeBtn.nextSibling);
        }
    }

