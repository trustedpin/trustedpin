export default function HowItWorks({ navigate }) {
  const steps = [
    {
      num:'1',
      title:'Tell us what you need',
      body:'Select your service type — plumbing, electrical, HVAC, roofing, and more — and enter your city or ZIP code. That\'s it. No account required, no forms to fill out. Just two fields and you\'re searching.'
    },
    {
      num:'2',
      title:'We query Google\'s live data',
      body:'TrustedPin connects to Google Places API in real time to pull the most relevant, highest-rated contractors in your exact area. We\'re reading the same data Google has — just presenting it in a cleaner, faster, easier-to-read format.'
    },
    {
      num:'3',
      title:'We surface the top results',
      body:'Results are ranked by Google\'s rating and review data. You see each contractor\'s name, star rating, number of reviews, business description, phone number, email, and hours of operation — everything you need to make a quick decision in one place.'
    },
    {
      num:'4',
      title:'Pin the ones you like',
      body:'See a contractor you want to remember? Hit "Pin this pro" to save them to your My Pins list. Your pinned contractors are organized by service type so you can find them instantly — whether it\'s tomorrow or six months from now.'
    },
    {
      num:'5',
      title:'You reach out directly',
      body:'TrustedPin never sits between you and the contractor. No lead forms, no middlemen, no referral fees charged to you or the contractor. You call or email them directly. We just made it faster and easier to find them.'
    },
    {
      num:'6',
      title:'Always do your own due diligence',
      body:'TrustedPin is a starting point, not a guarantee. Before hiring anyone, verify their license with your state licensing board, ask for proof of insurance, get a written contract, and never pay the full amount upfront. Our fraud guide on the home page walks you through every step.'
    },
  ]

  return (
    <div style={{background:'#08080E',minHeight:'100vh'}}>
      <div style={{maxWidth:'720px',margin:'0 auto',padding:'3rem 1.5rem'}}>

        <div style={{textAlign:'center',marginBottom:'3rem',animation:'fadeUp 0.5s ease'}}>
          <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem'}}>The process</div>
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',color:'#F2EEE6',marginBottom:'1rem'}}>How TrustedPin Works</h1>
          <p style={{fontSize:'0.92rem',color:'#9A8870',maxWidth:'480px',margin:'0 auto',lineHeight:'1.7'}}>From search to contact in under 60 seconds. Here's exactly what happens when you use TrustedPin.</p>
        </div>

        <div style={{position:'relative'}}>
          {steps.map((step,i)=>(
            <div key={i}>
              <div style={{display:'flex',gap:'1.25rem',marginBottom:'0.5rem',alignItems:'flex-start',animation:`fadeUp 0.5s ease ${i*0.1}s both`}}>
                <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'#5A4820',border:'2px solid #C9A84C',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Playfair Display,serif',fontSize:'1.15rem',fontWeight:'700',color:'#C9A84C',flexShrink:0}}>
                  {step.num}
                </div>
                <div style={{flex:1,paddingTop:'6px'}}>
                  <div style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'#F2EEE6',fontWeight:'700',marginBottom:'0.4rem'}}>{step.title}</div>
                  <div style={{fontSize:'0.85rem',color:'#9A8870',lineHeight:'1.75'}}>{step.body}</div>
                </div>
              </div>
              {i < steps.length-1 && (
                <div style={{width:'2px',height:'28px',background:'#252538',margin:'0 0 0.5rem 23px'}}></div>
              )}
            </div>
          ))}
        </div>

        <div style={{background:'#0F0F1A',border:'1px solid #5A4820',borderRadius:'12px',padding:'1.5rem',marginTop:'2.5rem',animation:'fadeUp 0.5s ease 0.6s both'}}>
          <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem'}}>Important</div>
          <p style={{fontSize:'0.82rem',color:'#9A8870',lineHeight:'1.75'}}>
            TrustedPin displays publicly available information sourced from Google Places API. We do not verify, license-check, background-check, or endorse any contractor. Results are for informational purposes only. TrustedPin is not liable for any outcomes from contacting or hiring any contractor found through this service. Always perform thorough independent due diligence before hiring. Contact: <a href="mailto:trustedpin@outlook.com" style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>trustedpin@outlook.com</a>
          </p>
        </div>

        <div style={{textAlign:'center',marginTop:'2.5rem',animation:'fadeUp 0.5s ease 0.7s both'}}>
          <button onClick={()=>navigate('home')} style={{background:'#C9A84C',color:'#08080E',border:'none',borderRadius:'9px',padding:'0.8rem 2rem',fontSize:'0.92rem',fontWeight:'700',cursor:'pointer',fontFamily:'DM Sans,sans-serif',transition:'all 0.2s'}}>
            Start searching now →
          </button>
        </div>

      </div>
      <footer style={{background:'#0F0F1A',borderTop:'1px solid #252538',padding:'1.75rem 1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <p style={{fontSize:'0.7rem',color:'#5A5248',lineHeight:'1.8'}}>© 2026 TrustedPin · trustedpin@outlook.com</p>
      </footer>
    </div>
  )
}
