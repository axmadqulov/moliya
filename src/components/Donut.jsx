import { CATEGORIES } from '../data/seed'
import { money } from '../utils/format'
export default function Donut({ totals }) {
  const entries = Object.entries(totals).filter(([, v]) => v > 0)
  const sum = entries.reduce((a, [, v]) => a + v, 0)
  if (!sum) return <p className="muted">Bu oyda xarajat yo'q</p>
  const R = 60, C = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="donut">
      <svg viewBox="0 0 160 160" role="img" aria-label="Xarajatlar toifalar bo'yicha">
        <g transform="rotate(-90 80 80)">
          {entries.map(([k, v]) => {
            const len = (v / sum) * C
            const el = <circle key={k} cx="80" cy="80" r={R} fill="none" stroke={CATEGORIES[k].color}
              strokeWidth="26" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
            offset += len
            return el
          })}
        </g>
        <text x="80" y="84" textAnchor="middle" className="donut-total">{Math.round(sum / 1000)}k</text>
      </svg>
      <ul className="legend">
        {entries.map(([k, v]) => (
          <li key={k}><i style={{ background: CATEGORIES[k].color }} />{CATEGORIES[k].name}<b>{money(v)}</b></li>
        ))}
      </ul>
    </div>
  )
}
