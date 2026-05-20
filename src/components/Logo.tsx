export default function Logo() {
  return (
    <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center">
      <svg className="w-5 h-5" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--xuli-accent)" />
            <stop offset="100%" stopColor="var(--xuli-accent-hover)" />
          </linearGradient>
        </defs>
        <path d="M25 15 L65 15 L75 25 L75 85 L25 85 Z" fill="none" stroke="url(#logoGrad)" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M65 15 L65 25 L75 25" fill="none" stroke="url(#logoGrad)" strokeWidth="4" strokeLinejoin="round"/>
        <circle cx="40" cy="40" r="4" fill="url(#logoGrad)"/>
        <circle cx="55" cy="35" r="3" fill="url(#logoGrad)" opacity="0.7"/>
        <circle cx="60" cy="50" r="4" fill="url(#logoGrad)"/>
        <circle cx="45" cy="55" r="3" fill="url(#logoGrad)" opacity="0.7"/>
        <circle cx="50" cy="70" r="4" fill="url(#logoGrad)"/>
        <line x1="40" y1="40" x2="55" y2="35" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.6"/>
        <line x1="55" y1="35" x2="60" y2="50" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.6"/>
        <line x1="60" y1="50" x2="50" y2="70" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.6"/>
        <line x1="40" y1="40" x2="45" y2="55" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.6"/>
        <line x1="45" y1="55" x2="50" y2="70" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.6"/>
      </svg>
    </div>
  )
}
