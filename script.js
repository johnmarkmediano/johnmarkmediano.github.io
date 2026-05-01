// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 80);
});

// Hover effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .hamburger');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// MOBILE NAVIGATION
// ============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// TYPING EFFECT
// ============================================
const typingText = document.getElementById('typing-text');
const words = ['Web Developer', 'Problem Solver', 'Communication Specialist', 'Code Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 300;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ============================================
// SKILL BARS ANIMATION
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+%)/);
            if (targetWidth) {
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth[1];
                }, 200);
            }
        });
        // Remove listener after animation triggers once
        window.removeEventListener('scroll', animateSkillBars);
    }
}

window.addEventListener('scroll', animateSkillBars);

// ============================================
// COUNTER ANIMATION (About Stats)
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const aboutSection = document.querySelector('.about');
    
    if (!aboutSection) return;
    
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startValue = 0;
            const increment = target / (duration / 16);
            let currentValue = startValue;
            
            const updateCounter = () => {
                currentValue += increment;
                if (currentValue < target) {
                    counter.textContent = Math.floor(currentValue);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        window.removeEventListener('scroll', animateCounters);
    }
}

window.addEventListener('scroll', animateCounters);

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = navbar.offsetHeight + 20;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll simulate a successful submission
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    btn.style.background = '#00b894';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after delay
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 3000);
    
    console.log('Form submitted:', { name, email, subject, message });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = '#a29bfe';
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ============================================
// PARALLAX EFFECT ON HERO SPHERES
// ============================================
document.addEventListener('mousemove', (e) => {
    const spheres = document.querySelectorAll('.gradient-sphere');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    spheres.forEach((sphere, index) => {
        const factor = (index + 1) * 0.5;
        sphere.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});

// ============================================
// INITIALIZATION
// ============================================


const skillCards = document.querySelectorAll('.soft-skill-card');

skillCards.forEach(card => {
    card.addEventListener('click', function() {
        // If this card is already flipped, unflip it
        if (this.classList.contains('flipped')) {
            this.classList.remove('flipped');
        } else {
            // Close any other open cards first
            skillCards.forEach(c => c.classList.remove('flipped'));
            // Flip this card
            this.classList.add('flipped');
        }
    });
});

// Close card when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.soft-skill-card')) {
        skillCards.forEach(card => card.classList.remove('flipped'));
    }
});

// ============================================
// INTERACTIVE SOFT SKILLS - FLIP CARDS
// ============================================
console.log('🚀 Portfolio loaded! Welcome to John Mark Mediano\'s website.');