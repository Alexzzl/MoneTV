/**
 * Home Page Module (Figma Style)
 */
const HomePage = {
    init() {
        this.renderHeroSection();
        this.renderSeriesSections();
        this.bindEvents();
    },

    bindEvents() {
        // Event delegation for series cards
        document.getElementById('home-page').addEventListener('click', (e) => {
            const card = e.target.closest('.series-card');
            if (card) {
                const dramaId = card.dataset.dramaId;
                Router.navigateTo('detail', { dramaId });
            }

            const heroBtn = e.target.closest('.hero-actions .btn');
            if(heroBtn) {
                // For now, all hero buttons navigate to the first drama's detail page
                Router.navigateTo('detail', { dramaId: '1' });
            }
        });
    },

    renderHeroSection() {
                const dramas = MockData.dramas;
        const heroData = dramas[Math.floor(Math.random() * dramas.length)];
        const heroSection = document.getElementById('home-hero-section');

        if (heroSection && heroData) {
            heroSection.innerHTML = `
                <div class="hero-poster-container">
                    <img src="${heroData.image}" alt="${heroData.title}">
                </div>
                <div class="hero-details-container">
                    <h1 class="hero-title">${heroData.title}</h1>
                    <div class="hero-meta">
                        <div class="hero-meta-item"><i class="icon"></i> <span>${heroData.seasons} Seasons</span></div>
                        <div class="hero-meta-item"><i class="icon"></i> <span>${heroData.duration} min episodes</span></div>
                        <div class="hero-meta-item"><i class="icon"></i> <span>${heroData.rating} Rating</span></div>
                    </div>
                    <p class="hero-description">${heroData.description}</p>
                    <div class="hero-actions">
                        <button class="btn btn-primary"><i class="icon"></i> Watch Now</button>
                        <button class="btn btn-secondary"><i class="icon">+</i> Add to Watchlist</button>
                    </div>
                </div>
            `;
        }
    },

    renderSeriesSections() {
        const popularDramas = MockData.getPopularDramas();
        const recentlyAdded = MockData.getRecentlyAdded();

        this.renderSeriesSection('popular-series', 'Popular Series', popularDramas);
        this.renderSeriesSection('recently-added', 'Recently Added', recentlyAdded);
    },

    renderSeriesSection(elementId, title, dramas) {
        const section = document.getElementById(elementId);
        if (!section) return;

        const cardsHTML = dramas.map(drama => this.createSeriesCard(drama)).join('');

        section.innerHTML = `
            <h2 class="home-section-title">${title}</h2>
            <div class="horizontal-scroll-container">
                ${cardsHTML}
            </div>
        `;
    },

    createSeriesCard(drama) {
        const meta = drama.seasons ? `${drama.seasons} Seasons` : `${drama.episodes} episodes`;
        return `
            <div class="series-card" data-drama-id="${drama.id}" data-focusable="true">
                <div class="series-card-poster">
                    <img src="${drama.image}" alt="${drama.title}" onerror="this.src='assets/CodeBubbyAssets/3052_654/2.png'">
                    <div class="series-card-play-button"></div>
                </div>
                <div class="series-card-content">
                    <h3 class="series-card-title">${drama.title}</h3>
                    <p class="series-card-description">${drama.description}</p>
                    <div class="series-card-meta">${drama.categoryName} &bull; ${meta}</div>
                </div>
            </div>
        `;
    }
};

window.HomePage = HomePage;
