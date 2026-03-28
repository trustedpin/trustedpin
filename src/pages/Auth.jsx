import { useState } from 'react'
import { supabase } from '../supabase'

export default function Auth({ navigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handle = async () => {
    setLoading(true)
    setError('')
    setMessage('')
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('home')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account!')
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh',background:'#F8FAFC',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}>
      <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #E2E8F0',padding:'2.5rem',width:'100%',maxWidth:'400px'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'1.4rem',fontWeight:'700',color:'#0F172A',marginBottom:'0.5rem'}}>{isLogin ? 'Welcome back' : 'Create account'}</h2>
          <p style={{fontSize:'0.85rem',color:'#64748B'}}>{isLogin ? 'Sign in to see your saved contractors' : 'Save and track your contractor history'}</p>
        </div>
        {error && <div style={{background:'#FEE2E2',color:'#DC2626',padding:'0.75rem',borderRadius:'8px',fontSize:'0.82rem',marginBottom:'1rem'}}>{error}</div>}
        {message && <div style={{background:'#DCFCE7',color:'#16A34A',padding:'0.75rem',borderRadius:'8px',fontSize:'0.82rem',marginBottom:'1rem'}}>{message}</div>}
        <div style={{marginBottom:'1rem'}}>
          <label style={{display:'block',fontSize:'0.75rem',fontWeight:'700',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'6px'}}>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@email.com" style={{width:'100%',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0.65rem 0.9rem',fontSize:'0.9rem',outline:'none',fontFamily:'Mulish,sans-serif'}} />
        </div>
        <div style={{marginBottom:'1.5rem'}}>
          <label style={{display:'block',fontSize:'0.75rem',fontWeight:'700',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'6px'}}>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" style={{width:'100%',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0.65rem 0.9rem',fontSize:'0.9rem',outline:'none',fontFamily:'Mulish,sans-serif'}} />
        </div>
        <button onClick={handle} disabled={loading} style={{width:'100%',background:'#2563EB',color:'#fff',border:'none',borderRadius:'8px',padding:'0.75rem',fontSize:'0.95rem',fontWeight:'700',cursor:'pointer',fontFamily:'Sora,sans-serif'}}>
          {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
        </button>
        <p style={{textAlign:'center',marginTop:'1.25rem',fontSize:'0.82rem',color:'#64748B'}}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={()=>setIsLogin(!isLogin)} style={{color:'#2563EB',fontWeight:'600',cursor:'pointer'}}>{isLogin ? 'Sign up' : 'Sign in'}</span>
        </p>
        <p style={{textAlign:'center',marginTop:'1rem'}}>
          <span onClick={()=>navigate('home')} style={{fontSize:'0.78rem',color:'#94A3B8',cursor:'pointer'}}>← Back to search</span>
        </p>
      </div>
    </div>
  )
}