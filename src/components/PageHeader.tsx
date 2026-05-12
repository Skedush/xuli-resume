interface PageHeaderProps {
  title: string
  subtitle?: string
  highlightWord?: string
  center?: boolean
}

export default function PageHeader({ title, subtitle, highlightWord, center = true }: PageHeaderProps) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#E2E8F0] mb-4">
        {highlightWord ? (
          <>
            {title}<span className="text-[#22D3EE]">{highlightWord}</span>
          </>
        ) : title}
      </h1>
      {subtitle && (
        <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
