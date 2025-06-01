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
      return(<i className='bx bx-code mr-1 text-blue-600'></i>)
    }
    else if(snippet.category==='Links'){
      return(<i className='bx bx-link mr-1 text-violet-600'></i>)
    }
    else if(snippet.category==='Notes'){
      return(<i className='bx bxs-edit-alt mr-1 text-green-600'></i>)
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

  const chooseColor=()=>{
    if(snippet.category==='Notes'){
      return `green-600`
    }
    else if(snippet.category==='Links'){
      return `violet-600`
    }
    else if(snippet.category==='Code'){
      return `blue-600`
    }
  }

  return (
    
      <div className='inline-block bg-white w-65 h-45 rounded-lg p-3 shadow-lg relative'>
      <h1 className={`flex flex-row font-bold text-${chooseColor()} text-xl`}>
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
      <br />
      <br />
      <h2 className={`text-${chooseColor()} absolute bottom-3 left-3`}>
        {renderIcon()}
        {snippet.category}
      </h2>
    </div> 
  )
}

export default Card