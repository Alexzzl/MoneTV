interface ExitDialogProps {
  visible: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function ExitDialog({ visible, onCancel, onConfirm }: ExitDialogProps) {
  return (
    <div
      id="exit-confirm-dialog"
      className="exit-confirm-dialog"
      hidden={!visible}
      aria-hidden={!visible}
    >
      <div className="exit-confirm-content">
        <h2 className="exit-confirm-title">Exit Mone TV?</h2>
        <p className="exit-confirm-message">Are you sure you want to exit the app?</p>
        <div className="exit-confirm-actions">
          <button
            id="exit-confirm-cancel"
            className="btn btn-secondary"
            data-focusable="true"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            id="exit-confirm-exit"
            className="btn btn-primary"
            data-focusable="true"
            onClick={onConfirm}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  )
}
