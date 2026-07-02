import './Button.css'

function Button({ children, onClick, variant = 'primary', disabled = false }) {
  return (
    <button
      type="button"
      className={`ui-button ui-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
