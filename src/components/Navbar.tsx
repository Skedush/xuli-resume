import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { path: '/', label: '首页', en: 'Home' },
  { path: '/about', label: '关于', en: 'About' },
  { path: '/skills', label: '技能', en: 'Skills' },
  { path: '/experience', label: '经历', en: 'Experience' },
  { path: '/projects', label: '项目', en: 'Projects' },
  { path: '/education', label: '教育', en: 'Education' },
  { path: '/ai-philosophy', label: 'AI哲学', en: 'AI Philosophy' },
  { path: '/development-log', label: '工程实录', en: 'Dev Log' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-[#0B0F14]/40 shadow-xl shadow-black/30' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <NeuralLogo />
            <span className="font-display text-lg font-semibold text-[#E2E8F0] hidden sm:block">
              Resume<span className="text-[#22D3EE]">AI</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 group transition-colors duration-200 ${
                  location.pathname === item.path ? 'text-[#22D3EE]' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                <span className="font-body text-sm tracking-wide">{item.label}</span>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#22D3EE] transition-all duration-200 ${
                  location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[#E2E8F0] block"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-[#E2E8F0] block"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[#E2E8F0] block"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#151A23]/95 backdrop-blur-md border-t border-[#2A3441]/50"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'bg-[#22D3EE]/10 text-[#22D3EE]'
                        : 'text-[#94A3B8] hover:bg-[#1C2431] hover:text-[#E2E8F0]'
                    }`}
                  >
                    <span className="font-body">{item.label}</span>
                    <span className="text-xs text-[#64748B] font-mono">{item.en}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NeuralLogo() {
  return (
    <div className="w-9 h-9 rounded-lg bg-[#151A23] border border-[#2A3441] flex items-center justify-center">
      <svg className="w-5 h-5" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="navbarAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="25" r="8" fill="url(#navbarAccent)"/>
        <circle cx="25" cy="50" r="6" fill="url(#navbarAccent)" opacity="0.9"/>
        <circle cx="75" cy="50" r="6" fill="url(#navbarAccent)" opacity="0.9"/>
        <circle cx="35" cy="75" r="6" fill="url(#navbarAccent)" opacity="0.9"/>
        <circle cx="65" cy="75" r="6" fill="url(#navbarAccent)" opacity="0.9"/>
        <line x1="50" y1="25" x2="25" y2="50" stroke="url(#navbarAccent)" strokeWidth="3" opacity="0.7"/>
        <line x1="50" y1="25" x2="75" y2="50" stroke="url(#navbarAccent)" strokeWidth="3" opacity="0.7"/>
        <line x1="25" y1="50" x2="35" y2="75" stroke="url(#navbarAccent)" strokeWidth="3" opacity="0.7"/>
        <line x1="75" y1="50" x2="65" y2="75" stroke="url(#navbarAccent)" strokeWidth="3" opacity="0.7"/>
      </svg>
    </div>
  )
}
