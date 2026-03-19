/**
 * 主应用入口 - Main App Entry
 */

const App = {
    init() {
        // Initialize core modules
        Remote.init();

        // Bind global events
        this.bindPageChange();

        // Initialize router, which now handles the initial page load
        Router.init();

        // Finally, hide the loading screen
        this.initLoading();

        console.log('App initialized successfully.');
    },

    // 初始化加载动画
    initLoading() {
        const loadingPage = document.getElementById('loading-page');

        // 模拟加载
        setTimeout(() => {
            if (loadingPage) {
                loadingPage.classList.add('hidden');
            }
        }, 1000);
    },

    // 初始化页面
    initPages() {
        HomePage.init();
        DiscoverPage.init();
        DetailPage.init();
        PlayerPage.init();
    },

    // 绑定页面变化事件
    bindPageChange() {
        document.addEventListener('page-change', (e) => {
            const { page, params } = e.detail;
            this.onPageChange(page, params);
        });
    },

    // 页面变化处理
    onPageChange(page, params) {
        // This function can be used for analytics or other global tasks on page change.
        // Page-specific logic is now handled by the router.
        console.log(`Navigated to page: ${page}`);
    },

    // 渲染历史记录
    renderHistory() {
        const grid = document.getElementById('history-dramas');
        if (!grid) return;

        const history = MockData.getHistoryWithDetails();

        if (history.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px;">
                    <p style="color: var(--text-muted); font-size: 18px;">No watch history yet</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = history.map(h => {
            if (!h.drama) return '';
            return `
                <div class="home-drama-card" data-drama-id="${h.drama.id}" data-focusable="true">
                    <img class="card-image" src="${h.drama.image}" alt="${h.drama.title}">
                    <div class="card-content">
                        <h3 class="card-title">${h.drama.title}</h3>
                        <div class="card-meta">
                            <span>Ep ${h.episode?.number || '-'}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // 绑定点击事件
        grid.querySelectorAll('.home-drama-card').forEach(card => {
            card.addEventListener('click', () => {
                Router.navigateTo('detail', { dramaId: card.dataset.dramaId });
            });
        });
    }
};

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
