import './MenuBar.css'

const MENU_ITEMS = [
  { key: 'buy', label: '부동산 구매' },
  { key: 'sell', label: '부동산 판매' },
  { key: 'work', label: '일하기' },
  { key: 'loan', label: '대출 확인' },
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
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}

export default MenuBar
