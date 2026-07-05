import './Map.css'

function Map({ properties, onManage }) {
  return (
    <div className="game-map">
      <div className="game-map-grid">
        {properties.map((property) => (
          <button
            key={property.id}
            type="button"
            className="game-map-house"
            title={`${property.name} · ${property.regionTrait}`}
            onClick={() => onManage(property.id)}
          >
            <span>{property.name}</span>
          </button>
        ))}
      </div>
      {properties.length === 0 && <p className="game-map-empty">첫 건물을 구매해 도시를 시작하세요!</p>}
    </div>
  )
}

export default Map
