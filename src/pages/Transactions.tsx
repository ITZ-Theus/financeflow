import { useState } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { Modal } from '../components/ui/Modal'
import { useTransactions, useCreateTransaction, useDeleteTransaction } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'
import { formatCurrency, formatDate } from '../utils/formatters'

const initialForm = {
  title: '', amount: '',
  type: 'expense' as 'income' | 'expense',
  date: new Date().toISOString().split('T')[0],
  description: '', categoryId: '',
}

export function Transactions() {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(initialForm)

  const { data, isLoading }  = useTransactions({ limit: 50 })
  const { data: categories } = useCategories()
  const createMutation       = useCreateTransaction()
  const deleteMutation       = useDeleteTransaction()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createMutation.mutateAsync({ ...form, amount: Number(form.amount), categoryId: form.categoryId || undefined })
    setForm(initialForm)
    setShowForm(false)
  }

  return (
    <div style={{ padding: 32 }} className="animate-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Transações</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Gerencie suas entradas e saídas</p>
        </div>
        <button className="btn-primary" onClick={() => { setForm(initialForm); setShowForm(true) }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={15} /> Nova Transação
        </button>
      </div>

      {showForm && (
        <Modal title="Nova Transação" onClose={() => setShowForm(false)} maxWidth={500}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Tipo toggle */}
            <div>
              <label className="label">Tipo</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['income', 'expense'] as const).map(t => {
                  const active = form.type === t
                  const color  = t === 'income' ? 'var(--green)' : 'var(--red)'
                  const glow   = t === 'income' ? 'var(--green-glow)' : 'var(--red-glow)'
                  return (
                    <button key={t} type="button"
                      onClick={() => setForm(f => ({ ...f, type: t, categoryId: '' }))}
                      style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: `1px solid ${active ? color : 'var(--border)'}`, background: active ? glow : 'transparent', color: active ? color : 'var(--text-muted)', cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, transition: 'all 0.15s' }}
                    >
                      {t === 'income' ? '↑ Entrada' : '↓ Saída'}
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Título</label>
                <input className="input" placeholder="Ex: Salário" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Valor (R$)</label>
                <input className="input" type="number" step="0.01" placeholder="0,00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Data</label>
                <input className="input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Categoria</label>
                <select className="input" value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
                  <option value="">Sem categoria</option>
                  {categories?.filter(c => c.type === form.type).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Descrição</label>
                <input className="input" placeholder="Opcional" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
              <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Cancelar</button>
              <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={createMutation.isLoading}>
                {createMutation.isLoading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div className="card" style={{ overflow: 'hidden' }}>
        {isLoading && <p style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: 13 }}>Carregando...</p>}
        {!isLoading && data?.data.length === 0 && (
          <p style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: 13 }}>Nenhuma transação encontrada</p>
        )}
        {data?.data.map((t, i) => (
          <div key={t.id}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: i < data.data.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: t.type === 'income' ? 'var(--green-glow)' : 'var(--red-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {t.type === 'income' ? <TrendingUp size={15} style={{ color: 'var(--green)' }} /> : <TrendingDown size={15} style={{ color: 'var(--red)' }} />}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{t.title}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {formatDate(t.date)}{t.category && <> · <span style={{ color: 'var(--accent)' }}>{t.category.name}</span></>}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: t.type === 'income' ? 'var(--green)' : 'var(--red)', fontFamily: 'Syne, sans-serif' }}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(Number(t.amount))}
              </span>
              <button onClick={() => deleteMutation.mutate(t.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
