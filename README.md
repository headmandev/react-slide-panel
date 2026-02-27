# react-slide-panel

A React component that renders a **slide-out drawer** (or sidebar panel) from any edge of the screen—right, left, top, or bottom. It uses a modal overlay, optional scroll lock, and supports header, body, and footer slots. Written in TypeScript. Port of [vue3-side-panel](https://github.com/headmandev/vue3-side-panel).

## Install

```bash
npm install react-slide-panel
# or
yarn add react-slide-panel
# or
pnpm add react-slide-panel
```

**Peer dependencies:** `react` and `react-dom` (>= 16.8.0).

## Usage

Import the component and the default styles:

```tsx
import { SlidePanel } from 'react-slide-panel';
import 'react-slide-panel/dist/styles.css';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open drawer</button>
      <SlidePanel
        open={open}
        onOpenChange={setOpen}
        side="right"
        width="400px"
        header={<h2>Title</h2>}
        footer={<button onClick={() => setOpen(false)}>Done</button>}
      >
        <p>Drawer content goes here.</p>
      </SlidePanel>
    </>
  );
}
```

Open/close is **controlled** via the `open` and `onOpenChange` props. The drawer is rendered in a portal and can slide in from `top`, `right`, `bottom`, or `left`.

A **demo app** in the repo (`npm run demo` from the root) shows more examples (all sides, header/footer, scroll lock, custom width, etc.).

## API

### SlidePanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | required | Called when open state should change |
| `onClosed` | `() => void` | — | Called after leave transition finishes |
| `onOpened` | `() => void` | — | Called after enter transition finishes |
| `idName` | `string` | `'rsp-container'` | Id for the portal container |
| `hideCloseBtn` | `boolean` | `false` | Hide the default close button |
| `noClose` | `boolean` | `false` | Prevent closing on overlay click |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Side the drawer slides from |
| `rerender` | `boolean` | `false` | Unmount content when closed (remount on open) |
| `zIndex` | `number \| 'auto'` | `'auto'` | z-index (auto = max on page) |
| `width` | `string` | `'auto'` | Drawer width (left/right) |
| `height` | `string` | `'auto'` | Drawer height (top/bottom) |
| `lockScroll` | `boolean` | `false` | Lock body scroll when open |
| `lockScrollHtml` | `boolean` | `true` | Set `overflow: hidden` on `html` when locking |
| `overlayColor` | `string` | `'black'` | Overlay background color |
| `overlayOpacity` | `number` | `0.5` | Overlay opacity (0–1) |
| `overlayDuration` | `number` | `500` | Overlay transition duration (ms) |
| `panelColor` | `string` | `'white'` | Drawer background color |
| `panelDuration` | `number` | `300` | Drawer transition duration (ms) |
| `transitionName` | `string` | `slide-{side}` | Custom transition class name |
| `headerClass` | `string` | `''` | Class for header container |
| `bodyClass` | `string` | `''` | Class for body container |
| `footerClass` | `string` | `''` | Class for footer container |
| `header` | `ReactNode` | — | Header content |
| `footer` | `ReactNode` | — | Footer content |
| `children` | `ReactNode` | — | Body content |
| `className` | `string` | — | Extra class for panel root |
| `style` | `CSSProperties` | — | Inline styles for panel root |

### SidePanelCloseButton

Optional close button component (used by default inside the drawer).

| Prop | Type | Description |
|------|------|-------------|
| `onClose` | `() => void` | Called when the button is clicked |
| `className` | `string` | Optional class name |

## License

MIT
