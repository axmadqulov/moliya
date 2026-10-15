import { monthLabel } from '../utils/format'
export default function BarChart({ data }) {
  const max = Math.max(1, ...data.flatMap((d) => [d.income, d.expense]))
  const H = 140, W = 56
  return (
    <svg viewBox={`0 0 ${data.length * W} ${H + 24}`} className="bars" role="img" aria-label="Oylik daromad va xarajat">
      {data.map((d, i) => {
        const hi = (d.income / max) * H, he = (d.expense / max) * H
        return (
          <g key={d.key} transform={`translate(${i * W + 6} 0)`}>
            <rect x="0" y={H - hi} width="18" height={hi} rx="3" className="b-in"><title>{`Daromad: ${d.income}`}</title></rect>
            <rect x="21" y={H - he} width="18" height={he} rx="3" className="b-out"><title>{`Xarajat: ${d.expense}`}</title></rect>
            <text x="20" y={H + 16} textAnchor="middle">{monthLabel(d.key)}</text>
          </g>
        )
      })}
    </svg>
  )
}
