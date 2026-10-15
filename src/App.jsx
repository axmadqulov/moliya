import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useFinance } from './context/FinanceContext'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'

export default function App() {
  const { dispatch } = useFinance()
  return (
    <div className="shell">
      <nav className="side">
        <h1>Moliya</h1>
        <NavLink to="/" end>Bosh sahifa</NavLink>
        <NavLink to="/tranzaksiyalar">Tranzaksiyalar</NavLink>
        <NavLink to="/byudjet">Byudjet</NavLink>
        <button className="ghost" onClick={() => window.confirm("Barcha ma'lumotlar o'chirilsinmi?") && dispatch({ type: 'reset' })}>Ma'lumotlarni tozalash</button>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tranzaksiyalar" element={<Transactions />} />
          <Route path="/byudjet" element={<Budgets />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
