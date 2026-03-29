export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { service, location } = req.query
  const query = `${service} contractors in ${location}`
  const apiKey = process.env.VITE_GOOGLE_PLACES_KEY

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places:searchText`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.internationalPhoneNumber,places.regularOpeningHours,places.editorialSummary'
        },
        body: JSON.stringify({
          textQuery: query,
          maxResultCount: 5
        })
      }
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch places' })
  }
}