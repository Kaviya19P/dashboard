
type SearchProps = {
    search: string
    onSearchChange: (value: string) => void 
}
export default function Search({search, onSearchChange} : SearchProps){
    return (
      <div>
        <label>Search</label>
        <input
          type="text"
          value={search}
          placeholder="Type..."
          onChange={(event) => onSearchChange(event.target.value)}
        ></input>
      </div>
    );
}