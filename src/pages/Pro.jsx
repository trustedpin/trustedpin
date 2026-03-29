import { useState } from 'react'

export default function Pro({ navigate }) {
  const [plan, setPlan] = useState(25)

  const s = {
    page: {background:'#0A0A0F',minHeight:'100vh'},
    wrap: {maxWidth:'680px',margin:'0 auto',padding:'2rem 1.5rem'},
    hero: {background:'#12121A',border:'1px solid #7A6030',borderRadius:'16px',padding:'2rem',marginBottom:'1.75rem',textAlign:'center'},
    heroTitle: {fontFamily:'Playfair Display,serif',fontSize:'1.5rem',color:'#C9A84C',marginBottom:'0.5rem'},
    heroSub: {color:'#9A9080',fontSize:'0.85rem',lineHeight:'1.7',maxWidth:'460px',margin:'0 auto 1.5rem'},
    eyebrow: {fontSize:'0.68rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.4rem'},
    secTitle: {fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:'700',color:'#F0EDE6',marginBottom:'1.1rem'},
    pricingGrid: {display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'1.75rem'},
    planCard: (selected) => ({background:selected?'#1C1C28':'#12121A',border:`${selected?'2px':'1px'} solid ${selected?'#C9A84C':'#2A2A3A'}`,borderRadius:'12px',padding:'1.25rem',textAlign:'center',cursor:'pointer',transition:'all 0.15s'}),
    planTier: {fontSize:'0.7rem',fontWeight:'700',color:'#9A9080',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.4rem'},
    planAmt: {fontFamily:'Playfair Display,serif',fontSize:'1.8rem',color:'#C9A84C',fontWeight:'700'},
    planPeriod: {fontSize:'0.7rem',color:'#9A9080'},
    planRadius: {fontSize:'0.78rem',color:'#F0EDE6',fontWeight:'600',marginTop:'0.4rem'},
    planDesc: {fontSize:'0.72rem',color:'#5A5548',marginTop:'0.3rem'},
    form: {background:'#1C1C28',border:'1px solid #2A2A3A',borderRadius:'12px',padding:'1.5rem',marginBottom:'1.25rem'},
    formTitle: {fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'#F0EDE6',marginBottom:'1.1rem'},
    row: {display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'10px'},
    field: {display:'flex',flexDirection:'column',gap:'4px',marginBottom:'10px'},
    label: {fontSize:'0.65rem',fontWeight:'600',color:'#9A9080',textTransform:'uppercase',letterSpacing:'0.07em'},
    input: {background:'#252535',border:'1px solid #2A2A3A',borderRadius:'8px',padding:'0.55rem 0.8rem',fontSize:'0.82rem',fontFamily:'DM Sans,sans-serif',color:'#F0EDE6',outline:'none',width:'100%'},
    payBox: {background:'#12121A',border:'1px solid #7A6030',borderRadius:'12px',padding:'1.5rem',marginBottom:'1.25rem'},
    payTitle: {fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'#C9A84C',marginBottom:'1rem'},
    payTotal: {display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'0.75rem',borderTop:'1px solid #2A2A3A',marginTop:'0.75rem'},
    payLabel: {fontSize:'0.85rem',color:'#F0EDE6',fontWeight:'600'},
    payAmt: {fontFamily:'Playfair Display,serif',fontSize:'1.3rem',color:'#C9A84C',fontWeight:'700'},
    disc: {background:'#1C1C28',border:'1px solid #2A2A3A',borderRadius:'8px',padding:'0.9rem',marginBottom:'1.25rem',fontSize:'0.7rem',color:'#5A5548',lineHeight:'1.7'},
    submit: {width:'100%',background:'#C9A84C',color:'#0A0A0F',border:'none',borderRadius:'8px',padding:'0.82rem',fontSize:'0.92rem',fontWeight:'700',cursor:'pointer',fontFamily:'DM Sans,sans-serif'},
  }

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.hero}>
          <h2 style={s.heroTitle}>Grow Your Business with TrustedPin</h2>
          <p style={s.heroSub}>Get your company in front of thousands of homeowners actively searching for services in your area. Appear at the top of every relevant search result in your coverage zone.</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',maxWidth:'400px',margin:'0 auto'}}>
            {[['⭐','Top placement','Above all organic results'],['🏷️','Pro badge','Stand out instantly'],['📍','ZIP targeting','Cover your service area'],['📊','Monthly report','Track your visibility']].map(([icon,title,desc])=>(
              <div key={title} style={{background:'#1C1C28',border:'1px solid #2A2A3A',borderRadius:'8px',padding:'0.85rem',textAlign:'left',display:'flex',gap:'8px'}}>
                <span style={{fontSize:'0.9rem'}}>{icon}</span>
                <div><div style={{fontSize:'0.78rem',fontWeight:'600',color:'#F0EDE6'}}>{title}</div><div style={{fontSize:'0.7rem',color:'#5A5548',marginTop:'2px'}}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.eyebrow}>Choose your plan</div>
        <div style={s.secTitle}>Select your coverage radius</div>
        <div style={s.pricingGrid}>
          <div style={s.planCard(plan===25)} onClick={()=>setPlan(25)}>
            <div style={s.planTier}>Local</div>
            <div style={s.planAmt}>$100</div>
            <div style={s.planPeriod}>per month</div>
            <div style={s.planRadius}>25-mile radius</div>
            <div style={s.planDesc}>Focused local coverage</div>
          </div>
          <div style={s.planCard(plan===50)} onClick={()=>setPlan(50)}>
            <div style={s.planTier}>Regional</div>
            <div style={s.planAmt}>$200</div>
            <div style={s.planPeriod}>per month</div>
            <div style={s.planRadius}>50-mile radius</div>
            <div style={s.planDesc}>Wider service area</div>
          </div>
        </div>

        <div style={s.form}>
          <div style={s.formTitle}>Business Information</div>
          <div style={s.row}>
            <div style={s.field}><label style={s.label}>Business name</label><input style={s.input} placeholder='Apex Plumbing Co.' /></div>
            <div style={s.field}><label style={s.label}>Owner name</label><input style={s.input} placeholder='John Smith' /></div>
          </div>
          <div style={s.row}>
            <div style={s.field}><label style={s.label}>Phone number</label><input style={s.input} type='tel' placeholder='(313) 555-0100' /></div>
            <div style={s.field}><label style={s.label}>Business email</label><input style={s.input} type='email' placeholder='info@yourbusiness.com' /></div>
          </div>
          <div style={s.row}>
            <div style={s.field}>
              <label style={s.label}>Service to sponsor</label>
              <select style={s.input}>
                {['Plumbing','Electrical','HVAC','Roofing','Landscaping','Painting','Pest Control','Moving','Cleaning','Handyman','Interior Remodeling','Interior Design'].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={s.field}><label style={s.label}>Center ZIP code</label><input style={s.input} placeholder='48075' /></div>
          </div>
          <div style={s.row}>
            <div style={s.field}><label style={s.label}>State license number</label><input style={s.input} placeholder='MI-LIC-123456' /></div>
            <div style={s.field}><label style={s.label}>Years in business</label><input style={s.input} type='number' placeholder='10' /></div>
          </div>
          <div style={s.field}><label style={s.label}>Insurance provider & policy number</label><input style={s.input} placeholder='State Farm · Policy #123456' /></div>
          <div style={s.field}><label style={s.label}>Website (optional)</label><input style={s.input} placeholder='https://yourbusiness.com' /></div>
          <div style={s.field}><label style={s.label}>Tell homeowners about your business</label><textarea style={{...s.input,minHeight:'75px',resize:'vertical'}} placeholder='Describe your services, specialties, and what makes you stand out...' /></div>
        </div>

        <div style={s.payBox}>
          <div style={s.payTitle}>💳 Payment</div>
          <div style={s.row}>
            <div style={s.field}><label style={s.label}>Cardholder name</label><input style={s.input} placeholder='John Smith' /></div>
            <div style={s.field}><label style={s.label}>Card number</label><input style={s.input} placeholder='4242 4242 4242 4242' /></div>
          </div>
          <div style={s.row}>
            <div style={s.field}><label style={s.label}>Expiry</label><input style={s.input} placeholder='MM / YY' /></div>
            <div style={s.field}><label style={s.label}>CVV</label><input style={s.input} placeholder='123' /></div>
          </div>
          <div style={s.payTotal}>
            <div style={s.payLabel}>{plan===25?'Local':'Regional'} plan · {plan}-mile radius</div>
            <div style={s.payAmt}>${plan===25?100:200} / mo</div>
          </div>
          <div style={{fontSize:'0.7rem',color:'#5A5548',marginTop:'0.5rem'}}>🔒 Payments processed securely. Cancel anytime.</div>
        </div>

        <div style={s.disc}>By submitting you acknowledge that TrustedPin does not verify, license-check, or endorse contractors. Your listing will be marked as a paid promotional placement. TrustedPin reserves the right to remove any listing. Subscription billed monthly, cancel anytime. No refunds for partial months.</div>

        <button style={s.submit}>Submit & Activate Pro Listing →</button>

        <div style={{background:'#12121A',border:'1px solid #2A2A3A',borderRadius:'12px',padding:'1.25rem',marginTop:'1.5rem'}}>
          <div style={{fontSize:'0.68rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.4rem'}}>Questions?</div>
          <p style={{fontSize:'0.82rem',color:'#9A9080'}}>Email us at <span style={{color:'#C9A84C'}}>pros@trustedpin.com</span> — we respond within 24 hours.</p>
        </div>
      </div>
      <footer style={{background:'#12121A',borderTop:'1px solid #2A2A3A',padding:'1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <p style={{fontSize:'0.68rem',color:'#5A5548',lineHeight:'1.8',maxWidth:'580px',margin:'0 auto'}}>Pro listings are paid placements. TrustedPin does not verify or endorse contractors. Promoted contractors appear at the top of search results as a paid service only.</p>
      </footer>
    </div>
  )
}
