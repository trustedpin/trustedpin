import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const stars = (r) => '★'.repeat(Math.floor(r||0)) + '☆'.repeat(5-Math.floor(r||0))

export default function Results({ navigate, searchData, user }) {
  const { service, location } = searchData || {}
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPlaces()
  }, [])

  const fetchPlaces = async () => {
    try {
      const res = await fetch(`/api/places?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`)
      const data = await res.json()
      if (data.places) {
        setResults(data.places)
        if (user) {
          data.places.forEach(p => saveHistory(p))
        }
      } else {
        setError('No results found')
      }
    } catch (err) {
      setError('Failed to load results')
    }
    setLoading(false)
  }

  const saveHistory = async (p) => {
    await supabase.from('history').insert({
      user_id: user.id,
      service,
      contractor_name: p.displayName?.text,
      contractor_phone: p.internationalPhoneNumber || 'Not listed',
      contractor_email: 'Contact via phone',
      contractor_hours: p.regularOpeningHours?.weekdayDescriptions?.[0] || 'Hours not listed',
      contractor_desc: p.editorialSummary?.text || `${service} service in ${location}`,
      location,
      status: 'viewed'
    })
  }

  return (
    <div>
      <div style={{background:'#1E293B',padding:'0.55rem 1.5rem',textAlign:'center'}}>
        <p style={{color:'#475569',fontSize:'0.7rem'}}>Results are aggregated from public sources. TrustedPin makes no guarantees. Always verify before hiring.</p>
      </div>
      <div style={{maxWidth:'700px',margin:'0 auto',padding:'1.75rem 1.5rem'}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'1.5rem',gap:'1rem',flexWrap:'wrap'}}>
          <div>
            <div style={{fontFamily:'Sora,sans-serif',fontSize:'1.1rem',fontWeight:'700',color:'#0F172A'}}>Top {service} Pros in {location}</div>
            <div style={{fontSize:'0.8rem',color:'#64748B',marginTop:'3px'}}>Showing top results · Live data from Google</div>
          </div>
          <button onClick={()=>navigate('home')} style={{fontSize:'0.82rem',fontWeight:'600',color:'#64748B',cursor:'pointer',border:'none',background:'none',fontFamily:'Mulish,sans-serif'}}>← New search</button>
        </div>

        {loading && (
          <div style={{textAlign:'center',padding:'3rem',color:'#94A3B8'}}>
            <div style={{fontSize:'1.5rem',marginBottom:'1rem'}}>🔍</div>
            <p>Finding the best {service} pros near you...</p>
          </div>
        )}

        {error && (
          <div style={{textAlign:'center',padding:'3rem',color:'#94A3B8'}}>
            <p>{error}</p>
            <button onClick={()=>navigate('home')} style={{marginTop:'1rem',background:'#2563EB',color:'#fff',border:'none',borderRadius:'8px',padding:'0.6rem 1.2rem',cursor:'pointer',fontFamily:'Sora,sans-serif',fontWeight:'600'}}>Try again</button>
          </div>
        )}

        {!loading && !error && results.map((p,i)=>(
          <div key={i} style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:'14px',padding:'1.25rem 1.4rem',marginBottom:'1rem'}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'0.9rem'}}>
              <div style={{width:'46px',height:'46px',borderRadius:'10px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Sora,sans-serif',fontWeight:'700',fontSize:'0.85rem',color:'#2563EB',flexShrink:0}}>
                {p.displayName?.text?.split(' ').map(w=>w[0]).slice(0,2).join('')}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:'Sora,sans-serif',fontSize:'0.97rem',fontWeight:'700',color:'#0F172A',marginBottom:'2px'}}>{p.displayName?.text}</div>
                <div style={{fontSize:'0.77rem',color:'#64748B'}}>{p.formattedAddress}</div>
              </div>
              <div style={{background:i===0?'#D97706':'#0F172A',color:i===0?'#1c0a00':'#fff',fontSize:'0.68rem',fontWeight:'700',padding:'3px 8px',borderRadius:'6px',fontFamily:'Sora,sans-serif'}}>#{i+1}</div>
            </div>

            {p.rating && (
              <div style={{display:'flex',alignItems:'center',gap:'5px',marginBottom:'0.8rem'}}>
                <span style={{color:'#F59E0B',fontSize:'0.82rem'}}>{stars(p.rating)}</span>
                <span style={{fontWeight:'700',fontSize:'0.85rem',color:'#0F172A'}}>{p.rating}</span>
                <span style={{fontSize:'0.77rem',color:'#94A3B8'}}>({p.userRatingCount} reviews)</span>
              </div>
            )}

            {p.editorialSummary && (
              <div style={{fontSize:'0.84rem',color:'#475569',lineHeight:'1.6',marginBottom:'0.9rem',paddingBottom:'0.9rem',borderBottom:'1px solid #E2E8F0'}}>{p.editorialSummary.text}</div>
            )}

            <div style={{display:'flex',flexWrap:'wrap',gap:'0.75rem',alignItems:'center'}}>
              {p.internationalPhoneNumber && (
                <span style={{fontSize:'0.8rem',color:'#475569'}}>📞 <a href={`tel:${p.internationalPhoneNumber}`} style={{color:'#2563EB',textDecoration:'none',fontWeight:'600'}}>{p.internationalPhoneNumber}</a></span>
              )}
              {p.regularOpeningHours?.weekdayDescriptions?.[0] && (
                <span style={{fontSize:'0.75rem',color:'#94A3B8',marginLeft:'auto'}}>{p.regularOpeningHours.weekdayDescriptions[0]}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <footer style={{background:'#fff',borderTop:'1px solid #E2E8F0',padding:'1.5rem',textAlign:'center'}}>
        <p style={{fontSize:'0.72rem',color:'#94A3B8',lineHeight:'1.8',maxWidth:'600px',margin:'0 auto'}}>TrustedPin aggregates publicly available business information for informational purposes only. We are not liable for contractor performance. Always do your own due diligence before hiring.</p>
      </footer>
    </div>
  )
}
