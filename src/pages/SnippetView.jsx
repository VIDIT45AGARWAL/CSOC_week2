import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import SideBar from '../components/sideBar'
import { toast } from 'react-toastify';

const SnippetView = () => {

    const {state} = useLocation()
    const snippet = state.snippet
    
    const navigate=useNavigate()

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

        setTimeout(()=>{
            navigate('/')
        },100)

        toast.success("Snippet has been Deleted", {theme:"colored"})
    }

    const handleCopy = async () =>{
        if(snippet.category==='Links'){
            await navigator.clipboard.writeText(snippet.linkUrl)
        }
        else{
            await navigator.clipboard.writeText(snippet.content)
        }
        toast.success('Copied to Clipboard!', {theme: 'colored'})
    }

    const bodyContent = () =>{
        if(snippet.category==='Code'){
            return(
                <>
                    <pre className='overflow-x-auto shadow-2xl rounded-2xl  sm:w-[calc(100vw-29rem)]'>
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
                    <div className='text-2xl font-bold italic text-center'>
                        {snippet.linkTitle}:
                        <a className='ml-5 text-purple-800' href={snippet.linkUrl} target='_blank'>{snippet.linkUrl}</a>
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
    }

  return (
    <>
    <NavBar/>
        <div className='flex flex-col sm:flex-row'>
            <SideBar/>
            <div className='bg-gray-300 flex flex-row sm:w-[calc(100vw-330px)]' style={{height: 'calc(100vh - 100px)'}}>
                <div className='bg-white m-10 rounded-2xl shadow-2xl relative' style={{width: 'calc(100vw - 5rem)'}}>
                    <h1 className='py-6 font-bold text-3xl text-center'>{snippet.title}</h1>
                    <Link to="/">
                        <i className='bx bx-arrow-back top-6 left-2 absolute text-4xl pl-2' style={{color:'#0b70ef'}} ></i>
                    </Link>
                    <button className='absolute right-8 top-7 text-3xl cursor-pointer' onClick={handleCopy}>
                            <i className='bx bx-copy hover:text-pink-400' style={{color:'#ca03ff'}} ></i>
                    </button>

                    <div className='flex justify-center gap-10 pb-2'>
                        <Link to="/snippet-edit" state={{snippet}}>
                        <button className='bg-green-500 text-white rounded-2xl w-23 p-3 cursor-pointer hover:bg-green-400'>
                            <i className='bx bx-edit mr-2' style={{color:'#f8f9fc'}}></i>
                            Edit
                        </button>
                        </Link>
                        <button onClick={handleDelete} className='bg-red-500 text-white rounded-2xl w-25 p-3 cursor-pointer hover:bg-red-400'>
                            <i class='bx bx-trash mr-2'></i>
                            Delete
                        </button>
                    </div>

                    <div className='p-7 overflow-y-auto overflow-x-auto' style={{height: 'calc(100vh - 360px'}}>
                        {bodyContent()}
                    </div>        
                </div>
            </div>    
        </div>        
    </> 
  )
}

export default SnippetView