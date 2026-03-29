export default function Privacy({ navigate }) {
  return (
    <div style={{maxWidth:'720px',margin:'0 auto',padding:'2.5rem 1.5rem'}}>
      <button onClick={()=>navigate('home')} style={{background:'none',border:'none',color:'#C9A84C',cursor:'pointer',fontSize:'0.82rem',marginBottom:'1.5rem',fontFamily:'DM Sans,sans-serif'}}>← Back to TrustedPin</button>
      <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'1.8rem',color:'#F0EDE6',marginBottom:'0.5rem'}}>Privacy Policy</h1>
      <p style={{fontSize:'0.78rem',color:'#5A5548',marginBottom:'2rem'}}>Last updated: March 29, 2026</p>

      {[
        {title:'1. Overview',body:'TrustedPin ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use TrustedPin.com. By using TrustedPin, you agree to the collection and use of information as described in this policy.'},
        {title:'2. Information We Collect',body:'Account information: If you create an account, we collect your email address and password (encrypted). We never store plain-text passwords. Sign-in data: If you sign in with Google, we receive your name and email address from Google. We do not receive your Google password. Usage data: We may collect anonymized data about how you use the Service including searches performed, pages viewed, and features used. This data does not identify you personally. Pinned contractors: If you are signed in, we store the list of contractors you have pinned to your account.'},
        {title:'3. Information We Do Not Collect',body:'We do not collect your home address, phone number, payment information (contractor payments are processed by Stripe — see Section 6), or any sensitive personal information beyond what is listed above. We do not sell your data to third parties. We do not serve advertisements to homeowners.'},
        {title:'4. How We Use Your Information',body:'We use your information solely to provide and improve the Service. This includes: saving your pinned contractors across devices, personalizing your search experience, sending account-related emails (password resets, account confirmations), and improving our platform based on anonymized usage patterns. We do not use your information for advertising targeting, sell it to data brokers, or share it with contractors.'},
        {title:'5. Third-Party Services',body:'Google Places API: We use Google Places API to retrieve contractor information. Your searches may be processed by Google in accordance with Google\'s Privacy Policy. Supabase: We use Supabase to store account data securely. Supabase is SOC 2 compliant. Their privacy policy governs their handling of data. Vercel: Our platform is hosted on Vercel. Vercel may collect standard server logs including IP addresses.'},
        {title:'6. Payment Data',body:'Contractor subscription payments are processed by Stripe, a PCI-compliant payment processor. TrustedPin never sees, stores, or processes your full credit card number. All payment data is handled directly by Stripe. Stripe\'s Privacy Policy governs their handling of payment information.'},
        {title:'7. Cookies',body:'TrustedPin may use essential cookies to maintain your login session. We do not use advertising or tracking cookies. You may disable cookies in your browser settings, but this may affect your ability to stay logged in.'},
        {title:'8. Data Security',body:'We implement industry-standard security measures to protect your data. Account passwords are hashed and never stored in plain text. We use HTTPS encryption for all data transmission. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.'},
        {title:'9. Data Retention',body:'We retain your account information for as long as your account is active. You may delete your account at any time by emailing privacy@trustedpin.com. Upon deletion, your personal data will be removed from our systems within 30 days.'},
        {title:'10. Children\'s Privacy',body:'TrustedPin is not intended for use by children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us at privacy@trustedpin.com.'},
        {title:'11. Your Rights',body:'You have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your account and data, and opt out of any non-essential communications. To exercise these rights, email privacy@trustedpin.com.'},
        {title:'12. Changes to This Policy',body:'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website. Continued use of the Service after changes constitutes acceptance of the updated policy.'},
        {title:'13. Contact',body:'For privacy-related questions or requests, contact us at privacy@trustedpin.com'},
      ].map((s,i)=>(
        <div key={i} style={{marginBottom:'1.75rem'}}>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'#C9A84C',marginBottom:'0.5rem'}}>{s.title}</h2>
          <p style={{fontSize:'0.85rem',color:'#9A9080',lineHeight:'1.8'}}>{s.body}</p>
        </div>
      ))}
    </div>
  )
}