import { useState } from 'react'

const CATS = [
  {name:'Plumbing',icon:'🔧'},{name:'Electrical',icon:'⚡'},{name:'HVAC',icon:'❄️'},
  {name:'Roofing',icon:'🏠'},{name:'Landscaping',icon:'🌿'},{name:'Painting',icon:'🖌️'},
  {name:'Pest Control',icon:'🐛'},{name:'Moving',icon:'📦'},{name:'Cleaning',icon:'🧹'},
  {name:'Handyman',icon:'🛠️'},{name:'Interior Remodeling',icon:'🏗️'},{name:'Interior Design',icon:'🪑'},
]

export default function Home({ navigate }) {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')

  const search = () => {
    if (!service) return alert('Please select a service')
    if (!location.trim()) return alert('Please enter your city or ZIP code')
    navigate('results', { service, location: location.trim() })
  }

  return (
    <div style={{background:'#08080E',minHeight:'100vh'}}>

      <div style={{background:'#0F0F1A',padding:'3rem 1.25rem 2.5rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,#C9A84C,transparent)',opacity:0.4}}></div>

        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#181828',border:'1px solid #5A4820',color:'#F5DFA0',fontSize:'0.7rem',fontWeight:'600',padding:'0.3rem 0.85rem',borderRadius:'100px',marginBottom:'1.25rem',letterSpacing:'0.04em'}}>
          ★ Free for homeowners · No ads · No sign up required
        </div>

        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,7vw,3rem)',color:'#F2EEE6',fontWeight:'800',lineHeight:'1.2',marginBottom:'0.75rem'}}>
          Find Top-Rated Local<br/><span style={{color:'#C9A84C',fontStyle:'italic'}}>Contractors Near You</span>
        </h1>

        <p style={{color:'#C8C0B4',fontSize:'0.95rem',maxWidth:'480px',margin:'0 auto 2rem',lineHeight:'1.75'}}>
          We search Google so you don't have to. Enter your ZIP code, pick a service, and instantly see the best-reviewed local contractors — phone number, hours, and reviews all in one place.
        </p>

        <div style={{background:'#181828',border:'1px solid #252538',borderRadius:'16px',padding:'1.5rem',maxWidth:'520px',margin:'0 auto',boxShadow:'0 20px 50px rgba(0,0,0,0.4)'}}>
          <p style={{fontSize:'0.82rem',fontWeight:'600',color:'#F2EEE6',marginBottom:'1.1rem',textAlign:'left'}}>What do you need help with today?</p>

          <div style={{marginBottom:'12px'}}>
            <label style={{display:'block',fontSize:'0.65rem',fontWeight:'600',color:'#9A8870',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'5px'}}>Select a service</label>
            <select value={service} onChange={e=>setService(e.target.value)} style={{width:'100%',background:'#212135',border:'1px solid #252538',borderRadius:'9px',padding:'0.85rem 0.9rem',fontSize:'1rem',fontFamily:'DM Sans,sans-serif',color:service?'#F2EEE6':'#6A6258',outline:'none'}}>
              <option value=''>Choose a service...</option>
              {CATS.map(c=><option key={c.name} value={c.name}>{c.icon} {c.name}</option>)}
            </select>
          </div>

          <div style={{marginBottom:'12px'}}>
            <label style={{display:'block',fontSize:'0.65rem',fontWeight:'600',color:'#9A8870',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'5px'}}>Your city or ZIP code</label>
            <input value={location} onChange={e=>setLocation(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder='e.g. Detroit, MI or 48075' style={{width:'100%',background:'#212135',border:'1px solid #252538',borderRadius:'9px',padding:'0.85rem 0.9rem',fontSize:'1rem',fontFamily:'DM Sans,sans-serif',color:'#F2EEE6',outline:'none'}} />
          </div>

          <button onClick={search} style={{width:'100%',background:'#C9A84C',color:'#08080E',border:'none',borderRadius:'9px',padding:'0.9rem',fontSize:'1rem',fontWeight:'700',cursor:'pointer',fontFamily:'DM Sans,sans-serif',transition:'all 0.2s'}}>
            Find Pros Near Me →
          </button>

          <p style={{color:'#5A5248',fontSize:'0.67rem',marginTop:'1rem',textAlign:'center',lineHeight:'1.6'}}>Results are for informational purposes only. TrustedPin does not guarantee contractor quality. Always verify before hiring.</p>
        </div>
      </div>

      <div style={{background:'#181828',borderTop:'1px solid #252538',borderBottom:'1px solid #252538',padding:'0.85rem 1.25rem',display:'flex',justifyContent:'center',gap:'1.25rem',flexWrap:'wrap'}}>
        {['🔍 Live Google data','⭐ Real reviews','📌 Pin favorites','🛡️ Fraud guide','💛 Always free'].map(t=>(
          <span key={t} style={{fontSize:'0.75rem',color:'#9A8870'}}>{t}</span>
        ))}
      </div>

      <div style={{padding:'2.5rem 1.25rem',maxWidth:'760px',margin:'0 auto'}}>
        <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>Stay protected</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:'700',color:'#F2EEE6',marginBottom:'1.25rem'}}>How to properly vet a contractor</div>
        <div style={{background:'#0F0F1A',border:'1px solid #252538',borderLeft:'3px solid #C9A84C',borderRadius:'12px',padding:'1.5rem'}}>
          <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'#C9A84C',marginBottom:'1.1rem'}}>⚠️ Contractor fraud is rising. Protect yourself.</h3>
          {[
            ['Verify their license','Ask for their contractor license number and verify it with your state licensing board before any work begins.'],
            ['Demand proof of insurance','A legitimate contractor carries general liability and workers\' compensation. Ask for the certificate directly.'],
            ['Never pay the full amount upfront','A standard deposit is 10–30%. Full payment before work starts is a serious red flag.'],
            ['Get everything in writing','Contract must include scope of work, timeline, materials, and total cost.'],
            ['Cross-check reviews','Look them up on Google, BBB, and Yelp. Legitimate businesses are consistent across platforms.'],
            ['Never let a contractor pull permits in your name','Permits must be pulled by the licensed contractor or you assume full legal liability.'],
          ].map(([title,body],i)=>(
            <div key={i} style={{display:'flex',gap:'10px',marginBottom:'0.85rem',alignItems:'flex-start'}}>
              <div style={{width:'22px',height:'22px',borderRadius:'50%',background:'#5A4820',color:'#F5DFA0',fontSize:'0.65rem',fontWeight:'700',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'2px'}}>{i+1}</div>
              <div style={{fontSize:'0.83rem',color:'#A09880',lineHeight:'1.65'}}><strong style={{color:'#F2EEE6',fontWeight:'600'}}>{title}. </strong>{body}</div>
            </div>
          ))}
          <div style={{background:'#181828',border:'1px solid #5A5248',borderRadius:'9px',padding:'0.9rem',marginTop:'1rem',fontSize:'0.72rem',color:'#5A5248',lineHeight:'1.8'}}>
            TrustedPin aggregates publicly available information for informational purposes only. We do not verify, endorse, or background-check any contractor. Not liable for any outcomes from hiring any contractor found through this service.
          </div>
        </div>
      </div>

      <footer style={{background:'#0F0F1A',borderTop:'1px solid #252538',padding:'1.75rem 1.25rem',textAlign:'center',marginTop:'1rem'}}>
        <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'#C9A84C',display:'block',marginBottom:'0.6rem'}}>Trusted<span style={{color:'#F2EEE6'}}>Pin</span></span>
        <div style={{display:'flex',justifyContent:'center',gap:'1.25rem',flexWrap:'wrap',margin:'0.75rem 0'}}>
          {[['About','about'],['How it works','how'],['For contractors','pro'],['Privacy','privacy'],['Terms','terms']].map(([label,p])=>(
            <span key={label} onClick={()=>navigate(p)} style={{fontSize:'0.75rem',color:'#5A5248',cursor:'pointer'}}>{label}</span>
          ))}
        </div>
        <p style={{fontSize:'0.7rem',color:'#5A5248',lineHeight:'1.8',maxWidth:'560px',margin:'0 auto'}}>
          © 2026 TrustedPin. Free service for homeowners. Not affiliated with Google or any contractor listed. Contact: trustedpin@outlook.com
        </p>
      </footer>
    </div>
  )
}
