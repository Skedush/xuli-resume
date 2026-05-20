import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackgroundEffects from './components/BackgroundEffects'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Education from './pages/Education'
import AIPhilosophy from './pages/AIPhilosophy'
import DevelopmentLog from './pages/DevelopmentLog'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-bg noise-overlay layout-shell">
      <div className="fixed inset-0 grid-background pointer-events-none" />
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10 layout-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/ai-philosophy" element={<AIPhilosophy />} />
            <Route path="/development-log" element={<DevelopmentLog />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
