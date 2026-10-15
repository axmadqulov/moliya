import { useState } from 'react'
import { CATEGORIES } from '../data/seed'
import { useFinance } from '../context/FinanceContext'
const today = () => new Date().toISOString().slice(0, 10)
export default function TxForm() {
  const { dispatch } = useFinance()
  const [f, setF] = useState({ type: 'expense', title: '', amount: '', cat: 'oziq', date: today() })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const setType = (type) => setF({ ...f, type, cat: Object.keys(CATEGORIES).find((k) => CATEGORIES[k].type === type) })
  const submit = (e) => {
    e.preventDefault()
    const amount = Number(f.amount)
    if (!f.title.trim() || !(amount > 0)) return
    dispatch({ type: 'add', tx: { ...f, title: f.title.trim(), amount } })
    setF({ ...f, title: '', amount: '' })
  }
  return (
    <form className="panel form" onSubmit={submit}>
      <h2>Yangi yozuv</h2>
      <div className="seg">
        {['expense', 'income'].map((t) => (
          <button type="button" key={t} className={f.type === t ? 'on' : ''} onClick={() => setType(t)}>
            {t === 'expense' ? 'Xarajat' : 'Daromad'}
          </button>
        ))}
      </div>
      <label>Nomi<input value={f.title} onChange={set('title')} /></label>
      <label>Summa (so'm)<input type="number" min="0" value={f.amount} onChange={set('amount')} /></label>
      <label>Toifa
        <select value={f.cat} onChange={set('cat')}>
          {Object.entries(CATEGORIES).filter(([, c]) => c.type === f.type).map(([k, c]) => <option key={k} value={k}>{c.name}</option>)}
        </select>
      </label>
      <label>Sana<input type="date" value={f.date} onChange={set('date')} /></label>
      <button className="primary">Qo'shish</button>
    </form>
  )
}
