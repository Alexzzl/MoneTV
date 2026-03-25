/**
 * Remote control integration for Samsung TV.
 */

declare const tizen: { application: { getCurrentApplication(): { exit(): void } } }

const Remote = {
  KEYS: {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    BACK: 10009,
    EXIT: 10182,
    COLOR_F0: 403,
    COLOR_F1: 404,
    COLOR_F2: 405,
    COLOR_F3: 406,
    VOLUME_UP: 447,
    VOLUME_DOWN: 448,
    MUTE: 449,
    PLAY: 415,
    PAUSE: 19,
    STOP: 413,
    FAST_FORWARD: 417,
    REWIND: 412,
    CHANNEL_UP: 427,
    CHANNEL_DOWN: 428,
  },

  currentFocus: null as Element | null,
  focusableElements: [] as Element[],
  focusHistory: [] as Element[],

  init() {
    this.scanFocusableElements()
    this.bindEvents()
  },

  getFocusContext(): Element | Document {
    const exitDialog = document.getElementById('exit-confirm-dialog')
    if (exitDialog && !exitDialog.hidden) {
      return exitDialog
    }
    return document
  },

  scanFocusableElements() {
    const focusContext = this.getFocusContext()
    this.focusableElements = Array.from(
      focusContext.querySelectorAll('[data-focusable="true"]')
    ).filter((element) => {
      const el = element as HTMLElement
      return !el.hidden && !el.closest('[hidden]')
    })

    if (this.currentFocus && !this.focusableElements.includes(this.currentFocus)) {
      ;(this.currentFocus as HTMLElement).classList.remove('focused')
      this.currentFocus = null
    }
  },

  bindEvents() {
    document.addEventListener('keydown', (event) => this.handleKeyDown(event))

    const observer = new MutationObserver(() => {
      this.scanFocusableElements()
    })

    observer.observe(document.body, { childList: true, subtree: true })
  },

  handleKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.which

    if (keyCode === this.KEYS.EXIT) {
      return
    }

    if (!this.isInputFocused()) {
      event.preventDefault()
    }

    switch (keyCode) {
      case this.KEYS.UP:
        this.navigateUp()
        break
      case this.KEYS.DOWN:
        this.navigateDown()
        break
      case this.KEYS.LEFT:
        this.navigateLeft()
        break
      case this.KEYS.RIGHT:
        this.navigateRight()
        break
      case this.KEYS.ENTER:
        this.confirm()
        break
      case this.KEYS.BACK:
        this.goBack()
        break
      case this.KEYS.PLAY:
      case this.KEYS.PAUSE:
        this.togglePlayPause()
        break
      case this.KEYS.FAST_FORWARD:
        this.fastForward()
        break
      case this.KEYS.REWIND:
        this.rewind()
        break
      default:
        break
    }

    document.dispatchEvent(new CustomEvent('remote-key', { detail: { keyCode, remote: this } }))
  },

  isInputFocused() {
    const tag = document.activeElement?.tagName?.toLowerCase()
    return tag === 'input' || tag === 'textarea'
  },

  getCurrentIndex() {
    if (!this.currentFocus) return -1
    return this.focusableElements.indexOf(this.currentFocus)
  },

  navigateUp() {
    const currentIndex = this.getCurrentIndex()
    if (currentIndex === -1) { this.setFocus(0); return }
    const columns = this.calculateColumns()
    const newIndex = currentIndex - columns
    if (newIndex >= 0) this.setFocus(newIndex)
  },

  navigateDown() {
    const currentIndex = this.getCurrentIndex()
    if (currentIndex === -1) { this.setFocus(0); return }
    const columns = this.calculateColumns()
    const newIndex = currentIndex + columns
    if (newIndex < this.focusableElements.length) this.setFocus(newIndex)
  },

  navigateLeft() {
    const currentIndex = this.getCurrentIndex()
    if (currentIndex === -1) { this.setFocus(0); return }
    const newIndex = currentIndex - 1
    if (newIndex >= 0) this.setFocus(newIndex)
  },

  navigateRight() {
    const currentIndex = this.getCurrentIndex()
    if (currentIndex === -1) { this.setFocus(0); return }
    const newIndex = currentIndex + 1
    if (newIndex < this.focusableElements.length) this.setFocus(newIndex)
  },

  calculateColumns() {
    const container = (this.currentFocus as HTMLElement)?.closest(
      '.drama-grid, .categories-grid, .episodes-grid, .nav-menu, .exit-confirm-actions'
    )
    if (!container) return 1

    const style = window.getComputedStyle(container)
    const gridTemplate = style.getPropertyValue('grid-template-columns')
    if (gridTemplate && gridTemplate !== 'none') return 1

    const flexWrap = style.getPropertyValue('flex-wrap')
    if (flexWrap === 'wrap') {
      const containerWidth = (container as HTMLElement).offsetWidth
      const childWidth = (this.currentFocus as HTMLElement)?.offsetWidth || 200
      return Math.max(1, Math.floor(containerWidth / (childWidth + 20)))
    }

    return 1
  },

  confirm() {
    if (!this.currentFocus) return
    ;(this.currentFocus as HTMLElement).click()
    this.currentFocus.dispatchEvent(
      new CustomEvent('remote-confirm', { bubbles: true, detail: { element: this.currentFocus } })
    )
  },

  goBack() {
    document.dispatchEvent(new CustomEvent('remote-back', { detail: { remote: this } }))
  },

  exitApp() {
    if (typeof tizen !== 'undefined' && tizen.application) {
      tizen.application.getCurrentApplication().exit()
      return
    }
    console.log('Exit app (simulated in web)')
  },

  togglePlayPause() {
    const video = document.getElementById('video-player') as HTMLVideoElement | null
    if (!video) return
    if (video.paused) { video.play(); return }
    video.pause()
  },

  fastForward() {
    const video = document.getElementById('video-player') as HTMLVideoElement | null
    if (video) video.currentTime = Math.min(video.duration, video.currentTime + 10)
  },

  rewind() {
    const video = document.getElementById('video-player') as HTMLVideoElement | null
    if (video) video.currentTime = Math.max(0, video.currentTime - 10)
  },

  setFocus(elementOrIndex: Element | number) {
    let nextFocus: Element | null =
      typeof elementOrIndex === 'number'
        ? this.focusableElements[elementOrIndex] || null
        : elementOrIndex

    if (this.currentFocus === nextFocus) return

    if (this.currentFocus) {
      ;(this.currentFocus as HTMLElement).classList.remove('focused')
      this.focusHistory.push(this.currentFocus)
      if (this.focusHistory.length > 10) this.focusHistory.shift()
    }

    this.currentFocus = nextFocus

    if (this.currentFocus) {
      ;(this.currentFocus as HTMLElement).classList.add('focused')
      this.currentFocus.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    }
  },

  clearFocus() {
    if (this.currentFocus) {
      ;(this.currentFocus as HTMLElement).classList.remove('focused')
      this.currentFocus = null
    }
  },

  resetForPage(pageId: string) {
    this.focusHistory = []
    this.scanFocusableElements()

    const firstElement = this.focusableElements.find((element) => {
      return element.closest(`#${pageId}-page`) || element.closest('#main-nav')
    })

    if (firstElement) this.setFocus(firstElement)
  },
}

export default Remote
