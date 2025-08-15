'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { CryptoRate } from '@/types/currency'

interface CalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  rate: CryptoRate
}

/**
 * Modal de calculadora de cambio
 * - Permite elegir dirección: tengo divisa vs tengo bolívares
 * - Permite elegir cotización: compra o venta
 * - Usa punto (.) como separador decimal
 */
export function CalculatorModal({ isOpen, onClose, rate }: CalculatorModalProps) {
  const [side, setSide] = useState<'have_currency' | 'have_ves'>('have_currency')
  const [quote, setQuote] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState<string>('1')
  const dialogRef = useRef<HTMLDivElement | null>(null)

  // Cerrar con escape y click fuera
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const onClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [isOpen, onClose])

  const baseLabel = useMemo(() => {
    return rate.baseCurrency
  }, [rate.baseCurrency])

  const baseSymbol = useMemo(() => {
    return rate.baseCurrency
  }, [rate.baseCurrency])

  const selectedRate = quote === 'sell' ? rate.sell : rate.buy

  const amountNumber = useMemo(() => {
    const normalized = amount.replace(',', '.')
    const n = parseFloat(normalized)
    return isFinite(n) ? Math.max(0, n) : 0
  }, [amount])

  const result = useMemo(() => {
    if (selectedRate <= 0) return 0
    if (side === 'have_currency') return amountNumber * selectedRate
    return amountNumber / selectedRate
  }, [amountNumber, selectedRate, side])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[10000]">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div ref={dialogRef} className="w-full max-w-lg bg-gray-900 text-white rounded-xl border border-gray-700 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="text-lg font-semibold">Calculadora de {baseLabel}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-300">
              Seleccione si desea convertir {baseLabel} a bolívares o viceversa y la cotización a utilizar.
            </p>

            {/* Dirección */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSide('have_currency')}
                className={`px-4 py-2 rounded-md text-sm font-medium border ${side === 'have_currency' ? 'bg-emerald-700 border-emerald-600' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
              >
                Tengo {rate.category === 'dolar' ? 'dólares' : rate.category === 'euro' ? 'euros' : 'USDT'}
              </button>
              <button
                onClick={() => setSide('have_ves')}
                className={`px-4 py-2 rounded-md text-sm font-medium border ${side === 'have_ves' ? 'bg-emerald-700 border-emerald-600' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
              >
                Tengo bolívares
              </button>
            </div>

            {/* Cotización */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setQuote('buy')}
                className={`px-4 py-2 rounded-md text-sm font-medium border ${quote === 'buy' ? 'bg-sky-700 border-sky-600' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
              >
                Cotización de compra
              </button>
              <button
                onClick={() => setQuote('sell')}
                className={`px-4 py-2 rounded-md text-sm font-medium border ${quote === 'sell' ? 'bg-sky-700 border-sky-600' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
              >
                Cotización de venta
              </button>
            </div>

            {/* Input */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Cantidad {side === 'have_currency' ? `de ${baseLabel}` : 'en bolívares (VES)'}
              </label>
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md px-3 py-2">
                <span className="text-gray-400 mr-2">{side === 'have_currency' ? baseSymbol : 'Bs'}</span>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(',', '.'))}
                  inputMode="decimal"
                  placeholder={side === 'have_currency' ? `Ingrese cantidad de ${baseLabel}` : 'Ingrese cantidad de Bs'}
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
                />
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Para la parte decimal usa punto. Ej: 100.50</p>
            </div>

            {/* Tipo de cambio usado */}
                         <div className="bg-gray-800 border border-gray-700 rounded-md p-3 text-center">
               <p className="text-sm text-gray-300 mb-1">Tipo de cambio utilizado ({quote === 'buy' ? 'compra' : 'venta'})</p>
               <p className="text-lg font-bold">
                 {baseLabel} 1 = Bs {selectedRate.toFixed(4)}
               </p>
             </div>

                         {/* Resultado */}
             <div className="bg-gray-900 rounded-md p-4 border border-gray-700 text-center">
               {side === 'have_currency' ? (
                 <p className="text-xl font-bold">
                   {baseLabel} {amountNumber || 0} = Bs {result.toFixed(4)}
                 </p>
               ) : (
                 <p className="text-xl font-bold">
                   Bs {amountNumber || 0} = {baseLabel} {result.toFixed(4)}
                 </p>
               )}
             </div>
          </div>

          <div className="flex justify-end p-4 border-t border-gray-800">
            <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 hover:bg-gray-700 text-sm">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}


