import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const ICONS = {
  Plumbing:'🔧',Electrical:'⚡',HVAC:'❄️',Roofing:'🏠',
  Landscaping:'🌿',Painting:'🖌️','Pest Control':'🐛',
  Moving:'📦',Cleaning:'🧹',Handyman:'🛠️',
  'Interior Remodeling':'🏗️','Interior Design':'🪑'
}

export default function Pins({ navigate, user, pins, onClear }) {
  const grouped = pins.reduce((acc, item) => {
    if (!acc[item.service]) acc[item.service] = []
    acc[item.service].push(item)
    return acc
  }, {})

  const s = {
    page: {background:'#0A0A0F',minHeight:'100vh'},
    wrap: {maxWidth:'680px',margin:'0 auto',padding:'1.75rem 1.5rem'},
    hd: {display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'},
    title: {fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'#F0EDE6'},
    sub: {fontSize:'0.75rem',color:'#5A5548',marginTop:'3px'},
    clearBtn: {background:'none',border:'1px solid #2A2A3A',borderRadius:'8px',padding:'0.38rem 0.8rem',fontSize:'0.72rem',color:'#9A9080',cursor:'pointer',fontFamily:'DM Sans,sans-serif'},
    newBtn: {background:'#C9A84C',color:'#0A0A0F',border:'none',borderRadius:'8px',padding:'0.42rem 0.95rem',fontSize:'0.75rem',fontWeight:'700',cursor:'pointer',fontFamily:'DM Sans,sans-serif'},
    group: {marginBottom:'1.75rem'},
    groupHd: {display:'flex',alignItems:'center',gap:'8px',paddingBottom:'0.6rem',borderBottom:'1px solid #2A2A3A',marginBottom:'0.85rem'},
    icon: {width:'26px',height:'26px',borderRadius:'6px',background:'#1C1C28',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem'},
    groupName: {fontWeight:'700',fontSize:'0.85rem',color:'#F0EDE6'},
    count: {fontSize:'0.68rem',color:'#5A5548',marginLeft:'auto',background:'#1C1C28',padding:'2px 6px',borderRadius:'100px',border:'1px solid #2A2A3A'},
    card: {background:'#12121A',border:'1px solid #2A2A3A',borderRadius:'10px',padding:'0.95rem 1.1rem',marginBottom:'0.6rem'},
    cardTop: {display:'flex',justifyContent:'space-between',gap:'0.75rem',marginBottom:'0.5rem'},
    name: {fontWeight:'700',fontSize:'0.82rem',color:'#F0EDE6'},
    loc: {fontSize:'0.7rem',color:'#5A5548'},
    date: {fontSize:'0.68rem',color:'#5A5548',whiteSpace:'nowrap'},
    pill: {background:'#1C1C28',color:'#C9A84C',fontSize:'0.62rem',fontWeight:'700',padding:'2px 7px',borderRadius:'100px',border:'1px solid #7A6030'},
    desc: {fontSize:'0.76rem',color:'#9A9080',lineHeight:'1.5',marginBottom:'0.6rem'},
    footer: {display:'flex',flexWrap:'wrap',gap:'0.6rem',alignItems:'center',paddingTop:'0.55rem',borderTop:'1px solid #2A2A3A'},
  }

  if (!pins.length) return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.hd}>
          <div><div style={s.title}>📌 My Pinned Contractors</div><div style={s.sub}>Your saved pros</div></div>
          <button style={s.newBtn} onClick={()=>navigate('home')}>+ New Search</button>
        </div>
        <div style={{textAlign:'center',padding:'4rem 1rem'}}>
          <div style={{fontSize:'2rem',opacity:0.2,marginBottom:'1rem'}}>📌</div>
          <p style={{color:'#5A5548',fontSize:'0.82rem'}}>No pinned contractors yet.<br/>Search and pin the pros you want to remember.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.hd}>
          <div><div style={s.title}>📌 My Pinned Contractors</div><div style={s.sub}>{pins.length} contractor{pins.length>1?'s':''} saved</div></div>
          <div style={{display:'flex',gap:'7px'}}>
            <button style={s.clearBtn} onClick={onClear}>Clear all</button>
            <button style={s.newBtn} onClick={()=>navigate('home')}>+ New Search</button>
          </div>
        </div>

        {Object.keys(grouped).map(svc=>(
          <div key={svc} style={s.group}>
            <div style={s.groupHd}>
              <div style={s.icon}>{ICONS[svc]||'🔧'}</div>
              <div style={s.groupName}>{svc}</div>
              <div style={s.count}>{grouped[svc].length} pinned</div>
            </div>
            {grouped[svc].map((p,i)=>(
              <div key={i} style={s.card}>
                <div style={s.cardTop}>
                  <div><div style={s.name}>{p.name}</div><div style={s.loc}>{p.loc}</div></div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'3px'}}>
                    <div style={s.date}>{p.date}</div>
                    <div style={s.pill}>📌 Pinned</div>
                  </div>
                </div>
                <div style={s.desc}>{p.desc}</div>
                <div style={s.footer}>
                  <span style={{fontSize:'0.73rem',color:'#9A9080'}}>📞 <a href={`tel:${p.phone}`} style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>{p.phone}</a></span>
                  <span style={{fontSize:'0.73rem',color:'#9A9080'}}>✉️ <a href={`mailto:${p.email}`} style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>{p.email}</a></span>
                  <span style={{fontSize:'0.7rem',color:'#5A5548',marginLeft:'auto'}}>{p.hours}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <footer style={{background:'#12121A',borderTop:'1px solid #2A2A3A',padding:'1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <p style={{fontSize:'0.68rem',color:'#5A5548',lineHeight:'1.8',maxWidth:'580px',margin:'0 auto'}}>TrustedPin aggregates publicly available business information for informational purposes only.</p>
      </footer>
    </div>
  )
}