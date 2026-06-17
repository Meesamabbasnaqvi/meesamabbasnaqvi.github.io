/**
 * Meesam Abbas - Personal Portfolio
 * Core JavaScript Logic
 * 
 * Includes:
 * 1. Scroll Reveal Animations (using Intersection Observer)
 * 2. Typing Effect for Sub-header Roles
 * 3. Portfolio Project Category Filtering
 * 4. Responsive Navbar Scroll Styling Changes
 * 5. Light/Dark Theme Switching and Icon Updates
 * 6. Contact Form EmailJS Integration (and sandbox fallback)
 * 7. Stats Counter Count-up Scroll Animations (2.5s duration)
 */

// ==========================================
// 1. SCROLL REVEAL ANIMATION
// ==========================================
// Observes sections/elements with the '.reveal' class and adds the '.visible' 
// class when they cross into the viewport (offset by staggered delays).
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            // Stagger the fade-in effect slightly based on grid element index
            setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.15 }); // Trigger when 15% of the element is visible

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ==========================================
// 2. TYPED TEXT ANIMATION
// ==========================================
// Staggers typewriter text entries for listed roles in the Hero section.
const roles = ['Frontend Developer', 'Data Analytics Enthusiast'];
let ri = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');

function type() {
    if (!typedEl) return;
    const cur = roles[ri];
    
    if (!del) {
        // Typing characters forward
        typedEl.textContent = cur.slice(0, ci + 1);
        ci++;
        if (ci === cur.length) {
            del = true;
            setTimeout(type, 2000); // Pause on fully typed word
            return;
        }
    } else {
        // Deleting characters backward
        typedEl.textContent = cur.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
            del = false;
            ri = (ri + 1) % roles.length; // Move to next role
            setTimeout(type, 400); // Pause before typing next word
            return;
        }
    }
    setTimeout(type, del ? 50 : 80); // Speed configurations
}

document.addEventListener('DOMContentLoaded', type);

// ==========================================
// 3. PROJECT FILTERING
// ==========================================
// Filter projects dynamically based on category attributes (All, Web, Data, Games).
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Set active styling on clicked button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.dataset.filter;

        // Toggle card visibility based on data attributes
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.type === filterValue) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ==========================================
// 4. NAV SCROLLING TWEAKS
// ==========================================
// Handles shrinking padding and adding a shadow to the header nav upon scrolling.
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    if (window.scrollY > 50) {
        nav.style.padding = window.innerWidth > 1024 ? '0.8rem 6rem' : '0.8rem 2.5rem';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.padding = window.innerWidth > 1024 ? '1.2rem 6rem' : '1rem 2.5rem';
        nav.style.boxShadow = 'none';
    }
});

// ==========================================
// 5. THEME SWITCHER
// ==========================================
// Handles dark/light theme toggle switches, local storage caching, and icon states.
const themeToggleBtn = document.getElementById('theme-toggle');

// Initialize settings from local cache or default to dark theme
const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
updateThemeIcon(currentTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (!icon) return;
    
    // Toggle between Sun and Moon Bootstrap icons
    if (theme === 'light') {
        icon.className = 'bi bi-moon-fill';
    } else {
        icon.className = 'bi bi-sun-fill';
    }
}

// ==========================================
// 6. EMAILJS CONTACT FORM INTEGRATION
// ==========================================
// Sends client-filled contact form messages to the developer's EmailJS service dashboard.
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
    });
}

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-submit');

if (contactForm && submitBtn) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const alertToast = document.getElementById('contact-alert');
    const alertMessage = alertToast ? alertToast.querySelector('.alert-message') : null;
    const alertIcon = alertToast ? alertToast.querySelector('.alert-icon') : null;

    // Toast alert triggers for form statuses
    function showToast(message, type = 'success') {
        if (!alertToast || !alertMessage || !alertIcon) return;
        alertToast.className = `alert-toast ${type}`;
        alertMessage.textContent = message;

        const iconName = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
        alertIcon.className = `alert-icon bi ${iconName}`;

        alertToast.classList.remove('hidden');

        setTimeout(() => {
            alertToast.classList.add('hidden');
        }, 5000);
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Lock form submit button and show loading indicators
        submitBtn.disabled = true;
        if (btnText) btnText.classList.add('hidden');
        if (btnLoader) btnLoader.classList.remove('hidden');

        // Check if configuration parameters are still placeholder texts
        if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" || EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" || EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
            // Simulated response logging for dev environments
            console.log("Mock EmailJS delivery payload:", {
                name: document.getElementById('user_name').value,
                email: document.getElementById('user_email').value,
                subject: document.getElementById('msg_subject').value,
                message: document.getElementById('message').value
            });

            setTimeout(() => {
                submitBtn.disabled = false;
                if (btnText) btnText.classList.remove('hidden');
                if (btnLoader) btnLoader.classList.add('hidden');
                contactForm.reset();
                showToast("Message simulated successfully! Configure your EmailJS keys to send real mail.", "success");
            }, 1000);
            return;
        }

        // Send template email data via standard EmailJS parameters
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(() => {
                submitBtn.disabled = false;
                if (btnText) btnText.classList.remove('hidden');
                if (btnLoader) btnLoader.classList.add('hidden');
                contactForm.reset();
                showToast("Your message was sent successfully!", "success");
            }, (error) => {
                submitBtn.disabled = false;
                if (btnText) btnText.classList.remove('hidden');
                if (btnLoader) btnLoader.classList.add('hidden');
                console.error("EmailJS submission failure detail:", error);
                showToast("Failed to send message. Please try again or email directly.", "error");
            });
    });
}

// ==========================================
// 7. STATS COUNTER ANIMATION
// ==========================================
// Triggers the numerical digits in the hero section stats cards to animate upwards.
function animCounter(el, target) {
    let c = 0;
    const dur = 2500; // Duration set to 2.5s for a fluid and clear animation transition
    const step = target / (dur / 16); // Increment offset calculated around standard ~60fps step intervals (16ms)
    
    const t = setInterval(() => {
        c = Math.min(c + step, target);
        el.textContent = Math.round(c);
        if (c >= target) {
            clearInterval(t); // Stop counting once the target value is reached
        }
    }, 16);
}

// Observe stats container in the Hero grid and trigger animation once it slides in
const statsContainer = document.querySelector('.hero-stats');
if (statsContainer) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                document.querySelectorAll('.stat-num').forEach(el => {
                    animCounter(el, parseInt(el.dataset.target, 10) || 0);
                });
                statsObserver.disconnect(); // Disconnect to prevent re-triggering upon subsequent scrolling
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the stats section becomes visible
    statsObserver.observe(statsContainer);
}
