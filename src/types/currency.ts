/**
 * Tipos TypeScript para cotizaciones USDT/Bs en Venezuela
 * Define interfaces para el manejo de datos de criptomonedas fiat/crypto
 */

export interface ApiRateData {
  id: number
  exchange_code: string
  currency_pair: string
  base_currency: string
  quote_currency: string
  buy_price: number
  sell_price: number
  avg_price: number
  volume?: number | null
  volume_24h?: number | null
  source: string
  api_method: string
  trade_type: 'official' | 'p2p'
  timestamp: string
  variation_percentage: string
  variation_1h?: string
  variation_24h?: string
  trend_main: 'up' | 'down' | 'stable'
  trend_1h?: 'up' | 'down' | 'stable'
  trend_24h?: 'up' | 'down' | 'stable'
}

export interface ApiResponse {
  status: string
  data: ApiRateData[]
  count: number
  source: string
  auto_saved_to_history: boolean
  timestamp: string
}

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
  /** Moneda base (USD, EUR, USDT) */
  baseCurrency: string
  /** Moneda cotizada (VES) */
  quoteCurrency: string
  /** Tipo de comercio */
  tradeType: 'official' | 'p2p'
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
