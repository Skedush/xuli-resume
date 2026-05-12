export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22D3EE]/[0.015] rounded-full blur-3xl animate-subtle-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22D3EE]/[0.01] rounded-full blur-3xl animate-subtle-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}
