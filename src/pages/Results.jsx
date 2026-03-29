import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const stars = (r) => '★'.repeat(Math.floor(r||0)) + '☆'.repeat(5-Math.floor(r||0))

export default function Results({ navigate, searchData, user, pins, onPin }) {
  const { service, location } = searchData || {}
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { fetchPlaces() }, [])

  const fetchPlaces = async () => {
    try {
      const res = await fetch(`/api/places?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`)
      const data = await res.json()
      if (data.places) {
        setResults(data.places)
        if (user) data.places.forEach(p => saveHistory(p))
      } else {
        setError('No results found — try a different location or service.')
      }
    } catch {
      setError('Could not load results. Please try again.')
    }
    setLoading(false)
  }

  const saveHistory = async (p) => {
    await supabase.from('history').insert({
      user_id: user.id, service,
      contractor_name: p.displayName?.text,
      contractor_phone: p.internationalPhoneNumber || 'Not listed',
      contractor_email: 'Contact via phone',
      contractor_hours: p.regularOpeningHours?.weekdayDescriptions?.[0] || 'Hours not listed',
      contractor_desc: p.editorialSummary?.text || `${service} service in ${location}`,
      location, status: 'viewed'
    })
  }

  const isPinned = (name) => pins?.some(p => p.name === name)

  const handlePin = (p) => {
    onPin({
      service,
      date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
      name: p.displayName?.text,
      loc: location,
      phone: p.internationalPhoneNumber || 'Not listed',
      email: 'Contact via phone',
      hours: p.regularOpeningHours?.weekdayDescriptions?.[0] || 'Hours not listed',
      desc: p.editorialSummary?.text || `${service} service in ${location}`
    })
  }

  return (
    <div style={{background:'#08080E',minHeight:'100vh'}}>
      <div style={{background:'#181828',padding:'0.5rem 1.5rem',textAlign:'center',borderBottom:'1px solid #252538'}}>
        <p style={{fontSize:'0.67rem',color:'#5A5248'}}>Results aggregated from public sources. TrustedPin makes no guarantees. Promoted listings are paid placements — not verified or endorsed by TrustedPin.</p>
      </div>

      <div style={{maxWidth:'700px',margin:'0 auto',padding:'1.75rem 1.5rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
          <div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'#F2EEE6'}}>Top {service} Pros in {location}</div>
            <div style={{fontSize:'0.73rem',color:'#5A5248',marginTop:'3px'}}>Live data from Google · {results.length||'—'} results</div>
          </div>
          <button onClick={()=>navigate('home')} style={{fontSize:'0.8rem',color:'#9A8870',background:'none',border:'none',cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>← New search</button>
        </div>

        <div style={{background:'#0F0F1A',border:'1px solid #5A4820',borderRadius:'14px',padding:'1.25rem 1.4rem',marginBottom:'1rem'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'3px',background:'#5A4820',color:'#F5DFA0',fontSize:'0.62rem',fontWeight:'700',padding:'2px 8px',borderRadius:'100px',marginBottom:'8px'}}>★ Promoted · Paid placement</div>
          <div style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'0.9rem'}}>
            <div style={{width:'44px',height:'44px',borderRadius:'10px',background:'#212135',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',fontSize:'0.8rem',color:'#C9A84C',flexShrink:0,border:'1px solid #252538'}}>EP</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'700',fontSize:'0.95rem',color:'#F2EEE6',marginBottom:'2px'}}>Elite Pros · {location}</div>
              <div style={{fontSize:'0.73rem',color:'#5A5248'}}>TrustedPin Pro Member</div>
            </div>
            <div style={{background:'#C9A84C',color:'#08080E',fontSize:'0.62rem',fontWeight:'700',padding:'3px 8px',borderRadius:'6px'}}>PRO</div>
          </div>
          <div style={{fontSize:'0.82rem',color:'#9A8870',lineHeight:'1.6',marginBottom:'0.85rem',paddingBottom:'0.85rem',borderBottom:'1px solid #252538'}}>
            Premium featured contractor. Contact for a free estimate on your {service?.toLowerCase()} needs.
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.75rem',alignItems:'center'}}>
            <span style={{fontSize:'0.78rem',color:'#9A8870'}}>📞 <a href="tel:+13135550001" style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>(313) 555-0001</a></span>
            <span style={{fontSize:'0.78rem',color:'#9A8870'}}>✉️ <a href="mailto:trustedpin@outlook.com" style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>trustedpin@outlook.com</a></span>
          </div>
          <p style={{fontSize:'0.65rem',color:'#5A5248',marginTop:'6px',fontStyle:'italic'}}>Paid listing. TrustedPin does not guarantee quality. Always verify independently.</p>
        </div>

        {loading && (
          <div style={{textAlign:'center',padding:'3rem',color:'#5A5248',animation:'fadeIn 0.3s ease'}}>
            <div style={{fontSize:'1.5rem',marginBottom:'1rem',color:'#C9A84C'}}>◎</div>
            <p>Finding top {service?.toLowerCase()} pros near {location}...</p>
          </div>
        )}

        {error && (
          <div style={{textAlign:'center',padding:'3rem',color:'#9A8870'}}>
            <p style={{marginBottom:'1rem'}}>{error}</p>
            <button onClick={()=>navigate('home')} style={{background:'#C9A84C',color:'#08080E',border:'none',borderRadius:'9px',padding:'0.6rem 1.4rem',cursor:'pointer',fontFamily:'DM Sans,sans-serif',fontWeight:'700',fontSize:'0.88rem'}}>Try again</button>
          </div>
        )}

        {!loading && !error && results.map((p,i)=>{
          const pinned = isPinned(p.displayName?.text)
          return (
            <div key={i} style={{background:'#0F0F1A',border:'1px solid #252538',borderRadius:'14px',padding:'1.25rem 1.4rem',marginBottom:'1rem',animation:`slideIn 0.4s ease ${i*0.08}s both`,transition:'border-color 0.2s'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'0.9rem'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'10px',background:'#212135',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',fontSize:'0.8rem',color:'#C9A84C',flexShrink:0,border:'1px solid #252538'}}>
                  {p.displayName?.text?.split(' ').map(w=>w[0]).slice(0,2).join('')}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:'700',fontSize:'0.95rem',color:'#F2EEE6',marginBottom:'2px'}}>{p.displayName?.text}</div>
                  <div style={{fontSize:'0.73rem',color:'#5A5248'}}>{p.formattedAddress}</div>
                </div>
                <div style={{background:'#C9A84C',color:'#08080E',fontSize:'0.62rem',fontWeight:'700',padding:'3px 8px',borderRadius:'6px'}}>#{i+1}</div>
              </div>
              {p.rating && (
                <div style={{display:'flex',alignItems:'center',gap:'5px',marginBottom:'0.75rem'}}>
                  <span style={{color:'#C9A84C',fontSize:'0.8rem'}}>{stars(p.rating)}</span>
                  <span style={{fontWeight:'700',fontSize:'0.83rem',color:'#F2EEE6'}}>{p.rating}</span>
                  <span style={{fontSize:'0.73rem',color:'#5A5248'}}>({p.userRatingCount} reviews)</span>
                </div>
              )}
              {p.editorialSummary && (
                <div style={{fontSize:'0.82rem',color:'#9A8870',lineHeight:'1.6',marginBottom:'0.85rem',paddingBottom:'0.85rem',borderBottom:'1px solid #252538'}}>{p.editorialSummary.text}</div>
              )}
              <div style={{display:'flex',flexWrap:'wrap',gap:'0.75rem',alignItems:'center'}}>
                {p.internationalPhoneNumber && (
                  <span style={{fontSize:'0.78rem',color:'#9A8870'}}>📞 <a href={`tel:${p.internationalPhoneNumber}`} style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>{p.internationalPhoneNumber}</a></span>
                )}
                {p.regularOpeningHours?.weekdayDescriptions?.[0] && (
                  <span style={{fontSize:'0.72rem',color:'#5A5248',marginLeft:'auto'}}>{p.regularOpeningHours.weekdayDescriptions[0]}</span>
                )}
              </div>
              <button onClick={()=>handlePin(p)} style={{marginTop:'10px',background:pinned?'#5A4820':'#181828',border:`1px solid ${pinned?'#5A4820':'#252538'}`,borderRadius:'8px',padding:'5px 12px',fontSize:'0.73rem',fontWeight:'600',color:pinned?'#F5DFA0':'#9A8870',cursor:'pointer',fontFamily:'DM Sans,sans-serif',transition:'all 0.2s'}}>
                {pinned ? '📌 Pinned' : '📌 Pin this pro'}
              </button>
            </div>
          )
        })}
      </div>

      <footer style={{background:'#0F0F1A',borderTop:'1px solid #252538',padding:'1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <p style={{fontSize:'0.7rem',color:'#5A5248',lineHeight:'1.8',maxWidth:'580px',margin:'0 auto'}}>
          TrustedPin aggregates publicly available business information for informational purposes only. We are not liable for contractor performance. Always verify before hiring. trustedpin@outlook.com
        </p>
      </footer>
    </div>
  )
}
