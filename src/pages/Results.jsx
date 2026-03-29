import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const stars = (r) => '★'.repeat(Math.floor(r||0)) + '☆'.repeat(5-Math.floor(r||0))

export default function Results({ navigate, searchData, user, onPin, pins }) {
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
      service, date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
      name: p.displayName?.text, loc: location,
      phone: p.internationalPhoneNumber || 'Not listed',
      email: 'Contact via phone',
      hours: p.regularOpeningHours?.weekdayDescriptions?.[0] || 'Hours not listed',
      desc: p.editorialSummary?.text || `${service} service in ${location}`
    })
  }

  const s = {
    page: {background:'#0A0A0F',minHeight:'100vh'},
    disc: {background:'#1C1C28',padding:'0.45rem 1.5rem',textAlign:'center',borderBottom:'1px solid #2A2A3A'},
    discTxt: {fontSize:'0.66rem',color:'#5A5548'},
    wrap: {maxWidth:'680px',margin:'0 auto',padding:'1.5rem'},
    hd: {display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.25rem',flexWrap:'wrap',gap:'0.75rem'},
    title: {fontFamily:'Playfair Display,serif',fontSize:'1.05rem',color:'#F0EDE6'},
    sub: {fontSize:'0.72rem',color:'#5A5548',marginTop:'2px'},
    back: {fontSize:'0.78rem',color:'#9A9080',background:'none',border:'none',cursor:'pointer',fontFamily:'DM Sans,sans-serif'},
    proCard: {background:'#12121A',border:'1px solid #7A6030',borderRadius:'13px',padding:'1.15rem 1.3rem',marginBottom:'0.9rem'},
    regCard: {background:'#12121A',border:'1px solid #2A2A3A',borderRadius:'13px',padding:'1.15rem 1.3rem',marginBottom:'0.9rem'},
    proTag: {display:'inline-flex',alignItems:'center',gap:'3px',background:'#7A6030',color:'#F5DFA0',fontSize:'0.62rem',fontWeight:'700',padding:'2px 7px',borderRadius:'100px',marginBottom:'7px'},
    ct: {display:'flex',alignItems:'flex-start',gap:'11px',marginBottom:'0.8rem'},
    av: {width:'42px',height:'42px',borderRadius:'9px',background:'#252535',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',fontSize:'0.78rem',color:'#C9A84C',flexShrink:0,border:'1px solid #2A2A3A'},
    name: {fontWeight:'700',fontSize:'0.92rem',color:'#F0EDE6',marginBottom:'2px'},
    loc: {fontSize:'0.72rem',color:'#5A5548'},
    rb: {background:'#C9A84C',color:'#0A0A0F',fontSize:'0.62rem',fontWeight:'700',padding:'3px 7px',borderRadius:'5px'},
    sr: {display:'flex',alignItems:'center',gap:'4px',marginBottom:'0.7rem'},
    desc: {fontSize:'0.8rem',color:'#9A9080',lineHeight:'1.55',marginBottom:'0.8rem',paddingBottom:'0.8rem',borderBottom:'1px solid #2A2A3A'},
    cf: {display:'flex',flexWrap:'wrap',gap:'0.65rem',alignItems:'center'},
    loading: {textAlign:'center',padding:'2.5rem',color:'#5A5548'},
  }

  return (
    <div style={s.page}>
      <div style={s.disc}><p style={s.discTxt}>Results from public data. TrustedPin makes no guarantees. Promoted listings are paid placements.</p></div>
      <div style={s.wrap}>
        <div style={s.hd}>
          <div>
            <div style={s.title}>Top {service} Pros in {location}</div>
            <div style={s.sub}>Live data from Google · {results.length || '—'} results</div>
          </div>
          <button style={s.back} onClick={()=>navigate('home')}>← New search</button>
        </div>

        <div style={s.proCard}>
          <div style={s.proTag}>★ Promoted · Paid placement</div>
          <div style={s.ct}>
            <div style={s.av}>EP</div>
            <div style={{flex:1}}><div style={s.name}>Elite Pros · {location}</div><div style={s.loc}>TrustedPin Pro Member</div></div>
            <div style={s.rb}>PRO</div>
          </div>
          <div style={s.desc}>Premium featured contractor. Contact for a free estimate on your {service?.toLowerCase()} needs.</div>
          <div style={s.cf}>
            <span style={{fontSize:'0.76rem',color:'#9A9080'}}>📞 <a href="tel:+13135550001" style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>(313) 555-0001</a></span>
            <span style={{fontSize:'0.76rem',color:'#9A9080'}}>✉️ <a href="mailto:info@elitepros.com" style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>info@elitepros.com</a></span>
          </div>
          <p style={{fontSize:'0.65rem',color:'#5A5548',marginTop:'6px',fontStyle:'italic'}}>Paid listing. TrustedPin does not guarantee quality. Always verify independently.</p>
        </div>

        {loading && <div style={s.loading}>Finding top {service?.toLowerCase()} pros near you...</div>}
        {error && <div style={{...s.loading,color:'#9A9080'}}><p>{error}</p><button onClick={()=>navigate('home')} style={{marginTop:'1rem',background:'#C9A84C',color:'#0A0A0F',border:'none',borderRadius:'8px',padding:'0.55rem 1.2rem',cursor:'pointer',fontFamily:'DM Sans,sans-serif',fontWeight:'700'}}>Try again</button></div>}

        {!loading && !error && results.map((p,i)=>{
          const pinned = isPinned(p.displayName?.text)
          return (
            <div key={i} style={s.regCard}>
              <div style={s.ct}>
                <div style={s.av}>{p.displayName?.text?.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
                <div style={{flex:1}}>
                  <div style={s.name}>{p.displayName?.text}</div>
                  <div style={s.loc}>{p.formattedAddress}</div>
                </div>
                <div style={s.rb}>#{i+1}</div>
              </div>
              {p.rating && (
                <div style={s.sr}>
                  <span style={{color:'#C9A84C',fontSize:'0.78rem'}}>{stars(p.rating)}</span>
                  <span style={{fontWeight:'700',fontSize:'0.82rem',color:'#F0EDE6'}}>{p.rating}</span>
                  <span style={{fontSize:'0.72rem',color:'#5A5548'}}>({p.userRatingCount} reviews)</span>
                </div>
              )}
              {p.editorialSummary && <div style={s.desc}>{p.editorialSummary.text}</div>}
              <div style={s.cf}>
                {p.internationalPhoneNumber && <span style={{fontSize:'0.76rem',color:'#9A9080'}}>📞 <a href={`tel:${p.internationalPhoneNumber}`} style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>{p.internationalPhoneNumber}</a></span>}
                {p.regularOpeningHours?.weekdayDescriptions?.[0] && <span style={{fontSize:'0.7rem',color:'#5A5548',marginLeft:'auto'}}>{p.regularOpeningHours.weekdayDescriptions[0]}</span>}
              </div>
              <button onClick={()=>handlePin(p)} style={{marginTop:'8px',background:pinned?'#7A6030':'#1C1C28',border:`1px solid ${pinned?'#7A6030':'#2A2A3A'}`,borderRadius:'8px',padding:'4px 10px',fontSize:'0.72rem',fontWeight:'600',color:pinned?'#F5DFA0':'#9A9080',cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>
                {pinned ? '📌 Pinned' : '📌 Pin this pro'}
              </button>
            </div>
          )
        })}
      </div>
      <footer style={{background:'#12121A',borderTop:'1px solid #2A2A3A',padding:'1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <p style={{fontSize:'0.68rem',color:'#5A5548',lineHeight:'1.8',maxWidth:'580px',margin:'0 auto'}}>TrustedPin aggregates publicly available business information for informational purposes only. We are not liable for contractor performance. Always verify before hiring.</p>
      </footer>
    </div>
  )
}
