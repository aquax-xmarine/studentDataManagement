function OptionCard({ title, subtitle, icon, onClick }) {
  return (
    <button className="option-card" onClick={onClick}>
      <div className="option-card__icon">{icon}</div>
      <div className="option-card__text">
        <span className="option-title">{title}</span>
        <span className="option-subtitle">{subtitle}</span>
      </div>
    </button>
  )
}

export default OptionCard