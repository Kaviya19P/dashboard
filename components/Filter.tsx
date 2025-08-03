import React from "react"
type FilterProps = {
    selectedFilter: string;
    onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function Filter({selectedFilter, onFilterChange}: FilterProps){
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
          <div className="text-center space-y-6">
            <div className="mb-6">
              
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
            </div>

            <div className="space-y-4">
              <label
                htmlFor="colorful-filter"
                className="block text-lg font-semibold text-gray-700 tracking-wide"
              >
                Filter
              </label>

              <select
                id="colorful-filter"
                value={selectedFilter}
                onChange={onFilterChange}
                className="w-full px-6 py-4 text-lg font-medium text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                <option value="all" className="bg-white text-gray-700 py-2">
                  🌟 All Coins
                </option>
                <option value="volume" className="bg-white text-gray-700 py-2">
                  📊 High Volume
                </option>
                <option
                  value="price_change"
                  className="bg-white text-gray-700 py-2"
                >
                  📈 Price Change (24h)
                </option>
                <option value="rank" className="bg-white text-gray-700 py-2">
                  🏆 Market Cap Rank
                </option>
              </select>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-red-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-32 right-20 w-16 h-16 bg-blue-300/30 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-32 w-24 h-24 bg-green-300/30 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 right-10 w-12 h-12 bg-purple-300/30 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
    );
        
}