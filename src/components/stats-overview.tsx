'use client'

import { TrendingUp, DollarSign, Activity, Clock, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useCryptoContext } from '@/lib/crypto-context'
import { calculateCryptoGap } from '@/lib/crypto-data'

/**
 * Componente que muestra estadísticas del mercado USDT/Bs
 * Integrado con CryptoContext para obtener datos en tiempo real
 * Calcula métricas específicas entre fiat y crypto
 */
export function StatsOverview() {
  const { rates, lastUpdate } = useCryptoContext()

  // Cálculos de estadísticas específicos para USDT/Bs
  const fiatRate = rates.find(rate => rate.type === 'fiat')
  const cryptoRate = rates.find(rate => rate.type === 'crypto')
  
  // Calcular brecha entre fiat y crypto
  const cryptoGap = fiatRate && cryptoRate 
    ? calculateCryptoGap(fiatRate.sell, cryptoRate.sell)
    : 0

  // Calcular variación promedio del mercado
  const averageVariation = rates.length > 0 
    ? rates.reduce((acc, rate) => acc + rate.variation, 0) / rates.length 
    : 0

  const stats = [
    {
      title: 'USDT BCV',
      value: fiatRate ? `Bs.S ${fiatRate.sell.toFixed(2)}` : 'N/A',
      change: fiatRate ? fiatRate.variation : 0,
      icon: DollarSign,
      color: 'bg-blue-500',
      description: 'Tasa oficial fiat BCV'
    },
    {
      title: 'Brecha Fiat/Crypto',
      value: `${cryptoGap.toFixed(1)}%`,
      change: cryptoGap > 5 ? 1.5 : -0.5, // Indicador simulado
      icon: Calculator,
      color: 'bg-orange-500',
      description: 'Diferencia BCV vs Binance'
    },
    {
      title: 'Variación Promedio',
      value: `${averageVariation.toFixed(2)}%`,
      change: averageVariation,
      icon: Activity,
      color: 'bg-green-500',
      description: 'Promedio del mercado'
    },
    {
      title: 'Última Actualización',
      value: lastUpdate ? lastUpdate.toLocaleTimeString('es-VE', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }) : 'N/A',
      change: 0,
      icon: Clock,
      color: 'bg-purple-500',
      description: 'Hora de Venezuela'
    }
  ]

  /**
   * Determina el color del texto según el cambio
   */
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  {stat.change !== 0 && (
                    <span className={`text-sm font-medium ${getChangeColor(stat.change)}`}>
                      {stat.change > 0 ? '+' : ''}{stat.change.toFixed(2)}%
                    </span>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Comparativa Fiat vs Crypto */}
      {rates.length >= 2 && fiatRate && cryptoRate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tasa Fiat (BCV)</p>
                  <p className="text-xl font-bold text-blue-600">
                    Bs.S {fiatRate.sell.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Oficial gubernamental</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tasa Crypto (Binance)</p>
                  <p className="text-xl font-bold text-yellow-600">
                    Bs.S {cryptoRate.sell.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Mercado P2P</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
