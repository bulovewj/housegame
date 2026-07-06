// 도트아트 건물 스프라이트 (72×72, 3/4 쿼터뷰). Mobile Game Design System 목업에서 이식.
const CR = { shapeRendering: 'crispEdges', imageRendering: 'pixelated' }

function OldStudio({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={CR}>
      <ellipse cx="38" cy="69" rx="25" ry="2.5" fill="rgba(0,0,0,0.22)" />
      <polygon points="57,30 63,34 63,64 57,64" fill="#a08060" stroke="#000" strokeWidth="1.5" />
      <rect x="4" y="28" width="53" height="36" fill="#d4b896" stroke="#000" strokeWidth="1.5" />
      <line x1="4" y1="46" x2="57" y2="46" stroke="#b89870" strokeWidth="1" />
      <polygon points="30,10 60,24 63,28 33,14" fill="#7a4e28" stroke="#000" strokeWidth="1.5" />
      <polygon points="2,28 30,10 60,24 57,28" fill="#8a5e38" stroke="#000" strokeWidth="1.5" />
      <line x1="2" y1="28" x2="57" y2="28" stroke="#6a3e18" strokeWidth="2" />
      <rect x="46" y="8" width="7" height="11" fill="#7a4e28" stroke="#000" strokeWidth="1.5" />
      <rect x="44" y="6" width="11" height="4" fill="#5a3a18" stroke="#000" strokeWidth="1.5" />
      <circle cx="48" cy="3" r="2" fill="#d8d4c8" stroke="#888" strokeWidth="0.5" opacity="0.75" />
      <circle cx="51" cy="1" r="1.5" fill="#d8d4c8" opacity="0.5" />
      <rect x="8" y="32" width="14" height="10" fill="#c0ac50" stroke="#000" strokeWidth="1.5" />
      <line x1="15" y1="32" x2="15" y2="42" stroke="#000" strokeWidth="1" />
      <rect x="8" y="32" width="14" height="3" fill="rgba(0,0,0,0.13)" />
      <rect x="32" y="32" width="14" height="10" fill="#b8a448" stroke="#000" strokeWidth="1.5" />
      <line x1="39" y1="32" x2="39" y2="42" stroke="#000" strokeWidth="1" />
      <rect x="8" y="50" width="14" height="10" fill="#b0a040" stroke="#000" strokeWidth="1.5" />
      <line x1="15" y1="50" x2="15" y2="60" stroke="#000" strokeWidth="1" />
      <rect x="8" y="53" width="6" height="4" fill="#9a8030" stroke="#5a4010" strokeWidth="1" />
      <rect x="36" y="48" width="13" height="16" fill="#7a5030" stroke="#000" strokeWidth="1.5" />
      <rect x="41" y="53" width="2" height="5" fill="#4a3020" />
      <line x1="36" y1="52" x2="32" y2="55" stroke="#000" strokeWidth="1" />
      <polyline points="21,33 24,41 26,38 27,47" stroke="#8a6840" strokeWidth="1" fill="none" />
      <line x1="44" y1="35" x2="47" y2="44" stroke="#8a6840" strokeWidth="1" />
      <line x1="47" y1="44" x2="45" y2="50" stroke="#8a6840" strokeWidth="1" />
      <line x1="50" y1="52" x2="53" y2="58" stroke="#8a6840" strokeWidth="1" />
      <polygon points="14,58 19,55 22,59 17,62" fill="#c0a878" stroke="#8a6840" strokeWidth="1" />
      <polygon points="33,45 37,43 39,47" fill="#c0a878" stroke="#8a6840" strokeWidth="1" />
      <rect x="28" y="44" width="4" height="10" fill="rgba(90,60,30,0.13)" />
    </svg>
  )
}

function Multifamily({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={CR}>
      <ellipse cx="38" cy="69" rx="25" ry="2.5" fill="rgba(0,0,0,0.2)" />
      <polygon points="57,22 63,26 63,64 57,64" fill="#98aec2" stroke="#000" strokeWidth="1.5" />
      <rect x="4" y="18" width="53" height="46" fill="#c8d4e0" stroke="#000" strokeWidth="1.5" />
      <line x1="4" y1="33" x2="57" y2="33" stroke="#a8b8cc" strokeWidth="1" />
      <line x1="4" y1="48" x2="57" y2="48" stroke="#a8b8cc" strokeWidth="1" />
      <polygon points="4,10 57,10 63,14 10,14" fill="#7a9aae" stroke="#000" strokeWidth="1.5" />
      <rect x="4" y="10" width="53" height="8" fill="#8aaabe" stroke="#000" strokeWidth="1.5" />
      <polygon points="57,10 63,14 63,18 57,18" fill="#6a8a9e" stroke="#000" strokeWidth="1.5" />
      {[8, 32].map((x) => (
        <g key={`f3-${x}`}>
          <rect x={x} y="20" width="16" height="10" fill="#b0d0ee" stroke="#000" strokeWidth="1.5" />
          <line x1={x + 8} y1="20" x2={x + 8} y2="30" stroke="#000" strokeWidth="1" />
          <rect x={x} y="20" width="16" height="3" fill="rgba(255,255,255,0.3)" />
        </g>
      ))}
      {[8, 32].map((x) => (
        <g key={`f2-${x}`}>
          <rect x={x} y="36" width="16" height="10" fill="#b0d0ee" stroke="#000" strokeWidth="1.5" />
          <line x1={x + 8} y1="36" x2={x + 8} y2="46" stroke="#000" strokeWidth="1" />
          <rect x={x - 1} y="46" width="18" height="3" fill="#a0b4c8" stroke="#000" strokeWidth="1" />
          {[0, 4, 8, 12, 16].map((dx) => (
            <line key={dx} x1={x + dx} y1="43" x2={x + dx} y2="49" stroke="#000" strokeWidth="1" />
          ))}
        </g>
      ))}
      {[8, 32].map((x) => (
        <g key={`f1-${x}`}>
          <rect x={x} y="51" width="16" height="10" fill="#b0d0ee" stroke="#000" strokeWidth="1.5" />
          <line x1={x + 8} y1="51" x2={x + 8} y2="61" stroke="#000" strokeWidth="1" />
        </g>
      ))}
      <rect x="39" y="50" width="12" height="14" fill="#8098b0" stroke="#000" strokeWidth="1.5" />
      <rect x="43" y="56" width="2" height="4" fill="#506880" />
      <rect x="36" y="48" width="5" height="8" fill="#a0b0c4" stroke="#000" strokeWidth="1" />
      <rect x="37" y="49" width="3" height="2" fill="#c8e0f8" />
      <circle cx="38" cy="53" r="1" fill="#7090b0" />
      <rect x="50" y="36" width="6" height="4" fill="#b0bec8" stroke="#000" strokeWidth="1" />
      <line x1="50" y1="38" x2="56" y2="38" stroke="#8898a8" strokeWidth="1" />
      {[8, 14, 20].map((x) => (
        <rect key={x} x={x} y="62" width="4" height="2" fill="#8098b0" stroke="#000" strokeWidth="0.5" />
      ))}
    </svg>
  )
}

function CommercialHouse({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={CR}>
      <ellipse cx="38" cy="69" rx="25" ry="2.5" fill="rgba(0,0,0,0.2)" />
      <polygon points="57,20 63,24 63,64 57,64" fill="#b09878" stroke="#000" strokeWidth="1.5" />
      <rect x="4" y="18" width="53" height="26" fill="#e0ccb0" stroke="#000" strokeWidth="1.5" />
      <rect x="14" y="20" width="3" height="22" fill="rgba(80,60,30,0.12)" />
      <rect x="30" y="24" width="2" height="18" fill="rgba(80,60,30,0.10)" />
      <rect x="48" y="22" width="2" height="14" fill="rgba(80,60,30,0.09)" />
      {[8, 34].map((x) => (
        <g key={`uw-${x}`}>
          <rect x={x} y="22" width="16" height="12" fill="#c8b44a" stroke="#000" strokeWidth="1.5" />
          <line x1={x + 8} y1="22" x2={x + 8} y2="34" stroke="#000" strokeWidth="1" />
          <rect x={x} y="22" width="16" height="3" fill="rgba(0,0,0,0.12)" />
          {x === 8 && <polyline points="8,26 11,23 13,27" stroke="#888" strokeWidth="0.8" fill="none" />}
          <rect x={x - 1} y="34" width="18" height="3" fill="#c8b498" stroke="#000" strokeWidth="1" />
        </g>
      ))}
      <polyline points="28,22 30,30 32,27 33,36" stroke="#b09070" strokeWidth="1" fill="none" />
      <rect x="4" y="44" width="53" height="20" fill="#f0eae0" stroke="#000" strokeWidth="1.5" />
      <line x1="4" y1="44" x2="57" y2="44" stroke="#000" strokeWidth="2" />
      <rect x="4" y="36" width="53" height="10" fill="#e8481a" stroke="#000" strokeWidth="1.5" />
      <rect x="8" y="37" width="36" height="7" fill="#f86030" />
      {[0, 6, 12, 18, 24].map((dx) => (
        <rect key={dx} x={9 + dx} y="38" width="4" height="5" fill="rgba(255,255,255,0.8)" />
      ))}
      <polygon points="52,36 57,36 57,43 52,43 50,40" fill="#c83010" stroke="#000" strokeWidth="1" />
      <rect x="4" y="44" width="53" height="2" fill="#f8b030" opacity="0.7" />
      <rect x="4" y="48" width="30" height="16" fill="#d8f0f8" stroke="#000" strokeWidth="1.5" />
      {[10, 16, 22].map((x) => (
        <line key={x} x1={x} y1="48" x2={x} y2="64" stroke="#a0a090" strokeWidth="1.5" />
      ))}
      <polygon points="6,50 12,50 8,56" fill="rgba(255,255,255,0.3)" />
      <rect x="36" y="50" width="16" height="14" fill="#c8d8e0" stroke="#000" strokeWidth="1.5" />
      <line x1="36" y1="56" x2="52" y2="56" stroke="#a0b8c8" strokeWidth="0.5" />
      <rect x="42" y="52" width="2" height="6" fill="#70909a" />
      <rect x="4" y="46" width="53" height="3" fill="#c06838" stroke="#000" strokeWidth="1" />
      {[4, 15, 26, 37, 48].map((x) => (
        <line key={x} x1={x} y1="47" x2={x + 4} y2="49" stroke="#a05028" strokeWidth="1" />
      ))}
      <polygon points="4,10 57,10 63,14 10,14" fill="#b09060" stroke="#000" strokeWidth="1.5" />
      <rect x="4" y="10" width="53" height="8" fill="#c0a870" stroke="#000" strokeWidth="1.5" />
      <polygon points="57,10 63,14 63,18 57,18" fill="#908050" stroke="#000" strokeWidth="1.5" />
    </svg>
  )
}

function NewVilla({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={CR}>
      <ellipse cx="38" cy="69" rx="25" ry="2.5" fill="rgba(0,0,0,0.18)" />
      <polygon points="57,30 63,34 63,62 57,62" fill="#b8d8b8" stroke="#000" strokeWidth="1.5" />
      <rect x="4" y="28" width="53" height="34" fill="#e8f2e0" stroke="#000" strokeWidth="1.5" />
      <line x1="4" y1="44" x2="57" y2="44" stroke="#c0dfc0" strokeWidth="2" />
      {[32, 37, 42, 47].map((y) => (
        <rect key={`ql-${y}`} x="4" y={y} width="3" height="4" fill="#d0e8d0" stroke="#b0d0b0" strokeWidth="0.5" />
      ))}
      {[32, 37, 42, 47].map((y) => (
        <rect key={`qr-${y}`} x="54" y={y} width="3" height="4" fill="#d0e8d0" stroke="#b0d0b0" strokeWidth="0.5" />
      ))}
      <polygon points="28,10 58,26 63,30 33,14" fill="#6ab870" stroke="#000" strokeWidth="1.5" />
      <polygon points="2,28 28,10 60,26 57,28" fill="#8acc88" stroke="#000" strokeWidth="1.5" />
      <line x1="2" y1="28" x2="57" y2="28" stroke="#a8e0a0" strokeWidth="1.5" />
      <rect x="36" y="16" width="12" height="8" fill="#c0eef8" stroke="#000" strokeWidth="1.5" />
      <line x1="42" y1="16" x2="42" y2="24" stroke="#000" strokeWidth="1" />
      <polygon points="34,16 42,10 50,16" fill="#78cc80" stroke="#000" strokeWidth="1.5" />
      {[9, 33].map((x) => (
        <g key={`vw2-${x}`}>
          <rect x={x} y="32" width="16" height="10" fill="#c8eef8" stroke="#000" strokeWidth="1.5" />
          <line x1={x + 8} y1="32" x2={x + 8} y2="42" stroke="#000" strokeWidth="1" />
          <polygon points={`${x + 1},33 ${x + 5},33 ${x + 1},37`} fill="rgba(255,255,255,0.45)" />
          <rect x={x - 1} y="42" width="18" height="3" fill="#c0dfc0" stroke="#000" strokeWidth="1" />
          <rect x={x} y="43" width="16" height="3" fill="#e8a0b0" stroke="#a06080" strokeWidth="0.5" />
          {[1, 4, 7, 10, 13].map((dx) => (
            <circle key={dx} cx={x + dx} cy="43" r="1" fill="#ff8090" />
          ))}
        </g>
      ))}
      {[9, 33].map((x) => (
        <g key={`vw1-${x}`}>
          <rect x={x} y="48" width="16" height="10" fill="#c8eef8" stroke="#000" strokeWidth="1.5" />
          <line x1={x + 8} y1="48" x2={x + 8} y2="58" stroke="#000" strokeWidth="1" />
          <polygon points={`${x + 1},49 ${x + 5},49 ${x + 1},53`} fill="rgba(255,255,255,0.45)" />
          <rect x={x - 1} y="58" width="18" height="3" fill="#c0dfc0" stroke="#000" strokeWidth="1" />
        </g>
      ))}
      <rect x="27" y="46" width="14" height="18" fill="#78b878" stroke="#000" strokeWidth="1.5" />
      <rect x="31" y="54" width="2" height="4" fill="#406840" />
      <rect x="28" y="47" width="12" height="6" fill="#c8eef8" stroke="#5a9870" strokeWidth="1" />
      <rect x="4" y="60" width="53" height="4" fill="#a8d468" stroke="#000" strokeWidth="1.5" />
      {[6, 10, 14, 19, 44, 49, 54].map((x) => (
        <g key={`fl-${x}`}>
          <line x1={x + 1} y1="60" x2={x + 1} y2="58" stroke="#58a020" strokeWidth="1" />
          <circle cx={x + 1} cy="57" r="2" fill={x % 3 === 0 ? '#ff9090' : x % 3 === 1 ? '#ffd070' : '#ff70b0'} stroke="#000" strokeWidth="0.5" />
        </g>
      ))}
      <rect x="27" y="60" width="14" height="4" fill="#e0d4b0" />
      <rect x="2" y="50" width="2" height="12" fill="#8a5c30" stroke="#000" strokeWidth="1" />
      <circle cx="3" cy="48" r="6" fill="#78c040" stroke="#000" strokeWidth="1.5" />
      <circle cx="1" cy="45" r="4" fill="#90d050" />
    </svg>
  )
}

function OldApartment({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={CR}>
      <ellipse cx="40" cy="69" rx="26" ry="2.5" fill="rgba(0,0,0,0.22)" />
      <polygon points="58,0 64,4 64,64 58,64" fill="#b8a898" stroke="#000" strokeWidth="1.5" />
      <rect x="4" y="0" width="54" height="64" fill="#e8d8c8" stroke="#000" strokeWidth="1.5" />
      {[10, 20, 30, 40, 50].map((y) => (
        <line key={y} x1="4" y1={y} x2="58" y2={y} stroke="#d0c0b0" strokeWidth="1" />
      ))}
      {[1, 11, 21, 31, 41, 51].map((rowY) =>
        [8, 24, 40].map((colX) => {
          const isLit = (rowY === 21 && colX === 24) || (rowY === 41 && colX === 8) || (rowY === 11 && colX === 40)
          return (
            <g key={`w-${rowY}-${colX}`}>
              <rect x={colX} y={rowY + 1} width="12" height="7" fill={isLit ? '#f0d860' : '#b0cce0'} stroke="#000" strokeWidth="1" />
              <line x1={colX + 6} y1={rowY + 1} x2={colX + 6} y2={rowY + 8} stroke="#000" strokeWidth="0.8" />
              {!isLit && <polygon points={`${colX + 1},${rowY + 2} ${colX + 4},${rowY + 2} ${colX + 1},${rowY + 5}`} fill="rgba(255,255,255,0.25)" />}
              {colX === 40 && rowY === 31 && <rect x={colX} y={rowY + 1} width="4" height="7" fill="rgba(255,180,180,0.35)" />}
            </g>
          )
        }),
      )}
      {[[50, 12], [50, 32], [50, 52]].map(([x, y]) => (
        <g key={`ac-${y}`}>
          <rect x={x} y={y} width="7" height="5" fill="#c0c8d0" stroke="#000" strokeWidth="1" />
          <line x1={x} y1={y + 2.5} x2={x + 7} y2={y + 2.5} stroke="#9098a0" strokeWidth="1" />
        </g>
      ))}
      <rect x="4" y="54" width="54" height="10" fill="#d8c8b8" stroke="#000" strokeWidth="1.5" />
      <rect x="20" y="56" width="18" height="8" fill="#9ab8c8" stroke="#000" strokeWidth="1.5" />
      <line x1="29" y1="56" x2="29" y2="64" stroke="#000" strokeWidth="1" />
      <rect x="25" y="59" width="2" height="3" fill="#6090a8" />
      <rect x="31" y="59" width="2" height="3" fill="#6090a8" />
      <rect x="16" y="54" width="26" height="3" fill="#b0c8d8" stroke="#000" strokeWidth="1" />
      <rect x="1" y="52" width="2" height="12" fill="#7a5030" stroke="#000" strokeWidth="1" />
      <circle cx="2" cy="48" r="5" fill="#6aaa2e" stroke="#000" strokeWidth="1.5" />
      <circle cx="0" cy="45" r="3" fill="#80c038" />
      <circle cx="4" cy="46" r="3.5" fill="#70b82a" />
      <rect x="66" y="38" width="2" height="26" fill="#9090a0" stroke="#000" strokeWidth="1" />
      <line x1="67" y1="38" x2="72" y2="34" stroke="#9090a0" strokeWidth="2" />
      <rect x="70" y="30" width="6" height="5" fill="#f8d860" stroke="#000" strokeWidth="1" />
      <rect x="69" y="34" width="8" height="2" fill="#e0c040" stroke="#000" strokeWidth="1" />
      <ellipse cx="73" cy="37" rx="5" ry="2" fill="rgba(255,220,60,0.2)" />
      <rect x="7" y="56" width="10" height="6" fill="#e0d0b8" stroke="#000" strokeWidth="1" />
    </svg>
  )
}

function VacantLot({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={CR}>
      <ellipse cx="38" cy="69" rx="25" ry="2.5" fill="rgba(0,0,0,0.18)" />
      <rect x="4" y="44" width="54" height="20" fill="#b8d870" stroke="#000" strokeWidth="1.5" />
      <polygon points="4,44 58,44 64,48 10,48" fill="#98c050" stroke="#000" strokeWidth="1.5" />
      {[8, 18, 28, 38, 48].map((x) => (
        <g key={x}>
          <line x1={x} y1="44" x2={x - 1} y2="38" stroke="#5a9820" strokeWidth="1.5" />
          <line x1={x + 3} y1="44" x2={x + 4} y2="38" stroke="#6ab030" strokeWidth="1.5" />
          <line x1={x + 1} y1="44" x2={x + 1} y2="36" stroke="#78c038" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="22" y="18" width="24" height="16" fill="#ffd93d" stroke="#000" strokeWidth="1.5" />
      <rect x="33" y="34" width="2" height="12" fill="#8a7030" stroke="#000" strokeWidth="1" />
      <rect x="23" y="19" width="22" height="6" fill="#ffe860" />
      <rect x="24" y="26" width="10" height="7" fill="#fff8d0" stroke="#8a7030" strokeWidth="1" />
      <rect x="35" y="26" width="8" height="7" fill="#fff8d0" stroke="#8a7030" strokeWidth="1" />
    </svg>
  )
}

// 매물 id → 스프라이트 매핑 (src/data/properties.js 기준)
const SPRITE_BY_PROPERTY_ID = {
  'studio-old': OldStudio,
  'multi-house': Multifamily,
  'flawed-shophouse': CommercialHouse,
  'new-villa': NewVilla,
  'station-apartment': OldApartment,
}

export function BuildingSprite({ propertyId, size = 72 }) {
  const Sprite = SPRITE_BY_PROPERTY_ID[propertyId] ?? VacantLot
  return <Sprite size={size} />
}

export { OldStudio, Multifamily, CommercialHouse, NewVilla, OldApartment, VacantLot }
