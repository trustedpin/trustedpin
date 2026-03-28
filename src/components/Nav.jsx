import { supabase } from '../supabase'

export default function Nav({ page, navigate, user }) {
  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('home')
  }

  return (
    <nav style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0.9rem 1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:200}}>
      <div onClick={()=>navigate('home')} style={{display:'flex',alignItems:'center',gap:'9px',cursor:'pointer'}}>
        <div style={{width:'26px',height:'26px',background:'#2563EB',borderRadius:'50% 50% 50% 0',transform:'rotate(-45deg)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <div style={{width:'9px',height:'9px',background:'#fff',borderRadius:'50%',transform:'rotate(45deg)'}}></div>
        </div>
        <span style={{fontFamily:'Sora,sans-serif',fontSize:'1.15rem',fontWeight:'700',color:'#0F172A',letterSpacing:'-0.02em'}}>TrustedPin</span>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
        <button onClick={()=>navigate('home')} style={{padding:'0.45rem 1rem',borderRadius:'8px',fontSize:'0.83rem',fontWeight:'600',cursor:'pointer',border:'none',background:page==='home'?'#EFF6FF':'transparent',color:page==='home'?'#2563EB':'#64748B',fontFamily:'Sora,sans-serif'}}>Search</button>
        <button onClick={()=>navigate('history')} style={{padding:'0.45rem 1rem',borderRadius:'8px',fontSize:'0.83rem',fontWeight:'600',cursor:'pointer',border:'none',background:page==='history'?'#EFF6FF':'transparent',color:page==='history'?'#2563EB':'#64748B',fontFamily:'Sora,sans-serif'}}>My History</button>
        {user ? (
          <button onClick={signOut} style={{padding:'0.45rem 1rem',borderRadius:'8px',fontSize:'0.83rem',fontWeight:'600',cursor:'pointer',border:'1px solid #E2E8F0',background:'#fff',color:'#64748B',fontFamily:'Sora,sans-serif'}}>Sign Out</button>
        ) : (
          <button onClick={()=>navigate('auth')} style={{padding:'0.45rem 1rem',borderRadius:'8px',fontSize:'0.83rem',fontWeight:'700',cursor:'pointer',border:'none',background:'#2563EB',color:'#fff',fontFamily:'Sora,sans-serif'}}>Sign In</button>
        )}
      </div>
    </nav>
  )
}