import { useFinance } from '../context/FinanceContext'
import { CATEGORIES } from '../data/seed'
import { money, monthKey, thisMonth } from '../utils/format'

export default function Budgets() {
  const { tx, budgets, dispatch } = useFinance()
  const spent = {}
  tx.forEach((t) => { if (t.type === 'expense' && monthKey(t.date) === thisMonth()) spent[t.cat] = (spent[t.cat] || 0) + t.amount })
  return (
    <section className="panel">
      <h2>Oylik byudjetlar</h2>
      <p className="muted">Har bir toifa uchun oylik limit belgilang. 0 qoldirsangiz, limit o'chadi.</p>
      {Object.entries(CATEGORIES).filter(([, c]) => c.type === 'expense').map(([k, c]) => {
        const limit = budgets[k] || 0, used = spent[k] || 0
        const pct = limit ? Math.min(100, (used / limit) * 100) : 0
        return (
          <div className="budget" key={k}>
            <div className="b-head">
              <span><i style={{ background: c.color }} />{c.name}</span>
              <span className={limit && used > limit ? 'neg' : ''}>{money(used)}{limit ? ` / ${money(limit)}` : ''}</span>
            </div>
            <div className="track"><div style={{ width: `${pct}%`, background: used > limit && limit ? 'var(--neg)' : c.color }} /></div>
            <input type="number" min="0" step="50000" value={limit} aria-label={`${c.name} limiti`}
              onChange={(e) => dispatch({ type: 'budget', cat: k, limit: Number(e.target.value) })} />
          </div>
        )
      })}
    </section>
  )
}
