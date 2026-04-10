const PlayerPage = {
    init(dramaId, episodeId) {
        // Handle being called without parameters during app initialization
        if (!dramaId || !episodeId) {
            console.log('PlayerPage.init() called without parameters - skipping initialization');
            return;
        }

        const drama = MockData.getDramaById(dramaId);
        if (!drama) {
            console.error('Drama not found:', dramaId);
            Router.navigateTo('home');
            return;
        }

        const episode = drama.episodeList.find(ep => ep.id == episodeId);
        if (!episode) {
            console.error('Episode not found:', episodeId);
            Router.navigateTo('detail', { dramaId });
            return;
        }

        this.render(drama, episode);
        this.bindEvents(drama, episode);
    },

    render(drama, episode) {
        const container = document.getElementById('player-page');
        if (!container) {
            console.error('Player page container not found');
            return;
        }

        container.innerHTML = `
            <div class="player-container">
                <div class="video-player">
                    <video
                        id="video-player"
                        class="main-video"
                        src="${episode.videoUrl}"
                        poster="${episode.thumbnail}"
                        controls
                        autoplay
                    ></video>
                    
                    <div class="player-controls">
                        <div class="episode-info">
                            <h3 class="drama-title">${drama.title}</h3>
                            <p class="episode-title">${episode.title}</p>
                        </div>
                    </div>
                </div>
                
                <div class="player-sidebar">
                    <div class="episode-list">
                        <h4>Episodes</h4>
                        ${drama.episodeList.map(ep => `
                            <div class="episode-item ${ep.id == episode.id ? 'active' : ''}" data-episode-id="${ep.id}">
                                <img src="${ep.thumbnail}" alt="${ep.title}">
                                <div class="episode-details">
                                    <div class="episode-number">Episode ${ep.id}</div>
                                    <div class="episode-title">${ep.title}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    bindEvents(drama, currentEpisode) {
        // Back button
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                Router.goBack();
            });
        }

        // Episode selection
        const episodeItems = document.querySelectorAll('.episode-item');
        episodeItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const episodeId = e.currentTarget.dataset.episodeId;
                if (episodeId != currentEpisode.id) {
                    Router.navigateTo('player', {
                        dramaId: drama.id,
                        episodeId: episodeId
                    });
                }
            });
        });

        // Video ended event - auto play next episode
        const video = document.getElementById('video-player');
        if (video) {
            video.addEventListener('ended', () => {
                const currentIndex = drama.episodeList.findIndex(ep => ep.id == currentEpisode.id);
                if (currentIndex < drama.episodeList.length - 1) {
                    const nextEpisode = drama.episodeList[currentIndex + 1];
                    Router.navigateTo('player', {
                        dramaId: drama.id,
                        episodeId: nextEpisode.id
                    });
                }
            });
        }
    },

    destroy() {
        const container = document.getElementById('player-page');
        if (container) {
            // Stop any playing video
            const video = container.querySelector('#video-player');
            if (video) {
                video.pause();
                video.removeAttribute('src'); // remove src to stop buffering
                video.load();
            }
            container.innerHTML = ''; // Clear the page content
        }
    }
};