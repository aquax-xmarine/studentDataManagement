function SessionSquare({ label, onClick }) {
  return (
    <button
      type="button"
      className="session-square"
      onClick={onClick}
      aria-label={label}
    />

  )
}

export default SessionSquare