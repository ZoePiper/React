function StudyCard({ study,
    setCategory, 
    setDirection,
    setPage }) {
  const categories =study.category || []
  const nextSteps =study.nextStep ||[]
    return (
        
    <div className="card">
      <h2>{study.title}</h2>
      
 {study.url ? (
  <a
    href={study.url}
    target="_blank"
    rel="noreferrer"
    className="course-link"
  >
  <p>{study.platform}</p>
  </a>
          ):(
            <p>{study.platform}</p>
)}




      <p>{study.status}</p>
<div className="progress-wrapper" >
    <div className="progress-label">
{study.progress}% complete
    </div>

    <div className="progress-bar">
        <div 
        className="progress-fill"
        style={{width: `${study.progress}%`}}
        > </div>
    </div>
    </div>

<div className="card-section">
  <h3>Direction</h3>
  <button 
className="tag"
onClick={()=>{
    setDirection(study.direction)
    setPage(1)
}}
>
{study.direction}
</button>
</div>
      <div className="card-section">
        <h3>Categories</h3>

        {categories.map((item) => (
          <button
           key={item} 
           className="tag"
           onClick={()=>{
            setCategory(item)
            setPage(1)
           }}>
            {item}
          </button>
        ))}
      </div>

      <div className="card-section">
        <h3>Next step</h3>

        {nextSteps.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>
  
    </div>
  
  )
}

export default StudyCard