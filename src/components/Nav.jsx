import { useState } from 'react'
import { supabase } from '../supabase'

export default function Nav({ page, navigate, user, pinsCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('home')
    setMenuOpen(false)
  }

  const go = (p) => {
    navigate(p)
    setMenuOpen(false)
  }

  return (
    <nav style={{background:'rgba(8,8,14,0.97)',borderBottom:'1px solid #252538',padding:'0.85rem 1.25rem',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:200}}>

      <div onClick={()=>go('home')} style={{display:'flex',alignItems:'center',gap:'9px',cursor:'pointer',flexShrink:0}}>
        <div style={{width:'24px',height:'24px',background:'#C9A84C',borderRadius:'50% 50% 50% 0',transform:'rotate(-45deg)',display:'flex',alignItems:'center',justifyContent:'center',animation:'float 3s ease-in-out infinite'}}>
          <div style={{width:'8px',height:'8px',background:'#0F0F1A',borderRadius:'50%',transform:'rotate(45deg)'}}></div>
        </div>
        <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:'700',color:'#C9A84C'}}>Trusted<span style={{color:'#F2EEE6'}}>Pin</span></span>
      </div>

      {/* DESKTOP NAV */}
      <div style={{display:'flex',alignItems:'center',gap:'3px'}} className="desktop-nav">
        {[{id:'home',label:'Search'},{id:'about',label:'About'},{id:'how',label:'How it Works'},{id:'pro',label:'For Pros'}].map(t=>(
          <button key={t.id} onClick={()=>go(t.id)} style={{padding:'0.38rem 0.75rem',borderRadius:'8px',fontSize:'0.77rem',fontWeight:'600',cursor:'pointer',border:'none',background:page===t.id?'#181828':'transparent',color:page===t.id?'#C9A84C':'#9A8870',fontFamily:'DM Sans,sans-serif',whiteSpace:'nowrap'}}>
            {t.label}
          </button>
        ))}
        <button onClick={()=>go('pins')} style={{position:'relative',padding:'0.38rem 0.75rem',borderRadius:'8px',fontSize:'0.77rem',fontWeight:'600',cursor:'pointer',border:'none',background:page==='pins'?'#181828':'transparent',color:page==='pins'?'#C9A84C':'#9A8870',fontFamily:'DM Sans,sans-serif'}}>
          My Pins
          {pinsCount > 0 && <span style={{position:'absolute',top:'-4px',right:'-4px',background:'#C9A84C',color:'#08080E',fontSize:'0.58rem',fontWeight:'700',width:'15px',height:'15px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>{pinsCount}</span>}
        </button>
        {user ? (
          <button onClick={signOut} style={{padding:'0.38rem 0.75rem',borderRadius:'8px',fontSize:'0.77rem',fontWeight:'600',cursor:'pointer',border:'1px solid #252538',background:'transparent',color:'#9A8870',fontFamily:'DM Sans,sans-serif',marginLeft:'4px'}}>Sign Out</button>
        ) : (
          <button onClick={()=>go('auth')} style={{padding:'0.38rem 1rem',borderRadius:'8px',fontSize:'0.77rem',fontWeight:'700',cursor:'pointer',border:'none',background:'#C9A84C',color:'#08080E',fontFamily:'DM Sans,sans-serif',marginLeft:'4px'}}>Sign In</button>
        )}
      </div>

      {/* MOBILE HAMBURGER */}
      <button onClick={()=>setMenuOpen(!menuOpen)} style={{display:'none',background:'none',border:'none',cursor:'pointer',padding:'4px',flexDirection:'column',gap:'5px'}} className="mobile-menu-btn">
        <div style={{width:'22px',height:'2px',background:'#C9A84C',borderRadius:'2px',transition:'all 0.2s'}}></div>
        <div style={{width:'22px',height:'2px',background:'#C9A84C',borderRadius:'2px',transition:'all 0.2s'}}></div>
        <div style={{width:'22px',height:'2px',background:'#C9A84C',borderRadius:'2px',transition:'all 0.2s'}}></div>
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{position:'absolute',top:'100%',left:0,right:0,background:'#0F0F1A',borderBottom:'1px solid #252538',padding:'1rem 1.25rem',display:'flex',flexDirection:'column',gap:'4px',zIndex:300}}>
          {[{id:'home',label:'Search'},{id:'about',label:'About'},{id:'how',label:'How it Works'},{id:'pro',label:'For Pros'},{id:'pins',label:`My Pins${pinsCount>0?` (${pinsCount})`:''}`}].map(t=>(
            <button key={t.id} onClick={()=>go(t.id)} style={{padding:'0.75rem 1rem',borderRadius:'8px',fontSize:'0.88rem',fontWeight:'600',cursor:'pointer',border:'none',background:page===t.id?'#181828':'transparent',color:page===t.id?'#C9A84C':'#C8C0B4',fontFamily:'DM Sans,sans-serif',textAlign:'left'}}>
              {t.label}
            </button>
          ))}
          <div style={{borderTop:'1px solid #252538',marginTop:'0.5rem',paddingTop:'0.75rem'}}>
            {user ? (
              <button onClick={signOut} style={{width:'100%',padding:'0.75rem 1rem',borderRadius:'8px',fontSize:'0.88rem',fontWeight:'600',cursor:'pointer',border:'1px solid #252538',background:'transparent',color:'#9A8870',fontFamily:'DM Sans,sans-serif',textAlign:'left'}}>Sign Out</button>
            ) : (
              <button onClick={()=>go('auth')} style={{width:'100%',padding:'0.75rem 1rem',borderRadius:'8px',fontSize:'0.88rem',fontWeight:'700',cursor:'pointer',border:'none',background:'#C9A84C',color:'#08080E',fontFamily:'DM Sans,sans-serif',textAlign:'center'}}>Sign In</button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:640px){
          .desktop-nav{display:none!important;}
          .mobile-menu-btn{display:flex!important;}
        }
      `}</style>
    </nav>
  )
}
