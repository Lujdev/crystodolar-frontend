'use client'

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { CurrencyContextState, CurrencyContextActions, CryptoRate } from '@/types/currency'
import { toast } from 'sonner'

/**
 * CryptoContext - Sistema de contexto para CrystoDolar
 * Implementa patrón Context + Reducer para gestión centralizada del estado crypto USDT/Bs
 * Ubicado en lib/ para mejor organización y reutilización
 * Siguiendo principios SOLID y arquitectura limpia
 */

// Tipos para las acciones del reducer
type CurrencyAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RATES'; payload: CryptoRate[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_RATE'; payload: { id: string; data: Partial<CryptoRate> } }
  | { type: 'SET_LAST_UPDATE'; payload: Date }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'SET_ACTIVE_TAB'; payload: 'dolar' | 'euro' | 'cripto' | 'all' }
  | { type: 'SET_INITIAL_LOAD_ATTEMPT'; payload: boolean }

// Estado inicial del contexto
const initialState: CurrencyContextState = {
  rates: [],
  isLoading: false,
  error: null,
  lastUpdate: null,
  isOnline: true,
  activeTab: 'all',
  hasInitialLoadAttempt: false
}

/**
 * Reducer para manejar las acciones del estado de cotizaciones crypto
 * Implementa patrón Reducer para actualizaciones inmutables del estado
 */
function cryptoReducer(state: CurrencyContextState, action: CurrencyAction): CurrencyContextState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_RATES':
      return { 
        ...state, 
        rates: action.payload, 
        isLoading: false, 
        error: null,
        lastUpdate: new Date()
      }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    
    case 'UPDATE_RATE':
      return {
        ...state,
        rates: state.rates.map(rate =>
          rate.id === action.payload.id
            ? { ...rate, ...action.payload.data, lastUpdate: new Date() }
            : rate
        )
      }
    
    case 'SET_LAST_UPDATE':
      return { ...state, lastUpdate: action.payload }
    
    case 'SET_ONLINE_STATUS':
      return { ...state, isOnline: action.payload }
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload }
    
    case 'SET_INITIAL_LOAD_ATTEMPT':
      return { ...state, hasInitialLoadAttempt: action.payload }
    
    default:
      return state
  }
}

// Contexto combinado para estado y acciones
type CryptoContextType = CurrencyContextState & CurrencyContextActions

// Crear el contexto
const CryptoContext = createContext<CryptoContextType | undefined>(undefined)

/**
 * Proveedor del CryptoContext para CrystoDolar
 * Envuelve la aplicación y proporciona el estado global de cotizaciones USDT/Bs
 */
export function CryptoContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cryptoReducer, initialState)

  /**
   * Función para actualizar todas las cotizaciones USDT/Bs
   * Simula llamada a API externa (BCV + Binance P2P)
   */
  const refreshRates = useCallback(async (showToast: boolean = false) => {
    try {
      // Establecer estado de carga ANTES de hacer las peticiones
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      dispatch({ type: 'SET_INITIAL_LOAD_ATTEMPT', payload: true })
      
      const apiBaseRaw = process.env.NEXT_PUBLIC_API_BASE_URL || ''
      const apiBase = apiBaseRaw.replace(/\/+$/, '')
      
      // Intentar obtener comparación (BCV + Binance) y mapear a nuestras tarjetas
      const compareRes = await fetch(`${apiBase}/api/v1/rates/compare`, { cache: 'no-store' })
      if (!compareRes.ok) throw new Error('Error al solicitar comparación de fuentes')
      const compareJson = await compareRes.json()

      // Intentar obtener scraping BCV directo para tener EUR/VE
      const bcvRes = await fetch(`${apiBase}/api/v1/rates/scrape-bcv`, { cache: 'no-store' })
      if (!bcvRes.ok) throw new Error('Error al solicitar BCV')
      const bcvJson = await bcvRes.json()

      // Intentar obtener Binance P2P completo (buy y sell)
      const binanceCompleteRes = await fetch(`${apiBase}/api/v1/rates/binance-p2p/complete`, { cache: 'no-store' })
      if (!binanceCompleteRes.ok) throw new Error('Error al solicitar Binance P2P completo')
      const binanceCompleteJson = await binanceCompleteRes.json()

      const usdVes = bcvJson?.data?.usd_ves ?? compareJson?.data?.bcv?.usd_ves
      const eurVes = bcvJson?.data?.eur_ves ?? null
      const complete = binanceCompleteJson?.data
      
      // Mapeo correcto para la UI:
      // - Compra (usuario compra USDT) -> buy_usdt.price
      // - Vende  (usuario vende USDT)  -> sell_usdt.price
      const usdtBuy = complete?.buy_usdt?.price ?? compareJson?.data?.binance_p2p?.usdt_ves_sell
      const usdtSell = complete?.sell_usdt?.price ?? compareJson?.data?.binance_p2p?.usdt_ves_buy
      const usdtAvg = complete?.buy_usdt?.avg_price 
        ?? complete?.sell_usdt?.avg_price 
        ?? compareJson?.data?.binance_p2p?.usdt_ves_avg 
        ?? (typeof usdtBuy === 'number' && typeof usdtSell === 'number' ? (usdtBuy + usdtSell) / 2 : null)

      const updatedRates: CryptoRate[] = []
      if (typeof usdVes === 'number') {
        updatedRates.push({
          id: 'usd-bcv',
          name: 'Dólar Oficial',
          category: 'dolar',
          buy: usdVes,
          sell: usdVes,
          variation: 0,
          lastUpdate: new Date(),
          type: 'fiat',
          color: 'bg-blue-600',
          description: 'Banco Central de Venezuela - USD/VES'
        })
      }
      if (typeof eurVes === 'number') {
        updatedRates.push({
          id: 'eur-bcv',
          name: 'Euro Oficial',
          category: 'euro',
          buy: eurVes,
          sell: eurVes,
          variation: 0,
          lastUpdate: new Date(),
          type: 'fiat',
          color: 'bg-indigo-600',
          description: 'Banco Central de Venezuela - EUR/VES'
        })
      }
      if (typeof usdtBuy === 'number' || typeof usdtSell === 'number' || typeof usdtAvg === 'number') {
        const buy = typeof usdtBuy === 'number' ? usdtBuy : (typeof usdtAvg === 'number' ? usdtAvg : 0)
        const sell = typeof usdtSell === 'number' ? usdtSell : (typeof usdtAvg === 'number' ? usdtAvg : buy)
        updatedRates.push({
          id: 'usdt-binance',
          name: 'USDT',
          category: 'cripto',
          buy,
          sell,
          variation: 0,
          lastUpdate: new Date(),
          type: 'crypto',
          color: 'bg-yellow-600',
          description: 'Binance P2P - USDT/VES'
        })
      }

      // Establecer las tasas y desactivar carga
      dispatch({ type: 'SET_RATES', payload: updatedRates })
      
      // Mostrar toast de éxito solo cuando se solicite explícitamente
      if (showToast && updatedRates.length > 0) {
        toast.success('Tasas actualizadas correctamente', {
          description: `Se actualizaron ${updatedRates.length} cotizaciones`,
          duration: 3000,
        })
      }
    } catch (error) {
      // En caso de error, desactivar carga y mostrar error
      dispatch({ type: 'SET_ERROR', payload: 'Error al actualizar las cotizaciones' })
      console.error('Error refreshing crypto rates:', error)
      
      // Mostrar toast de error solo cuando se solicite explícitamente
      if (showToast) {
        toast.error('Error al actualizar las tasas', {
          description: 'No se pudieron cargar las cotizaciones',
          duration: 4000,
        })
      }
    }
  }, [])

  /**
   * Función para actualizar una cotización específica
   */
  const updateRate = useCallback((rateId: string, newData: Partial<CryptoRate>) => {
    dispatch({ type: 'UPDATE_RATE', payload: { id: rateId, data: newData } })
  }, [])

  /**
   * Función para limpiar errores
   */
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }, [])

  /**
   * Función para establecer estado de carga
   */
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }, [])

  /**
   * Establecer pestaña activa (Dólar, Euro, Cripto)
   */
  const setActiveTab = useCallback((tab: 'dolar' | 'euro' | 'cripto' | 'all') => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab })
  }, [])

  // Cargar datos iniciales al montar el componente (sin toast)
  useEffect(() => {
    // Solo cargar si no hay tasas y no se ha intentado cargar antes
    if (state.rates.length === 0 && !state.hasInitialLoadAttempt) {
      refreshRates(false)
    }
  }, [refreshRates, state.rates.length, state.hasInitialLoadAttempt])

  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true })
    const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false })

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Valor del contexto que incluye estado y acciones
  const contextValue: CryptoContextType = {
    ...state,
    refreshRates,
    updateRate,
    clearError,
    setLoading,
    setActiveTab
  }

  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  )
}

/**
 * Hook principal para usar CryptoContext en CrystoDolar
 * Proporciona acceso completo al estado y acciones de cotizaciones
 * Incluye validación para uso dentro del proveedor
 */
export function useCryptoContext() {
  const context = useContext(CryptoContext)
  
  if (context === undefined) {
    throw new Error('useCryptoContext debe ser usado dentro de CryptoContextProvider')
  }
  
  return context
}

/**
 * Hook para obtener solo el estado (sin acciones)
 * Útil para componentes que solo necesitan leer datos
 * Optimizado para re-renders mínimos
 */
export function useCryptoState(): CurrencyContextState {
  const context = useCryptoContext()
  return {
    rates: context.rates,
    isLoading: context.isLoading,
    error: context.error,
    lastUpdate: context.lastUpdate,
    isOnline: context.isOnline,
    activeTab: context.activeTab,
    hasInitialLoadAttempt: context.hasInitialLoadAttempt
  }
}

/**
 * Hook para obtener solo las acciones
 * Útil para componentes que solo necesitan disparar acciones
 * Optimizado para re-renders mínimos
 */
export function useCryptoActions(): CurrencyContextActions {
  const context = useCryptoContext()
  return {
    refreshRates: context.refreshRates,
    updateRate: context.updateRate,
    clearError: context.clearError,
    setLoading: context.setLoading,
    setActiveTab: context.setActiveTab
  }
}