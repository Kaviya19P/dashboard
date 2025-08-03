'use client'
import { useEffect, useState } from "react";
import Search from "./Search";
import Filter from "./Filter";
import { Coin } from "@/lib/hooks/types";


type FilterContainerProps = {
    coins: Coin[]
    onFilteredChange: (filteredCoins: Coin[]) => void
}

export default function FilterContainer({coins, onFilteredChange}: FilterContainerProps){
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [search, setSearch] = useState("")

    const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(event.target.value)
    }

    const handleSearch = (newSearch: string) => {
        setSearch(newSearch)
    }

    useEffect(() => {
        const filteredCoin = coins.filter((coin) => {
          return (
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
          );
        });

        const sortedCoins = [...filteredCoin].sort((a, b) => {
          switch (selectedFilter) {
            case "volume":
              return b.total_volume - a.total_volume;
            case "rank":
              return a.market_cap_rank - b.market_cap_rank;
            case "price_change":
              return (
                b.price_change_percentage_24h - a.price_change_percentage_24h
              );
            default:
              return a.market_cap_rank - b.market_cap_rank;
          }
        });
        onFilteredChange(sortedCoins)
    },[coins, search, selectedFilter, onFilteredChange])
    return(
        <div>
            <Search search={search} onSearchChange={handleSearch}/>
            <Filter selectedFilter={selectedFilter} onFilterChange={handleFilter}/>
            
        </div>
    )
}