import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({snippet}) => {

  const handleStarToggle=(e)=>{
    e.preventDefault()
    const snippets=JSON.parse(localStorage.getItem('snippets')) || []
    const updatedSnippets= snippets.map((s)=>
      s.id===snippet.id ? {...s, isStarred: !s.isStarred} : s
    )
    localStorage.setItem('snippets', JSON.stringify(updatedSnippets))
    window.dispatchEvent(new Event('storage'))
  }

  const renderIcon = () =>{
    if(snippet.category==='Code'){
      return(<i className='bx bx-code mr-1' style={{color:'#0b70ef'}}></i>)
    }
    else if(snippet.category==='Links'){
      return(<i className='bx bx-link mr-1' style={{color:'#0b70ef'}}></i>)
    }
    else if(snippet.category==='Notes'){
      return(<i className='bx bxs-edit-alt mr-1' style={{color:'#0b70ef'}}></i>)
    }
  }

  const truncateTitle=(title)=>{
    if(title.length >16){
      return title.slice(0,16) + '...'
    }
    else{
      return title
    }
  }

  return (
    
      <div className='inline-block bg-white w-65 h-45 rounded-lg p-3 shadow-lg relative'>
      <h1 className='flex flex-row font-bold text-blue-700 text-xl'>
        <Link to='/snippet-view' state={{snippet}}>
        <div className='w-53'>
          <i className ='bx bx-note mr-1'></i>
          {truncateTitle(snippet.title)}
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
      <br />
      <h2 className='text-blue-600 absolute bottom-3 left-3'>
        {renderIcon()}
        {snippet.category}
      </h2>
    </div> 
  )
}

export default Card