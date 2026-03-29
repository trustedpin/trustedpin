export default function Terms({ navigate }) {
  return (
    <div style={{maxWidth:'720px',margin:'0 auto',padding:'2.5rem 1.5rem'}}>
      <button onClick={()=>navigate('home')} style={{background:'none',border:'none',color:'#C9A84C',cursor:'pointer',fontSize:'0.82rem',marginBottom:'1.5rem',fontFamily:'DM Sans,sans-serif'}}>← Back to TrustedPin</button>
      <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'1.8rem',color:'#F0EDE6',marginBottom:'0.5rem'}}>Terms of Service</h1>
      <p style={{fontSize:'0.78rem',color:'#5A5548',marginBottom:'2rem'}}>Last updated: March 29, 2026</p>

      {[
        {title:'1. Acceptance of Terms',body:'By accessing or using TrustedPin ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. TrustedPin is operated by TrustedPin LLC. We reserve the right to update these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.'},
        {title:'2. Description of Service',body:'TrustedPin is an informational directory that aggregates publicly available contractor and home service business information from third-party sources including Google Places API. TrustedPin does not employ, endorse, license, verify, or background-check any contractor listed on the platform. We are not a contractor referral service and do not facilitate contracts between homeowners and contractors.'},
        {title:'3. No Guarantees or Warranties',body:'TrustedPin provides information "as is" without warranties of any kind, express or implied. We make no representations regarding the accuracy, completeness, reliability, suitability, or availability of any contractor listed. Contractor information including ratings, reviews, phone numbers, hours, and addresses is sourced from third parties and may be outdated or inaccurate. TrustedPin does not guarantee the quality, safety, legality, or legitimacy of any contractor or their services.'},
        {title:'4. Limitation of Liability',body:'To the fullest extent permitted by law, TrustedPin, its owners, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Service or from hiring, contacting, or interacting with any contractor found through TrustedPin. This includes but is not limited to property damage, personal injury, financial loss, fraud, or any other harm. Your use of this Service is entirely at your own risk.'},
        {title:'5. Promoted Listings',body:'TrustedPin offers paid promotional placements to contractors and service businesses. Promoted listings appear at the top of relevant search results and are clearly marked as "Promoted" or "Paid Placement." Payment for a promoted listing does not constitute endorsement, verification, or recommendation by TrustedPin. TrustedPin does not verify the credentials, licenses, insurance, or quality of promoted contractors. Homeowners should independently verify all contractor information before hiring.'},
        {title:'6. User Accounts',body:'You may create an account to save pinned contractors and access personalized features. You are responsible for maintaining the confidentiality of your account credentials. You agree not to use the Service for any unlawful purpose or in any way that violates these terms.'},
        {title:'7. Third-Party Data',body:'Contractor information displayed on TrustedPin is sourced from Google Places API and other publicly available sources. TrustedPin is not responsible for the accuracy of third-party data. Google\'s Terms of Service and Privacy Policy govern their data. TrustedPin is not affiliated with Google LLC.'},
        {title:'8. Intellectual Property',body:'The TrustedPin name, logo, and platform design are the property of TrustedPin LLC. You may not copy, reproduce, or distribute any part of the Service without written permission.'},
        {title:'9. Contractor Accounts',body:'Contractors who purchase promotional listings agree that their payment does not constitute any form of verification, endorsement, or guarantee by TrustedPin. TrustedPin reserves the right to remove any listing at any time for any reason without refund. Promotional subscriptions are billed monthly and may be cancelled at any time. No refunds are issued for partial months.'},
        {title:'10. Indemnification',body:'You agree to indemnify and hold harmless TrustedPin and its affiliates from any claims, damages, losses, or expenses arising from your use of the Service, your violation of these Terms, or your interaction with any contractor found through TrustedPin.'},
        {title:'11. Governing Law',body:'These Terms shall be governed by the laws of the State of Michigan, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of Michigan.'},
        {title:'12. Contact',body:'For questions about these Terms, contact us at legal@trustedpin.com'},
      ].map((s,i)=>(
        <div key={i} style={{marginBottom:'1.75rem'}}>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'#C9A84C',marginBottom:'0.5rem'}}>{s.title}</h2>
          <p style={{fontSize:'0.85rem',color:'#9A9080',lineHeight:'1.8'}}>{s.body}</p>
        </div>
      ))}
    </div>
  )
}