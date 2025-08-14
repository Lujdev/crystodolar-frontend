import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { CryptoRate } from '@/types/currency'

/**
 * Define la estructura para la entrada de datos históricos.
 */
interface HistoricalRate {
  fecha: string
  'bcv-usd': number
  'bcv-euro': number
  'binance-buy': number
  'binance-sell': number
}

/**
 * Ruta al archivo JSON donde se guardarán los datos históricos.
 * Lo guardaremos en una carpeta `data` en la raíz del proyecto.
 */
const dataFilePath = path.join(process.cwd(), 'data', 'historical-rates.json')

/**
 * Asegura que el directorio donde se guardará el archivo exista.
 */
async function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath)
  try {
    await fs.stat(dirname)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirname, { recursive: true })
    } else {
      throw error
    }
  }
}

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_API_URL is not defined')
    }

    const response = await fetch(`${apiUrl}/rates`) // Asumimos que esta es la URL de tu API de tasas
    if (!response.ok) {
      throw new Error(`Failed to fetch rates: ${response.statusText}`)
    }
    const rates: CryptoRate[] = await response.json()

    const bcvUsdRate = rates.find((r) => r.name === 'BCV')?.sell ?? 0
    const bcvEuroRate = rates.find((r) => r.category === 'euro')?.sell ?? 0
    const binanceBuyRate = rates.find((r) => r.type === 'crypto')?.buy ?? 0
    const binanceSellRate = rates.find((r) => r.type === 'crypto')?.sell ?? 0

    const newEntry: HistoricalRate = {
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 19),
      'bcv-usd': bcvUsdRate,
      'bcv-euro': bcvEuroRate,
      'binance-buy': binanceBuyRate,
      'binance-sell': binanceSellRate,
    }

    await ensureDirectoryExists(dataFilePath)
    const fileContent = await fs.readFile(dataFilePath, 'utf-8').catch(() => '[]')
    const historicalData: HistoricalRate[] = JSON.parse(fileContent)
    historicalData.push(newEntry)
    await fs.writeFile(dataFilePath, JSON.stringify(historicalData, null, 2), 'utf-8')

    return NextResponse.json({ success: true, message: 'Historical data updated.' })
  } catch (error: any) {
    console.error('Error updating historical data:', error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}