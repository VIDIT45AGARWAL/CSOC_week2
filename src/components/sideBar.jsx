import React, { useEffect, useState } from 'react'
import Card from './Card'

const sideBar = () => {

  const [starredSnippets, setStarredSnippets] =useState([])

  useEffect(()=>{
    const loadStarredSnippets=()=>{
      const snippets=JSON.parse(localStorage.getItem('snippets')) || []
      const starred= snippets.filter((snippet)=> snippet.isStarred)
      setStarredSnippets(starred)
    }

    loadStarredSnippets()
    window.addEventListener('storage', loadStarredSnippets)
    return ()=> window.removeEventListener('storage', loadStarredSnippets)
  },[])




  return (
    <div className='w-80 bg-purple-100 shadow-2xl'>
        <h1 className='font-bold text-xl text-center pt-4'>Starred Snippets</h1>
        <div>
            {starredSnippets.map((snippet)=> (
              <Card snippet={snippet}/>
            ))}        
        </div>
    </div>

  )
}

export default sideBar