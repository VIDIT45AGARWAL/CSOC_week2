import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import { Link, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'

const SnippetView = () => {

    const {state} = useLocation()
    const snippet = state.snippet 

    useEffect(()=>{
        Prism.highlightAll()
    },[snippet.content, snippet.language])


    const handleDelete = () =>{
        try{
            const snippets =JSON.parse(localStorage.getItem('snippets')) || []
            const updatedSnippets=snippets.filter((s)=> s.id !== snippet.id)
            localStorage.setItem('snippets', JSON.stringify(updatedSnippets))
        }
        catch(error){
            console.error('Delete error: ',error)
        }
    }


    const bodyContent = () =>{
        if(snippet.category==='Code'){
            return(
                <>
                    <pre>
                        <code className={`language-${snippet.language}`}>
                            {snippet.content}
                        </code>
                    </pre>
                </>
            )
        }
        else if(snippet.category==='Links'){
            return(
                <>
                    <div>
                        <a href={snippet.linkUrl} target='_blank'>{snippet.linkTitle}</a>
                    </div>
                </>
            )
        }
        else if(snippet.category==='Notes'){
            return(
                <>
                    <div>
                        <p>
                            {snippet.content}
                        </p>
                    </div>
                </>
            )
        }
        else{
            return(
                <>
                    <div>
                        <p>
                            {snippet.fileName}
                        </p>
                    </div>
                </>
            )
        }
    }

  return (
    <>
    <NavBar/>
    <div className='flex justify-center bg-gray-300 h-172 p-8'>
        <div className='bg-white w-screen rounded-xl shadow-2xl'>
            <h1 className='font-bold py-6  text-3xl text-center'>{snippet.title}</h1>
            <div className='flex space-x-18 justify-center'>
                <Link to="/snippet-edit" state={{snippet}}>
                    <button className='bg-green-500 text-white rounded-2xl w-23 p-3 cursor-pointer'>Edit</button>
                </Link>
                 <button onClick={handleDelete} className='bg-red-500 text-white rounded-2xl w-23 p-3 cursor-pointer'>Delete</button>
            </div>
             <br />

             <div className='mx-10 border-2 rounded-lg h-60'>
                {bodyContent()}
             </div>
             <br />
        </div>
    </div>
    </>
    
  )
}

export default SnippetView