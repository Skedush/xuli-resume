export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5] sketch-atmosphere" aria-hidden="true">
      <svg className="sketch-loop sketch-loop-one" viewBox="0 0 420 260" fill="none">
        <path d="M18 139C67 60 139 34 222 62c74 25 143 78 178 159" />
        <path d="M28 146C78 74 143 48 217 71c70 22 133 70 173 142" />
      </svg>
      <svg className="sketch-loop sketch-loop-two" viewBox="0 0 280 220" fill="none">
        <path d="M18 188c25-88 93-158 226-160M31 199c31-79 96-140 219-151" />
      </svg>
      <span className="sketch-cross sketch-cross-one">×</span>
      <span className="sketch-cross sketch-cross-two">＋</span>
    </div>
  )
}
