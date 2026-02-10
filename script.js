// --- Loading Screen ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// --- Theme Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    html.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
}

themeToggle.addEventListener('click', () => {
    let theme = html.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('ri-sun-line');
        themeIcon.classList.add('ri-moon-line');
    } else {
        themeIcon.classList.remove('ri-moon-line');
        themeIcon.classList.add('ri-sun-line');
    }
}

// --- Typewriter Effect ---
const phrases = ["Data Analyst", "Data Scientist", "AI Enthusiast"];
const dynamicText = document.querySelector('.dynamic-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}
typeEffect();

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// --- Modal Logic & Project Data ---
const certFab = document.getElementById('cert-fab');
const certModal = document.getElementById('cert-modal');
const projectModal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeButtons = document.querySelectorAll('.close-modal');

// Open Cert Modal
certFab.addEventListener('click', () => {
    certModal.style.display = 'flex';
});

// Specific Project Data
const projectDetails = {
    1: {
        title: "Retail Business Intelligence & Performance Dashboard",
        content: `
            <p>A comprehensive Power BI solution analyzing multi-year retail operations (2017-2018). Converts raw transactional data into strategic insights for monitoring financial health, customer demographics, and store efficiency.</p>
            <br>
            <h4>Key Achievements & Solutions:</h4>
            <ul>
                <li><strong>Data Architecture:</strong> Robust Star Schema with fact tables (Sales & Returns) and dimension tables for high-performance reporting.</li>
                <li><strong>Advanced Analytics (DAX):</strong> Created complex KPIs like Total Revenue, Net Profit, and Return Rates.</li>
                <li><strong>Customer Intelligence:</strong> Segmented customers by income, education, and occupation to identify key demographics.</li>
                <li><strong>Operational Efficiency:</strong> Developed custom "Sales per Sqft" metrics to benchmark store performance.</li>
            </ul>
            <br>
            <p><strong>Tools Used:</strong> Power BI (Data Modeling & Visualization), Power Query (M), DAX</p>
        `,
        images: [
            "assets/food mart project/sales.png",
            "assets/food mart project/customers.png",
            "assets/food mart project/products.png",
            "assets/food mart project/stores.png"
        ]
    },
    2: {
        title: "Spotify End-to-End Analysis & Skip Prediction",
        content: `
            <p>A complete data science solution predicting song skips based on 140,000+ streaming records.</p>
            <br>
            <h4>Technical Pipeline:</h4>
            <ul>
                <li><strong>Data Cleaning (Python/Pandas):</strong> Processed raw timestamps, handled missing values, and defined skip behavior (<30 sec).</li>
                <li><strong>Machine Learning (Scikit-Learn):</strong> Implemented Random Forest Classifier achieving 80% accuracy. Key features included Session_ID and Time_of_Day.</li>
                <li><strong>Visualization (Power BI):</strong> Designed a dark-themed, interactive UX mirroring Spotify's interface with drill-down capabilities.</li>
            </ul>
            <br>
            <h4>Key Findings:</h4>
            <ul>
                <li><strong>Context > Content:</strong> User behavior (Shuffle/Autoplay) predicts skipping more reliably than the artist.</li>
                <li><strong>Platform Insights:</strong> 96% of listening occurred on Android, with a skip rate of 36.8%.</li>
            </ul>
        `,
        images: [
            "assets/Spotify project/Spotify_dashboard.png"
        ]
    }
};

// Project Details Buttons
const detailsBtns = document.querySelectorAll('.details-btn');
detailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const data = projectDetails[id];
        
        if (!data) return; // Guard clause

        // Build Images HTML
        let imagesHtml = '<div class="project-modal-images">';
        data.images.forEach(imgSrc => {
            // Using onclick to trigger lightbox
            imagesHtml += `<img src="${imgSrc}" class="project-detail-img" onclick="openLightbox(this.src)">`;
        });
        imagesHtml += '</div>';

        modalBody.innerHTML = `<h3>${data.title}</h3>${data.content}${imagesHtml}`;
        projectModal.style.display = 'flex';
    });
});

// Close Modals
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        certModal.style.display = 'none';
        projectModal.style.display = 'none';
    });
});

window.onclick = function(event) {
    if (event.target == certModal || event.target == projectModal) {
        certModal.style.display = 'none';
        projectModal.style.display = 'none';
    }
}

// --- Lightbox Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

// Global function for onclick in injected HTML
window.openLightbox = openLightbox;

// Bind View Cert Buttons
const viewCertBtns = document.querySelectorAll('.view-cert-btn');
viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const src = btn.getAttribute('data-img');
        openLightbox(src);
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});

// --- Mobile Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});