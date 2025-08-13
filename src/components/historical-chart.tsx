'use client'

import { useState } from 'react'

/**
 * Componente de gráfica histórica de cotizaciones
 * Muestra la evolución temporal de las cotizaciones USDT/Bs
 * Incluye datos de BCV y Binance P2P para comparación
 */
export function HistoricalChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('1D')

  // Datos simulados para la gráfica
  const generateChartData = () => {
    const points = 24 // 24 horas de datos
    const basePrice = 37
    const data = []
    
    for (let i = 0; i < points; i++) {
      const variation = (Math.sin(i / 3) + Math.random() - 0.5) * 2
      const bcvPrice = basePrice + variation
      const binancePrice = bcvPrice + Math.random() * 1.5 + 0.5
      
      data.push({
        time: new Date(Date.now() - (points - i) * 60 * 60 * 1000),
        bcv: bcvPrice,
        binance: binancePrice
      })
    }
    
    return data
  }

  const chartData = generateChartData()
  const maxPrice = Math.max(...chartData.map(d => Math.max(d.bcv, d.binance)))
  const minPrice = Math.min(...chartData.map(d => Math.min(d.bcv, d.binance)))
  const priceRange = maxPrice - minPrice

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Evolución USDT/Bs - Últimas 24 horas
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-400">BCV</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Binance P2P</span>
          </div>
        </div>
      </div>

      {/* Gráfica SVG */}
      <div className="relative h-64 w-full bg-gray-900 rounded-lg overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 800 256">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="32" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Price lines */}
          {/* BCV Line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            points={chartData.map((point, index) => {
              const x = (index / (chartData.length - 1)) * 800
              const y = 256 - ((point.bcv - minPrice) / priceRange) * 200 - 28
              return `${x},${y}`
            }).join(' ')}
          />
          
          {/* Binance Line */}
          <polyline
            fill="none"
            stroke="#eab308"
            strokeWidth="2"
            points={chartData.map((point, index) => {
              const x = (index / (chartData.length - 1)) * 800
              const y = 256 - ((point.binance - minPrice) / priceRange) * 200 - 28
              return `${x},${y}`
            }).join(' ')}
          />

          {/* Data points */}
          {chartData.map((point, index) => {
            const x = (index / (chartData.length - 1)) * 800
            const bcvY = 256 - ((point.bcv - minPrice) / priceRange) * 200 - 28
            const binanceY = 256 - ((point.binance - minPrice) / priceRange) * 200 - 28
            
            return (
              <g key={index}>
                <circle cx={x} cy={bcvY} r="3" fill="#3b82f6" />
                <circle cx={x} cy={binanceY} r="3" fill="#eab308" />
              </g>
            )
          })}
        </svg>

        {/* Price labels */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-between py-4 text-xs text-gray-400">
          <span>${maxPrice.toFixed(2)}</span>
          <span>${((maxPrice + minPrice) / 2).toFixed(2)}</span>
          <span>${minPrice.toFixed(2)}</span>
        </div>

        {/* Time labels */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-xs text-gray-400">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>

      {/* Información actual */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">BCV Actual</div>
          <div className="text-2xl font-bold text-blue-400">
            ${chartData[chartData.length - 1]?.bcv.toFixed(2)}
          </div>
          <div className="text-xs text-green-400">+0.8% hoy</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Binance P2P Actual</div>
          <div className="text-2xl font-bold text-yellow-400">
            ${chartData[chartData.length - 1]?.binance.toFixed(2)}
          </div>
          <div className="text-xs text-red-400">-0.3% hoy</div>
        </div>
      </div>
    </div>
  )
}
