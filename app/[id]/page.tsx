'use client'

import useFetchCoinData from "@/lib/hooks/useFetchCoinData";
import { useParams } from "next/navigation"

export default function CoinDetail() {
  const param = useParams();
  const id= param.id as string | undefined;
 const coin = useFetchCoinData(id || '');  

  return (
    <div>
      <h1>Coin details: {id}</h1>
      {coin && (
        <>
      <ul key={coin.id}>
        <li>Name: {coin.name}</li>
        <li>Symbol: {coin.symbol}</li>
        <li>Rank: {coin.market_cap_rank}</li>
        <li>Price (USD): {coin.current_price.usd}</li>
        <li>24h Volume:$ {coin.total_volume.usd}</li>
        <li>Total Supply:$ {coin.total_supply}</li>
      </ul>
      </>
      )}
    </div>
  )
}