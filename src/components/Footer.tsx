import { Link } from 'react-router-dom'

const socialLinks = [
  { href: 'https://blog.zzzxc.com/', label: '博客', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { href: 'https://github.com/Skedush', label: 'GitHub', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z' },
  { href: 'https://leetcode.cn/u/skedush/', label: 'LeetCode', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
]

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于' },
  { path: '/skills', label: '技能' },
  { path: '/experience', label: '经历' },
  { path: '/projects', label: '项目' },
  { path: '/education', label: '教育' },
  { path: '/ai-philosophy', label: 'AI哲学' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0B0F14] border-t border-[#2A3441]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <NeuralLogo />
            <div>
              <p className="text-[#E2E8F0] font-body font-semibold">ResumeAI</p>
              <p className="text-[#64748B] text-sm">软件开发工程师</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#64748B] hover:text-[#94A3B8] transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64748B] hover:text-[#22D3EE] transition-colors duration-200"
                aria-label={link.label}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1E2530] text-center">
          <p className="text-[#64748B] text-xs">
            © {new Date().getFullYear()} ResumeAI. Built with React + TypeScript.
          </p>
        </div>
      </div>
    </footer>
  )
}

function NeuralLogo() {
  return (
    <div className="w-9 h-9 rounded-lg bg-[#151A23] border border-[#2A3441] flex items-center justify-center">
      <svg className="w-5 h-5" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="footerAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="25" r="8" fill="url(#footerAccent)"/>
        <circle cx="25" cy="50" r="6" fill="url(#footerAccent)" opacity="0.9"/>
        <circle cx="75" cy="50" r="6" fill="url(#footerAccent)" opacity="0.9"/>
        <circle cx="35" cy="75" r="6" fill="url(#footerAccent)" opacity="0.9"/>
        <circle cx="65" cy="75" r="6" fill="url(#footerAccent)" opacity="0.9"/>
        <line x1="50" y1="25" x2="25" y2="50" stroke="url(#footerAccent)" strokeWidth="3" opacity="0.7"/>
        <line x1="50" y1="25" x2="75" y2="50" stroke="url(#footerAccent)" strokeWidth="3" opacity="0.7"/>
        <line x1="25" y1="50" x2="35" y2="75" stroke="url(#footerAccent)" strokeWidth="3" opacity="0.7"/>
        <line x1="75" y1="50" x2="65" y2="75" stroke="url(#footerAccent)" strokeWidth="3" opacity="0.7"/>
      </svg>
    </div>
  )
}
