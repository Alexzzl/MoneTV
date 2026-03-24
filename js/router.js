/**
 * Page navigation and Samsung-compliant back handling.
 */

const Router = {
    currentPage: null,
    currentParams: {},
    exitDialogReturnFocus: null,
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

        const initialPage = location.hash ? location.hash.substring(1).split('/')[0] : 'home';
        const initialParams = this.parseHash(location.hash);

        history.replaceState({ page: initialPage, params: initialParams }, '', `#${initialPage}`);
        this.renderPage(initialPage, initialParams);
    },

    bindNavigationEvents() {
        const navItems = document.querySelectorAll('.nav-item[data-page]');
        navItems.forEach((item) => {
            item.addEventListener('click', () => {
                this.navigateTo(item.dataset.page, {});
            });
        });

        document.addEventListener('remote-back', () => {
            this.goBack();
        });

        const backBtn = document.getElementById('page-header-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.goBack();
            });
        }

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

        const exitCancelButton = document.getElementById('exit-confirm-cancel');
        if (exitCancelButton) {
            exitCancelButton.addEventListener('click', () => {
                this.hideExitDialog();
            });
        }

        const exitConfirmButton = document.getElementById('exit-confirm-exit');
        if (exitConfirmButton) {
            exitConfirmButton.addEventListener('click', () => {
                this.confirmExit();
            });
        }
    },

    navigateTo(page, params = {}) {
        if (this.currentPage === page && JSON.stringify(this.currentParams) === JSON.stringify(params)) {
            return;
        }

        history.pushState({ page, params }, '', `#${page}`);
        this.renderPage(page, params);
    },

    renderPage(page, params, isPoppedState = false) {
        if (this.isExitDialogOpen()) {
            this.hideExitDialog({ restoreFocus: false });
        }

        if (this.currentPage && this.pageModules[this.currentPage]?.destroy) {
            this.pageModules[this.currentPage].destroy();
        }

        document.querySelectorAll('.page').forEach((element) => {
            element.classList.remove('active');
        });

        const targetPageElement = document.getElementById(`${page}-page`);
        if (!targetPageElement) {
            console.error(`Page element not found for: ${page}`);
            if (this.currentPage !== 'home') {
                this.navigateTo('home');
            }
            return;
        }

        targetPageElement.classList.add('active');
        this.currentPage = page;
        this.currentParams = params;

        this.updateHeaderVisibility(page);
        this.updateNavState(page);

        const pageModule = this.pageModules[page];
        if (pageModule?.init) {
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
        } else if (window.Remote) {
            Remote.resetForPage(page);
        }

        document.dispatchEvent(new CustomEvent('page-change', {
            detail: { page, params, isPoppedState }
        }));
    },

    goBack() {
        if (this.isExitDialogOpen()) {
            this.hideExitDialog();
            return;
        }

        if (this.currentPage === 'home') {
            this.showExitDialog();
            return;
        }

        history.back();
    },

    isExitDialogOpen() {
        const exitDialog = document.getElementById('exit-confirm-dialog');
        return Boolean(exitDialog && !exitDialog.hidden);
    },

    showExitDialog() {
        const exitDialog = document.getElementById('exit-confirm-dialog');
        const cancelButton = document.getElementById('exit-confirm-cancel');

        if (!exitDialog || !cancelButton) {
            this.confirmExit();
            return;
        }

        if (this.isExitDialogOpen()) {
            return;
        }

        this.exitDialogReturnFocus = window.Remote?.currentFocus || null;
        exitDialog.hidden = false;
        exitDialog.setAttribute('aria-hidden', 'false');

        if (window.Remote) {
            Remote.scanFocusableElements();
            Remote.setFocus(cancelButton);
        }
    },

    hideExitDialog(options = {}) {
        const { restoreFocus = true } = options;
        const exitDialog = document.getElementById('exit-confirm-dialog');

        if (!exitDialog) {
            return;
        }

        exitDialog.hidden = true;
        exitDialog.setAttribute('aria-hidden', 'true');

        if (window.Remote) {
            Remote.scanFocusableElements();

            if (restoreFocus && this.exitDialogReturnFocus && document.contains(this.exitDialogReturnFocus)) {
                Remote.setFocus(this.exitDialogReturnFocus);
            } else if (restoreFocus && this.currentPage) {
                Remote.resetForPage(this.currentPage);
            }
        }

        this.exitDialogReturnFocus = null;
    },

    confirmExit() {
        if (this.isExitDialogOpen()) {
            this.hideExitDialog({ restoreFocus: false });
        }

        if (typeof tizen !== 'undefined' && tizen.application) {
            tizen.application.getCurrentApplication().exit();
            return;
        }

        console.log('Exit app (simulated in web)');
    },

    updateNavState(activePage) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item) => {
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
        if (!mainHeader) {
            return;
        }

        const logoContainer = mainHeader.querySelector('.logo-container');
        const backButton = document.getElementById('header-back-button');

        mainHeader.style.display = 'flex';

        if (page === 'player') {
            if (logoContainer) {
                logoContainer.style.display = 'none';
            }
            if (backButton) {
                backButton.style.display = 'flex';
            }
            return;
        }

        if (logoContainer) {
            logoContainer.style.display = 'flex';
        }
        if (backButton) {
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

window.Router = Router;
