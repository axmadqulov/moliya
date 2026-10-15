export const CATEGORIES = {
  oziq: { name: 'Oziq-ovqat', color: '#e5484d', type: 'expense' },
  transport: { name: 'Transport', color: '#f5a524', type: 'expense' },
  uy: { name: 'Uy-joy', color: '#5b3df5', type: 'expense' },
  kommunal: { name: 'Kommunal', color: '#0ea5a4', type: 'expense' },
  dam: { name: 'Dam olish', color: '#d946a8', type: 'expense' },
  maosh: { name: 'Maosh', color: '#2f9e5b', type: 'income' },
  boshqa: { name: 'Boshqa daromad', color: '#6b7bd6', type: 'income' },
}
const d = (ago) => {
  const t = new Date()
  t.setDate(t.getDate() - ago)
  return t.toISOString().slice(0, 10)
}
export const seedTx = [
  { id: 's1', date: d(2), title: 'Oylik maosh', amount: 9000000, cat: 'maosh', type: 'income' },
  { id: 's2', date: d(3), title: 'Bozorlik', amount: 420000, cat: 'oziq', type: 'expense' },
  { id: 's3', date: d(4), title: 'Taksi', amount: 85000, cat: 'transport', type: 'expense' },
  { id: 's4', date: d(6), title: 'Ijara', amount: 2500000, cat: 'uy', type: 'expense' },
  { id: 's5', date: d(8), title: 'Elektr va gaz', amount: 310000, cat: 'kommunal', type: 'expense' },
  { id: 's6', date: d(10), title: 'Kino', amount: 120000, cat: 'dam', type: 'expense' },
  { id: 's7', date: d(35), title: 'Oylik maosh', amount: 9000000, cat: 'maosh', type: 'income' },
  { id: 's8', date: d(38), title: 'Supermarket', amount: 780000, cat: 'oziq', type: 'expense' },
  { id: 's9', date: d(66), title: 'Frilans loyiha', amount: 2200000, cat: 'boshqa', type: 'income' },
  { id: 's10', date: d(70), title: 'Ijara', amount: 2500000, cat: 'uy', type: 'expense' },
]
export const seedBudgets = { oziq: 1500000, transport: 400000, dam: 500000, kommunal: 600000 }
