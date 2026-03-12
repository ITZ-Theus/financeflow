import { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { useSummary, useTransactions } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'
import { formatCurrency, formatDate } from '../utils/formatters'

const COLORS = ['#3b82f6','#06b6d4','#10b981','#f59e0b','#8b5cf6','#f43f5e']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</p>
      <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

export function Dashboard() {
  const now = new Date()
  const [month] = useState(now.getMonth() + 1)
  const [year]  = useState(now.getFullYear())

  const { data: summary }      = useSummary({ month, year })
  const { data: transactions } = useTransactions({ month, year, limit: 6 })
  const { data: categories }   = useCategories()

  const expenseByCat = categories
    ?.filter(c => c.type === 'expense')
    .map(c => ({
      name: c.name,
      value: transactions?.data.filter(t => t.categoryId === c.id && t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0) || 0,
    }))
    .filter(c => c.value > 0) ?? []

  const barData = [
    { name: 'Entradas', value: summary?.income  ?? 0 },
    { name: 'Saídas',   value: summary?.expense ?? 0 },
    { name: 'Saldo',    value: Math.abs(summary?.balance ?? 0) },
  ]
  const barColors = ['#10b981', '#f43f5e', '#3b82f6']

  const statCards = [
    { label: 'Entradas', value: summary?.income ?? 0,  icon: TrendingUp,   color: 'var(--green)', glow: 'var(--green-glow)', bg: '#10b98112' },
    { label: 'Saídas',   value: summary?.expense ?? 0, icon: TrendingDown, color: 'var(--red)',   glow: 'var(--red-glow)',   bg: '#f43f5e12' },
    { label: 'Saldo',    value: summary?.balance ?? 0, icon: DollarSign,   color: 'var(--accent)',glow: 'var(--accent-glow)',bg: '#3b82f612' },
  ]

  return (
    <div style={{ padding: 32 }} className="animate-in">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
          Resumo de {new Date(year, month - 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, color, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
              {formatCurrency(Number(value))}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Resumo Mensal</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} barSize={32}>
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-hover)' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {barData.map((_, i) => <Cell key={i} fill={barColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Gastos por Categoria</h3>
          {expenseByCat.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={expenseByCat} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={32}>
                  {expenseByCat.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              Nenhum gasto registrado
            </div>
          )}
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Últimas Transações</h3>
          <a href="/transactions" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Ver todas →</a>
        </div>
        {transactions?.data.length === 0 && (
          <p style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 13 }}>Nenhuma transação este mês</p>
        )}
        {transactions?.data.map((t, i) => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px',
            borderBottom: i < (transactions.data.length - 1) ? '1px solid var(--border)' : 'none',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: t.type === 'income' ? 'var(--green-glow)' : 'var(--red-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {t.type === 'income'
                  ? <TrendingUp size={15} style={{ color: 'var(--green)' }} />
                  : <TrendingDown size={15} style={{ color: 'var(--red)' }} />}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{t.title}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{formatDate(t.date)} · {t.category?.name || 'Sem categoria'}</p>
              </div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: t.type === 'income' ? 'var(--green)' : 'var(--red)', fontFamily: 'Syne, sans-serif' }}>
              {t.type === 'income' ? '+' : '-'}{formatCurrency(Number(t.amount))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
