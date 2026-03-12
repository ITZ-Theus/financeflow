import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Wallet, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export function Register() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { register } = useAuthStore()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-deep)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)`, backgroundSize: '48px 48px' }} />
      <div style={{ position: 'absolute', top: '25%', right: '10%', width: 280, height: 280, borderRadius: '50%', background: 'var(--cyan)', opacity: 0.04, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="animate-in" style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, var(--accent), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 32px var(--accent-glow)' }}>
            <Wallet size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em' }}>
            Finance<span style={{ color: 'var(--accent)' }}>Flow</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 6 }}>Crie sua conta gratuitamente</p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, boxShadow: '0 0 40px rgba(0,0,0,0.4)' }}>
          {error && (
            <div style={{ background: 'var(--red-glow)', border: '1px solid #f43f5e30', borderRadius: 8, padding: '10px 14px', marginBottom: 20, color: 'var(--red)', fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="label">Nome</label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="input" placeholder="Seu nome" style={{ paddingLeft: 36 }} value={name} onChange={e => setName(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="label">E-mail</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="input" type="email" placeholder="seu@email.com" style={{ paddingLeft: 36 }} value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="label">Senha</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="input" type="password" placeholder="Mínimo 6 caracteres" style={{ paddingLeft: 36 }} value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? 'Criando conta...' : (<>Criar conta <ArrowRight size={15} /></>)}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-secondary)' }}>
          Já tem conta?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
        </p>
      </div>
    </div>
  )
}
