// 수동 저장/불러오기 (localStorage, 단일 슬롯)
const STORAGE_KEY = 'housegame:save'
const SAVE_VERSION = 3
const CONDITION_START = { good: 85, normal: 60, bad: 30 }

export function saveGame(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, saveVersion: SAVE_VERSION }))
}

export function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return migrateSave(JSON.parse(raw))
  } catch {
    return null
  }
}

function migrateSave(state) {
  if (!state || !Array.isArray(state.properties)) return null
  if (state.saveVersion >= SAVE_VERSION) {
    return {
      ...state,
      properties: state.properties.map((property) => ({
        ...property,
        conditionScore: property.conditionScore ?? CONDITION_START[property.conditionGrade] ?? 60,
      })),
    }
  }

  if (state.saveVersion === 2) {
    return {
      ...state,
      saveVersion: SAVE_VERSION,
      season: state.season ?? { number: 1, rentEarned: 0, bailouts: 0, stars: 0, bestNetWorth: state.cash ?? 0 },
      pendingDecision: state.pendingDecision ?? null,
      properties: state.properties.map((property) => ({
        ...property,
        conditionScore: property.conditionScore ?? CONDITION_START[property.conditionGrade] ?? 60,
      })),
    }
  }

  const legacyLoan = state.loan?.principal ?? 0
  const totalPurchasePrice = state.properties.reduce(
    (sum, property) => sum + (property.purchasePrice ?? property.price ?? 0),
    0,
  )
  let allocated = 0
  const properties = state.properties.map((property, index) => {
    const isLast = index === state.properties.length - 1
    const share =
      totalPurchasePrice > 0
        ? Math.round(
            legacyLoan * ((property.purchasePrice ?? property.price ?? 0) / totalPurchasePrice),
          )
        : 0
    const loanPrincipal = isLast ? legacyLoan - allocated : share
    allocated += loanPrincipal
    return {
      ...property,
      loanPrincipal,
      conditionScore: property.conditionScore ?? CONDITION_START[property.conditionGrade] ?? 60,
    }
  })

  const migrated = {
    ...state,
    properties,
    saveVersion: SAVE_VERSION,
    season: { number: 1, rentEarned: 0, bailouts: 0, stars: 0, bestNetWorth: state.cash ?? 0 },
    pendingDecision: null,
  }
  delete migrated.loan
  return migrated
}

export function hasSave() {
  return localStorage.getItem(STORAGE_KEY) !== null
}
