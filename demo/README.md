# Demo

Local dev app for **react-slide-panel**. Use it to debug the component before publishing.

## Run

From the **repo root**:

```bash
npm run demo
```

This installs demo dependencies (if needed) and starts Vite at **http://localhost:5173/**.

The demo loads the library **from source** (`../src`) via Vite alias, so edits in `src/SidePanel.tsx` or `src/styles.css` hot-reload without building the package.

## What’s in the demo

- Panels from **right**, **left**, **top**, **bottom**
- **Header + footer** with scrollable body
- **No overlay close** (only X closes)
- **Lock scroll** (body scroll locked when open)
- **Custom width**
- **No close button** (custom close control)
