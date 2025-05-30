import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

const NewSnippet = () => {

    const [formData, setFormData] = useState({
        title : "",
        category: 'Code',
        content : '',
        file: null,
        linkUrl: '',
        linkTitle: '',
        language: 'cpp',
    })

    const handleChange = (e) =>{
        const {name, value, files} = e.target
        setFormData((prev => ({...prev, [name]: files? files[0]: value,})))
    }

    const handleSubmit =(e) =>{
        e.preventDefault()
        const existingSnippets = JSON.parse(localStorage.getItem('snippets')) || []

        const newSnippet = {
            id: Date.now(),
            title: formData.title,
            category: formData.category,
            content: formData.content,
            linkUrl: formData.linkUrl,
            linkTitle: formData.linkTitle,
            language: formData.language,
            fileName: formData.file? formData.file.name : null,
        }

        const updatedSnippets = [...existingSnippets, newSnippet]
        localStorage.setItem('snippets', JSON.stringify(updatedSnippets))

        setFormData({
            title : "",
            category: 'Code',
            content : '',
            file: null,
            linkUrl: '',
            linkTitle: '',
            language: 'cpp',    
        })
    }

    const InputRender = () =>{
        if(formData.category==='Code'){
            return(
                <div className='px-6'>
                    <label className='font-bold mr-4' htmlFor="language">Choose Language:</label>
                    <select className='mt-2 border-2 rounded-sm' name="language" id="language" value={formData.language} onChange={handleChange}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="js">JavaScript</option>
                    </select> <br />
                    <textarea className='mt-2 p-2 border-2 rounded-lg w-175 h-30 border-gray-500' name="content" id="code" value={formData.content} onChange={handleChange} placeholder='Enter your code'></textarea>
                </div>    
            )
        }
        else if(formData.category==='Links'){
            return(
                <>
                    <input className='mt-2 mx-6 p-3 w-175 border-2 border-gray-500 rounded-lg' name='linkUrl' type="url" value={formData.linkUrl} onChange={handleChange} placeholder='https://example.com'/> <br />
                    <input className='mt-3 mx-6 p-3 w-175 border-2 border-gray-500 rounded-lg' name='linkTitle' type="text" value={formData.linkTitle} onChange={handleChange} placeholder='Link title' />
                </>
            )
        }
        else if(formData.category==='Notes'){
            return(
                <>
                <textarea value={formData.content} onChange={handleChange} className='mx-6 w-175 p-2 border-2 h-40 border-gray-500 rounded-lg' name="content" placeholder='Enter snippet content'></textarea>
                </>
            )
        }
        else{
            return(
            <>
                <input className='hidden mx-6 border-2 p-3 w-175 border-gray-500 rounded-lg' type="file" id='file' name='file' onChange={handleChange}/>
                <label htmlFor="file" className='mt-2 mx-6 inline-block bg-green-600 text-white rounded-lg cursor-pointer p-3 text-center'>Choose File</label>
                {formData.file && (
                    <div className="inline-block border-2 border-gray-500 p-3 rounded-lg mt-2 text-gray-600 text-sm">
                    Selected: {formData.file.name}
                    </div>
                )}
            </>
            )
        }
    }

  return (
    <>
        <NavBar/>
        <div className='flex justify-center bg-gray-300 h-172 p-8'>
        <div className='bg-white w-190 rounded-xl shadow-2xl'>
            <h1 className='font-bold py-6  text-3xl text-center'>Create Snippet</h1>
            <form onSubmit={handleSubmit}>
            <div>
                <label className='font-bold px-6 text-xl' htmlFor="">Title</label> <br />
                <input className='mx-6 p-3 w-175 border-2 border-gray-500 rounded-lg' type="text" name='title' value={formData.title} onChange={handleChange} placeholder='Enter snippet title' />
            </div>
             <br />

             <div>
                <label className='font-bold text-xl px-6' htmlFor="category">Snippet's Category</label> <br /> 
                <select className='mx-6 p-3 border-2 border-gray-500 w-175 rounded-lg' name="category" id="category" value={formData.category} onChange={handleChange}>
                    <option value="Code">Code</option>
                    <option value="Links">Links</option>
                    <option value="Notes">Notes</option>
                    <option value="Files">Files</option>
                </select>
             </div>
             <br />

             <div>
                <label className='font-bold px-6 text-xl' htmlFor="">Content</label> <br />
                {InputRender()}
             </div>
            
            <Link to="/">
                <div className='text-center mt-6 p-4'>
                    <button type='submit' className='bg-green-600 text-white w-100 rounded-lg cursor-pointer p-3 text-2xl'>Add Snippet</button>
                </div>
            </Link>
            
            </form>
        </div>
    </div>
    </>
    
  )
}

export default NewSnippet