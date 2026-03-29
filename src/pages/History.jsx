const ICONS = {
  Plumbing:'🔧',Electrical:'⚡',HVAC:'❄️',Roofing:'🏠',
  Landscaping:'🌿',Painting:'🖌️','Pest Control':'🐛',
  Moving:'📦',Cleaning:'🧹',Handyman:'🛠️',
  'Interior Remodeling':'🏗️','Interior Design':'🪑'
}

export default function Pins({ navigate, pins, onClear, onPin }) {
  return (
    <div style={{background:'#08080E',minHeight:'100vh'}}>
      <div style={{maxWidth:'700px',margin:'0 auto',padding:'1.75rem 1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
          <div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'#F2EEE6'}}>📌 My Pinned Contractors</div>
            <div style={{fontSize:'0.75rem',color:'#5A5248',marginTop:'3px'}}>{pins.length} contractor{pins.length!==1?'s':''} pinned</div>
          </div>
          <div style={{display:'flex',gap:'7px'}}>
            {pins.length > 0 && <button onClick={onClear} style={{background:'none',border:'1px solid #252538',borderRadius:'8px',padding:'0.38rem 0.8rem',fontSize:'0.72rem',color:'#9A8870',cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>Clear all</button>}
            <button onClick={()=>navigate('home')} style={{background:'#C9A84C',color:'#08080E',border:'none',borderRadius:'8px',padding:'0.42rem 0.95rem',fontSize:'0.75rem',fontWeight:'700',cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>+ New Search</button>
          </div>
        </div>

        {pins.length === 0 ? (
          <div style={{textAlign:'center',padding:'5rem 1rem',animation:'fadeIn 0.4s ease'}}>
            <div style={{fontSize:'2.5rem',opacity:0.15,marginBottom:'1rem'}}>📌</div>
            <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'#5A5248',marginBottom:'0.5rem',fontWeight:'700'}}>No pinned contractors yet</h3>
            <p style={{fontSize:'0.83rem',color:'#3A3A50'}}>Search for a service and pin the pros you want to remember.</p>
            <button onClick={()=>navigate('home')} style={{marginTop:'1.5rem',background:'#C9A84C',color:'#08080E',border:'none',borderRadius:'9px',padding:'0.65rem 1.5rem',cursor:'pointer',fontFamily:'DM Sans,sans-serif',fontWeight:'700',fontSize:'0.88rem'}}>Start searching →</button>
          </div>
        ) : (
          Object.entries(
            pins.reduce((acc,p)=>{
              if(!acc[p.service])acc[p.service]=[]
              acc[p.service].push(p)
              return acc
            },{})
          ).map(([svc,items])=>(
            <div key={svc} style={{marginBottom:'2rem',animation:'fadeUp 0.4s ease'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',paddingBottom:'0.65rem',borderBottom:'1px solid #252538',marginBottom:'0.9rem'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'7px',background:'#181828',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem'}}>{ICONS[svc]||'🔧'}</div>
                <div style={{fontWeight:'700',fontSize:'0.88rem',color:'#F2EEE6'}}>{svc}</div>
                <div style={{fontSize:'0.7rem',color:'#5A5248',marginLeft:'auto',background:'#181828',padding:'2px 7px',borderRadius:'100px',border:'1px solid #252538'}}>{items.length} pinned</div>
              </div>
              {items.map((p,i)=>(
                <div key={i} style={{background:'#0F0F1A',border:'1px solid #252538',borderRadius:'11px',padding:'1rem 1.2rem',marginBottom:'0.65rem',animation:`slideIn 0.3s ease ${i*0.08}s both`}}>
                  <div style={{display:'flex',justifyContent:'space-between',gap:'0.75rem',marginBottom:'0.5rem'}}>
                    <div>
                      <div style={{fontWeight:'700',fontSize:'0.85rem',color:'#F2EEE6'}}>{p.name}</div>
                      <div style={{fontSize:'0.72rem',color:'#5A5248'}}>{p.loc}</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'3px',flexShrink:0}}>
                      <div style={{fontSize:'0.68rem',color:'#5A5248'}}>{p.date}</div>
                      <div style={{background:'#181828',color:'#C9A84C',fontSize:'0.63rem',fontWeight:'700',padding:'2px 8px',borderRadius:'100px',border:'1px solid #5A4820'}}>📌 Pinned</div>
                    </div>
                  </div>
                  <div style={{fontSize:'0.78rem',color:'#9A8870',lineHeight:'1.55',marginBottom:'0.65rem'}}>{p.desc}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'0.65rem',alignItems:'center',paddingTop:'0.6rem',borderTop:'1px solid #252538'}}>
                    <span style={{fontSize:'0.75rem',color:'#9A8870'}}>📞 <a href={`tel:${p.phone}`} style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>{p.phone}</a></span>
                    <span style={{fontSize:'0.75rem',color:'#9A8870'}}>✉️ <a href={`mailto:${p.email}`} style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>{p.email}</a></span>
                    <span style={{fontSize:'0.72rem',color:'#5A5248',marginLeft:'auto'}}>{p.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <footer style={{background:'#0F0F1A',borderTop:'1px solid #252538',padding:'1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <p style={{fontSize:'0.7rem',color:'#5A5248',lineHeight:'1.8',maxWidth:'580px',margin:'0 auto'}}>TrustedPin aggregates publicly available business information for informational purposes only. trustedpin@outlook.com</p>
      </footer>
    </div>
  )
}
