import { CryptoRate } from '@/types/currency'

/**
 * Datos mock para cotizaciones USDT/Bs en Venezuela
 * En producción, estos datos vendrían de APIs del BCV y Binance P2P
 * Solo dos fuentes: oficial (fiat) y crypto
 */
export const mockCryptoRates: CryptoRate[] = [
  {
    id: 'usd-bcv',
    name: 'USD Oficial',
    category: 'dolar',
    buy: 36.50,
    sell: 36.50,
    variation: 0.0,
    lastUpdate: new Date(),
    type: 'fiat',
    color: 'bg-blue-600',
    description: 'Banco Central de Venezuela - USD/VES',
    baseCurrency: 'USD',
    quoteCurrency: 'VES',
    tradeType: 'official'
  },
  {
    id: 'usdt-binance_p2p',
    name: 'USDT Binance',
    category: 'cripto',
    buy: 37.20,
    sell: 37.80,
    variation: -1.2,
    lastUpdate: new Date(),
    type: 'crypto',
    color: 'bg-yellow-600',
    description: 'Binance P2P - USDT/VES',
    baseCurrency: 'USDT',
    quoteCurrency: 'VES',
    tradeType: 'p2p'
  }
]

/**
 * Función para formatear valores en Bolívares Soberanos
 * @param value - Valor numérico a formatear
 * @returns String formateado con símbolo Bs.S
 */
export function formatBolivares(value: number): string {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value).replace('VES', 'Bs.S')
}

/**
 * Función para formatear porcentajes de variación
 * @param variation - Valor decimal de variación (-1.2 para -1.2%)
 * @returns String formateado con signo y símbolo de porcentaje
 */
export function formatVariation(variation: number): string {
  const sign = variation >= 0 ? '+' : ''
  return `${sign}${variation.toFixed(2)}%`
}

/**
 * Función para obtener el color de la variación
 * @param variation - Valor de variación
 * @returns Clase CSS para colorear según si es positiva o negativa
 */
export function getVariationColor(variation: number): string {
  if (variation > 0) return 'text-green-600'
  if (variation < 0) return 'text-red-600'
  return 'text-gray-600'
}

/**
 * Función para calcular la brecha entre tasa fiat y crypto
 * @param fiatRate - Tasa oficial fiat (BCV)
 * @param cryptoRate - Tasa crypto (Binance P2P)
 * @returns Porcentaje de brecha fiat vs crypto
 */
export function calculateCryptoGap(fiatRate: number, cryptoRate: number): number {
  return ((cryptoRate - fiatRate) / fiatRate) * 100
}
