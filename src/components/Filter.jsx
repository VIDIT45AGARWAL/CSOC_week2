import React from 'react'

const Filter = ({onFilterChange, selectedCategory}) => {

  const handleChange =(e)=>{
    const category=e.target.value
    onFilterChange(category)
  }


  return (
    <>
        <div className='pt-2 flex items-center justify-center bg-gray-300'>
            <select className='w-80 sm:w-120 h-12 border-2 rounded-lg bg-white' value={selectedCategory} onChange={handleChange}>
                <option value="All" selected>All</option>
                <option value="Code">Code</option>
                <option value="Links">Links</option>
                <option value="Notes">Notes</option>
                <option value="Files">Files</option>
            </select>
        </div>
    </>
  )
}

export default Filter