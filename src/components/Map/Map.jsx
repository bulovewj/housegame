import './Map.css'

function Map({ properties, onManage }) {
  return (
    <div className="game-map">
      {properties.map((property, index) => (
        <button
          key={property.id}
          type="button"
          className={`game-map-house game-map-house--${index % 5}`}
          title={`${property.name} · ${property.regionTrait}`}
          onClick={() => onManage(property.id)}
        ><span>{property.name}</span></button>
      ))}
      {properties.length === 0 && <p className="game-map-empty">첫 건물을 구매해 도시를 시작하세요!</p>}
    </div>
  )
}

export default Map
