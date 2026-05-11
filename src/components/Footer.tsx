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
    <footer className="relative z-10 bg-dark-surface/50 border-t border-neon-cyan/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <span className="font-display font-bold text-dark-bg text-xl">X</span>
              </div>
              <span className="font-display text-lg font-semibold text-white">
                徐力<span className="text-neon-cyan">.</span>dev
              </span>
            </div>
            <p className="text-gray-400 font-body text-sm leading-relaxed">
              8年经验的前端工程师，专注于现代化前端技术栈与AI驱动开发。
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm text-white mb-4 tracking-wider">导航</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 text-sm font-body"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm text-white mb-4 tracking-wider">联系方式</h4>
            <div className="space-y-3">
              <a href="mailto:Letshowmecode@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors duration-300 text-sm font-body">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Letshowmecode@gmail.com
              </a>
              <a href="tel:15857878755" className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors duration-300 text-sm font-body">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                15857878755
              </a>
            </div>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-card border border-neon-cyan/20 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm font-body">
            © 2024 徐力. 用热爱与代码构建数字世界。
          </p>
        </div>
      </div>
    </footer>
  )
}
