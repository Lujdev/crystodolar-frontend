'use client'

import { lazy, Suspense } from 'react'
import { CryptoRate } from '@/types/currency'

interface CalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  rate: CryptoRate
}

const CalculatorModal = lazy(() => 
  import('./calculator-modal').then(module => ({ default: module.CalculatorModal }))
)

function CalculatorModalFallback() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-600 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            <div className="h-10 bg-gray-600 rounded"></div>
            <div className="h-10 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CalculatorModalLazy({ isOpen, onClose, rate }: CalculatorModalProps) {
  if (!isOpen) return null

  return (
    <Suspense fallback={<CalculatorModalFallback />}>
      <CalculatorModal isOpen={isOpen} onClose={onClose} rate={rate} />
    </Suspense>
  )
}