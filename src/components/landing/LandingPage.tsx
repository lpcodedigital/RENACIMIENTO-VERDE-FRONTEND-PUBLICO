import { Hero } from './Hero'
import { MetricsDashboard } from '../metrics/MetricsDashboard'
import { MapSection } from '../map/MapSection'
import { About } from './About'
import { Objectives } from './Objectives'
import { NativeSpecies } from './NativeSpecies'
import { DeliverySection } from '../delivery/DeliverySection'
import { SolicitudSection } from '../request/SolicitudSection'

export function LandingPage() {
  return (
    <>
      <Hero />
      <MetricsDashboard />
      <MapSection />
      <About />
      <Objectives />
      <NativeSpecies />
      <DeliverySection />
      <SolicitudSection />
    </>
  )
}
