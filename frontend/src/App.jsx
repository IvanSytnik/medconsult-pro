import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppFloat from './components/layout/WhatsAppFloat'

// Pages
import Home from './pages/Home'
import Dental from './pages/Dental'
import Plastic from './pages/Plastic'
import Hair from './pages/Hair'
import Aesthetic from './pages/Aesthetic'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dental" element={<Dental />} />
          <Route path="/plastic" element={<Plastic />} />
          <Route path="/hair" element={<Hair />} />
          <Route path="/aesthetic" element={<Aesthetic />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default App
