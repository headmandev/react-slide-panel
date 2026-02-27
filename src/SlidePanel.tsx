import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { SidePanelCloseButton } from './SlidePanelCloseButton';
import './styles.css';

export type SlidePanelSide = 'top' | 'right' | 'bottom' | 'left';

export interface SlidePanelProps {
  /** Whether the panel is open. */
  open: boolean;
  /** Callback when open state should change (e.g. user closes). Pass the new boolean to update controlled state. */
  onOpenChange: (open: boolean) => void;
  /** Called when the close transition finishes and the panel is hidden. */
  onClosed?: () => void;
  /** Called when the open transition finishes and the panel is visible. */
  onOpened?: () => void;
  /** ID of the portal container element. Default: `'rsp-container'`. */
  idName?: string;
  /** Hide the default close button. */
  hideCloseBtn?: boolean;
  /** Disable closing by clicking the overlay. */
  noClose?: boolean;
  /** Which side the panel slides from. Default: `'right'`. */
  side?: SlidePanelSide;
  /** When true, unmount panel when closed and remount when opened. Default: `true`. */
  rerender?: boolean;
  /** z-index of overlay and panel. `'auto'` uses a high default. */
  zIndex?: number | 'auto';
  /** Panel width (e.g. `'500px'`). Only for side `'left'` or `'right'`. */
  width?: string;
  /** Panel height (e.g. `'500px'`). Only for side `'top'` or `'bottom'`. */
  height?: string;
  /** Lock body scroll when the panel is open. */
  lockScroll?: boolean;
  /** When lockScroll is true, also set overflow hidden on html. Default: `true`. */
  lockScrollHtml?: boolean;
  /** Overlay background color (any valid CSS color). Default: `'black'`. */
  overlayColor?: string;
  /** Overlay opacity (0–1). Default: `0.5`. */
  overlayOpacity?: number;
  /** Overlay transition duration in ms. Default: `500`. */
  overlayDuration?: number;
  /** Panel background color. Default: `'white'`. */
  panelColor?: string;
  /** Panel transition duration in ms. Default: `300`. */
  panelDuration?: number;
  /** Animation class name: `slide-right` | `slide-left` | `slide-top` | `slide-bottom`, or custom. Default picks from `side`. */
  transitionName?: string;
  /** Class for the header container. */
  headerClass?: string;
  /** Class for the scrollable body container. */
  bodyClass?: string;
  /** Class for the footer container. */
  footerClass?: string;
  /** Optional fixed header content. */
  header?: React.ReactNode;
  /** Optional fixed footer content. */
  footer?: React.ReactNode;
  /** Panel body content. */
  children?: React.ReactNode;
  /** Additional class for the panel element. */
  className?: string;
  /** Inline styles for the panel element. */
  style?: React.CSSProperties;
}

/**
 * A modal slide panel that slides in from the chosen edge (top, right, bottom, left).
 * Renders via a portal and supports overlay, scroll lock, and custom header/footer.
 */
export function SlidePanel({
  open,
  onOpenChange,
  onClosed,
  onOpened,
  idName = 'rsp-container',
  hideCloseBtn = false,
  noClose = false,
  side = 'right',
  rerender = true,
  zIndex: zIndexProp = 'auto',
  width = 'auto',
  height = 'auto',
  lockScroll = false,
  lockScrollHtml = true,
  overlayColor = 'black',
  overlayOpacity = 0.5,
  overlayDuration = 500,
  panelColor = 'white',
  panelDuration = 300,
  transitionName,
  headerClass = '',
  bodyClass = '',
  footerClass = '',
  header,
  footer,
  children,
  className = '',
  style: styleProp,
}: SlidePanelProps) {
  const [isMounted, setIsMounted] = useState(open);
  const [isExiting, setIsExiting] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const containerCreatedByUsRef = useRef(false);

  const transition = transitionName ?? `slide-${side}`;

  const callbacks = useRef({ onOpened, onClosed });
  useLayoutEffect(() => {
    callbacks.current = { onOpened, onClosed };
  });

  // 1. Manage Mount & Exit Animation States
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (open) {
      setIsMounted(true);
      setIsExiting(false);
      timeoutId = setTimeout(() => {
        callbacks.current.onOpened?.();
      }, Math.max(overlayDuration, panelDuration));
    } else if (isMounted) {
      setIsExiting(true);
      timeoutId = setTimeout(() => {
        setIsMounted(false);
        setIsExiting(false);
        callbacks.current.onClosed?.();
      }, Math.max(overlayDuration, panelDuration));
    }

    return () => clearTimeout(timeoutId);
  }, [open, isMounted, overlayDuration, panelDuration]);

  // 2. Safely Create/Destroy Portal Container
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;
    let el = document.getElementById(idName);
    if (!el) {
      el = document.createElement('div');
      el.setAttribute('id', idName);
      document.body.appendChild(el);
      containerCreatedByUsRef.current = true;
    }
    setPortalContainer(el);
    return () => {
      if (containerCreatedByUsRef.current && el?.parentNode) {
        document.body.removeChild(el);
        containerCreatedByUsRef.current = false;
      }
    };
  }, [idName]);

  // 3. Robust Scroll Locking (Nested Modal Support)
  const originalHtmlOverflowRef = useRef<string | null>(null);
  const wasAlreadyLockedRef = useRef(false);

  useEffect(() => {
    const el = panelRef.current;
    const shouldLock = isMounted && lockScroll && el;

    if (shouldLock) {
      // Record the exact state of the page *before* we apply our locks
      const htmlOverflow = document.documentElement.style.overflow;
      const bodyOverflow = document.body.style.overflow;
      
      wasAlreadyLockedRef.current = htmlOverflow === 'hidden' || bodyOverflow === 'hidden';
      originalHtmlOverflowRef.current = htmlOverflow;

      disableBodyScroll(el, { reserveScrollBarGap: true });
      
      // Only force HTML overflow if the page wasn't already locked by something else
      if (lockScrollHtml && !wasAlreadyLockedRef.current) {
        document.documentElement.style.overflow = 'hidden';
      }
    }

    return () => {
      if (shouldLock && el) {
        enableBodyScroll(el);
        
        // Only restore the manual HTML overflow if *we* were the ones who hid it
        if (lockScrollHtml && !wasAlreadyLockedRef.current) {
          if (originalHtmlOverflowRef.current) {
            document.documentElement.style.overflow = originalHtmlOverflowRef.current;
          } else {
            document.documentElement.style.removeProperty('overflow');
          }
        }
      }
    };
  }, [isMounted, lockScroll, lockScrollHtml]);

  const closePanel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // 4. Styles matched perfectly to the CSS Keyframes
  const overlayStyles: React.CSSProperties = useMemo(
    () => ({
      zIndex: zIndexProp === 'auto' ? 9999 : zIndexProp,
      animationDuration: `${overlayDuration}ms`,
      ['--overlay-opacity' as string]: overlayOpacity,
      opacity: isExiting ? 0 : overlayOpacity,
      pointerEvents: isExiting ? 'none' : 'auto', 
      backgroundColor: overlayColor,
    }),
    [zIndexProp, overlayDuration, overlayOpacity, overlayColor, isExiting]
  );

  const panelStyles: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = {
      zIndex: zIndexProp === 'auto' ? 9999 : zIndexProp,
      backgroundColor: panelColor,
      animationDuration: `${panelDuration}ms`,
      display: 'flex', 
      flexDirection: 'column',
      maxWidth: '100%',
      ...styleProp,
    };

    if (side === 'left' || side === 'right') {
      base.width = width;
      base.height = '100%';
    } else {
      base.height = height;
      base.width = '100%';
      base.maxHeight = '100vh';
    }
    return base;
  }, [zIndexProp, panelColor, panelDuration, side, width, height, styleProp]);

  const isCompletelyHidden = !isMounted;
  if (!portalContainer || (isCompletelyHidden && rerender)) return null;

  const overlayTransitionClass = isExiting ? 'overlay-leave-active' : 'overlay-enter-active';
  const panelTransitionClass = isExiting ? `${transition}-leave-active` : `${transition}-enter-active`;

  const panelContent = (
    <div
      ref={panelRef}
      className={`rsp rsp--${side}-side ${panelTransitionClass} ${className}`.trim()}
      style={panelStyles}
    >
      {header != null && (
        <div className={[headerClass, 'rsp__header'].filter(Boolean).join(' ')} style={{ flexShrink: 0 }}>
          {header}
        </div>
      )}
      
      <div className={[bodyClass, 'rsp__body'].filter(Boolean).join(' ')} style={{ flexGrow: 1, overflowY: 'auto' }}>
        {children}
        {!hideCloseBtn && <SidePanelCloseButton onClose={closePanel} />}
      </div>

      {footer != null && (
        <div className={[footerClass, 'rsp__footer'].filter(Boolean).join(' ')} style={{ flexShrink: 0 }}>
          {footer}
        </div>
      )}
    </div>
  );

  const content = (
    <div 
      className={`rsp-wrapper${!isCompletelyHidden ? ' rsp-wrapper--active' : ''}`}
      style={{ display: isCompletelyHidden ? 'none' : 'block' }}
    >
      {!isCompletelyHidden && (
        <div
          className={`rsp-overlay ${overlayTransitionClass}`}
          style={overlayStyles}
          onClick={() => !noClose && closePanel()}
          role="presentation"
          aria-hidden="true"
        />
      )}
      {panelContent}
    </div>
  );

  return createPortal(content, portalContainer);
}

SlidePanel.displayName = 'SlidePanel';