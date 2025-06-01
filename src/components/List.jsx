import React from 'react'
import { Link } from 'react-router-dom'

const List = ({snippet}) => {

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
    <>
        <div className='bg-white flex h-15 items-center p-4 rounded-2xl shadow-lg relative'>
            <Link to='/snippet-view' state={{snippet}}>
                <div className={`text-${chooseColor()} text-xl font-bold`}>
                    <i className ='bx bx-note mr-1'></i>
                    {truncateTitle(snippet.title)}
                </div>
            </Link>
            <div className={`text-${chooseColor()} hidden lg:block absolute right-30`}>
                {renderIcon()}
                {snippet.category}
            </div>
            <div className='absolute right-6 text-2xl'>
                <i className={snippet.isStarred? 'bx bxs-star': 'bx bx-star'} style={{color:'#f3cd08', cursor: 'pointer'}} onClick={handleStarToggle} ></i>
            </div>
        </div>
    </>
  )
}

export default List