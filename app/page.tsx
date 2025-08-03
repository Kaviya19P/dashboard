'use client'

import FilterContainer from "@/components/FilterContainer";
import StarIcon from "@/components/Star";
import { useWatchList } from "@/lib/context/WatchListContext";
import { Coin } from "@/lib/hooks/types";
import useFetchCoinList from "@/lib/hooks/useFetchCoinList";
import { useRouter } from "next/navigation";

import { useState, useEffect, useCallback } from "react";


export default function Home() {
  
  const [page, setPage] = useState(1);
  const items=50;
  const coins = useFetchCoinList();
  const router = useRouter()
  const {addToWatchList, removeFromWatchList, isSaved} = useWatchList() 

  const [filteredCoins, setFiltered] = useState<Coin[]>([])
  
  useEffect(() => {
    setFiltered(coins);
  }, [coins]);

  const totalPage = Math.ceil(filteredCoins.length/items)
  const currentItems = filteredCoins.slice(
    (page-1) * items, page * items
  )

  const paginate = (pageNumber: number)=> setPage(pageNumber)

  const handleRowClick = (id: string) => router.push(`/${id}`)

  const handleFilterChange = useCallback((filteredCoins: Coin[]) => {
    setFiltered(filteredCoins)
    setPage(1)
  },[])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cryptocurrency Prices</h1>
          <p className="text-gray-600">Track the latest cryptocurrency prices and market data</p>
        </div>

        <div className="mb-6">
          <FilterContainer coins={coins} onFilteredChange={handleFilterChange} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Save
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((coin) => (
                  <tr 
                    key={coin.id} 
                    onClick={() => handleRowClick(coin.id)} 
                    style={{cursor: 'pointer'}}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {coin.market_cap_rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {coin.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                      {coin.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${coin.current_price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`${
                        coin.price_change_percentage_24h >= 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${coin.total_volume?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div onClick={(e) => e.stopPropagation()}>
                        <StarIcon coin={coin} size={20} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setPage(prev => Math.max(prev-1, 1))} 
              disabled={page === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Previous
            </button>
            
            {Array.from({length: Math.min(5, totalPage)}, (_, i) => i + 1).map(number => (
              <button 
                key={number} 
                onClick={() => paginate(number)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  page === number
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button 
              onClick={() => setPage(prev => Math.min(prev+1, totalPage))} 
              disabled={page === totalPage}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}
