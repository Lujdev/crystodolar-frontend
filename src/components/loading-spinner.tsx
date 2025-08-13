import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  /** Tamaño del spinner */
  size?: 'sm' | 'md' | 'lg'
  /** Texto opcional a mostrar debajo del spinner */
  text?: string
}

/**
 * Componente de spinner de carga reutilizable
 * Adaptado para la aplicación venezolana con colores de la bandera
 * Responsabilidad única: mostrar indicador de carga
 */
export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      {text && (
        <p className="text-sm text-gray-600 text-center max-w-xs">{text}</p>
      )}
    </div>
  )
}
