import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { PlantationSite } from '../../data/site-content'

interface ReforestationMapProps {
  sites: PlantationSite[]
  onMarkerClick: (site: PlantationSite) => void
}

const createDivIcon = (site: PlantationSite) => {
  const typeLabel = `${site.speciesType}`
  return divIcon({
    html: `<div class="leaflet-pin leaflet-pin-${site.speciesType.replace(
      /[^a-z0-9_-]/gi,
      '',
    )}" role="button" tabindex="0" aria-label="${site.species}">
        <span class="leaflet-pin-dot" aria-hidden="true"></span>
        <span class="leaflet-pin-label">${typeLabel}</span>
      </div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })
}

export function ReforestationMap({
  sites,
  onMarkerClick,
}: ReforestationMapProps) {
  return (
    <MapContainer
      center={[20.5, -88.7]}
      zoom={7}
      keyboard={true}
      scrollWheelZoom={false}
      className="h-[400px] w-full"
      aria-label="Mapa interactivo de sitios de reforestación en Yucatán"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='https://carto.com/attributions'>CARTO</a>"
      />
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={site.coordinates}
          icon={createDivIcon(site)}
          eventHandlers={{
            click: () => onMarkerClick(site),
          }}
        />
      ))}
    </MapContainer>
  )
}

export default ReforestationMap
