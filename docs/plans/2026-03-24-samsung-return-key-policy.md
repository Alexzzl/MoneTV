# Samsung Return Key Policy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make MoneTV pass Samsung TV Seller Office return-key review by showing an exit confirmation dialog on the home page, navigating back from child pages, and leaving the dedicated EXIT key to the platform.

**Architecture:** Keep the fix small and centralized. Add the exit-confirm dialog in `index.html`, manage dialog visibility and compliant back behavior in `js/router.js`, and adjust `js/remote.js` so the app no longer intercepts the dedicated EXIT key or restores focus in ways that fight the router.

**Tech Stack:** Samsung TV Web App, plain JavaScript, browser history API, Node.js built-in test runner.

---

### Task 1: Add regression tests for Samsung return/exit policy

**Files:**
- Create: `tests/tv-navigation.test.js`

**Step 1: Write the failing test**

Add tests that verify:
- `Router.goBack()` on `home` shows an exit confirmation dialog instead of calling `history.back()`
- `Remote.handleKeyDown()` does not prevent the default action or call `exitApp()` for the dedicated `EXIT` key

**Step 2: Run test to verify it fails**

Run: `node --test tests/tv-navigation.test.js`
Expected: FAIL because the current router always calls `history.back()` and the current remote handler intercepts `EXIT`

**Step 3: Write minimal implementation**

Defer to Tasks 2-4.

**Step 4: Run test to verify it passes**

Run: `node --test tests/tv-navigation.test.js`
Expected: PASS

### Task 2: Add exit confirmation dialog markup and styling

**Files:**
- Modify: `index.html`
- Modify: `css/common.css`

**Step 1: Add dialog markup**

Add a hidden exit confirmation dialog with:
- title
- helper copy
- `Cancel` button
- `Exit App` button

Both buttons must use `data-focusable="true"` so the remote can focus them.

**Step 2: Add styles**

Style the dialog as a centered TV-safe overlay with a dim backdrop and clear focus states.

### Task 3: Route Samsung-compliant back behavior through the router

**Files:**
- Modify: `js/router.js`

**Step 1: Add dialog helpers**

Add:
- `isExitDialogOpen()`
- `showExitDialog()`
- `hideExitDialog()`
- `confirmExit()`

**Step 2: Update back behavior**

Make `goBack()` behave like this:
- if exit dialog is open: close it
- else if current page is `home`: open exit dialog
- else: call `history.back()`

**Step 3: Wire dialog buttons**

Bind:
- `Cancel` -> close dialog
- `Exit App` -> call `confirmExit()`

### Task 4: Stop custom EXIT interception and keep focus stable

**Files:**
- Modify: `js/remote.js`

**Step 1: Leave EXIT to the platform**

Update `handleKeyDown()` so `EXIT` is not prevented and does not trigger `exitApp()`.

**Step 2: Let router own back handling**

Update `goBack()` so it only dispatches the app-level back event. Do not auto-restore historical focus after the event fires.

**Step 3: Support modal focus**

Update focus scanning so when the exit dialog is visible, only dialog buttons are treated as focusable.

### Task 5: Verify and package for re-submission

**Files:**
- Review: `config.xml`
- Review: Samsung Seller Office materials under `docs/` and `store-screenshots/`

**Step 1: Run verification**

Run: `node --test tests/tv-navigation.test.js`
Expected: PASS

**Step 2: Manual device checklist**

Verify on Samsung TV or emulator:
- `Return` on home opens exit confirmation dialog
- `Return` on dialog closes the dialog
- `Return` on detail/player/discover returns to the previous page
- `Exit App` button closes the app
- dedicated `EXIT` key still exits immediately through the platform
