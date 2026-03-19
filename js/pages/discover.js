/**
 * Discover Page Module (Figma Style)
 */
const DiscoverPage = {
    init() {
        this.renderGenreFilters();
        this.renderTrendingSection();
        this.renderBrowseByGenre();
        this.renderNewThisWeek();
        this.bindEvents();
    },

    bindEvents() {
        // Event delegation for cards
        document.getElementById('discover-page').addEventListener('click', (e) => {
            const trendingCard = e.target.closest('.trending-card');
            if (trendingCard) {
                const dramaId = trendingCard.dataset.dramaId;
                Router.navigateTo('detail', { dramaId });
                return;
            }

            const genreCard = e.target.closest('.genre-card');
            if (genreCard) {
                const categoryId = genreCard.dataset.categoryId;
                // Implement navigation or filtering for the selected genre
                console.log('Genre card clicked:', categoryId);
                return;
            }

            const genreFilter = e.target.closest('.genre-filters .btn');
            if (genreFilter) {
                document.querySelectorAll('.genre-filters .btn').forEach(btn => btn.classList.remove('active'));
                genreFilter.classList.add('active');
                // Implement filtering logic based on the selected genre
                console.log('Genre filter selected:', genreFilter.textContent);
            }
        });
    },

    renderGenreFilters() {
        const filtersContainer = document.getElementById('genre-filters');
        if (!filtersContainer) return;

        const genres = ['All Genres', 'Romance', 'Drama', 'Thriller', 'Comedy', 'Fantasy', 'Sci-Fi'];
        filtersContainer.innerHTML = genres.map((genre, index) => `
            <button class="btn ${index === 0 ? 'active' : ''}" data-focusable="true">${genre}</button>
        `).join('');
    },

    renderTrendingSection() {
        const container = document.getElementById('trending-now-container');
        if (!container) return;

        const trendingDramas = MockData.getTrendingDramas();
        container.innerHTML = trendingDramas.map(drama => this.createTrendingCard(drama)).join('');
    },

    createTrendingCard(drama) {
        return `
            <div class="trending-card" data-drama-id="${drama.id}" data-focusable="true">
                <div class="trending-card-poster" style="background-image: url('${drama.image}');">
                    ${drama.badge ? `<div class="trending-card-badge">${drama.badge}</div>` : ''}
                </div>
                <div class="trending-card-content">
                    <h3 class="trending-card-title">${drama.title}</h3>
                    <p class="trending-card-description">${drama.description}</p>
                    <div class="trending-card-meta">
                        <span class="trending-card-tags">${drama.tags.join(' &bull; ')}</span>
                        <div class="trending-card-rating">
                            <i class="icon"></i>
                            <span>${drama.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderBrowseByGenre() {
        const container = document.getElementById('browse-by-genre-container');
        if (!container) return;

        const categories = MockData.getCategoriesWithStats();
        container.innerHTML = categories.map(category => this.createGenreCard(category)).join('');
    },

    createGenreCard(category) {
        const subGenreTags = category.subgenres.map(tag => `<div class="genre-card-tag">${tag}</div>`).join('');
        return `
            <div class="genre-card" data-category-id="${category.id}" data-focusable="true">
                <div class="genre-card-header">
                    <div class="genre-card-icon-title">
                        <div class="genre-card-icon">${category.icon}</div>
                        <h3 class="genre-card-title">${category.name}</h3>
                    </div>
                    <span class="genre-card-count">${category.seriesCount} Series</span>
                </div>
                <p class="genre-card-description">${category.description}</p>
                <div class="genre-card-tags">${subGenreTags}</div>
            </div>
        `;
    },

    renderNewThisWeek() {
        const section = document.getElementById('new-this-week-section');
        if (!section) return;

        const newDramas = MockData.getNewThisWeek();
        const cardsHTML = newDramas.map(drama => this.createNewThisWeekCard(drama)).join('');

        section.innerHTML = `
            <h2 class="discover-section-title"><i class="icon fas fa-bolt"></i> New This Week</h2>
            <div class="new-this-week-grid">
                ${cardsHTML}
            </div>
        `;
    },

    createNewThisWeekCard(drama) {
        return `
            <div class="new-drama-card-v2" data-drama-id="${drama.id}" data-focusable="true">
                <div class="new-drama-card-v2-icon">${drama.cardIcon}</div>
                <div class="new-drama-card-v2-badge">${drama.badge}</div>
                <div class="new-drama-card-v2-content">
                    <h3 class="new-drama-card-v2-title">${drama.title}</h3>
                    <p class="new-drama-card-v2-description">${drama.description}</p>
                </div>
                <div class="new-drama-card-v2-play-icon"></div>
            </div>
        `;
    }
};

window.DiscoverPage = DiscoverPage;