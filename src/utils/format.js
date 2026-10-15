export const money = (n) => `${Math.round(n).toLocaleString('ru-RU')} so'm`
export const monthKey = (iso) => iso.slice(0, 7)
export const thisMonth = () => new Date().toISOString().slice(0, 7)
export const lastMonths = (n) => {
  const out = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const t = new Date(now.getFullYear(), now.getMonth() - i, 1)
    out.push(`${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}`)
  }
  return out
}
const NAMES = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
export const monthLabel = (key) => NAMES[Number(key.slice(5)) - 1]
