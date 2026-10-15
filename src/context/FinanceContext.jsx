import { createContext, useContext, useEffect, useReducer } from 'react'
import { seedTx, seedBudgets } from '../data/seed'

const Ctx = createContext(null)
const KEY = 'moliya.state'

function reducer(s, a) {
  switch (a.type) {
    case 'add': return { ...s, tx: [{ ...a.tx, id: crypto.randomUUID() }, ...s.tx] }
    case 'remove': return { ...s, tx: s.tx.filter((t) => t.id !== a.id) }
    case 'budget': return { ...s, budgets: { ...s.budgets, [a.cat]: a.limit } }
    case 'reset': return { tx: [], budgets: {} }
    default: return s
  }
}
function init() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { tx: seedTx, budgets: seedBudgets }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
  }, [state])
  return <Ctx.Provider value={{ ...state, dispatch }}>{children}</Ctx.Provider>
}
export const useFinance = () => useContext(Ctx)
