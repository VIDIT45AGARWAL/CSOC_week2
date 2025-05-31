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
    <div className='w-80 h-[690px] bg-purple-100 shadow-2xl overflow-y-auto'>
        <h1 className='font-bold text-xl text-center pt-4'>Starred Snippets</h1>
        <div className='flex flex-col space-y-5 items-center mt-4'>
            {starredSnippets.map((snippet)=> (
              <Card snippet={snippet}/>
            ))}        
        </div>
    </div>

  )
}

export default sideBar