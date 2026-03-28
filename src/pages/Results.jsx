import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const MOCK = {
  Plumbing:[
    {init:'AP',name:'Apex Plumbing Co.',rating:4.9,reviews:312,desc:'Family-owned plumbing company serving metro Detroit since 2003. Specializes in emergency repairs, water heater installs, and drain cleaning. Known for same-day service and upfront pricing.',phone:'(313) 555-0101',email:'info@apexplumbing.com',hours:'Mon–Sat 7am–7pm',open:true},
    {init:'MP',name:'Metro Pipe Experts',rating:4.8,reviews:248,desc:'Licensed master plumbers handling residential and commercial jobs. Highly rated for bathroom remodels, pipe replacements, and sump pump installs. Free estimates on all major jobs.',phone:'(313) 555-0188',email:'hello@metropipe.com',hours:'Mon–Fri 8am–6pm',open:true},
    {init:'CS',name:'City Safe Plumbing',rating:4.7,reviews:189,desc:'24/7 emergency plumbing with a focus on leak detection and fixture installation. Flat-rate pricing with no surprise fees. Serving Detroit and surrounding suburbs for over 15 years.',phone:'(313) 555-0144',email:'contact@citysafe.com',hours:'Open 24/7',open:true},
    {init:'RP',name:'Reliable Pipe Works',rating:4.6,reviews:142,desc:'Residential plumbing specialists known for fast response times and honest assessments. Handles everything from clogged drains to full bathroom plumbing installs.',phone:'(313) 555-0166',email:'service@reliablepipe.com',hours:'Mon–Sat 8am–5pm',open:false},
    {init:'DW',name:'Detroit Water Pros',rating:4.5,reviews:98,desc:'Water heater and pipe specialists with expertise in older Detroit homes. Transparent quotes before work begins, no hidden charges.',phone:'(313) 555-0122',email:'info@detroitwaterpros.com',hours:'Mon–Fri 9am–6pm',open:false},
  ],
  Electrical:[
    {init:'VE',name:'Volt Electric Services',rating:4.9,reviews:287,desc:'Full-service electricians for panel upgrades, EV charger installs, outlet repairs, and whole-home rewiring. Licensed and insured with same-week availability.',phone:'(313) 555-0177',email:'info@voltelectric.com',hours:'Mon–Sat 8am–6pm',open:true},
    {init:'BE',name:'Bright End Electric',rating:4.8,reviews:201,desc:'Residential electrical specialists focused on safety inspections, breaker replacements, and lighting installs. Flat-rate pricing with no hidden fees.',phone:'(313) 555-0199',email:'hello@brightend.com',hours:'Mon–Fri 7am–5pm',open:true},
    {init:'PE',name:'Premier Electric Co.',rating:4.7,reviews:165,desc:'Locally trusted for over 18 years. Specializes in smart home wiring, outdoor lighting, and generator hookups. Free consultations on large projects.',phone:'(313) 555-0133',email:'info@premierelectric.com',hours:'Mon–Sat 8am–7pm',open:true},
    {init:'SE',name:'Spark Electric LLC',rating:4.6,reviews:119,desc:'Small team, high quality. Known for meticulous work on older homes with outdated wiring. Always pulls permits and inspects to code.',phone:'(313) 555-0155',email:'sparkelectric@gmail.com',hours:'Mon–Fri 8am–5pm',open:false},
    {init:'AE',name:'All-Star Electric',rating:4.5,reviews:88,desc:'Affordable residential and light commercial electrical work. Ceiling fans, outlets, panel work, and emergency callouts available.',phone:'(313) 555-0111',email:'allstarelectric@mail.com',hours:'Mon–Sat 9am–5pm',open:false},
  ],
  HVAC:[
    {init:'CA',name:'Cool Air Pros',rating:4.9,reviews:341,desc:'Heating and cooling specialists serving Detroit for 20+ years. AC tune-ups, furnace installs, duct cleaning, and emergency repairs. Free estimates available.',phone:'(313) 555-0155',email:'service@coolair.com',hours:'Open 24/7',open:true},
    {init:'MT',name:'Michigan Temp Control',rating:4.8,reviews:222,desc:'HVAC contractors specializing in energy-efficient installs and annual maintenance plans. Fully certified on all major brands including Carrier, Trane, and Lennox.',phone:'(313) 555-0144',email:'info@mitempcontrol.com',hours:'Mon–Fri 8am–6pm',open:true},
    {init:'PP',name:'Perfect Temp HVAC',rating:4.7,reviews:178,desc:'Residential HVAC with a focus on indoor air quality. Offers duct sealing, UV air purifiers, and smart thermostat installation alongside standard heating and cooling.',phone:'(313) 555-0188',email:'hello@perfecttemp.com',hours:'Mon–Sat 7am–7pm',open:true},
    {init:'AC',name:'Arctic Comfort LLC',rating:4.6,reviews:134,desc:'Known for fast emergency AC and furnace repair in the metro area. Flat-rate diagnostics and 90-day labor warranty on all repairs.',phone:'(313) 555-0166',email:'contact@arcticcomfort.com',hours:'Mon–Sat 8am–6pm',open:false},
    {init:'HM',name:'Home Master HVAC',rating:4.4,reviews:91,desc:'Budget-friendly HVAC service for homeowners on a tight timeline. Handles filter replacements, coil cleaning, and system checkups.',phone:'(313) 555-0122',email:'hmaster@hvacmi.com',hours:'Mon–Fri 9am–5pm',open:false},
  ],
}

const fallback = (svc) => [
  {init:'SP',name:`Star Pro ${svc}`,rating:4.9,reviews:210,desc:`Top-rated local ${svc.toLowerCase()} service in the area. Known for reliability, clear communication, and quality results on every job.`,phone:'(313) 555-0100',email:'info@starpro.com',hours:'Mon–Sat 8am–6pm',open:true},
  {init:'AC',name:`All City ${svc}`,rating:4.8,reviews:175,desc:`Serving metro Detroit homeowners for over a decade. Licensed, insured, and highly reviewed across Google and Yelp.`,phone:'(313) 555-0200',email:'hello@allcity.com',hours:'Mon–Fri 8am–5pm',open:true},
  {init:'PM',name:`Premier ${svc} Co.`,rating:4.7,reviews:140,desc:`Professional team with fast response times and upfront pricing. Free estimates and no surprise charges on any job.`,phone:'(313) 555-0300',email:'contact@premier.com',hours:'Mon–Sat 9am–6pm',open:false},
  {init:'EL',name:'Elite Local Pros',rating:4.6,reviews:108,desc:'Background-checked, licensed professionals available for same-week scheduling. Focused on getting the job done right the first time.',phone:'(313) 555-0400',email:'elite@localpros.com',hours:'Mon–Fri 9am–5pm',open:false},
  {init:'HO',name:'HomeOwner Choice',rating:4.5,reviews:87,desc:'Affordable quality service tailored to homeowners. Straightforward quotes, no pushy upsells, and satisfaction guarantee on all work.',phone:'(313) 555-0500',email:'info@homeownerchoice.com',hours:'Mon–Sat 8am–4pm',open:false},
]

const stars = (r) => '★'.repeat(Math.floor(r)) + '☆'.repeat(5 - Math.floor(r))

export default function Results({ navigate, searchData, user }) {
  const { service, location } = searchData || {}
  const data = MOCK[service] || fallback(service)

  const saveHistory = async (contractor) => {
    if (!user) return
    await supabase.from('history').insert({
      user_id: user.id,
      service,
      contractor_name: contractor.name,
      contractor_phone: contractor.phone,
      contractor_email: contractor.email,
      contractor_hours: contractor.hours,
      contractor_desc: contractor.desc,
      location,
      status: 'viewed'
    })
  }

  useEffect(() => {
    data.forEach(c => saveHistory(c))
  }, [])

  return (
    <div>
      <div style={{background:'#1E293B',padding:'0.55rem 1.5rem',textAlign:'center'}}>
        <p style={{color:'#475569',fontSize:'0.7rem'}}>Results are aggregated from public sources. TrustedPin makes no guarantees. Always verify before hiring.</p>
      </div>
      <div style={{maxWidth:'700px',margin:'0 auto',padding:'1.75rem 1.5rem'}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'1.5rem',gap:'1rem',flexWrap:'wrap'}}>
          <div>
            <div style={{fontFamily:'Sora,sans-serif',fontSize:'1.1rem',fontWeight:'700',color:'#0F172A'}}>Top {service} Pros in {location}</div>
            <div style={{fontSize:'0.8rem',color:'#64748B',marginTop:'3px'}}>Showing top {data.length} results · Updated from public data</div>
          </div>
          <button onClick={()=>navigate('home')} style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'0.82rem',fontWeight:'600',color:'#64748B',cursor:'pointer',border:'none',background:'none',fontFamily:'Mulish,sans-serif'}}>← New search</button>
        </div>
        {data.map((p,i)=>(
          <div key={i} style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:'14px',padding:'1.25rem 1.4rem',marginBottom:'1rem'}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'0.9rem'}}>
              <div style={{width:'46px',height:'46px',borderRadius:'10px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Sora,sans-serif',fontWeight:'700',fontSize:'0.85rem',color:'#2563EB',flexShrink:0}}>{p.init}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:'Sora,sans-serif',fontSize:'0.97rem',fontWeight:'700',color:'#0F172A',marginBottom:'2px'}}>{p.name}</div>
                <div style={{fontSize:'0.77rem',color:'#64748B'}}>{service} · {location}</div>
              </div>
              <div style={{background:i===0?'#D97706':'#0F172A',color:i===0?'#1c0a00':'#fff',fontSize:'0.68rem',fontWeight:'700',padding:'3px 8px',borderRadius:'6px',fontFamily:'Sora,sans-serif',whiteSpace:'nowrap'}}>#{i+1}</div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'5px',marginBottom:'0.8rem'}}>
              <span style={{color:'#F59E0B',fontSize:'0.82rem'}}>{stars(p.rating)}</span>
              <span style={{fontWeight:'700',fontSize:'0.85rem',color:'#0F172A'}}>{p.rating}</span>
              <span style={{fontSize:'0.77rem',color:'#94A3B8'}}>({p.reviews} reviews)</span>
            </div>
            <div style={{fontSize:'0.84rem',color:'#475569',lineHeight:'1.6',marginBottom:'0.9rem',paddingBottom:'0.9rem',borderBottom:'1px solid #E2E8F0'}}>{p.desc}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'0.75rem',alignItems:'center'}}>
              <span style={{fontSize:'0.8rem',color:'#475569'}}>📞 <a href={`tel:${p.phone}`} style={{color:'#2563EB',textDecoration:'none',fontWeight:'600'}}>{p.phone}</a></span>
              <span style={{fontSize:'0.8rem',color:'#475569'}}>✉️ <a href={`mailto:${p.email}`} style={{color:'#2563EB',textDecoration:'none',fontWeight:'600'}}>{p.email}</a></span>
              <span style={{fontSize:'0.75rem',color:'#94A3B8',marginLeft:'auto'}}>{p.open&&<span style={{color:'#16A34A',fontWeight:'700'}}>Open now · </span>}{p.hours}</span>
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