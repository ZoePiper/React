import { useEffect, useState } from "react"
import StudyCard from "./components/StudyCard.jsx"
import SearchBar from "./components/Searchbar.jsx"
import "./App.css"

function App() {
  const [studies, setStudies] = useState([])
  const [search, setSearch] = useState("")
  const [status, setStatus]= useState("")
  const [category, setCategory]= useState("")
  const [page, setPage]= useState(1)
  const [total, setTotal] = useState (0)
  const limit = 6
  const totalPages = Math.ceil(total / limit)
  const [direction,setDirection] =useState ("")

 useEffect(() => {
fetch(`http://localhost:3000/api/studies?search=${search}&status=${status}&category=${category}&direction=${direction}&page=${page}&limit=${limit}`)

.then((res) => res.json())
    .then((data) => {
      setStudies(data.results || data)
      setTotal(data.total)
    })
}, [search, status, category,direction,page])



  return (
    <div>
    
      <h1>Study Tracker</h1>
      
      <div className="filters">
      <SearchBar
      search={search}
      setSearch = {(value)=>{
        setSearch(value)
        setPage(1)
      }}
      />
<select 
value={status} 
onChange={(e) => {
  setStatus (e.target.value)
  setPage(1)
}}
>
<option value="">All statuses</option> 
<option value="In Progress">In Progress</option>
<option value="Completed">Completed</option>
</select>

<select 
value={category} 
onChange={(e) => {
  setCategory (e.target.value)
  setPage(1)
  }}
  >
<option value=""> All Categories</option>
<option value="HTML">HTML</option>
<option value="JavaScript">JavaScript</option>
<option value="CSS">CSS</option>
<option value="TypeScript">TypeScript</option>
<option value="Git">Git</option>
<option value="React">React</option>
<option value="Node.js">Node.js</option>
<option value="REST API">REST API</option>
<option value="SQL">SQL</option>
<option value="Docker">Docker</option>

</select>


<select value={direction}
onChange={(e)=>{
  setDirection(e.target.value)
  setPage(1)
}}
>
<option value=""> Alle directions</option>
<option value="Frontend">Frontend</option>
<option value="Backend">Backend</option>
<option value="AI Engineering">AI Engineering</option>
</select>
</div>

{category && (
  <p>
    Current category: <strong>{category}</strong>
  </p>
)}
{category && (
<button
  onClick={() => {
    setSearch("")
    setStatus("")
    setCategory("")
    setDirection("")
    setPage(1)
  }}
>
  Clear All Filters
</button>
)}



{studies.length === 0 ? (
  <p>No studies found.</p>
) : (
  <div className="study-grid">
  {studies.map((study) => (
    <StudyCard
    key={study.id}
      study={study}
      setCategory={setCategory}
      setDirection={setDirection}
      setPage={setPage}
    />
  ))}
  </div>
)}

    <div className="pagination">
      <button 
      onClick={()=> setPage(page-1)} 
      disabled={page === 1}>
        Previous
      </button>

      <span>Page {page}</span>
      <button onClick={()=> setPage(page +1)}
        disabled={page === totalPages}>
        Next
      </button>
    </div>
    </div>

    
  )
}

export default App