'use client';

import { useState, useEffect } from 'react';
import { HistoricalChart } from '@/components/historical-chart';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LoadingSpinner } from '@/components/loading-spinner';

interface HistoricalRate {
  id: number;
  exchange_code: string;
  currency_pair: string;
  buy_price: number;
  sell_price: number;
  avg_price: number;
  timestamp: string; // ISO format
  source: string;
  trade_type: string;
}

interface ApiResponse {
  status: string;
  data: HistoricalRate[];
  count: number;
  limit?: number;
  timestamp: string;
}

export default function HistoryPage() {
  const [historicalData, setHistoricalData] = useState<HistoricalRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExchange, setSelectedExchange] = useState<string>('all');
  const [limit, setLimit] = useState<number>(100);
  
  // Date range state
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [dateRangePreset, setDateRangePreset] = useState<string>('7d');

  // Set default date ranges based on preset
  useEffect(() => {
    const now = new Date();
    const end = now.toISOString().split('T')[0]; // Today
    let start = '';
    
    switch (dateRangePreset) {
      case '7d':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case '30d':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case '90d':
        start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case '1y':
        start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case 'custom':
        // Don't change dates for custom
        return;
      default:
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
    
    setStartDate(start);
    setEndDate(end);
  }, [dateRangePreset]);

  const fetchHistoricalData = async (exchangeCode?: string, limitParam?: number, startDateParam?: string, endDateParam?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build API URL with parameters
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const params = new URLSearchParams();
      
      if (limitParam) {
        params.append('limit', limitParam.toString());
      }
      
      // Note: The API documentation doesn't show date filtering parameters,
      // but we'll implement client-side filtering for now
      let url = `${baseUrl}/api/v1/rates/history`;
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponse = await response.json();
      
      if (apiResponse.status === 'success') {
        let filteredData = apiResponse.data;
        
        // Filter by exchange if specified
        if (exchangeCode && exchangeCode !== 'all') {
          filteredData = filteredData.filter(
            rate => rate.exchange_code.toLowerCase() === exchangeCode.toLowerCase()
          );
        }
        
        // Filter by date range (client-side)
        if (startDateParam && endDateParam) {
          const startTime = new Date(startDateParam).getTime();
          const endTime = new Date(endDateParam + 'T23:59:59.999Z').getTime();
          
          filteredData = filteredData.filter(rate => {
            const rateTime = new Date(rate.timestamp).getTime();
            return rateTime >= startTime && rateTime <= endTime;
          });
        }
        
        // Sort by timestamp (newest first)
        filteredData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        setHistoricalData(filteredData);
      } else {
        throw new Error('API returned error status');
      }
    } catch (err) {
      console.error('Error fetching historical data:', err);
      setError('Failed to fetch historical data. Using fallback data.');
      
      // Fallback to local data
      try {
        const fallbackResponse = await fetch('/data/historical-rates.json');
        const fallbackData = await fallbackResponse.json();
        
        // Transform fallback data to match API structure
        let transformedData: HistoricalRate[] = fallbackData.map((item: { 'bcv-usd': number; fecha: string }, index: number) => ({
          id: index + 1,
          exchange_code: 'BCV',
          currency_pair: 'USD/VES',
          buy_price: item['bcv-usd'],
          sell_price: item['bcv-usd'],
          avg_price: item['bcv-usd'],
          timestamp: new Date(item.fecha).toISOString(),
          source: 'bcv',
          trade_type: 'official'
        }));
        
        // Apply date filtering to fallback data
        if (startDateParam && endDateParam) {
          const startTime = new Date(startDateParam).getTime();
          const endTime = new Date(endDateParam + 'T23:59:59.999Z').getTime();
          
          transformedData = transformedData.filter(rate => {
            const rateTime = new Date(rate.timestamp).getTime();
            return rateTime >= startTime && rateTime <= endTime;
          });
        }
        
        setHistoricalData(transformedData);
      } catch (fallbackErr) {
        console.error('Fallback data also failed:', fallbackErr);
        setError('Failed to load any historical data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchHistoricalData(
        selectedExchange === 'all' ? undefined : selectedExchange, 
        limit,
        startDate,
        endDate
      );
    }
  }, [selectedExchange, limit, startDate, endDate]);

  const handleExchangeChange = (exchange: string) => {
    setSelectedExchange(exchange);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleDateRangePresetChange = (preset: string) => {
    setDateRangePreset(preset);
  };

  const handleCustomDateChange = () => {
    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      fetchHistoricalData(
        selectedExchange === 'all' ? undefined : selectedExchange,
        limit,
        startDate,
        endDate
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Historical Exchange Rates</h1>
          
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Exchange Filter */}
            <div className="flex flex-col gap-2">
              <label htmlFor="exchange-select" className="text-sm font-medium text-gray-300">
                Exchange:
              </label>
              <select
                id="exchange-select"
                value={selectedExchange}
                onChange={(e) => handleExchangeChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Exchanges</option>
                <option value="BCV">BCV</option>
                <option value="BINANCE_P2P">Binance P2P</option>
              </select>
            </div>
            
            {/* Records Limit */}
            <div className="flex flex-col gap-2">
              <label htmlFor="limit-select" className="text-sm font-medium text-gray-300">
                Records:
              </label>
              <select
                id="limit-select"
                value={limit}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
              </select>
            </div>
            
            {/* Date Range Preset */}
            <div className="flex flex-col gap-2">
              <label htmlFor="date-preset" className="text-sm font-medium text-gray-300">
                Time Period:
              </label>
              <select
                id="date-preset"
                value={dateRangePreset}
                onChange={(e) => handleDateRangePresetChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
                <option value="custom">Custom range</option>
              </select>
            </div>
            
            {/* Refresh Button */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">
                Actions:
              </label>
              <button
                onClick={() => fetchHistoricalData(
                  selectedExchange === 'all' ? undefined : selectedExchange,
                  limit,
                  startDate,
                  endDate
                )}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Refresh Data
              </button>
            </div>
          </div>
          
          {/* Custom Date Range */}
          {dateRangePreset === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
              <div className="flex flex-col gap-2">
                <label htmlFor="start-date" className="text-sm font-medium text-gray-300">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="end-date" className="text-sm font-medium text-gray-300">
                  End Date:
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">
                  Apply Range:
                </label>
                <button
                  onClick={handleCustomDateChange}
                  disabled={!startDate || !endDate || new Date(startDate) > new Date(endDate)}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  Apply Dates
                </button>
              </div>
            </div>
          )}
          
          {/* Current Date Range Display */}
          {startDate && endDate && (
            <div className="mb-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
              <div className="text-sm text-blue-200">
                <strong>Current Range:</strong> {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                {historicalData.length > 0 && (
                  <span className="ml-4">
                    <strong>Records Found:</strong> {historicalData.length}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-yellow-900/50 border border-yellow-700 rounded p-4 mb-6">
              <p className="text-yellow-200">{error}</p>
            </div>
          )}
        </div>
        
        {historicalData.length > 0 ? (
          <HistoricalChart data={historicalData} startDate={startDate} endDate={endDate} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No historical data available for the selected date range.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or selecting a different time period.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}