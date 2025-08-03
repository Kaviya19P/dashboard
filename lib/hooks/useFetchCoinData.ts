
import { notFound } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type CoinDetail = {
    id: string
    name: string 
    symbol: string
    market_cap_rank: number
    current_price: {
        usd: number
    }
    total_volume: {
        usd: number
    }
    total_supply: number

}

const cache = new Map<string, CoinDetail>();

const useFetchCoinData = (id: string) =>{    
    const [coin, setCoin] = useState<CoinDetail | null>(null)
    const controlRef = useRef<AbortController | null>(null)

    useEffect(()=>{
        if(!id) return;

        if(cache.has(id)){
            setCoin(cache.get(id)!)
            return;
        }
        
        const fetchCoinData = async () =>{
            controlRef.current?.abort();
            const controller = new AbortController()
            controlRef.current=controller
            try{
                const url = `https://api.coingecko.com/api/v3/coins/${id}`
                
                const res = await fetch(url,{signal: controller.signal})
                
                if(!res.ok){
                    throw new Error(`HTTP error: ${res.status}`)
                }
                const data = await res.json()
                const coinData: CoinDetail = {
                    id: data.id,
                    name: data.name,
                    symbol: data.symbol,
                    market_cap_rank: data.market_cap_rank,
                    current_price: {
                        usd: data.market_data.current_price.usd,
                    },
                    total_volume: {
                        usd: data.market_data.total_volume.usd,
                    },
                    total_supply: data.market_data.total_supply

                }
                cache.set(id, coinData)
                setCoin(coinData)

            }catch(err){
                console.log("failed to fetch id")
            }
        }
        fetchCoinData()
        return()=>{
            controlRef.current?.abort()
        }
    },[id])
    return coin

}

export default useFetchCoinData