import './MenuBar.css'

const MENU_ITEMS = [
  { key: 'buy', label: '구매', icon: '🏠' },
  { key: 'sell', label: '판매', icon: '💰' },
  { key: 'work', label: '일하기', icon: '💼' },
  { key: 'loan', label: '대출', icon: '🏦' },
]

function MenuBar({ enabledKeys = [], onSelect }) {
  return (
    <nav className="menu-bar">
      {MENU_ITEMS.map((item) => {
        const enabled = enabledKeys.includes(item.key)
        return (
          <button
            key={item.key}
            type="button"
            className="menu-bar-button"
            disabled={!enabled}
            onClick={() => enabled && onSelect(item.key)}
          >
            <span className="menu-bar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default MenuBar
