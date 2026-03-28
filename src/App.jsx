import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Home from './pages/Home'
import Results from './pages/Results'
import History from './pages/History'
import Auth from './pages/Auth'
import Nav from './components/Nav'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)
  const [searchData, setSearchData] = useState(null)

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

  return (
    <div>
      <Nav page={page} navigate={navigate} user={user} />
      {page === 'home' && <Home navigate={navigate} />}
      {page === 'results' && <Results navigate={navigate} searchData={searchData} user={user} />}
      {page === 'history' && <History navigate={navigate} user={user} />}
      {page === 'auth' && <Auth navigate={navigate} />}
    </div>
  )
}