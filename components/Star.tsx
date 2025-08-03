import { useWatchList } from "@/lib/context/WatchListContext";
import { Coin } from "@/lib/hooks/types";

type StarIconProps = {
  coin: Coin;
  size?: number;
};

export default function StarIcon({ coin, size = 24 }: StarIconProps) {
  const { addToWatchList, removeFromWatchList, isSaved } = useWatchList();
  const isWatched = isSaved(coin.id);

  const toggleWatchlist = () => {
    if (isWatched) {
      removeFromWatchList(coin.id);
    } else {
      addToWatchList(coin);
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: `${size}px`,
      }}
      aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
    >
      {isWatched ? "⭐" : "☆"}
    </button>
  );
}
