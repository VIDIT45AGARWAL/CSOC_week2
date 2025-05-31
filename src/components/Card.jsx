import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({snippet}) => {

  // const truncate = (str, maxlength =50) =>{
  //   str.length > maxlength ? str.slice(0, maxlength) + '...' : str
  // }

  const handleStarToggle=(e)=>{
    e.preventDefault()
    const snippets=JSON.parse(localStorage.getItem('snippets')) || []
    const updatedSnippets= snippets.map((s)=>
      s.id===snippet.id ? {...s, isStarred: !s.isStarred} : s
    )
    localStorage.setItem('snippets', JSON.stringify(updatedSnippets))
    window.dispatchEvent(new Event('storage'))
  }

  return (
    
      <div className='inline-block bg-white w-65 h-45 rounded-lg p-3'>
      <h1 className='flex flex-row font-bold text-blue-700 text-xl'>
        <Link to='/snippet-view' state={{snippet}}>
        <div className='w-53'>
          <i className ='bx bx-note'></i>
          {snippet.title}
        </div>
        </Link>
        <div>
          <i className={snippet.isStarred? 'bx bxs-star': 'bx bx-star'} style={{color:'#f3cd08', cursor: 'pointer'}} onClick={handleStarToggle} ></i>
        </div>
           
      </h1>
      <h2 className='text-gray-600'>
        DD/MM/YYYY
      </h2>
      <br />
      {/* <p className='text-gray-600'>
          {snippet.category==='Links'? truncate(snippet.linkUrl): snippet.category==='Files'? `File: ${snippet.fileName}` : truncate(snippet.content)}
      </p> */}
      <br />
      <h2 className='text-blue-600'>
        {snippet.category}
      </h2>
    </div> 
  )
}

export default Card