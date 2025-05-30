import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({onSearch}) => {

  const [search, setSearch] =useState('')

  const handleSearchChange =(e)=>{
    const searchText=e.target.value
    setSearch(searchText)
    onSearch(searchText)
  }

  const handleSearchSubmit=(e)=>{
    e.preventDefault()
    onSearch(search)
  }
  
  return (
    <nav className=''>
        <div className='bg-gradient-to-r from-purple-400 to-purple-800 flex flex-row justify-around h-25 shadow-2xl p-8'>
            
            <Link to="/">
              <div className='text-2xl font-bold cursor-pointer text-gray-900 select-none'>SnippetHub</div>
            </Link>
              <form onSubmit={handleSearchSubmit} className='flex'>
                <input value={search} onChange={handleSearchChange} className='bg-white rounded-l-2xl h-9 p-3 w-110' type="search" placeholder='Search Snippet Title' aria-label='Search' />
                <button type='submit' className='cursor-pointer bg-green-500 h-9 hover:bg-green-400 w-20 rounded-r-2xl '>Search</button>
              </form>                
            <Link to='/add-snippet'>
              <div className='bg-white h-11 rounded-lg w-40 text-blue-500 font-bold text-center text-lg pt-2 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer select-none'>
                  <i className='bx bxs-folder-plus mr-2' ></i>
                  Add Snippet
              </div>
            </Link>                        
        </div>
    </nav>
  )
}

export default NavBar