import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const ICONS = {
  Plumbing:'🔧', Electrical:'⚡', HVAC:'❄️', Roofing:'🏠',
  Landscaping:'🌿', Painting:'🖌️', 'Pest Control':'🐛',
  Moving:'📦', Cleaning:'🧹', Handyman:'🛠️', 'Something Else':'💬'
}

export default function History({ navigate, user }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchHistory()
    else setLoading(false)
  }, [user])

  const fetchHistory = async () => {
    const { data } = await supabase
      .from('history')
      .select('*')
      .order('created_at', { ascending: false })
    setHistory(data || [])
    setLoading(false)
  }

  const clearAll = async () => {
    if (!confirm('Clear all history?')) return
    await supabase.from('history').delete().eq('user_id', user.id)
    setHistory([])
  }

  const grouped = history.reduce((acc, item) => {
    if (!acc[item.service]) acc[item.service] = []
    acc[item.service].push(item)
    return acc
  }, {})

  if (!user) return (
    <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'1rem',padding:'2rem',textAlign:'center'}}>
      <div style={{fontSize:'2.5rem',opacity:0.3}}>📋</div>
      <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'1.1rem',fontWeight:'700',color:'#0F172A'}}>Sign in to see your history</h3>
      <p style={{fontSize:'0.85rem',color:'#64748B'}}>Your searched contractors are saved automatically when you log in.</p>
      <button onClick={()=>navigate('auth')} style={{background:'#2563EB',color:'#fff',border:'none',borderRadius:'8px',padding:'0.65rem 1.5rem',fontSize:'0.9rem',fontWeight:'700',cursor:'pointer',fontFamily:'Sora,sans-serif'}}>Sign In</button>
    </div>
  )

  if (loading) return (
    <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <p style={{color:'#94A3B8'}}>Loading your history...</p>
    </div>
  )

  return (
    <div style={{maxWidth:'700px',margin:'0 auto',padding:'1.75rem 1.5rem'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.75rem'}}>
        <div>
          <div style={{fontFamily:'Sora,sans-serif',fontSize:'1.15rem',fontWeight:'700',color:'#0F172A'}}>My Contractor History</div>
          <div style={{fontSize:'0.8rem',color:'#64748B',marginTop:'3px'}}>Saved automatically every time you search</div>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          {history.length > 0 && <button onClick={clearAll} style={{background:'none',border:'1px solid #E2E8F0',borderRadius:'8px',padding:'0.45rem 0.9rem',fontSize:'0.78rem',fontWeight:'600',cursor:'pointer',color:'#64748B',fontFamily:'Mulish,sans-serif'}}>Clear all</button>}
          <button onClick={()=>navigate('home')} style={{background:'#2563EB',color:'#fff',border:'none',borderRadius:'8px',padding:'0.5rem 1.1rem',fontSize:'0.82rem',fontWeight:'700',cursor:'pointer',fontFamily:'Sora,sans-serif'}}>+ New Search</button>
        </div>
      </div>

      {history.length === 0 ? (
        <div style={{textAlign:'center',padding:'4rem 1rem'}}>
          <div style={{fontSize:'2.5rem',opacity:0.3,marginBottom:'1rem'}}>📋</div>
          <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'1rem',fontWeight:'600',color:'#64748B',marginBottom:'0.5rem'}}>No history yet</h3>
          <p style={{fontSize:'0.83rem',color:'#94A3B8'}}>Your searched contractors will appear here automatically.</p>
        </div>
      ) : (
        Object.keys(grouped).map(svc => (
          <div key={svc} style={{marginBottom:'2.25rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',paddingBottom:'0.7rem',borderBottom:'2px solid #E2E8F0',marginBottom:'1rem'}}>
              <div style={{width:'30px',height:'30px',borderRadius:'8px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem'}}>{ICONS[svc]||'🔧'}</div>
              <div style={{fontFamily:'Sora,sans-serif',fontSize:'0.92rem',fontWeight:'700',color:'#0F172A'}}>{svc}</div>
              <div style={{fontSize:'0.73rem',color:'#94A3B8',marginLeft:'auto',background:'#F8F9FA',padding:'2px 8px',borderRadius:'100px',border:'1px solid #E2E8F0'}}>{grouped[svc].length} contractor{grouped[svc].length>1?'s':''}</div>
            </div>
            {grouped[svc].map((item,i) => (
              <div key={i} style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'1.1rem 1.25rem',marginBottom:'0.75rem'}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'1rem',marginBottom:'0.6rem'}}>
                  <div style={{display:'flex',gap:'10px'}}>
                    <div style={{width:'38px',height:'38px',borderRadius:'9px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Sora,sans-serif',fontWeight:'700',fontSize:'0.78rem',color:'#2563EB',flexShrink:0}}>{item.contractor_name?.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
                    <div>
                      <div style={{fontFamily:'Sora,sans-serif',fontSize:'0.88rem',fontWeight:'700',color:'#0F172A',marginBottom:'2px'}}>{item.contractor_name}</div>
                      <div style={{fontSize:'0.73rem',color:'#94A3B8'}}>{item.location}</div>
                    </div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'5px',flexShrink:0}}>
                    <div style={{fontSize:'0.7rem',color:'#CBD5E1'}}>{new Date(item.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
                    <div style={{background:'#EFF6FF',color:'#2563EB',fontSize:'0.67rem',fontWeight:'700',padding:'2px 8px',borderRadius:'100px'}}>Viewed</div>
                  </div>
                </div>
                <div style={{fontSize:'0.81rem',color:'#475569',lineHeight:'1.55',marginBottom:'0.7rem'}}>{item.contractor_desc}</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'0.65rem',alignItems:'center',paddingTop:'0.65rem',borderTop:'1px solid #F1F5F9'}}>
                  <span style={{fontSize:'0.78rem',color:'#475569'}}>📞 <a href={`tel:${item.contractor_phone}`} style={{color:'#2563EB',textDecoration:'none',fontWeight:'600'}}>{item.contractor_phone}</a></span>
                  <span style={{fontSize:'0.78rem',color:'#475569'}}>✉️ <a href={`mailto:${item.contractor_email}`} style={{color:'#2563EB',textDecoration:'none',fontWeight:'600'}}>{item.contractor_email}</a></span>
                  <span style={{fontSize:'0.75rem',color:'#94A3B8',marginLeft:'auto'}}>{item.contractor_hours}</span>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}