'use client'

import StarIcon from "@/components/Star"
import { useWatchList } from "@/lib/context/WatchListContext"
import useFetchCoinList from "@/lib/hooks/useFetchCoinList"
import { useRouter } from "next/navigation"

export default function WatchlistPage(){
    const {watch} = useWatchList()
    const router = useRouter()

    const coin = useFetchCoinList()
    const watchlistPrices = watch.map((watchlistCoin) => {
      const currentCoinData = coin.find(
        (marketCoin) => marketCoin.id === watchlistCoin.id
      );
      return currentCoinData
        ? {
            ...watchlistCoin,
            current_price: currentCoinData.current_price,
            price_change_percentage_24h:
              currentCoinData.price_change_percentage_24h,
          }
        : watchlistCoin;
    });

    const handleRowClick = (id: string) => {
      router.push(`/${id}`);
    };
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mx-auto max-w-2xl">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                ⭐ Your Watchlist
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
              <p className="text-gray-600 mt-4 text-lg">
                Track your favorite cryptocurrencies in one place
              </p>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            {watch.length === 0 ? (
              <div className="text-center py-16 px-8">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📊</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">
                  Watchlist is Empty
                </h3>
                <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
                  Your watchlist is empty. Click the star icons to add your
                  favorite coins and track their performance!
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Symbol
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        💰 Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        📈 24h %
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {watchlistPrices.map((coin, index) => (
                      <tr
                        key={coin.id}
                        onClick={() => handleRowClick(coin.id)}
                        className={`cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-[1.02] ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-full text-sm">
                            {coin.market_cap_rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {coin.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 uppercase">
                            {coin.symbol}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          <span className="text-green-600">
                            ${coin.current_price?.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              coin.price_change_percentage_24h >= 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {coin.price_change_percentage_24h >= 0
                              ? "↗️"
                              : "↘️"}
                            {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                            {coin.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <StarIcon coin={coin} size={24} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="fixed top-20 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl animate-pulse pointer-events-none"></div>
          <div
            className="fixed top-40 right-20 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-pulse pointer-events-none"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="fixed bottom-32 left-32 w-24 h-24 bg-green-300/20 rounded-full blur-xl animate-pulse pointer-events-none"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="fixed bottom-20 right-10 w-12 h-12 bg-purple-300/20 rounded-full blur-xl animate-pulse pointer-events-none"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>
    );

}