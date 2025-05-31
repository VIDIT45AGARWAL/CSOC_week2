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
    <div className='w-[330px] bg-purple-100 shadow-2xl overflow-y-auto' style={{ height: 'calc(100vh - 100px)' }}>
        <h1 className='font-bold text-xl text-center pt-4'>Starred Snippets</h1>
        <div className='flex flex-col space-y-5 items-center mt-4 pb-4'>
            {starredSnippets.map((snippet)=> (
              <Card snippet={snippet}/>
            ))}        
        </div>
    </div>

  )
}

export default sideBar