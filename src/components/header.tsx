'use client'

import { TrendingUp, RefreshCw, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCryptoContext } from '@/lib/crypto-context'
import Image from 'next/image'
import { useState, useEffect } from 'react'

/**
 * Componente Header de CrystoDolar
 * Muestra logo, título y botón de actualización
 * Integrado con CryptoContext para actualización de cotizaciones USDT/Bs
 */
export function Header() {
  const { refreshRates, isLoading, lastUpdate, lastManualUpdate } = useCryptoContext()
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [canUpdate, setCanUpdate] = useState<boolean>(true)

  // Calcular si se puede actualizar y tiempo restante
  useEffect(() => {
    if (lastManualUpdate) {
      const timeSinceLastUpdate = Date.now() - lastManualUpdate.getTime()
      const minInterval = 2 * 60 * 1000 // 2 minutos
      
      if (timeSinceLastUpdate < minInterval) {
        const remaining = Math.ceil((minInterval - timeSinceLastUpdate) / 1000)
        setTimeRemaining(remaining)
        setCanUpdate(false)
        
        // Contador regresivo
        const timer = setInterval(() => {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              setCanUpdate(true)
              return 0
            }
            return prev - 1
          })
        }, 1000)
        
        return () => clearInterval(timer)
      } else {
        setCanUpdate(true)
        setTimeRemaining(0)
      }
    } else {
      setCanUpdate(true)
      setTimeRemaining(0)
    }
  }, [lastManualUpdate])

  /**
   * Maneja la actualización manual de cotizaciones
   */
  const handleRefresh = async () => {
    if (!canUpdate) {
      // Mostrar toast informativo sobre el rate limiting
      // Esto se maneja en el contexto, pero aquí podemos mejorar la UX
      return
    }
    await refreshRates(true, true)
  }

  // Función para formatear el tiempo restante de manera más amigable
  const formatTimeRemaining = (seconds: number) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }
    return `${seconds}s`
  }

  // Determinar el estado del botón para aplicar estilos apropiados
  const getButtonState = () => {
    if (isLoading) return 'loading'
    if (!canUpdate) return 'blocked'
    return 'ready'
  }

  const buttonState = getButtonState()

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
                className="text-left hover:opacity-80 transition-opacity"
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
                onClick={() => window.location.href = '/history'}
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
            
            {/* Botón de actualización mejorado */}
            <div className="relative">
              <Button 
                variant={buttonState === 'blocked' ? 'secondary' : 'outline'}
                size="sm" 
                onClick={handleRefresh}
                disabled={isLoading || !canUpdate}
                className={`
                  header-refresh-button group relative transition-all duration-200
                  ${buttonState === 'blocked' 
                    ? 'bg-orange-100/10 border-orange-500/30 text-orange-300 hover:bg-orange-100/20' 
                    : ''
                  }
                  ${buttonState === 'loading' 
                    ? 'bg-blue-100/10 border-blue-500/30 text-blue-300' 
                    : ''
                  }
                  ${buttonState === 'ready' 
                    ? 'hover:bg-gray-100/10 hover:border-gray-400/50' 
                    : ''
                  }
                `}
                title={
                  buttonState === 'blocked' 
                    ? `Espera ${formatTimeRemaining(timeRemaining)} antes de actualizar nuevamente`
                    : buttonState === 'loading'
                    ? 'Actualizando cotizaciones...'
                    : 'Actualizar cotizaciones'
                }
                aria-label={
                  buttonState === 'blocked' 
                    ? `Botón bloqueado. Espera ${formatTimeRemaining(timeRemaining)} antes de actualizar`
                    : buttonState === 'loading'
                    ? 'Actualizando cotizaciones, por favor espera'
                    : 'Actualizar cotizaciones de criptomonedas'
                }
              >
                {/* Icono según el estado */}
                {buttonState === 'loading' && (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                )}
                {buttonState === 'blocked' && (
                  <Clock className="h-4 w-4" />
                )}
                {buttonState === 'ready' && (
                  <RefreshCw className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                )}
                
                {/* Texto del botón - Responsive y claro */}
                <span className="hidden sm:inline font-medium">
                  {buttonState === 'loading' && 'Actualizando...'}
                  {buttonState === 'blocked' && `Espera ${formatTimeRemaining(timeRemaining)}`}
                  {buttonState === 'ready' && 'Actualizar'}
                </span>
                
                {/* Texto para mobile - Más descriptivo */}
                <span className="sm:hidden font-medium">
                  {buttonState === 'loading' && '...'}
                  {buttonState === 'blocked' && `${formatTimeRemaining(timeRemaining)}`}
                  {buttonState === 'ready' && 'Actualizar'}
                </span>
              </Button>
              
              {/* Indicador visual mejorado para estado bloqueado */}
              {buttonState === 'blocked' && (
                <>
                  {/* Punto naranja pulsante */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                  
                  {/* Borde naranja pulsante para mobile */}
                  <div className="absolute inset-0 rounded-md border-2 border-orange-500/50 animate-pulse sm:hidden" />
                </>
              )}
              
              {/* Indicador visual para estado de carga */}
              {buttonState === 'loading' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
