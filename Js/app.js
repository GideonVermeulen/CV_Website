// Scroll animations
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Form submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            successMessage.classList.add('show');
            contactForm.reset();
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            alert('There was a problem submitting your form.');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
const showMoreLink = document.querySelector('.show-more-link');
const extraInfoDiv = document.querySelector('.extra-info');
const arrow = document.querySelector('.arrow');

if (showMoreLink && extraInfoDiv && arrow) {
    showMoreLink.addEventListener('click', function () {
        const isOpening = !extraInfoDiv.classList.contains('open');
        
        extraInfoDiv.classList.toggle('open');
        arrow.textContent = isOpening ? '▲' : '▼';
        showMoreLink.innerHTML = isOpening ? 
            'Show less <span class="arrow">▲</span>' : 
            'Show more <span class="arrow">▼</span>';
        
        // Add rotation effect
        arrow.classList.toggle('rotated', isOpening);
    });
}

// Hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
    });
    // Optional: close menu when a link is clicked (for better UX)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', false);
            document.body.classList.remove('menu-open');
        });
    });
}
