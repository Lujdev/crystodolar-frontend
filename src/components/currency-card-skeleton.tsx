'use client'

import { Card } from '@/components/ui/card'

/**
 * Componente skeleton para mostrar mientras cargan las currency cards
 * Simula la estructura visual de las cards reales
 */
export function CurrencyCardSkeleton() {
  return (
    <Card className="bg-gray-900 border-red-500 border-2 rounded-lg w-80 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-red-600 p-2 flex items-center justify-center">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-white/20 rounded-full"></div>
          <div className="w-16 h-4 bg-white/20 rounded"></div>
        </div>
      </div>

      {/* Contenido principal skeleton */}
      <div className="p-3">
        {/* Título y estado skeleton */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
            <div className="w-24 h-4 bg-gray-600 rounded"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Información de tiempo skeleton */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-20 h-3 bg-gray-600 rounded"></div>
          <div className="w-16 h-3 bg-gray-600 rounded"></div>
        </div>

        {/* Precios principales skeleton */}
        <div className="grid grid-cols-2 gap-1 mb-4">
          {/* Precio de venta skeleton */}
          <div className="text-center">
            <div className="w-12 h-3 bg-gray-600 rounded mb-1 mx-auto"></div>
            <div className="w-20 h-3 bg-gray-600 rounded mb-1 mx-auto"></div>
            <div className="w-24 h-6 bg-gray-600 rounded mx-auto"></div>
          </div>

          {/* Separador vertical */}
          <div className="text-center border-l border-gray-600">
            <div className="w-12 h-3 bg-gray-600 rounded mb-1 mx-auto"></div>
            <div className="w-20 h-3 bg-gray-600 rounded mb-1 mx-auto"></div>
            <div className="w-24 h-6 bg-gray-600 rounded mx-auto"></div>
          </div>
        </div>

        {/* Acciones skeleton */}
        <div className="flex items-center justify-center space-x-6 pt-2 border-t border-gray-700">
          <div className="w-5 h-5 bg-gray-600 rounded"></div>
          <div className="w-5 h-5 bg-gray-600 rounded"></div>
          <div className="w-5 h-5 bg-gray-600 rounded"></div>
        </div>
      </div>
    </Card>
  )
}
