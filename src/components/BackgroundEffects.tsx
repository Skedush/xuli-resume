export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="absolute top-20 left-20 w-1 h-1 bg-neon-cyan rounded-full animate-pulse" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-neon-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-32 left-40 w-1 h-1 bg-neon-pink rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-20 w-1 h-1 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-neon-purple rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
    </div>
  )
}