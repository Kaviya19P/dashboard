import { useEffect, useState } from "react"
import { Coin } from "./types"
import { notFound } from "next/navigation"

const useFetchCoinList = () => {
    const [coins, setCoin] = useState<Coin[]>([])

    useEffect(() =>{
        const fetchData = async ()=>{
            try{
                const url=new URL("https://api.coingecko.com/api/v3/coins/markets")
                url.searchParams.append("vs_currency", "usd")
                url.searchParams.append("per_page","250");
                url.searchParams.append("page","1")
               
                const res = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY
                    }
                })
                if(!res.ok){
                    throw new Error(`HTTP error: ${res.status}`)
                }
                const coin = await res.json()
                setCoin(coin)
            }catch(err){
                console.log("Failed")
            }         

            }
            fetchData()
        },[])

    return coins;
}

export default useFetchCoinList;