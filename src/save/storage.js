// 수동 저장/불러오기 (localStorage, 단일 슬롯)
const STORAGE_KEY = 'housegame:save'

export function saveGame(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function hasSave() {
  return localStorage.getItem(STORAGE_KEY) !== null
}
