import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({snippet}) => {

  const truncate = (str, maxlength =50) =>{
    str.length > maxlength ? str.slice(0, maxlength) + '...' : str
  }

  return (
    <Link to='/snippet-view' state={{snippet}}>
      <div className='inline-block bg-neutral-200 w-100 h-60 rounded-lg p-3'>
      <h1 className='font-bold text-blue-700 text-xl'>
        <i className ='bx bx-note mr-2'></i>
          {snippet.title}   
      </h1>
      <h2 className='text-gray-600'>
        DD/MM/YYYY
      </h2>
      <br />
      <p className='text-gray-600'>
          {snippet.category==='Links'? truncate(snippet.linkUrl): snippet.category==='Files'? `File: ${snippet.fileName}` : truncate(snippet.content)}
      </p>
      <br />
      <h2 className='text-blue-600'>
        {snippet.category}
      </h2>
    </div>
    </Link> 
  )
}

export default Card