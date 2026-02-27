export interface SidePanelCloseButtonProps {
  onClose: () => void;
  className?: string;
}

export function SidePanelCloseButton({ onClose, className }: SidePanelCloseButtonProps) {
  return (
    <button
      type="button"
      className={className ? `rsp-close ${className}` : 'rsp-close'}
      onClick={onClose}
      aria-label="Close panel"
    >
      <span className="rsp-close__x" />
    </button>
  );
}
