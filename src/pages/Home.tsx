import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

const floatingWords = ['React', 'TypeScript', 'Vite', 'AI', 'Node']

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <BackgroundScene />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-sm font-mono tracking-wider">
              AVAILABLE_FOR_WORK
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-white">你好，</span>
            <br />
            <span className="text-gradient">我是徐力</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 font-body mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            8年经验的前端工程师 · 专注于现代化技术栈与AI驱动开发
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link
              to="/about"
              className="group relative px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-display font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">探索更多</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/experience"
              className="px-8 py-4 border border-white/20 text-white font-display font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              工作经历
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm font-mono animate-fade-in" style={{ animationDelay: '1s' }}>
            {floatingWords.map((word, i) => (
              <span
                key={word}
                className={`${['text-cyan-400', 'text-blue-400', 'text-purple-400', 'text-pink-400', 'text-green-400'][i]} opacity-60 hover:opacity-100 transition-opacity cursor-default`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-neon-cyan/30 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2" />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

function BackgroundScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-neon-cyan/10 rotate-hexagon animate-spin-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-neon-purple/10 rounded-full animate-spin-slow-reverse" />
    </div>
  )
}