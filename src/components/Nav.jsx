import { useState } from 'react'
import { supabase } from '../supabase'

export default function Nav({ page, navigate, user, pinsCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('home')
  }

  return (
    <nav style={{background:'#12121A',borderBottom:'1px solid #2A2A3A',padding:'0.85rem 1.25rem',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:200}}>
      <div onClick={()=>navigate('home')} style={{display:'flex',alignItems:'center',gap:'9px',cursor:'pointer',flexShrink:0}}>
        <div style={{width:'24px',height:'24px',background:'#C9A84C',borderRadius:'50% 50% 50% 0',transform:'rotate(-45deg)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:'8px',height:'8px',background:'#12121A',borderRadius:'50%',transform:'rotate(45deg)'}}></div>
        </div>
        <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:'700',color:'#C9A84C'}}>Trusted<span style={{color:'#F0EDE6'}}>Pin</span></span>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
        <button onClick={()=>navigate('home')} style={{padding:'0.38rem 0.7rem',borderRadius:'8px',fontSize:'0.76rem',fontWeight:'600',cursor:'pointer',border:'none',background:page==='home'?'#1C1C28':'transparent',color:page==='home'?'#C9A84C':'#9A9080',fontFamily:'DM Sans,sans-serif'}}>Search</button>

        <button onClick={()=>navigate('pins')} style={{position:'relative',padding:'0.38rem 0.7rem',borderRadius:'8px',fontSize:'0.76rem',fontWeight:'600',cursor:'pointer',border:'none',background:page==='pins'?'#1C1C28':'transparent',color:page==='pins'?'#C9A84C':'#9A9080',fontFamily:'DM Sans,sans-serif'}}>
          📌 Pins
          {pinsCount > 0 && <span style={{position:'absolute',top:'-4px',right:'-4px',background:'#C9A84C',color:'#0A0A0F',fontSize:'0.55rem',fontWeight:'700',width:'14px',height:'14px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>{pinsCount}</span>}
        </button>

        <button onClick={()=>navigate('pro')} style={{padding:'0.38rem 0.7rem',borderRadius:'8px',fontSize:'0.76rem',fontWeight:'600',cursor:'pointer',border:'none',background:page==='pro'?'#1C1C28':'transparent',color:page==='pro'?'#C9A84C':'#9A9080',fontFamily:'DM Sans,sans-serif',whiteSpace:'nowrap'}}>For Pros</button>

        {user ? (
          <button onClick={signOut} style={{padding:'0.38rem 0.7rem',borderRadius:'8px',fontSize:'0.76rem',fontWeight:'600',cursor:'pointer',border:'1px solid #2A2A3A',background:'transparent',color:'#9A9080',fontFamily:'DM Sans,sans-serif'}}>Sign Out</button>
        ) : (
          <button onClick={()=>navigate('auth')} style={{padding:'0.38rem 0.85rem',borderRadius:'8px',fontSize:'0.76rem',fontWeight:'700',cursor:'pointer',border:'none',background:'#C9A84C',color:'#0A0A0F',fontFamily:'DM Sans,sans-serif'}}>Sign In</button>
        )}
      </div>
    </nav>
  )
}