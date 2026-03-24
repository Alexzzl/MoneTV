const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

class FakeClassList {
    constructor(initial = []) {
        this.values = new Set(initial);
    }

    add(...names) {
        names.forEach((name) => this.values.add(name));
    }

    remove(...names) {
        names.forEach((name) => this.values.delete(name));
    }

    contains(name) {
        return this.values.has(name);
    }

    toggle(name, force) {
        if (force === true) {
            this.values.add(name);
            return true;
        }

        if (force === false) {
            this.values.delete(name);
            return false;
        }

        if (this.values.has(name)) {
            this.values.delete(name);
            return false;
        }

        this.values.add(name);
        return true;
    }
}

class FakeElement {
    constructor({ id = '', classNames = [], dataset = {}, hidden = false } = {}) {
        this.id = id;
        this.dataset = { ...dataset };
        this.hidden = hidden;
        this.disabled = false;
        this.attributes = new Map();
        this.parentElement = null;
        this.children = [];
        this.style = {};
        this.listeners = new Map();
        this.classList = new FakeClassList(classNames);
    }

    appendChild(child) {
        child.parentElement = this;
        this.children.push(child);
        return child;
    }

    addEventListener(type, listener) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }

        this.listeners.get(type).push(listener);
    }

    dispatchEvent(event) {
        event.target = event.target || this;
        event.currentTarget = this;
        const listeners = this.listeners.get(event.type) || [];
        listeners.forEach((listener) => listener.call(this, event));
        return !event.defaultPrevented;
    }

    click() {
        this.dispatchEvent({
            type: 'click',
            target: this,
            currentTarget: this,
            defaultPrevented: false,
            preventDefault() {
                this.defaultPrevented = true;
            }
        });
    }

    setAttribute(name, value) {
        this.attributes.set(name, String(value));
        if (name === 'hidden') {
            this.hidden = true;
        }
    }

    getAttribute(name) {
        return this.attributes.get(name) || null;
    }

    removeAttribute(name) {
        this.attributes.delete(name);
        if (name === 'hidden') {
            this.hidden = false;
        }
    }

    contains(node) {
        if (node === this) {
            return true;
        }

        return this.children.some((child) => child.contains(node));
    }

    closest(selector) {
        const selectors = selector.split(',').map((part) => part.trim()).filter(Boolean);
        let node = this;

        while (node) {
            if (selectors.some((item) => matchesSelector(node, item))) {
                return node;
            }
            node = node.parentElement;
        }

        return null;
    }

    querySelector(selector) {
        return this.querySelectorAll(selector)[0] || null;
    }

    querySelectorAll(selector) {
        const matches = [];
        const walk = (node) => {
            node.children.forEach((child) => {
                if (matchesSelector(child, selector)) {
                    matches.push(child);
                }
                walk(child);
            });
        };

        walk(this);
        return matches;
    }

    scrollIntoView() {}
}

function matchesSelector(node, selector) {
    if (selector === '.page') {
        return node.classList.contains('page');
    }

    if (selector === '.nav-item') {
        return node.classList.contains('nav-item');
    }

    if (selector === '.nav-item[data-page]') {
        return node.classList.contains('nav-item') && Boolean(node.dataset.page);
    }

    if (selector === '.logo-container') {
        return node.classList.contains('logo-container');
    }

    if (selector === '[data-focusable="true"]') {
        return node.dataset.focusable === 'true' && !node.hidden;
    }

    if (selector === '[hidden]') {
        return node.hidden;
    }

    if (selector === '#header-back-button') {
        return node.id === 'header-back-button';
    }

    if (selector === '#page-header-back-btn') {
        return node.id === 'page-header-back-btn';
    }

    if (selector.startsWith('#')) {
        return node.id === selector.slice(1);
    }

    if (selector.startsWith('.')) {
        return node.classList.contains(selector.slice(1));
    }

    return false;
}

function createDocument() {
    const documentListeners = new Map();
    const body = new FakeElement({ id: 'body' });
    const elementsById = new Map();

    const document = {
        body,
        activeElement: null,
        register(element) {
            if (element.id) {
                elementsById.set(element.id, element);
            }
            return element;
        },
        addEventListener(type, listener) {
            if (!documentListeners.has(type)) {
                documentListeners.set(type, []);
            }
            documentListeners.get(type).push(listener);
        },
        dispatchEvent(event) {
            const listeners = documentListeners.get(event.type) || [];
            listeners.forEach((listener) => listener.call(document, event));
            return !event.defaultPrevented;
        },
        getElementById(id) {
            return elementsById.get(id) || null;
        },
        querySelector(selector) {
            return this.querySelectorAll(selector)[0] || null;
        },
        querySelectorAll(selector) {
            return body.querySelectorAll(selector);
        },
        contains(node) {
            return body.contains(node);
        }
    };

    return document;
}

function createWindow() {
    const listeners = new Map();

    return {
        addEventListener(type, listener) {
            if (!listeners.has(type)) {
                listeners.set(type, []);
            }
            listeners.get(type).push(listener);
        },
        dispatchEvent(event) {
            const currentListeners = listeners.get(event.type) || [];
            currentListeners.forEach((listener) => listener.call(this, event));
        }
    };
}

function createCustomEvent(type, options = {}) {
    return {
        type,
        detail: options.detail || {},
        defaultPrevented: false,
        preventDefault() {
            this.defaultPrevented = true;
        }
    };
}

function createTestEnvironment() {
    const document = createDocument();
    const window = createWindow();
    const location = { hash: '' };

    const mainHeader = document.register(new FakeElement({ id: 'main-header' }));
    const logoContainer = document.register(new FakeElement({ classNames: ['logo-container'] }));
    const headerBackButton = document.register(new FakeElement({ id: 'header-back-button' }));
    const pageHeaderBackButton = document.register(new FakeElement({ id: 'page-header-back-btn' }));
    const exitDialog = document.register(new FakeElement({ id: 'exit-confirm-dialog', hidden: true }));
    const exitCancelButton = document.register(new FakeElement({
        id: 'exit-confirm-cancel',
        dataset: { focusable: 'true' }
    }));
    const exitConfirmButton = document.register(new FakeElement({
        id: 'exit-confirm-exit',
        dataset: { focusable: 'true' }
    }));

    exitDialog.appendChild(exitCancelButton);
    exitDialog.appendChild(exitConfirmButton);
    mainHeader.appendChild(logoContainer);
    mainHeader.appendChild(headerBackButton);

    const pages = ['home', 'discover', 'detail', 'player', 'settings'].map((pageName) => {
        const page = document.register(new FakeElement({
            id: `${pageName}-page`,
            classNames: ['page']
        }));
        document.body.appendChild(page);
        return page;
    });

    document.body.appendChild(mainHeader);
    document.body.appendChild(pageHeaderBackButton);
    document.body.appendChild(exitDialog);

    const navItems = ['home', 'discover'].map((pageName) => {
        const item = new FakeElement({
            classNames: ['nav-item'],
            dataset: { page: pageName, focusable: 'true' }
        });
        document.body.appendChild(item);
        return item;
    });

    const historyStack = [];
    let historyIndex = -1;
    const history = {
        length: 0,
        state: null,
        replaceState(state, _unused, url) {
            if (historyIndex === -1) {
                historyStack.push({ state, url });
                historyIndex = 0;
            } else {
                historyStack[historyIndex] = { state, url };
            }
            this.state = state;
            this.length = historyStack.length;
            location.hash = url;
        },
        pushState(state, _unused, url) {
            historyStack.splice(historyIndex + 1);
            historyStack.push({ state, url });
            historyIndex = historyStack.length - 1;
            this.state = state;
            this.length = historyStack.length;
            location.hash = url;
        },
        back() {
            if (historyIndex <= 0) {
                return;
            }

            historyIndex -= 1;
            const entry = historyStack[historyIndex];
            this.state = entry.state;
            this.length = historyStack.length;
            location.hash = entry.url;
            window.dispatchEvent({
                type: 'popstate',
                state: entry.state
            });
        }
    };

    const context = vm.createContext({
        console,
        document,
        window,
        history,
        location,
        CustomEvent: createCustomEvent,
        MutationObserver: class {
            constructor() {}
            observe() {}
            disconnect() {}
        },
        HomePage: { init() {}, destroy() {} },
        DiscoverPage: { init() {}, destroy() {} },
        DetailPage: { init() {}, destroy() {} },
        PlayerPage: { init() {}, destroy() {} },
        SettingsPage: { init() {}, destroy() {} },
        setTimeout,
        clearTimeout
    });

    context.window.window = context.window;
    context.window.document = context.document;
    context.window.history = context.history;
    context.window.location = context.location;
    context.window.CustomEvent = context.CustomEvent;
    context.window.HomePage = context.HomePage;
    context.window.DiscoverPage = context.DiscoverPage;
    context.window.DetailPage = context.DetailPage;
    context.window.PlayerPage = context.PlayerPage;
    context.window.SettingsPage = context.SettingsPage;

    loadScript(context, 'js/remote.js');
    context.Remote = context.window.Remote;
    context.window.Remote = context.Remote;

    loadScript(context, 'js/router.js');
    context.Router = context.window.Router;
    context.window.Router = context.Router;

    return {
        context,
        document,
        history,
        exitDialog,
        exitCancelButton,
        exitConfirmButton,
        navItems,
        pages
    };
}

function loadScript(context, relativePath) {
    const absolutePath = path.join(process.cwd(), relativePath);
    const source = fs.readFileSync(absolutePath, 'utf8');
    vm.runInContext(source, context, { filename: absolutePath });
}

test('Router.goBack shows the exit dialog on the home page', () => {
    const env = createTestEnvironment();
    const { Router, Remote } = env.context;

    Router.init();
    Remote.setFocus(env.navItems[0]);

    Router.goBack();

    assert.equal(env.exitDialog.hidden, false);
    assert.equal(Remote.currentFocus, env.exitCancelButton);
    assert.equal(Router.getCurrentPage(), 'home');
});

test('Remote.handleKeyDown leaves EXIT to the platform', () => {
    const env = createTestEnvironment();
    const { Remote } = env.context;
    let exitCalls = 0;
    let prevented = false;

    Remote.exitApp = () => {
        exitCalls += 1;
    };

    Remote.handleKeyDown({
        keyCode: Remote.KEYS.EXIT,
        defaultPrevented: false,
        preventDefault() {
            prevented = true;
        }
    });

    assert.equal(exitCalls, 0);
    assert.equal(prevented, false);
});

test('Router.goBack returns to the previous page from a child page', () => {
    const env = createTestEnvironment();
    const { Router } = env.context;

    Router.init();
    Router.navigateTo('detail', { dramaId: '1' });
    Router.goBack();

    assert.equal(Router.getCurrentPage(), 'home');
    assert.equal(env.document.getElementById('home-page').classList.contains('active'), true);
    assert.equal(env.document.getElementById('detail-page').classList.contains('active'), false);
});
