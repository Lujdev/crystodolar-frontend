/**
 * Tipos TypeScript para cotizaciones USDT/Bs en Venezuela
 * Define interfaces para el manejo de datos de criptomonedas fiat/crypto
 */

export interface CryptoRate {
  /** Identificador único de la cotización */
  id: string
  /** Nombre del tipo de cambio */
  name: string
  /** Categoría de visualización (pestaña activa) */
  category: 'dolar' | 'euro' | 'cripto'
  /** Precio de compra en Bolívares */
  buy: number
  /** Precio de venta en Bolívares */
  sell: number
  /** Variación porcentual del día */
  variation: number
  /** Timestamp de última actualización */
  lastUpdate: Date
  /** Tipo de cambio (oficial fiat o crypto) */
  type: 'fiat' | 'crypto'
  /** Color del indicador para la UI */
  color: string
  /** Descripción adicional */
  description?: string
}

export interface CurrencyContextState {
  /** Array de cotizaciones disponibles */
  rates: CryptoRate[]
  /** Estado de carga */
  isLoading: boolean
  /** Mensajes de error */
  error: string | null
  /** Timestamp de última actualización */
  lastUpdate: Date | null
  /** Estado de conexión */
  isOnline: boolean
  /** Pestaña activa en la UI */
  activeTab: 'dolar' | 'euro' | 'cripto' | 'all'
  /** Indica si ya se intentó cargar datos inicialmente */
  hasInitialLoadAttempt: boolean
}

export interface CurrencyContextActions {
  /** Actualizar todas las cotizaciones */
  refreshRates: (showToast?: boolean) => Promise<void>
  /** Actualizar una cotización específica */
  updateRate: (rateId: string, newData: Partial<CryptoRate>) => void
  /** Limpiar errores */
  clearError: () => void
  /** Establecer estado de carga */
  setLoading: (loading: boolean) => void
  /** Establecer la pestaña activa */
  setActiveTab: (tab: 'dolar' | 'euro' | 'cripto' | 'all') => void
}
