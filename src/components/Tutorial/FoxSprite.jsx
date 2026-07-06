// 여우 마스코트 "다람이" 도트아트 스프라이트. Mobile Game Design System 목업에서 이식.
const CR = { shapeRendering: 'crispEdges', imageRendering: 'pixelated' }

const EYES = {
  happy: (
    <>
      <path d="M20,26 Q23,21 26,26" stroke="#1a0e06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M38,26 Q41,21 44,26" stroke="#1a0e06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="24" r="1.2" fill="#fff" />
      <circle cx="40" cy="24" r="1.2" fill="#fff" />
    </>
  ),
  wink: (
    <>
      <path d="M20,26 Q23,21 26,26" stroke="#1a0e06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M38,23 Q41,22 44,23" stroke="#1a0e06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="24" r="1.2" fill="#fff" />
      <line x1="39" y1="24" x2="38" y2="26.5" stroke="#1a0e06" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="41" y1="23.5" x2="41" y2="26.5" stroke="#1a0e06" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="43" y1="24" x2="44" y2="26.5" stroke="#1a0e06" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  talk: (
    <>
      <ellipse cx="23" cy="25" rx="3.5" ry="4" fill="#1a0e06" />
      <ellipse cx="41" cy="25" rx="3.5" ry="4" fill="#1a0e06" />
      <circle cx="24.5" cy="23.5" r="1.5" fill="#fff" />
      <circle cx="42.5" cy="23.5" r="1.5" fill="#fff" />
      <path d="M20,19 Q23,17 26,19" stroke="#c87840" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M38,19 Q41,17 44,19" stroke="#c87840" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
  think: (
    <>
      <path d="M20,27 Q23,22 26,27" stroke="#1a0e06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M38,27 Q41,22 44,27" stroke="#1a0e06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M20,27 Q23,26 26,27" stroke="#d4a870" strokeWidth="1.5" fill="none" />
      <path d="M38,27 Q41,26 44,27" stroke="#d4a870" strokeWidth="1.5" fill="none" />
      <circle cx="22" cy="25" r="1.2" fill="#fff" />
      <circle cx="40" cy="25" r="1.2" fill="#fff" />
      <path d="M38,19 Q42,16 45,18" stroke="#c87840" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
}

const MOUTHS = {
  happy: <path d="M26,35 Q32,41 38,35" stroke="#1a0e06" strokeWidth="1.8" fill="none" strokeLinecap="round" />,
  wink: <path d="M25,35 Q32,42 39,35" stroke="#1a0e06" strokeWidth="2" fill="none" strokeLinecap="round" />,
  talk: (
    <>
      <ellipse cx="32" cy="37" rx="5" ry="4" fill="#d05038" stroke="#1a0e06" strokeWidth="1.5" />
      <ellipse cx="32" cy="38" rx="3.5" ry="2" fill="#ff8878" />
      <rect x="29" y="34" width="3" height="2" fill="#fff" stroke="none" />
      <rect x="32" y="34" width="3" height="2" fill="#fff" stroke="none" />
    </>
  ),
  think: <path d="M26,36 Q32,39 38,36" stroke="#1a0e06" strokeWidth="1.8" fill="none" strokeLinecap="round" />,
}

function FoxSprite({ size = 64, expr = 'happy' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={CR}>
      <path
        d="M40,54 Q54,48 56,38 Q58,28 50,24 Q44,22 42,30"
        fill="none" stroke="#000" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M40,54 Q54,48 56,38 Q58,28 50,24 Q44,22 42,30"
        fill="none" stroke="#f09030" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
      />
      <ellipse cx="53" cy="36" rx="8" ry="7" fill="#fff0d0" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="54" cy="36" rx="5" ry="4.5" fill="#fff8ee" />

      <ellipse cx="30" cy="52" rx="17" ry="11" fill="#fff0d0" stroke="#000" strokeWidth="2" />
      <ellipse cx="30" cy="52" rx="11" ry="7" fill="#fff8ee" />

      <ellipse cx="32" cy="28" rx="20" ry="18" fill="#fff0d0" stroke="#000" strokeWidth="2" />

      <polygon points="14,16 9,2 24,10" fill="#f09030" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="14,15 11,6 22,11" fill="#ffb4aa" />
      <polygon points="50,16 55,2 40,10" fill="#f09030" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="50,15 53,6 42,11" fill="#ffb4aa" />

      <ellipse cx="32" cy="33" rx="11" ry="8" fill="#fef8e4" stroke="none" />

      {EYES[expr]}

      <ellipse cx="32" cy="31" rx="3" ry="2.2" fill="#d05838" stroke="#000" strokeWidth="1" />
      <circle cx="31" cy="30.2" r="0.9" fill="rgba(255,255,255,0.5)" />

      {MOUTHS[expr]}

      <ellipse cx="17" cy="32" rx="5.5" ry="3.5" fill="#ff9090" opacity="0.32" />
      <ellipse cx="47" cy="32" rx="5.5" ry="3.5" fill="#ff9090" opacity="0.32" />

      <ellipse cx="20" cy="61" rx="7" ry="4" fill="#fff0d0" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="40" cy="61" rx="7" ry="4" fill="#fff0d0" stroke="#000" strokeWidth="1.5" />
      {[-2, 0, 2].map((dx) => <circle key={`l${dx}`} cx={20 + dx} cy="62" r="1" fill="#f0d8c0" />)}
      {[-2, 0, 2].map((dx) => <circle key={`r${dx}`} cx={40 + dx} cy="62" r="1" fill="#f0d8c0" />)}
    </svg>
  )
}

export default FoxSprite
