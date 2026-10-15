import { useMemo, useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { CATEGORIES } from '../data/seed'
import { money } from '../utils/format'
import TxForm from '../components/TxForm'

export default function Transactions() {
  const { tx, dispatch } = useFinance()
  const [type, setType] = useState('all')
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')
  const rows = useMemo(() => tx
    .filter((t) => (type === 'all' || t.type === type) && (cat === 'all' || t.cat === cat) && t.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.date.localeCompare(a.date)), [tx, type, cat, q])
  const exportCsv = () => {
    const csv = ['sana,nomi,summa,toifa,turi', ...rows.map((t) => `${t.date},"${t.title}",${t.amount},${CATEGORIES[t.cat].name},${t.type}`)].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    Object.assign(document.createElement('a'), { href: url, download: 'moliya.csv' }).click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="grid2 wide-left">
      <section className="panel">
        <div className="filters">
          <input type="search" placeholder="Qidirish..." value={q} onChange={(e) => setQ(e.target.value)} />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">Hammasi</option><option value="income">Daromad</option><option value="expense">Xarajat</option>
          </select>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">Barcha toifalar</option>
            {Object.entries(CATEGORIES).map(([k, c]) => <option key={k} value={k}>{c.name}</option>)}
          </select>
          <button onClick={exportCsv}>CSV</button>
        </div>
        {rows.length === 0 && <p className="muted">Mos yozuv topilmadi</p>}
        <ul className="list">
          {rows.map((t) => (
            <li key={t.id}>
              <i style={{ background: CATEGORIES[t.cat].color }} />
              <span>{t.title}<small>{t.date} · {CATEGORIES[t.cat].name}</small></span>
              <b className={t.type === 'income' ? 'pos' : 'neg'}>{t.type === 'income' ? '+' : '-'}{money(t.amount)}</b>
              <button className="ghost" aria-label="O'chirish" onClick={() => dispatch({ type: 'remove', id: t.id })}>×</button>
            </li>
          ))}
        </ul>
      </section>
      <TxForm />
    </div>
  )
}
