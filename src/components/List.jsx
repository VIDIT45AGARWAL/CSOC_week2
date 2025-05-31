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

  return (
    <>
        <div className='bg-white flex h-15 items-center p-4 rounded-2xl shadow-lg relative'>
            <Link to='/snippet-view' state={{snippet}}>
                <div className='text-blue-700 text-xl font-bold'>
                    <i className ='bx bx-note mr-1'></i>
                    {snippet.title}
                </div>
            </Link>

            <div className='absolute left-[750px] text-gray-600'>
                DD/MM/YYYY
            </div>
            <div className='text-blue-600 absolute left-[950px]'>
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