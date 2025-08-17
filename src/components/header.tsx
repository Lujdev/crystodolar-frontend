'use client'

import { TrendingUp, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCryptoContext } from '@/lib/crypto-context'
import Image from 'next/image'

/**
 * Componente Header de CrystoDolar
 * Muestra logo, título y botón de actualización
 * Integrado con CryptoContext para actualización de cotizaciones USDT/Bs
 */
export function Header() {
  const { refreshRates, isLoading, lastUpdate } = useCryptoContext()

  /**
   * Maneja la actualización manual de cotizaciones
   */
  const handleRefresh = async () => {
    await refreshRates(true)
  }

  return (
    <header className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 header-mobile">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div>
              <Image 
                src="https://cdn.crystodolarvzla.site/crysto.png" 
                alt="CrystoDolar Logo" 
                width={40} 
                height={40} 
                className='header-logo-mobile' 
                priority 
                sizes="(max-width: 640px) 40px, 48px" 
              />
            </div>
            <div>
              <button
                onClick={() => window.location.href = '/'}
                className="text-left hover:opacity-80 transition-opacity cursor-pointer"
              >
                <h1 className="header-title-mobile font-bold text-white">CrystoDolar</h1>
                <p className="header-subtitle-mobile text-gray-300 font-light">Dólar y fiat en un clic</p>
              </button>
            </div>
          </div>

          {/* Información de estado y controles */}

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Navegación a cotización histórica - Visible en móvil y desktop */}
            <div className="flex items-center space-x-2">
              <button 

                onClick={() => window.location.href = '/historica'}
                className="flex items-center space-x-1 sm:space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Cotización Histórica</span>
                <span className="sm:hidden">Histórico</span>
              </button>
            </div>

            {/* Última actualización */}
            {lastUpdate && (
              <div className="hidden lg:block text-xs text-gray-400">
                Actualizado: {lastUpdate.toLocaleTimeString('es-VE', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            )}

            {/* Botón de actualización */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="header-refresh-button group"
            >
              <RefreshCw 
                className={`transition-transform duration-200 ${

                  isLoading ? 'animate-spin' : 'group-hover:rotate-180'
                }`}
              />
              <span className="hidden sm:inline font-medium">
                {isLoading ? 'Actualizando...' : 'Actualizar'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
