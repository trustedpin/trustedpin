import { useState } from 'react'

const CATS = [
  {name:'Plumbing',icon:'🔧'},{name:'Electrical',icon:'⚡'},{name:'HVAC',icon:'❄️'},
  {name:'Roofing',icon:'🏠'},{name:'Landscaping',icon:'🌿'},{name:'Painting',icon:'🖌️'},
  {name:'Pest Control',icon:'🐛'},{name:'Moving',icon:'📦'},{name:'Cleaning',icon:'🧹'},
  {name:'Handyman',icon:'🛠️'},{name:'Interior Remodeling',icon:'🏗️'},{name:'Interior Design',icon:'🪑'},
]

const QUICK = [
  {name:'Plumbing',icon:'🔧'},{name:'Electrical',icon:'⚡'},{name:'HVAC',icon:'❄️'},
  {name:'Roofing',icon:'🏠'},{name:'Cleaning',icon:'🧹'},{name:'Handyman',icon:'🛠️'},
]

export default function Home({ navigate }) {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')

  const search = (svc, loc) => {
    const s = svc || service
    const l = loc || location.trim()
    if (!s) return alert('Please select a service')
    if (!l) return alert('Please enter your city or ZIP code')
    navigate('results', { service: s, location: l })
  }

  return (
    <div style={{background:'#08080E',minHeight:'100vh'}}>

      <div style={{background:'#0F0F1A',minHeight:'90vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'3rem 1.5rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:'600px',height:'1px',background:'linear-gradient(90deg,transparent,#C9A84C,transparent)',opacity:0.4}}></div>
        <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'rgba(201,168,76,0.04)',top:'-150px',left:'50%',transform:'translateX(-50%)',filter:'blur(60px)',animation:'glow 4s ease-in-out infinite'}}></div>

        <div className="animate-up d1" style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#181828',border:'1px solid #5A4820',color:'#F5DFA0',fontSize:'0.72rem',fontWeight:'600',padding:'0.32rem 0.9rem',borderRadius:'100px',marginBottom:'1.5rem',letterSpacing:'0.05em'}}>
          ★ The smarter way to find home service pros
        </div>

        <h1 className="animate-up d2" style={{fontSize:'clamp(1.8rem,5vw,3.2rem)',color:'#F2EEE6',fontWeight:'800',lineHeight:'1.15',marginBottom:'0.75rem',letterSpacing:'-0.02em'}}>
          Find Top-Rated Local Contractors<br/><em style={{color:'#C9A84C',fontStyle:'italic'}}>Near You — Instantly</em>
        </h1>

        <p className="animate-up d3" style={{color:'#C8C0B4',fontSize:'1rem',maxWidth:'520px',margin:'0 auto 2.5rem',lineHeight:'1.75'}}>
          We search Google so you don't have to. Pick a service, enter your ZIP code, and instantly see the best-reviewed local contractors in your area — with their phone number, hours, and reviews all in one place. <strong style={{color:'#F2EEE6'}}>Free for homeowners. Always.</strong>
        </p>

        <div className="animate-up d4" style={{background:'#181828',border:'1px solid #252538',borderRadius:'18px',padding:'1.5rem',maxWidth:'620px',width:'100%',boxShadow:'0 24px 60px rgba(0,0,0,0.4)'}}>
          <div style={{fontSize:'0.88rem',fontWeight:'600',color:'#F2EEE6',marginBottom:'1rem',textAlign:'left'}}>🔍 What service do you need help with?</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:'10px',alignItems:'end'}}>
            <div>
              <label style={{display:'block',fontSize:'0.65rem',fontWeight:'600',color:'#9A8870',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'5px'}}>Service needed</label>
              <select value={service} onChange={e=>setService(e.target.value)} style={{width:'100%',background:'#212135',border:'1px solid #252538',borderRadius:'9px',padding:'0.72rem 0.9rem',fontSize:'0.92rem',fontFamily:'DM Sans,sans-serif',color:'#F2EEE6',outline:'none'}}>
                <option value=''>Select a service...</option>
                {CATS.map(c=><option key={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'0.65rem',fontWeight:'600',color:'#9A8870',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'5px'}}>Your location</label>
              <input value={location} onChange={e=>setLocation(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder='City or ZIP code' style={{width:'100%',background:'#212135',border:'1px solid #252538',borderRadius:'9px',padding:'0.72rem 0.9rem',fontSize:'0.92rem',fontFamily:'DM Sans,sans-serif',color:'#F2EEE6',outline:'none'}} />
            </div>
            <button onClick={()=>search()} style={{background:'#C9A84C',color:'#08080E',border:'none',borderRadius:'9px',padding:'0.72rem 1.5rem',fontSize:'0.92rem',fontWeight:'700',cursor:'pointer',fontFamily:'DM Sans,sans-serif',whiteSpace:'nowrap',height:'46px',transition:'all 0.2s'}}>Find Pros →</button>
          </div>

          <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginTop:'1rem',justifyContent:'center'}}>
            {QUICK.map(c=>(
              <button key={c.name} onClick={()=>{setService(c.name);if(location.trim()){search(c.name,location.trim())}else{setService(c.name)}}} style={{background:'#212135',border:'1px solid #252538',borderRadius:'100px',padding:'0.35rem 0.85rem',fontSize:'0.78rem',color:'#C8C0B4',cursor:'pointer',fontFamily:'DM Sans,sans-serif',display:'flex',alignItems:'center',gap:'5px',transition:'all 0.2s'}}>
                {c.icon} {c.name}
              </button>
            ))}
          </div>

          <p style={{color:'#5A5248',fontSize:'0.68rem',marginTop:'1rem',textAlign:'center'}}>Results are for informational purposes only. TrustedPin does not guarantee contractor quality or performance. Always verify independently before hiring.</p>
        </div>

        <div className="animate-up d4" style={{display:'flex',justifyContent:'center',gap:'1.5rem',flexWrap:'wrap',marginTop:'1.75rem'}}>
          {['Free for homeowners','No advertisements','Live Google data','Pin your favorites'].map(b=>(
            <div key={b} style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'0.78rem',color:'#9A8870'}}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#C9A84C'}}></div>{b}
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'#181828',borderTop:'1px solid #252538',borderBottom:'1px solid #252538',padding:'0.9rem 1.5rem',display:'flex',justifyContent:'center',gap:'2.5rem',flexWrap:'wrap'}}>
        {['🔍 Live Google data','⭐ Real reviews','📌 Pin your favorites','🛡️ Fraud guide','💛 Always free'].map(t=>(
          <span key={t} style={{fontSize:'0.78rem',color:'#9A8870'}}>{t}</span>
        ))}
      </div>

      <div style={{padding:'3rem 1.5rem',maxWidth:'760px',margin:'0 auto'}}>
        <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>Stay protected</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.4rem',fontWeight:'700',color:'#F2EEE6',marginBottom:'1.5rem'}}>How to properly vet a contractor</div>
        <div style={{background:'#0F0F1A',border:'1px solid #252538',borderLeft:'3px solid #C9A84C',borderRadius:'12px',padding:'1.75rem'}}>
          <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.05rem',color:'#C9A84C',marginBottom:'1.25rem'}}>⚠️ Contractor fraud is on the rise. Here's how to protect yourself.</h3>
          {[
            ['Verify their license','Ask for their contractor license number and verify it with your state licensing board before any work begins.'],
            ['Demand proof of insurance','A legitimate contractor carries general liability and workers\' compensation insurance. Ask for the certificate directly.'],
            ['Never pay the full amount upfront','A standard deposit is 10–30%. Anyone demanding full payment before starting is a serious red flag.'],
            ['Get everything in writing','A detailed written contract must include scope of work, timeline, materials, and total cost.'],
            ['Cross-check reviews across platforms','Look them up on Google, BBB, and Yelp. Legitimate businesses maintain a consistent presence across platforms.'],
            ['Never let a contractor pull permits in your name','Permits must be pulled by the licensed contractor. If you pull the permit, you assume full legal liability.'],
          ].map(([title,body],i)=>(
            <div key={i} style={{display:'flex',gap:'10px',marginBottom:'0.9rem',alignItems:'flex-start',animation:`slideIn 0.4s ease ${i*0.1}s both`}}>
              <div style={{width:'22px',height:'22px',borderRadius:'50%',background:'#5A4820',color:'#F5DFA0',fontSize:'0.65rem',fontWeight:'700',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'2px'}}>{i+1}</div>
              <div style={{fontSize:'0.85rem',color:'#A09880',lineHeight:'1.65'}}><strong style={{color:'#F2EEE6',fontWeight:'600'}}>{title}. </strong>{body}</div>
            </div>
          ))}
          <div style={{background:'#181828',border:'1px solid #5A5248',borderRadius:'9px',padding:'1rem',marginTop:'1.25rem',fontSize:'0.73rem',color:'#5A5248',lineHeight:'1.8'}}>
            <strong style={{color:'#7A7268'}}>Important disclaimer: </strong>
            TrustedPin aggregates publicly available information from Google and other third-party sources strictly for informational purposes. TrustedPin does not vet, background-check, verify licenses, verify insurance, or endorse any contractor listed on this platform. TrustedPin and its affiliates are not liable for any damages, losses, or outcomes resulting from contacting or hiring any contractor found through this service.
          </div>
        </div>
      </div>

      <footer style={{background:'#0F0F1A',borderTop:'1px solid #252538',padding:'2rem 1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'#C9A84C',display:'block',marginBottom:'0.6rem'}}>Trusted<span style={{color:'#F2EEE6'}}>Pin</span></span>
        <div style={{display:'flex',justifyContent:'center',gap:'1.5rem',flexWrap:'wrap',margin:'0.75rem 0'}}>
          {[['About','about'],['How it works','how'],['For contractors','pro'],['Privacy','privacy'],['Terms','terms']].map(([label,p])=>(
            <span key={label} onClick={()=>navigate(p)} style={{fontSize:'0.75rem',color:'#5A5248',cursor:'pointer',transition:'color 0.2s'}}>{label}</span>
          ))}
        </div>
        <p style={{fontSize:'0.7rem',color:'#5A5248',lineHeight:'1.8',maxWidth:'580px',margin:'0 auto'}}>
          © 2026 TrustedPin. Free service for homeowners aggregating publicly available contractor data. Not affiliated with Google or any contractor listed. TrustedPin does not verify any contractor information. Contact: trustedpin@outlook.com
        </p>
      </footer>
    </div>
  )
}