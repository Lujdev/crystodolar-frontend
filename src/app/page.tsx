import { Header } from '@/components/header'
import { CurrencyGrid } from '@/components/currency-grid'
import { Footer } from '@/components/footer'
import { CurrencyTabs } from '@/components/currency-tabs'

/**
 * Página principal de CrystoDolar
 * Muestra cotizaciones USDT/Bs en tiempo real con diseño tipo dolarito.ar
 * Integrada con CryptoContext para manejo de estado global
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navegación por pestañas */}
        <CurrencyTabs />
        
        {/* Grilla de cotizaciones filtrada por pestaña activa */}
        <CurrencyGrid />
      </div>

      <Footer />
    </main>
  )
}