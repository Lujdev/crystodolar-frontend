'use client'

import { TrendingUp, DollarSign, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCryptoContext } from '@/lib/crypto-context'
import Image from 'next/image'

/**
 * Componente Header de CrystoDolar
 * Muestra logo, título, estado de conexión y botón de actualización
 * Integrado con CryptoContext para actualización de cotizaciones USDT/Bs
 */
export function Header() {
  const { refreshRates, isLoading, isOnline, lastUpdate } = useCryptoContext()

  /**
   * Maneja la actualización manual de cotizaciones
   */
  const handleRefresh = async () => {
    await refreshRates(true)
  }

  return (
    <header className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-yellow-500 p-1 rounded-lg">
              <Image 
                src="https://cdn.crystodolarvzla.site/crystologo.webp" 
                alt="CrystoDolar Logo" 
                width={48} 
                height={48} 
                className='h-12 w-12' 
                priority
                sizes="48px"
              />
            </div>
            <div>
              <button 
                onClick={() => window.location.href = '/'}
                className="text-left hover:opacity-80 transition-opacity"
              >
                <h1 className="text-2xl font-bold text-white">CrystoDolar</h1>
                <p className="text-sm text-gray-300">Dólar, Euro y Cripto en tiempo real</p>
              </button>
            </div>
          </div>

          {/* Información de estado y controles */}
          <div className="flex items-center space-x-4">
            {/* Navegación a cotización histórica */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => window.location.href = '/historica'}
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Cotización Histórica</span>
              </button>
            </div>

            {/* Estado de conexión */}
            <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center space-x-1">
              {isOnline ? (
                <>
                  <Wifi className="h-3 w-3" />
                  <span className="hidden sm:inline">En línea</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" />
                  <span className="hidden sm:inline">Sin conexión</span>
                </>
              )}
            </Badge>

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
              className={`group flex items-center space-x-2 transition-all duration-200 ${
                isLoading 
                  ? 'bg-blue-600 text-white border-blue-600 cursor-not-allowed opacity-90' 
                  : 'hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105'
              }`}
            >
              <RefreshCw 
                className={`h-4 w-4 transition-transform duration-200 ${
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
