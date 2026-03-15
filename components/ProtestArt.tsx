// Illustrazioni SVG originali in stile protest art / screen print
// Ispirate all'estetica Banksy/Fairey/Basquiat — silhouette, fisti, folle

export function CrowdFists({ className = '' }: { className?: string }) {
  const figures = [
    { x: 20, color: '#FF0000', armColor: '#FF0000', fistColor: '#CC0000', delay: 0 },
    { x: 110, color: '#000000', armColor: '#000000', fistColor: '#000000', delay: 0.1 },
    { x: 200, color: '#FFD700', armColor: '#FFD700', fistColor: '#E6C200', delay: 0.2 },
    { x: 290, color: '#FF0000', armColor: '#FF0000', fistColor: '#CC0000', delay: 0.15 },
    { x: 380, color: '#000000', armColor: '#000000', fistColor: '#000000', delay: 0.05 },
    { x: 470, color: '#0033CC', armColor: '#0033CC', fistColor: '#0022AA', delay: 0.25 },
    { x: 560, color: '#FF0000', armColor: '#FF0000', fistColor: '#CC0000', delay: 0.1 },
  ]

  return (
    <svg viewBox="0 0 680 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {figures.map((f, i) => (
        <g key={i} transform={`translate(${f.x}, 0)`}>
          {/* Left arm raised */}
          <line x1="15" y1="110" x2="-8" y2="55" stroke={f.armColor} strokeWidth="10" strokeLinecap="round" />
          {/* Right arm raised */}
          <line x1="55" y1="110" x2="78" y2="55" stroke={f.armColor} strokeWidth="10" strokeLinecap="round" />
          {/* Left fist */}
          <rect x="-18" y="30" width="18" height="22" rx="4" fill={f.fistColor} />
          <rect x="-20" y="26" width="22" height="10" rx="3" fill={f.color} />
          {/* Right fist */}
          <rect x="70" y="30" width="18" height="22" rx="4" fill={f.fistColor} />
          <rect x="68" y="26" width="22" height="10" rx="3" fill={f.color} />
          {/* Head */}
          <ellipse cx="35" cy="68" rx="22" ry="24" fill={f.color} />
          {/* Body */}
          <rect x="10" y="92" width="50" height="65" rx="6" fill={f.color} />
          {/* Legs */}
          <rect x="12" y="148" width="18" height="45" rx="4" fill={f.color} />
          <rect x="38" y="148" width="18" height="45" rx="4" fill={f.color} />
        </g>
      ))}
      {/* Ground line */}
      <line x1="0" y1="193" x2="680" y2="193" stroke="#000" strokeWidth="4" />
    </svg>
  )
}

export function SingleFist({ className = '', color = '#FF0000' }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Arm */}
      <rect x="42" y="110" width="36" height="50" rx="6" fill={color} />
      {/* Palm */}
      <rect x="30" y="75" width="60" height="45" rx="8" fill={color} />
      {/* Fingers */}
      <rect x="30" y="45" width="14" height="35" rx="6" fill={color} />
      <rect x="47" y="38" width="14" height="40" rx="6" fill={color} />
      <rect x="64" y="40" width="14" height="38" rx="6" fill={color} />
      <rect x="80" y="48" width="13" height="30" rx="5" fill={color} />
      {/* Thumb */}
      <rect x="18" y="82" width="18" height="28" rx="7" fill={color} />
      {/* Knuckle line shadow */}
      <line x1="30" y1="72" x2="90" y2="72" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
    </svg>
  )
}

export function ProtestBannerArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 300" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background blocks */}
      <rect x="0" y="0" width="500" height="300" fill="#F5F0E8" />
      <rect x="0" y="0" width="500" height="80" fill="#FF0000" />
      <rect x="0" y="220" width="500" height="80" fill="#FFD700" />

      {/* Diagonal red stripe */}
      <polygon points="0,80 80,80 0,160" fill="#CC0000" />

      {/* Figure left - raised fist silhouette */}
      <g transform="translate(30, 60)">
        <line x1="25" y1="80" x2="5" y2="20" stroke="#000" strokeWidth="8" strokeLinecap="round" />
        <rect x="-5" y="0" width="18" height="20" rx="4" fill="#000" />
        <rect x="-7" y="-4" width="22" height="9" rx="3" fill="#000" />
        <ellipse cx="30" cy="100" rx="18" ry="20" fill="#000" />
        <rect x="12" y="120" width="36" height="50" rx="5" fill="#000" />
      </g>

      {/* Figure right */}
      <g transform="translate(410, 60)">
        <line x1="25" y1="80" x2="45" y2="20" stroke="#000" strokeWidth="8" strokeLinecap="round" />
        <rect x="37" y="0" width="18" height="20" rx="4" fill="#000" />
        <rect x="35" y="-4" width="22" height="9" rx="3" fill="#000" />
        <ellipse cx="20" cy="100" rx="18" ry="20" fill="#000" />
        <rect x="2" y="120" width="36" height="50" rx="5" fill="#000" />
      </g>

      {/* Central text block */}
      <rect x="120" y="90" width="260" height="120" fill="#000" />
      <text x="250" y="145" textAnchor="middle" fill="#FFD700" fontFamily="Arial Black" fontWeight="900" fontSize="32" letterSpacing="2">SAWNation</text>
      <text x="250" y="175" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial" fontWeight="700" fontSize="13" letterSpacing="1">STUDENTS AGAINST WAR</text>

      {/* Stars / dots */}
      {[50, 150, 350, 450].map((x, i) => (
        <circle key={i} cx={x} cy={250} r="8" fill="#000" />
      ))}
    </svg>
  )
}

export function ArtistFigure({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 320" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Wall / canvas behind */}
      <rect x="0" y="0" width="300" height="320" fill="#F5F0E8" />
      {/* Colorful spray paint splashes */}
      <ellipse cx="200" cy="80" rx="60" ry="50" fill="#FF0000" opacity="0.8" />
      <ellipse cx="170" cy="110" rx="45" ry="35" fill="#FFD700" opacity="0.9" />
      <ellipse cx="220" cy="120" rx="40" ry="30" fill="#0033CC" opacity="0.7" />
      <ellipse cx="190" cy="90" rx="30" ry="25" fill="#000" opacity="0.9" />
      {/* Fist inside the splash */}
      <g transform="translate(165, 65) scale(0.45)">
        <rect x="42" y="110" width="36" height="50" rx="6" fill="#FFD700" />
        <rect x="30" y="75" width="60" height="45" rx="8" fill="#FFD700" />
        <rect x="30" y="45" width="14" height="35" rx="6" fill="#FFD700" />
        <rect x="47" y="38" width="14" height="40" rx="6" fill="#FFD700" />
        <rect x="64" y="40" width="14" height="38" rx="6" fill="#FFD700" />
        <rect x="80" y="48" width="13" height="30" rx="5" fill="#FFD700" />
        <rect x="18" y="82" width="18" height="28" rx="7" fill="#FFD700" />
      </g>
      {/* Artist figure */}
      <ellipse cx="90" cy="100" rx="25" ry="27" fill="#000" />
      {/* Body */}
      <rect x="65" y="127" width="50" height="70" rx="8" fill="#000" />
      {/* Arm extended with spray can */}
      <line x1="115" y1="140" x2="175" y2="115" stroke="#000" strokeWidth="10" strokeLinecap="round" />
      {/* Spray can */}
      <rect x="170" y="105" width="14" height="28" rx="4" fill="#FF0000" />
      <rect x="174" y="100" width="6" height="8" rx="2" fill="#CC0000" />
      {/* Legs */}
      <rect x="68" y="190" width="20" height="60" rx="6" fill="#000" />
      <rect x="92" y="190" width="20" height="60" rx="6" fill="#000" />
      {/* Ground */}
      <line x1="0" y1="250" x2="300" y2="250" stroke="#000" strokeWidth="4" />
      {/* Paint drips */}
      <rect x="198" y="135" width="5" height="25" rx="2" fill="#FF0000" opacity="0.7" />
      <rect x="215" y="138" width="4" height="18" rx="2" fill="#FFD700" opacity="0.8" />
      <rect x="178" y="140" width="4" height="30" rx="2" fill="#0033CC" opacity="0.7" />
    </svg>
  )
}

export function WorldCrowd({ className = '' }: { className?: string }) {
  const colors = ['#FF0000', '#FFD700', '#0033CC', '#FF0000', '#000000', '#FFD700', '#FF0000', '#0033CC', '#000000', '#FFD700']
  return (
    <svg viewBox="0 0 600 180" className={className} xmlns="http://www.w3.org/2000/svg">
      {colors.map((color, i) => {
        const x = i * 60 + 10
        const heightVar = [0, -10, 5, -5, 10, 0, -8, 3, -12, 6][i]
        return (
          <g key={i} transform={`translate(${x}, ${heightVar})`}>
            {/* Arm up */}
            <line x1="20" y1="75" x2="8" y2="35" stroke={color} strokeWidth="7" strokeLinecap="round" />
            <rect x="2" y="18" width="14" height="17" rx="4" fill={color} />
            <rect x="0" y="14" width="18" height="8" rx="3" fill={color} />
            {/* Head */}
            <ellipse cx="22" cy="52" rx="16" ry="17" fill={color} />
            {/* Body */}
            <rect x="7" y="69" width="30" height="45" rx="5" fill={color} />
            {/* Legs */}
            <rect x="8" y="108" width="11" height="35" rx="4" fill={color} />
            <rect x="22" y="108" width="11" height="35" rx="4" fill={color} />
          </g>
        )
      })}
      <line x1="0" y1="170" x2="600" y2="170" stroke="#000" strokeWidth="3" />
    </svg>
  )
}
