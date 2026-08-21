function Searchbar({search,setSearch}){
    return(
        <input
        type="test"
        placeholder="Search studies..."
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
    )
}
export default Searchbar