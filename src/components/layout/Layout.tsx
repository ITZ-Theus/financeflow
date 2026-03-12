import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ArrowLeftRight, Target, LogOut,
  ChevronLeft, ChevronRight, Tag, Wallet
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const navItems = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Transações' },
  { to: '/categories',   icon: Tag,             label: 'Categorias' },
  { to: '/goals',        icon: Target,          label: 'Metas' },
]

export function Layout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-deep)', overflow: 'hidden' }}>

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 68 : 240,
        minWidth: collapsed ? 68 : 240,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(.4,0,.2,1), min-width 0.25s cubic-bezier(.4,0,.2,1)',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* Logo */}
        <div style={{
          padding: collapsed ? '24px 0' : '24px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          overflow: 'hidden',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent), var(--cyan))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 16px var(--accent-glow)',
          }}>
            <Wallet size={16} color="#fff" />
          </div>
          {!collapsed && (
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>
              Finance<span style={{ color: 'var(--accent)' }}>Flow</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: collapsed ? '10px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-glow)' : 'transparent',
                border: isActive ? '1px solid var(--border-glow)' : '1px solid transparent',
                transition: 'all 0.15s',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              })}
              onMouseEnter={e => {
                const el = e.currentTarget
                if (!el.style.background.includes('accent-glow')) {
                  el.style.background = 'var(--bg-hover)'
                  el.style.color = 'var(--text-primary)'
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                if (!el.classList.contains('active')) {
                  el.style.background = ''
                  el.style.color = ''
                }
              }}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && label}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
          {!collapsed && (
            <div style={{
              padding: '10px 12px', marginBottom: 4,
              background: 'var(--bg-hover)', borderRadius: 8,
              overflow: 'hidden',
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name}
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email}
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            title={collapsed ? 'Sair' : undefined}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: collapsed ? '10px 0' : '10px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 8, width: '100%', cursor: 'pointer',
              background: 'transparent', border: '1px solid transparent',
              color: 'var(--red)', fontSize: 14, fontFamily: 'Inter, sans-serif',
              fontWeight: 500, transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--red-glow)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {!collapsed && 'Sair'}
          </button>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            position: 'absolute', top: 20, right: -13,
            width: 26, height: 26, borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)',
            zIndex: 20, transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
            e.currentTarget.style.boxShadow = '0 0 10px var(--accent-glow)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-secondary)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-deep)' }}>
        <Outlet />
      </main>
    </div>
  )
}
