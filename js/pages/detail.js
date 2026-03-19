/**
 * 剧集详情页逻辑 - Detail Page Module (Figma Style)
 */
const DetailPage = {
    init(dramaId) {
        console.log(`Initializing Detail Page for dramaId: ${dramaId}`);
        const detailPageContainer = document.getElementById('detail-page');
        if (!detailPageContainer) {
            console.error('Detail page container not found!');
            return;
        }

        const drama = MockData.getDramaById(dramaId);
        if (!drama) {
            console.error(`Drama with id ${dramaId} not found!`);
            detailPageContainer.innerHTML = '<p>Drama not found.</p>';
            return;
        }

        this.render(drama, detailPageContainer);
        this.bindEvents(drama);
    },

    render(drama, container) {
        const moreLikeThisDramas = MockData.getMoreLikeThis(drama.id);

        const heroHTML = this.createHeroSectionHTML(drama);
        const episodesHTML = this.createEpisodesHTML(drama.episodeList || [], drama.id);
        const moreLikeThisHTML = this.createMoreLikeThisHTML(moreLikeThisDramas);

        container.innerHTML = `
            <div class="detail-page-container">
                ${heroHTML}
                <div class="detail-episodes-section">
                    <h2 class="detail-section-title">Episodes (${drama.episodeList?.length || 0} Episodes)</h2>
                    <div class="episode-list-grid">
                        ${episodesHTML}
                    </div>
                </div>
                <div class="detail-more-like-this-section">
                    <h2 class="detail-section-title">More Like This</h2>
                    <div class="more-like-this-grid">
                        ${moreLikeThisHTML}
                    </div>
                </div>
            </div>
        `;
    },

    createHeroSectionHTML(drama) {
        const tagsHTML = (drama.genreTags || []).map(tag => `<div class="detail-genre-tag">${tag}</div>`).join('');
        return `
            <div class="detail-hero-section">
                <div class="detail-poster">
                    <img src="${drama.image}" alt="${drama.title}">
                </div>
                <div class="detail-info">
                    <h1 class="detail-title">${drama.title}</h1>
                    <div class="detail-meta">
                        <span><i class="icon fas fa-star"></i> ${drama.rating}</span>
                        <span><i class="icon fas fa-eye"></i> ${drama.views} Views</span>
                        <span><i class="icon fas fa-layer-group"></i> ${drama.seasons} Season</span>
                        <span><i class="icon fas fa-clock"></i> ${drama.duration} min</span>
                    </div>
                    <p class="detail-description">${drama.description}</p>
                    <div class="detail-genre-tags">
                        ${tagsHTML}
                    </div>
                    <div class="detail-actions">
                        <button class="btn btn-primary btn-play-episode-1" data-drama-id="${drama.id}" data-episode-id="1"><i class="icon fas fa-play"></i> Play Episode 1</button>
                        <button class="btn btn-secondary"><i class="icon fas fa-plus"></i> Add to Watchlist</button>
                        <button class="btn btn-icon"><i class="icon fas fa-share-alt"></i></button>
                        <button class="btn btn-icon"><i class="icon fas fa-download"></i></button>
                    </div>
                </div>
            </div>
        `;
    },

    createEpisodesHTML(episodes, dramaId) {
        if (!episodes || episodes.length === 0) return '<p>No episodes available.</p>';
        return episodes.map(ep => `
            <div class="episode-card" data-drama-id="${dramaId}" data-episode-id="${ep.id}">
                <div class="episode-thumbnail">
                    <img src="${ep.thumbnail}" alt="${ep.title}">
                    <div class="episode-duration">${ep.duration}</div>
                    ${ep.locked ? '<div class="episode-lock-icon"><i class="fas fa-lock"></i></div>' : '<div class="episode-play-icon-small"><i class="fas fa-play"></i></div>'}
                </div>
                <div class="episode-content">
                    <h3 class="episode-title">Episode ${ep.id}: ${ep.title}</h3>
                    <p class="episode-description">${ep.description}</p>
                    <span class="episode-added-date">Added: ${ep.added}</span>
                </div>
            </div>
        `).join('');
    },

    createMoreLikeThisHTML(dramas) {
        if (!dramas || dramas.length === 0) return '<p>No similar dramas found.</p>';
        return dramas.map(drama => `
            <div class="more-like-this-card" data-drama-id="${drama.id}">
                <div class="more-like-this-poster">
                    <img src="${drama.image}" alt="${drama.title}">
                </div>
                <div class="more-like-this-content">
                    <h4 class="more-like-this-title">${drama.title}</h4>
                    <p class="more-like-this-tags">${(drama.tags || []).join(' • ')}</p>
                </div>
            </div>
        `).join('');
    },

    bindEvents(drama) {
        const detailPageContainer = document.getElementById('detail-page');
        if (!detailPageContainer) return;

        detailPageContainer.addEventListener('click', (e) => {
            // Play Episode 1 button
            const playBtn = e.target.closest('.btn-play-episode-1');
            if (playBtn) {
                const dramaId = playBtn.dataset.dramaId;
                const episodeId = drama.episodeList[0]?.id;
                if (episodeId) {
                    console.log(`Play button clicked for drama ${dramaId}, episode ${episodeId}`);
                    Router.navigateTo('player', { dramaId, episodeId });
                }
                return;
            }

            // Episode card click
            const episodeCard = e.target.closest('.episode-card');
            if (episodeCard && !episodeCard.querySelector('.episode-lock-icon')) {
                const dramaId = episodeCard.dataset.dramaId;
                const episodeId = episodeCard.dataset.episodeId;
                console.log(`Episode card clicked for drama ${dramaId}, episode ${episodeId}`);
                Router.navigateTo('player', { dramaId, episodeId });
                return;
            }

            // More Like This card click
            const moreCard = e.target.closest('.more-like-this-card');
            if (moreCard) {
                const dramaId = moreCard.dataset.dramaId;
                console.log(`More like this clicked for drama ${dramaId}`);
                Router.navigateTo('detail', { dramaId });
                return;
            }
        });
    }
};

window.DetailPage = DetailPage;
