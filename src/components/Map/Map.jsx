import './Map.css'

function Map({ properties }) {
  const hasHouse = properties.length > 0

  return (
    <div className="game-map">
      {hasHouse && <div className="game-map-house" title={properties[0].name} />}
    </div>
  )
}

export default Map
