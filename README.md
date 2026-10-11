# Moliya

Shaxsiy moliya boshqaruvi: React 18, Vite, React Router, Context + useReducer.

## Imkoniyatlar
- Bosh sahifa: balans, oylik daromad/xarajat, 6 oylik grafik va toifalar diagrammasi (SVG, kutubxonasiz)
- Tranzaksiyalar: qo'shish, o'chirish, qidiruv, filtr, CSV eksport
- Byudjet: toifa bo'yicha oylik limit va progress
- Ma'lumotlar `localStorage` da saqlanadi, qorong'i rejim tizim sozlamasiga qarab

## Ishga tushirish
```bash
npm install
npm run dev
```

## Struktura
```
src/
  context/FinanceContext.jsx   # global holat (reducer)
  pages/                       # Dashboard, Transactions, Budgets
  components/                  # Donut, BarChart, TxForm
  utils/format.js              # pul va sana yordamchilari
  data/seed.js                 # toifalar va namunaviy ma'lumot
```

## GitHub'ga yuklash
```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/moliya.git
git push -u origin main
```
# moliya
