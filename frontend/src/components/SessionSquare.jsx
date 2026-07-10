import '../styles/common.css'

function SessionSquare({ label, onClick }) {
  return (
    <button
      type="button"
      className="session-square"
      onClick={onClick}
      aria-label={label}
    >
    {label}
    </button>

  )
}

export default SessionSquare