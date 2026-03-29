import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Home from './pages/Home'
import Results from './pages/Results'
import Pins from './pages/History'
import Auth from './pages/Auth'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Pro from './pages/Pro'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Nav from './components/Nav'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)
  const [searchData, setSearchData] = useState(null)
  const [pins, setPins] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const navigate = (p, data = null) => {
    setSearchData(data)
    setPage(p)
    window.scrollTo(0, 0)
  }

  const handlePin = (contractor) => {
    const exists = pins.find(p => p.name === contractor.name)
    if (exists) {
      setPins(pins.filter(p => p.name !== contractor.name))
    } else {
      setPins([...pins, contractor])
    }
  }

  const clearPins = () => {
    if (window.confirm('Remove all pinned contractors?')) setPins([])
  }

  return (
    <div>
      <Nav page={page} navigate={navigate} user={user} pinsCount={pins.length} />
      {page === 'home' && <Home navigate={navigate} />}
      {page === 'results' && <Results navigate={navigate} searchData={searchData} user={user} pins={pins} onPin={handlePin} />}
      {page === 'pins' && <Pins navigate={navigate} user={user} pins={pins} onClear={clearPins} onPin={handlePin} />}
      {page === 'auth' && <Auth navigate={navigate} />}
      {page === 'terms' && <Terms navigate={navigate} />}
      {page === 'privacy' && <Privacy navigate={navigate} />}
      {page === 'pro' && <Pro navigate={navigate} />}
      {page === 'about' && <About navigate={navigate} />}
      {page === 'how' && <HowItWorks navigate={navigate} />}
    </div>
  )
}

