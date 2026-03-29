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
    navigate('results', { service, location: location || 'your area' })
  }

  return (
    <div style={{background:'#0A0A0F',minHeight:'100vh'}}>
      <div style={{background:'#12121A',padding:'3.5rem 1.5rem 3rem',textAlign:'center',borderBottom:'1px solid #2A2A3A',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:'500px',height:'2px',background:'#C9A84C',opacity:0.35}}></div>
        <div style={{display:'inline-flex',alignItems:'center',gap:'5px',background:'#1C1C28',border:'1px solid #7A6030',color:'#F5DFA0',fontSize:'0.7rem',fontWeight:'600',padding:'0.3rem 0.9rem',borderRadius:'100px',marginBottom:'1.25rem',letterSpacing:'0.05em'}}>
          ★ Trusted by homeowners across America
        </div>
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.9rem,5vw,3rem)',color:'#F0EDE6',fontWeight:'800',lineHeight:'1.15',marginBottom:'0.65rem'}}>
          Find Your Next<br/><span style={{color:'#C9A84C'}}>Trusted</span> Pro
        </h1>
        <p style={{color:'#9A9080',fontSize:'0.9rem',maxWidth:'420px',margin:'0 auto 2rem',lineHeight:'1.7'}}>
          We surface the highest-rated local contractors so you spend less time searching and more time getting things done.
        </p>
        <div style={{display:'flex',justifyContent:'center',gap:'1.25rem',flexWrap:'wrap',marginBottom:'2rem'}}>
          {['Free for homeowners','No advertisements','Powered by Google data'].map(b=>(
            <div key={b} style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'0.75rem',color:'#9A9080'}}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#C9A84C',flexShrink:0}}></div>{b}
            </div>
          ))}
        </div>
        <div style={{background:'#1C1C28',border:'1px solid #2A2A3A',borderRadius:'14px',padding:'1.1rem',maxWidth:'560px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:'8px',alignItems:'end'}}>
          <div>
            <label style={{display:'block',fontSize:'0.65rem',fontWeight:'600',color:'#9A9080',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'5px'}}>Service needed</label>
            <select value={service} onChange={e=>setService(e.target.value)} style={{width:'100%',background:'#252535',border:'1px solid #2A2A3A',borderRadius:'8px',padding:'0.55rem 0.8rem',fontSize:'0.85rem',fontFamily:'DM Sans,sans-serif',color:'#F0EDE6',outline:'none'}}>
              <option value=''>Select a service...</option>
              {CATS.map(c=><option key={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{display:'block',fontSize:'0.65rem',fontWeight:'600',color:'#9A9080',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'5px'}}>Your location</label>
            <input value={location} onChange={e=>setLocation(e.target.value)} placeholder='City or ZIP code' style={{width:'100%',background:'#252535',border:'1px solid #2A2A3A',borderRadius:'8px',padding:'0.55rem 0.8rem',fontSize:'0.85rem',fontFamily:'DM Sans,sans-serif',color:'#F0EDE6',outline:'none'}} />
          </div>
          <button onClick={search} style={{background:'#C9A84C',color:'#0A0A0F',border:'none',borderRadius:'8px',padding:'0.6rem 1.3rem',fontSize:'0.88rem',fontWeight:'700',cursor:'pointer',fontFamily:'DM Sans,sans-serif',whiteSpace:'nowrap',height:'42px'}}>Find Pros →</button>
        </div>
        <p style={{color:'#5A5548',fontSize:'0.68rem',marginTop:'0.85rem'}}>Results are for informational purposes only. TrustedPin does not guarantee contractor quality or performance.</p>
      </div>

      <div style={{background:'#1C1C28',borderTop:'1px solid #2A2A3A',borderBottom:'1px solid #2A2A3A',padding:'0.85rem 1.5rem',display:'flex',justifyContent:'center',gap:'2rem',flexWrap:'wrap'}}>
        {['🔍 Live Google data','⭐ Real reviews only','📌 Pin your favorites','🛡️ Fraud awareness guide','💛 Always free'].map(t=>(
          <div key={t} style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'0.75rem',color:'#9A9080'}}>{t}</div>
        ))}
      </div>

      <div style={{padding:'2.25rem 1.5rem',maxWidth:'740px',margin:'0 auto'}}>
        <div style={{fontSize:'0.68rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.4rem'}}>Browse by category</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:'700',color:'#F0EDE6',marginBottom:'1.25rem'}}>What do you need help with?</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(105px,1fr))',gap:'7px'}}>
          {CATS.map(c=>(
            <div key={c.name} onClick={()=>navigate('results',{service:c.name,location:'your area'})} style={{background:'#12121A',border:'1px solid #2A2A3A',borderRadius:'12px',padding:'0.85rem 0.5rem',textAlign:'center',cursor:'pointer'}}>
              <div style={{fontSize:'1.2rem',marginBottom:'0.35rem'}}>{c.icon}</div>
              <div style={{fontSize:'0.72rem',fontWeight:'600',color:'#F0EDE6'}}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'2rem 1.5rem',maxWidth:'740px',margin:'0 auto'}}>
        <div style={{fontSize:'0.68rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.4rem'}}>Stay protected</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:'700',color:'#F0EDE6',marginBottom:'1.25rem'}}>How to properly vet a contractor</div>
        <div style={{background:'#12121A',border:'1px solid #2A2A3A',borderLeft:'3px solid #C9A84C',borderRadius:'12px',padding:'1.5rem'}}>
          <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.05rem',color:'#C9A84C',marginBottom:'1rem'}}>⚠️ Contractor fraud is rising. Here's how to protect yourself.</h3>
          {[
            ['Verify their license','Ask for their contractor license number and verify it with your state licensing board before any work begins.'],
            ['Demand proof of insurance','A legitimate contractor carries general liability insurance and workers\' compensation. Ask for the certificate directly.'],
            ['Never pay the full amount upfront','A standard deposit is 10–30%. Anyone demanding full payment before starting is a red flag.'],
            ['Get everything in writing','A detailed written contract should include scope of work, timeline, materials, and total cost.'],
            ['Cross-check reviews','Look them up on Google, BBB, and Yelp. A legitimate business has a consistent presence across platforms.'],
            ['Never let a contractor pull permits in your name','Permits should be pulled by the contractor under their license. If you pull the permit, you assume full liability.'],
          ].map(([title,body],i)=>(
            <div key={i} style={{display:'flex',gap:'9px',marginBottom:'0.8rem',alignItems:'flex-start'}}>
              <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#7A6030',color:'#F5DFA0',fontSize:'0.65rem',fontWeight:'700',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'2px'}}>{i+1}</div>
              <div style={{fontSize:'0.8rem',color:'#9A9080',lineHeight:'1.6'}}><strong style={{color:'#F0EDE6',fontWeight:'600'}}>{title}. </strong>{body}</div>
            </div>
          ))}
          <div style={{background:'#1C1C28',border:'1px solid #5A5548',borderRadius:'8px',padding:'0.9rem',marginTop:'1rem',fontSize:'0.72rem',color:'#5A5548',lineHeight:'1.7'}}>
            TrustedPin aggregates publicly available information from Google and other sources for informational purposes only. We do not vet, verify, license-check, or endorse any contractor. TrustedPin is not liable for any outcomes resulting from hiring any contractor found through this service.
          </div>
        </div>
      </div>

      <footer style={{background:'#12121A',borderTop:'1px solid #2A2A3A',padding:'1.75rem 1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'#C9A84C',display:'block',marginBottom:'0.6rem'}}>Trusted<span style={{color:'#F0EDE6'}}>Pin</span></span>
        <div style={{display:'flex',justifyContent:'center',gap:'1.25rem',flexWrap:'wrap',margin:'0.75rem 0'}}>
          {[['About','home'],['How it works','home'],['For contractors','pro'],['Privacy','privacy'],['Terms','terms']].map(([label,page])=>(
            <span key={label} onClick={()=>navigate(page)} style={{fontSize:'0.72rem',color:'#5A5548',cursor:'pointer',textDecoration:'none'}}>{label}</span>
          ))}
        </div>
        <p style={{fontSize:'0.68rem',color:'#5A5548',lineHeight:'1.8',maxWidth:'580px',margin:'0 auto'}}>
          TrustedPin is a free service for homeowners aggregating publicly available contractor information. We are not affiliated with Google or any contractor listed. Results are informational only. TrustedPin does not verify licenses, insurance, or contractor claims.
        </p>
      </footer>
    </div>
  )
}