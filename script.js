// ============================================================
//  Nirmiti.exe — script.js
// ============================================================

// ----- 1. DARK / LIGHT MODE TOGGLE -----
const themeToggle = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> <span id="themeLabel">Light</span>';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i> <span id="themeLabel">Light</span>'
        : '<i class="fas fa-moon"></i> <span id="themeLabel">Dark</span>';
});

// ----- 2. PROJECT SEARCH FILTER -----
const searchInput  = document.getElementById('projectSearch');
const projectRows  = document.querySelectorAll('.project-row');

searchInput.addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase().trim();
    projectRows.forEach(row => {
        const title = (row.getAttribute('data-title') || '').toLowerCase();
        const desc  = (row.querySelector('p')?.textContent || '').toLowerCase();
        row.style.display = (title.includes(query) || desc.includes(query)) ? '' : 'none';
    });
});

// ----- 3. BACK TO TOP BUTTON -----
const backBtn = document.getElementById('backTopBtn');

window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 400);
});
backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ----- 4. HERO "SEE WHAT I'VE MADE" BUTTON -----
document.getElementById('exploreBtn').addEventListener('click', function () {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ----- 5. TERMINAL POPUP -----
const terminalBtn     = document.getElementById('terminalBtn');
const terminalOverlay = document.getElementById('terminalOverlay');
const terminalClose   = document.getElementById('terminalClose');

terminalBtn.addEventListener('click', () => terminalOverlay.classList.add('active'));
terminalClose.addEventListener('click', () => terminalOverlay.classList.remove('active'));
terminalOverlay.addEventListener('click', (e) => {
    if (e.target === terminalOverlay) terminalOverlay.classList.remove('active');
});

// ----- 6. SMOOTH NAV SCROLL -----
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ----- 7. PROJECT DETAILS MODAL -----
// Code projects use "links"; the design project uses "categories" to
// build a tabbed image gallery.
const projectsData = {
    cafe: {
        eyebrow: 'Code project',
        title: 'Like an Echo — Cafe Management System',
        tags: ['Python', 'Terminal app', 'Done'],
        description: 'A command-line cafe management system built in Python. Handles order-taking, billing, and menu management through a clean, straightforward terminal interface.',
        links: [
            { label: 'View code on GitHub', url: 'https://github.com/Azhi-Haven/like-an-echo-cafe', icon: 'fa-brands fa-github' }
        ]
    },
    recipe: {
        eyebrow: 'Code project',
        title: 'Recipe Webpage',
        tags: ['HTML', 'CSS', 'JavaScript', 'In progress'],
        description: 'A cozy, visually warm recipe site currently in development — built to make browsing and saving recipes feel simple and inviting.',
        links: [],
        note: 'Still being built — a live link and screenshots will follow once it\u2019s ready.'
    },
    design: {
        eyebrow: 'Design work',
        title: 'Design Portfolio',
        tags: ['Canva', 'Figma', 'Digital design'],
        description: 'Book cover designs, character moodboards, social graphics, and design work made for a college club. Tap any image to view it full-size.',
        links: [
            { label: 'Download Launchpad deck (PDF)', url: 'assets/club/Launchpad_2026.pdf', icon: 'fas fa-file-pdf' }
        ],
        categories: [
            {
                name: 'Book covers',
                images: [
                    { src: 'assets/design/book-my-soul.jpg', caption: 'My Soul' },
                    { src: 'assets/design/book-amore-nascosto.jpg', caption: 'Amore Nascosto — Hidden Love' },
                    { src: 'assets/design/book-heart-draft-1.jpg', caption: 'The Heart Draft' },
                    { src: 'assets/design/book-heart-draft-2.jpg', caption: 'The Heart Draft, Part 2' }
                ]
            },
            {
                name: 'Character moodboards',
                images: [
                    { src: 'assets/design/moodboard-karthik.jpg', caption: 'Karthik Pratapveer Singh Rathore' },
                    { src: 'assets/design/moodboard-vihaan.jpg', caption: 'Vihaan Cristello' },
                    { src: 'assets/design/moodboard-tarun.jpg', caption: 'Tarun Malhotra' },
                    { src: 'assets/design/moodboard-rehaan.jpg', caption: 'Rehaan' },
                    { src: 'assets/design/moodboard-noor-1.jpg', caption: 'Noor Atlanna Zaahira' },
                    { src: 'assets/design/moodboard-noor-2.jpg', caption: 'Noor Atlanna Singhania' },
                    { src: 'assets/design/moodboard-kian.jpg', caption: 'Kian Singhania' },
                    { src: 'assets/design/moodboard-aria.jpg', caption: 'Aria Desai' },
                    { src: 'assets/design/moodboard-kaius.jpg', caption: 'Kaius' }
                ]
            },
            {
                name: 'Banners & aesthetics',
                images: [
                    { src: 'assets/design/banner-official-playlist.jpg', caption: 'Official Playlist' },
                    { src: 'assets/design/banner-en-el-nombre.jpg', caption: 'En El Nombre Del Amor' }
                ]
            },
            {
                name: 'Club work',
                images: [
                    { src: 'assets/club/club-launchpad-banner.jpg', caption: 'Project Launchpad — Event Banner' },
                    { src: 'assets/club/club-launchpad-team.jpg', caption: 'Project Launchpad — Team & Event Recap' }
                ]
            }
        ]
    },
    soon: {
        eyebrow: 'Coming soon',
        title: 'Something New',
        tags: ['TBA'],
        description: 'A new project is currently in the works. Details will be added here soon.',
        links: []
    }
};

const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModalContent = document.getElementById('modalContent');
const projectModalClose   = document.getElementById('modalClose');

const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');

function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightboxOverlay.classList.add('active');
}
function closeLightbox() { lightboxOverlay.classList.remove('active'); }

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
});

function renderCategories(categories) {
    if (!categories || !categories.length) return '';

    const tabsHTML = categories.map((cat, i) => `
        <button class="modal-tab${i === 0 ? ' active' : ''}" data-cat-index="${i}">${cat.name}</button>
    `).join('');

    const panelsHTML = categories.map((cat, i) => `
        <div class="modal-tab-panel${i === 0 ? ' active' : ''}" data-cat-panel="${i}">
            <div class="modal-thumb-grid">
                ${cat.images.map(img => `
                    <button class="modal-thumb" data-full="${img.src}" data-caption="${img.caption}">
                        <img src="${img.src}" alt="${img.caption}" loading="lazy" />
                        <span class="modal-thumb-caption">${img.caption}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');

    return `<div class="modal-tabs">${tabsHTML}</div><div class="modal-tab-panels">${panelsHTML}</div>`;
}

function openProjectModal(id) {
    const data = projectsData[id];
    if (!data || !projectModalContent) return;

    const tagsHTML = data.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    const categoriesHTML = renderCategories(data.categories);
    const linksHTML = data.links.length
        ? `<div class="modal-links">${data.links.map(l => `
            <a class="modal-link-btn" href="${l.url}" target="_blank" rel="noopener noreferrer">
                <i class="${l.icon}"></i> ${l.label}
            </a>`).join('')}</div>`
        : '';
    const noteHTML = data.note ? `<p class="modal-note">${data.note}</p>` : '';

    projectModalContent.innerHTML = `
        <div class="modal-eyebrow">${data.eyebrow}</div>
        <h3>${data.title}</h3>
        <div class="modal-tags">${tagsHTML}</div>
        <p class="modal-desc">${data.description}</p>
        ${categoriesHTML}
        ${linksHTML}
        ${noteHTML}
    `;

    projectModalContent.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const idx = tab.dataset.catIndex;
            projectModalContent.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            projectModalContent.querySelectorAll('.modal-tab-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            projectModalContent.querySelector(`.modal-tab-panel[data-cat-panel="${idx}"]`).classList.add('active');
        });
    });

    projectModalContent.querySelectorAll('.modal-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => openLightbox(thumb.dataset.full, thumb.dataset.caption));
    });

    projectModalOverlay.classList.add('active');
}

function closeProjectModal() { projectModalOverlay.classList.remove('active'); }

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.disabled) return;
        openProjectModal(btn.dataset.project);
    });
});

projectModalClose.addEventListener('click', closeProjectModal);
projectModalOverlay.addEventListener('click', (e) => {
    if (e.target === projectModalOverlay) closeProjectModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (lightboxOverlay.classList.contains('active')) closeLightbox();
    else if (projectModalOverlay.classList.contains('active')) closeProjectModal();
    else if (terminalOverlay.classList.contains('active')) terminalOverlay.classList.remove('active');
});

console.log('Nirmiti.exe loaded.');
