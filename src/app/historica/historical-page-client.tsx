'use client'

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver' // Esta línea causaba el error
import { HistoricalChart } from '@/components/historical-chart'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

interface HistoricalRate {
  fecha: string
  'bcv-usd': number
  'bcv-euro': number
  'binance-buy': number
  'binance-sell': number
}

interface HistoricalPageClientProps {
  data: HistoricalRate[]
}

/**
 * Función para exportar los datos a un archivo Excel.
 * @param data Array de datos históricos.
 */
const exportToExcel = (data: HistoricalRate[]) => {
  if (data.length === 0) {
    toast.warning('No hay datos para exportar.')
    return
  }

  // Mapear los datos a un formato más legible para Excel con encabezados personalizados
  const worksheetData = data.map((item) => ({
    Fecha: item.fecha,
    'BCV Dólar (Venta)': item['bcv-usd'],
    'BCV Euro (Venta)': item['bcv-euro'],
    'Binance (Compra)': item['binance-buy'],
    'Binance (Venta)': item['binance-sell'],
  }))

  // Crear la hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(worksheetData)

  // Crear el libro de trabajo
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial de Tasas')

  // Generar el buffer del archivo Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  // Crear un Blob a partir del buffer
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  })

  // Descargar el archivo
  saveAs(blob, `historial_tasas_${new Date().toISOString().split('T')[0]}.xlsx`)
  toast.success('La exportación a Excel ha comenzado.')
}

/**
 * Componente de cliente para la página histórica.
 * Maneja la interactividad como la exportación a Excel y la visualización del gráfico.
 */
export function HistoricalPageClient({ data }: HistoricalPageClientProps) {
  // Preparar los datos para el componente de la gráfica
  const chartData = data.map((item) => ({
    time: new Date(item.fecha),
    bcv: item['bcv-usd'],
    binance: item['binance-sell'], // Usamos la venta de Binance para la gráfica
  }))

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          onClick={() => exportToExcel(data)}
          disabled={data.length === 0}
          className="cursor-pointer"
        >
          <Download className="mr-2 h-4 w-4" />
          Exportar a Excel
        </Button>
      </div>
      <HistoricalChart data={chartData} />
    </div>
  )
}