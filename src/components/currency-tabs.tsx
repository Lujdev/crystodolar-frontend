'use client'

import { DollarSign, Euro, Zap } from 'lucide-react'
import { useCryptoContext } from '@/lib/crypto-context'

interface CurrencyTab {
  id: 'all' | 'dolar' | 'euro' | 'cripto'
  name: string
  icon: React.ReactNode
  isActive?: boolean
}

interface CurrencyTabsProps {
  onTabChange?: (tabId: string) => void
}

/**
 * Componente de pestañas para navegar entre tipos de monedas
 * Inspirado en el diseño de dolarito.ar
 */
export function CurrencyTabs({ onTabChange }: CurrencyTabsProps) {
  const { activeTab, setActiveTab } = useCryptoContext()

  const tabs: CurrencyTab[] = [
    {
      id: 'all',
      name: 'Todos',
      icon: <span className="text-sm font-bold">ALL</span>,
      isActive: true
    },
    {
      id: 'dolar',
      name: 'Dólar',
      icon: <DollarSign className="h-4 w-4" />,
      isActive: false
    },
    {
      id: 'euro',
      name: 'Euro',
      icon: <Euro className="h-4 w-4" />
    },
    {
      id: 'cripto',
      name: 'Cripto',
      icon: <Zap className="h-4 w-4" />
    }
  ]

  const handleTabClick = (tabId: CurrencyTab['id']) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-gray-800 rounded-full p-1 space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === tab.id 
                ? tab.id === 'dolar' 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-gray-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }
            `}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
