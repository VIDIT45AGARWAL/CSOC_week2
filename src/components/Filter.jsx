import React from 'react'

const Filter = ({onFilterChange, selectedCategory, view, toggleView}) => {

  const handleChange =(e)=>{
    const category=e.target.value
    onFilterChange(category)
  }


  return (
    <>
        <div className='pt-2 mb-2 flex  items-center justify-end bg-gray-300' style={{width:'calc(100vw-330px'}}>
            <select className='w-40 lg:w-80 h-12 border-2 rounded-lg bg-white ml-10 mr-auto' value={selectedCategory} onChange={handleChange}>
                <option value="All" selected>All</option>
                <option value="Code">Code</option>
                <option value="Links">Links</option>
                <option value="Notes">Notes</option>
            </select>
            <div className='p-2 text-2xl font-bold w-12 text-center rounded-full bg-white border-2 cursor-pointer mr-10' onClick={toggleView}>
                <i className={view==='list'? 'bx bxs-grid' :'bx bx-list-ul'}></i>
            </div>
        </div>
    </>
  )
}

export default Filter