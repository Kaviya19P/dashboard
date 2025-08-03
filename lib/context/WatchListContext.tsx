'use client'

import { createContext } from "react";
import { Coin } from "../hooks/types";
import React, { useContext, useEffect, useState } from "react";
import { error } from "console";

type WatchListType = {
    watch: Coin[]
    addToWatchList: (coin: Coin) => void
    removeFromWatchList: (Cid: string) => void
    isSaved: (Cid: string)=> boolean;
}

const WatchList = createContext<WatchListType | undefined>(undefined)

export function WatchListContext({children}: {children:React.ReactNode}){
    const [watch, setWatch] = useState<Coin[]>([]);

    useEffect(()=>{
        const saved = localStorage.getItem('crypto-list')
        if(saved){
            setWatch(JSON.parse(saved))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('crypto-list', JSON.stringify(watch))
    },[watch])

    const addToWatchList = (coin: Coin) => {
        if(!watch.some(c => c.id === coin.id)){
            setWatch(prev => [...prev, coin])
        }
    }

    const removeFromWatchList = (Cid: string) => {
        setWatch(prev => prev.filter(coin => coin.id !== Cid))
    }

    const isSaved = (Cid: string) => {
        return watch.some(coin => coin.id === Cid)
    }

    return (
        <WatchList.Provider value={{watch, addToWatchList, removeFromWatchList, isSaved}}>
            {children}
        </WatchList.Provider>
    )
}

export function useWatchList(){
    const context = useContext(WatchList)
    if(context === undefined) throw new Error('df')
    return context;
}
