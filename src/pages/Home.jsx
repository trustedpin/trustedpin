import { useState } from 'react'

const CATEGORIES = [
  {name:'Plumbing',icon:'🔧'},
  {name:'Electrical',icon:'⚡'},
  {name:'HVAC',icon:'❄️'},
  {name:'Roofing',icon:'🏠'},
  {name:'Landscaping',icon:'🌿'},
  {name:'Painting',icon:'🖌️'},
  {name:'Pest Control',icon:'🐛'},
  {name:'Moving',icon:'📦'},
  {name:'Cleaning',icon:'🧹'},
  {name:'Handyman',icon:'🛠️'},
  {name:'Something Else',icon:'💬'},
]

export default function Home({ navigate }) {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')

  const search = () => {
    if (!service) return alert('Please select a service')
    navigate('results', { service, location: location || 'Detroit, MI' })
  }

  return (
    <div>
      <div style={{background:'#0F172A',padding:'3.5rem 1.5rem 3rem',textAlign:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',color:'#93C5FD',fontSize:'0.75rem',fontWeight:'600',padding:'0.35rem 0.9rem',borderRadius:'100px',marginBottom:'1.25rem'}}>
          Free for homeowners · No ads · No pay-to-play
        </div>
        <h1 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(1.75rem,5vw,2.6rem)',color:'#fff',fontWeight:'700',lineHeight:'1.2',marginBottom:'0.75rem'}}>Find the Top Rated Home<br/>Service Pros Near You</h1>
        <p style={{color:'#94A3B8',fontSize:'0.95rem',maxWidth:'460px',margin:'0 auto 2.25rem',lineHeight:'1.7'}}>We pull the best-reviewed local contractors so you don't have to dig through Google.</p>
        <div style={{background:'#fff',borderRadius:'14px',padding:'1.1rem',maxWidth:'580px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:'10px',alignItems:'end',boxShadow:'0 24px 48px rgba(0,0,0,0.25)'}}>
          <div>
            <label style={{display:'block',fontSize:'0.68rem',fontWeight:'700',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'5px'}}>Service needed</label>
            <select value={service} onChange={e=>setService(e.target.value)} style={{width:'100%',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0.55rem 0.75rem',fontSize:'0.9rem',fontFamily:'Mulish,sans-serif',color:'#0F172A',outline:'none',background:'#F8FAFC'}}>
              <option value=''>Select a service...</option>
              {CATEGORIES.map(c=><option key={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{display:'block',fontSize:'0.68rem',fontWeight:'700',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'5px'}}>Your location</label>
            <input value={location} onChange={e=>setLocation(e.target.value)} placeholder='City or ZIP code' style={{width:'100%',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0.55rem 0.75rem',fontSize:'0.9rem',fontFamily:'Mulish,sans-serif',color:'#0F172A',outline:'none',background:'#F8FAFC'}} />
          </div>
          <button onClick={search} style={{background:'#2563EB',color:'#fff',border:'none',borderRadius:'8px',padding:'0.62rem 1.4rem',fontSize:'0.9rem',fontWeight:'700',cursor:'pointer',fontFamily:'Sora,sans-serif',whiteSpace:'nowrap',height:'42px'}}>Find Pros →</button>
        </div>
        <p style={{color:'#475569',fontSize:'0.75rem',marginTop:'1.1rem'}}>Results are for informational purposes only. TrustedPin is not liable for contractor performance.</p>
      </div>

      <div style={{padding:'2.5rem 1.5rem',maxWidth:'720px',margin:'0 auto'}}>
        <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#2563EB',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>Browse by category</div>
        <div style={{fontFamily:'Sora,sans-serif',fontSize:'1.2rem',fontWeight:'700',color:'#0F172A',marginBottom:'1.5rem'}}>What do you need help with?</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:'10px'}}>
          {CATEGORIES.map(c=>(
            <div key={c.name} onClick={()=>navigate('results',{service:c.name,location:'Detroit, MI'})} style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'1rem 0.75rem',textAlign:'center',cursor:'pointer'}}>
              <div style={{fontSize:'1.4rem',marginBottom:'0.5rem'}}>{c.icon}</div>
              <div style={{fontFamily:'Sora,sans-serif',fontSize:'0.8rem',fontWeight:'600',color:'#0F172A'}}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{background:'#fff',borderTop:'1px solid #E2E8F0',padding:'1.5rem',textAlign:'center'}}>
        <p style={{fontSize:'0.72rem',color:'#94A3B8',lineHeight:'1.8',maxWidth:'600px',margin:'0 auto'}}>
          TrustedPin aggregates publicly available business information for informational purposes only. We do not endorse or guarantee any contractor listed. TrustedPin is not liable for any outcomes from contacting or hiring any contractor shown on this site.
        </p>
      </footer>
    </div>
  )
}