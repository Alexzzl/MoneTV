/**
 * 路由管理 - Router Module
 * 页面导航管理
 */

const Router = {
    currentPage: null,
    currentParams: {},
    pageModules: {
        home: HomePage,
        discover: DiscoverPage,
        detail: DetailPage,
        player: PlayerPage,
        settings: SettingsPage
    },

    init() {
        this.bindNavigationEvents();
        window.addEventListener('popstate', (event) => {
            const state = event.state || { page: 'home', params: {} };
            this.renderPage(state.page, state.params, true);
        });

        // Handle initial page load
        const initialPage = location.hash ? location.hash.substring(1).split('/')[0] : 'home';
        const initialParams = this.parseHash(location.hash);

        history.replaceState({ page: initialPage, params: initialParams }, '', `#${initialPage}`);
        this.renderPage(initialPage, initialParams);
    },

    bindNavigationEvents() {
        // 导航菜单点击
        const navItems = document.querySelectorAll('.nav-item[data-page]');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                // The new navigateTo doesn't need the `item` for focus,
                // focus management is now handled inside each page's init/destroy.
                this.navigateTo(page, {});
            });
        });

        // 遥控器返回事件
        document.addEventListener('remote-back', () => {
            this.goBack();
        });

        // 页面通用返回按钮
        const backBtn = document.getElementById('page-header-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.goBack();
            });
        }

        // Header-specific back button for player
        const headerBackBtn = document.getElementById('header-back-button');
        if (headerBackBtn) {
            headerBackBtn.addEventListener('click', () => {
                this.goBack();
            });
        }

        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.addEventListener('click', () => {
                this.navigateTo('home');
            });
        }
    },

    navigateTo(page, params = {}) {
        if (this.currentPage === page && JSON.stringify(this.currentParams) === JSON.stringify(params)) {
            return; // Avoid navigating to the same page with same params
        }
        history.pushState({ page, params }, '', `#${page}`);
        this.renderPage(page, params);
    },

    renderPage(page, params, isPoppedState = false) {
        // Destroy previous page component if it exists and has a destroy method
        if (this.currentPage && this.pageModules[this.currentPage]?.destroy) {
            this.pageModules[this.currentPage].destroy();
        }

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show and init the target page
        const targetPageElement = document.getElementById(`${page}-page`);
        if (targetPageElement) {
            targetPageElement.classList.add('active');
        } else {
            console.error(`Page element not found for: ${page}`);
            // Fallback to home if page not found
            if (this.currentPage !== 'home') { // Avoid infinite loop
                this.navigateTo('home');
            }
            return;
        }

        this.currentPage = page;
        this.currentParams = params;

        // Update header and nav state
        this.updateHeaderVisibility(page);
        this.updateNavState(page);

        // Initialize the new page's module
        const pageModule = this.pageModules[page];
        if (pageModule?.init) {
            // Use a switch to call init with correct parameters
            switch (page) {
                case 'detail':
                    pageModule.init(params.dramaId);
                    break;
                case 'player':
                    pageModule.init(params.dramaId, params.episodeId);
                    break;
                case 'home':
                case 'discover':
                case 'settings':
                default:
                    pageModule.init();
                    break;
            }
        } else {
            // Reset focus for pages without a specific init, if needed
            if (window.Remote) {
                Remote.resetForPage(page);
            }
        }

        document.dispatchEvent(new CustomEvent('page-change', {
            detail: { page, params }
        }));
    },

    goBack() {
        // If at the first page in history, navigating to home might be better
        // but history.back() is simpler and usually correct.
        if (history.length <= 1) {
            // Optional: handle this case, e.g., close app or navigate to home
            // For now, let browser handle it (might do nothing)
        }
        history.back();
    },

    updateNavState(activePage) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.dataset.page === activePage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    },

    getCurrentParams() {
        return this.currentParams || {};
    },

    getCurrentPage() {
        return this.currentPage;
    },

    updateHeaderVisibility(page) {
        const mainHeader = document.getElementById('main-header');
        const logoContainer = mainHeader.querySelector('.logo-container');
        const backButton = document.getElementById('header-back-button');

        if (page === 'player') {
            mainHeader.style.display = 'flex';
            logoContainer.style.display = 'none';
            backButton.style.display = 'flex';
        } else {
            mainHeader.style.display = 'flex';
            logoContainer.style.display = 'flex';
            backButton.style.display = 'none';
        }
    },

    parseHash(hash) {
        const params = {};
        const parts = hash.substring(1).split('/');
        if (parts.length > 1) {
            params.dramaId = parts[1];
        }
        return params;
    }
};

// 导出模块
window.Router = Router;
