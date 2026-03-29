export default function About({ navigate }) {
  return (
    <div style={{background:'#08080E',minHeight:'100vh'}}>
      <div style={{maxWidth:'720px',margin:'0 auto',padding:'3rem 1.5rem'}}>

        <div style={{background:'#0F0F1A',border:'1px solid #252538',borderRadius:'16px',padding:'2.5rem',marginBottom:'2.5rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,transparent,#C9A84C,transparent)'}}></div>
          <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem'}}>Our story</div>
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',color:'#C9A84C',marginBottom:'1rem'}}>Why We Built TrustedPin</h1>
          <p style={{color:'#9A8870',fontSize:'0.92rem',lineHeight:'1.8',maxWidth:'520px',margin:'0 auto'}}>A simple idea born out of a frustration every homeowner knows too well.</p>
        </div>

        {[
          {text:`It started with a leaking pipe and an afternoon lost to Google. <strong style="color:#F2EEE6">Sound familiar?</strong>`},
          {text:`You type "plumber near me" and you're immediately hit with a wall of paid ads, sponsored listings, and businesses you've never heard of — all claiming to be the best. You open five tabs. You read through scattered reviews. You try to figure out which ones are real and which ones are bought. An hour later you're more confused than when you started, and your pipe is still leaking.`},
          {text:`<strong style="color:#F2EEE6">This is the reality for millions of homeowners every single day.</strong> Finding a trustworthy contractor shouldn't require a research project. But with the rise of contractor fraud, fake reviews, and pay-to-rank search results, it's become harder than ever to know who you can actually trust to come into your home.`},
          {text:`TrustedPin was built to solve exactly this problem. We pull the most relevant, highest-rated local contractors from Google's public data and surface them in one clean, easy-to-read view. No ads. No cluttered interfaces. Just the data, organized simply so you can make a faster, more informed decision.`},
          {text:`We added a fraud awareness guide because we've seen too many homeowners get burned. We added the ability to pin your favorite contractors because you shouldn't have to search twice. And we built it to be completely <strong style="color:#F2EEE6">free for homeowners</strong> — always.`},
          {text:`TrustedPin doesn't verify contractors. We don't background check anyone. We're not a licensing board. We're a smarter search layer that helps you cut through the noise faster. The due diligence is still yours — we just make the starting line a lot clearer.`},
        ].map((item,i)=>(
          <p key={i} style={{fontSize:'0.92rem',color:'#9A8870',lineHeight:'1.9',marginBottom:'1.25rem',animation:`fadeUp 0.5s ease ${i*0.1}s both`}} dangerouslySetInnerHTML={{__html:item.text}} />
        ))}

        <div style={{background:'#0F0F1A',borderLeft:'3px solid #C9A84C',borderRadius:'0 9px 9px 0',padding:'1.25rem 1.5rem',margin:'1.75rem 0',fontFamily:'Playfair Display,serif',fontSize:'1.05rem',color:'#F5DFA0',fontStyle:'italic',lineHeight:'1.7'}}>
          "We didn't build TrustedPin to replace your judgment — we built it to give you a cleaner starting point. Less noise. More signal."
        </div>

        <p style={{fontSize:'0.92rem',color:'#9A8870',lineHeight:'1.9',marginBottom:'2rem'}}>
          Contractor fraud is rising every year. Storm chasers, unlicensed operators, and scammers prey on homeowners who are already stressed and under pressure. TrustedPin won't eliminate that risk — but it gives you a better starting point than an unfiltered Google search, and it gives you the knowledge to protect yourself.
        </p>

        <div style={{background:'#0F0F1A',border:'1px solid #252538',borderRadius:'12px',padding:'1.5rem',marginBottom:'2rem'}}>
          <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>Get in touch</div>
          <p style={{fontSize:'0.85rem',color:'#9A8870',lineHeight:'1.7'}}>Questions, feedback, or partnership inquiries:<br/><a href="mailto:trustedpin@outlook.com" style={{color:'#C9A84C',textDecoration:'none',fontWeight:'600'}}>trustedpin@outlook.com</a></p>
        </div>

        <div style={{background:'#0F0F1A',border:'1px solid #252538',borderRadius:'12px',padding:'1.5rem'}}>
          <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#C9A84C',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem'}}>Legal disclaimer</div>
          <p style={{fontSize:'0.73rem',color:'#5A5248',lineHeight:'1.8'}}>TrustedPin aggregates publicly available information from Google Places API and other third-party sources for informational purposes only. TrustedPin does not verify, endorse, background-check, or license-check any contractor listed on this platform. TrustedPin makes no representations or warranties about the accuracy or completeness of any contractor information. TrustedPin and its affiliates are not liable for any outcomes resulting from contacting or hiring any contractor found through this service. Always perform your own due diligence before hiring anyone.</p>
        </div>

      </div>
      <footer style={{background:'#0F0F1A',borderTop:'1px solid #252538',padding:'1.75rem 1.5rem',textAlign:'center',marginTop:'2rem'}}>
        <p style={{fontSize:'0.7rem',color:'#5A5248',lineHeight:'1.8'}}>© 2026 TrustedPin · trustedpin@outlook.com</p>
      </footer>
    </div>
  )
}
