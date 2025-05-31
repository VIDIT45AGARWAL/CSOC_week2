import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import Filter from './Filter'
import NavBar from './NavBar'
import SideBar from '../components/sideBar'

const CardContainer = () => {

  const [snippets, setSnippets] = useState([])
  const [filterCategory, setFilterCategory] =useState('All')
  const [search, setSearch]=useState('')


  useEffect(()=>{
    const loadSnippets=()=>{
    const storedSnippets = JSON.parse(localStorage.getItem('snippets')) || []
    setSnippets(storedSnippets)
    }

    loadSnippets()
    window.addEventListener('storage', loadSnippets)
    return ()=> window.removeEventListener('storage', loadSnippets)
  },[])


  let filteredSnippets
  if(search){
    filteredSnippets=snippets.filter((snippet)=> snippet.title.toLowerCase().includes(search.toLowerCase()))
  } else{
    if(filterCategory==='All'){
      filteredSnippets = snippets
    }
    else{
      filteredSnippets=snippets.filter((snippet)=> snippet.category === filterCategory)
    }
  }


  return (
    <>
      <NavBar onSearch={setSearch}/>
      <div className='flex flex-row'>
          <SideBar/>
          <div>
            <Filter onFilterChange={setFilterCategory} selectedCategory={filterCategory}/>
            <div className='bg-gray-300 h-172 w-301 p-8'>      
              <div className='flex flex-wrap gap-4'>
                {
                  filteredSnippets.map((snippet)=>(
                    <Card key={snippet.id} snippet={snippet}/>
                  ))
                }
              </div>
            </div> 
          </div>
      </div>      
    </>       
  )
}

export default CardContainer