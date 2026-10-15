import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFinance } from '../context/FinanceContext'
import { money, monthKey, thisMonth, lastMonths } from '../utils/format'
import { CATEGORIES } from '../data/seed'
import Donut from '../components/Donut'
import BarChart from '../components/BarChart'

export default function Dashboard() {
  const { tx } = useFinance()
  const { balance, inc, exp, series, byCat } = useMemo(() => {
    const cur = thisMonth()
    let balance = 0, inc = 0, exp = 0
    const byCat = {}
    const series = lastMonths(6).map((key) => ({ key, income: 0, expense: 0 }))
    for (const t of tx) {
      const sign = t.type === 'income' ? 1 : -1
      balance += sign * t.amount
      const m = monthKey(t.date)
      if (m === cur) {
        if (t.type === 'income') inc += t.amount
        else { exp += t.amount; byCat[t.cat] = (byCat[t.cat] || 0) + t.amount }
      }
      const s = series.find((x) => x.key === m)
      if (s) s[t.type] += t.amount
    }
    return { balance, inc, exp, series, byCat }
  }, [tx])
  const recent = [...tx].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

  return (
    <>
      <div className="stats">
        <div className="panel stat"><span>Umumiy balans</span><strong>{money(balance)}</strong></div>
        <div className="panel stat"><span>Shu oy daromad</span><strong className="pos">{money(inc)}</strong></div>
        <div className="panel stat"><span>Shu oy xarajat</span><strong className="neg">{money(exp)}</strong></div>
      </div>
      <div className="grid2">
        <section className="panel"><h2>Oxirgi 6 oy</h2><BarChart data={series} /></section>
        <section className="panel"><h2>Shu oy xarajatlari</h2><Donut totals={byCat} /></section>
      </div>
      <section className="panel">
        <h2>So'nggi yozuvlar</h2>
        {recent.length === 0 && <p className="muted">Hali yozuv yo'q. <Link to="/tranzaksiyalar">Birinchisini qo'shing</Link></p>}
        <ul className="list">
          {recent.map((t) => (
            <li key={t.id}>
              <i style={{ background: CATEGORIES[t.cat].color }} />
              <span>{t.title}<small>{t.date}</small></span>
              <b className={t.type === 'income' ? 'pos' : 'neg'}>{t.type === 'income' ? '+' : '-'}{money(t.amount)}</b>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
