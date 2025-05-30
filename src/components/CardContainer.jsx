import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import Filter from './Filter'
import NavBar from './NavBar'

const CardContainer = () => {

  const [snippets, setSnippets] = useState([])
  const [filterCategory, setFilterCategory] =useState('All')
  const [search, setSearch]=useState('')


  useEffect(()=>{
    const storedSnippets = JSON.parse(localStorage.getItem('snippets')) || []
    setSnippets(storedSnippets)
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
      <div className='bg-gray-300 h-172 p-8'>
        <Filter onFilterChange={setFilterCategory} selectedCategory={filterCategory}/>
        <div className='flex flex-wrap gap-4 justify-center'>
          {
            filteredSnippets.map((snippet)=>(
              <Card key={snippet.id} snippet={snippet}/>
            ))
          }
        </div>
      </div> 
    </>       
  )
}

export default CardContainer