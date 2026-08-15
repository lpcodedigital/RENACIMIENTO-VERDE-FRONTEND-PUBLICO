import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { DeliveryPoint } from '../../data/site-content'

interface DeliveryMapProps {
  points: DeliveryPoint[]
}

const createDivIcon = (point: DeliveryPoint) => {
  return divIcon({
    html: `<div class="delivery-pin delivery-pin-${point.stockStatus}" role="button" tabindex="0" aria-label="${point.name}">
        <span class="delivery-pin-dot" aria-hidden="true"></span>
        <span class="delivery-pin-label">${point.name}</span>
      </div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  })
}

export function DeliveryMap({ points }: DeliveryMapProps) {
  return (
    <MapContainer
      center={[20.5, -88.7]}
      zoom={7}
      keyboard={true}
      scrollWheelZoom={false}
      className="h-[400px] w-full"
      aria-label="Mapa de puntos de entrega y viveros de la SDS en Yucatán"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='https://carto.com/attributions'>CARTO</a>"
      />
      {points.map((point) => (
        <Marker
          key={point.id}
          position={point.coordinates}
          icon={createDivIcon(point)}
        />
      ))}
    </MapContainer>
  )
}

export default DeliveryMap
