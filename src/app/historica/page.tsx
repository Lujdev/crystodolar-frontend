import { promises as fs } from 'fs'
import path from 'path'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CurrencyTabs } from '@/components/currency-tabs'
import { HistoricalPageClient } from './historical-page-client'

/**
 * Define la estructura para la entrada de datos históricos.
 * Esta interfaz debe ser consistente con la usada en el cron job.
 */
interface HistoricalRate {
  fecha: string
  'bcv-usd': number
  'bcv-euro': number
  'binance-buy': number
  'binance-sell': number
}

/**
 * Lee los datos históricos desde el archivo JSON.
 * Esta función se ejecuta en el servidor.
 */
async function getHistoricalData(): Promise<HistoricalRate[]> {
  const dataFilePath = path.join(process.cwd(), 'data', 'historical-rates.json')
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // Si el archivo no existe o hay un error, devuelve un array vacío.
    console.warn('Could not read historical-rates.json. Returning empty array.')
    return []
  }
}

/**
 * Página de cotización histórica
 * Muestra gráficas y tendencias de las cotizaciones USDT/Bs
 * Incluye análisis temporal y comparativas
 */
export default async function HistoricalPage() {
  const historicalData = await getHistoricalData()

  return (
    <main className="min-h-screen bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Navegación por pestañas */}
        <CurrencyTabs />

        {/* Título de la sección */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Cotización Histórica USDT/Bs
          </h1>
          <p className="text-gray-400">
            Análisis temporal y tendencias del mercado crypto venezolano
          </p>
        </div>

        {/* Controles de período */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-lg p-1 space-x-1">
            {['1D', '7D', '1M', '3M', '6M', '1A'].map((period) => (
              <button
                key={period}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Gráfica principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráfica histórica */}
          <div className="lg:col-span-2">
            <HistoricalPageClient data={historicalData} />
          </div>

          {/* Panel lateral con estadísticas */}
          <div className="space-y-6">
            {/* Resumen estadístico */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Resumen Estadístico
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Máximo (24h):</span>
                  <span className="text-white font-medium">$38.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mínimo (24h):</span>
                  <span className="text-white font-medium">$36.20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Promedio:</span>
                  <span className="text-white font-medium">$37.35</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Volatilidad:</span>
                  <span className="text-yellow-400 font-medium">2.1%</span>
                </div>
              </div>
            </div>

            {/* Tendencias */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Tendencias
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Semanal:</span>
                  <span className="text-green-400 font-medium">↗ +2.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mensual:</span>
                  <span className="text-red-400 font-medium">↘ -1.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Trimestral:</span>
                  <span className="text-green-400 font-medium">↗ +12.5%</span>
                </div>
              </div>
            </div>

            {/* Comparativa BCV vs Binance */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Brecha Fiat/Crypto
              </h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    3.2%
                  </div>
                  <div className="text-xs text-gray-400">
                    Diferencia actual
                  </div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-yellow-500 w-3/4"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>BCV</span>
                  <span>Binance P2P</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Análisis adicional */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Volumen de transacciones */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Volumen de Transacciones
            </h3>
            <div className="h-48 flex items-end justify-between space-x-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="flex-1 bg-blue-600 rounded-t"
                     style={{ height: `${Math.random() * 80 + 20}%` }}>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mié</span>
              <span>Jue</span>
              <span>Vie</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>
          </div>

          {/* Predicciones */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Indicadores Técnicos
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">RSI (14):</span>
                <span className="text-yellow-400 font-medium">65.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">MACD:</span>
                <span className="text-green-400 font-medium">Alcista</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">SMA 20:</span>
                <span className="text-blue-400 font-medium">$37.12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Resistencia:</span>
                <span className="text-red-400 font-medium">$39.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Soporte:</span>
                <span className="text-green-400 font-medium">$35.80</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
