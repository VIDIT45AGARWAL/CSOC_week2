import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { toast } from 'react-toastify'

const SnippetEdit = () => {

    const {state}=useLocation()
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
            title : "",
            category: 'Code',
            content : '',
            linkUrl: '',
            linkTitle: '',
            language: 'cpp',
    })

    useEffect(()=>{
        setFormData({
            title: state.snippet.title || '',
            category: state.snippet.category || 'Code',
            content: state.snippet.content || '',
            linkUrl: state.snippet.linkUrl || '',
            linkTitle: state.snippet.linkTitle || '',
            language: state.snippet.language || 'cpp',
        })
    },[state])

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData((prev => ({...prev, [name]: value,})))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        const snippets=JSON.parse(localStorage.getItem('snippets')) || []

        const updatedSnippets=snippets.map((s)=> s.id===state.snippet.id ?
            {...s, title:formData.title,
                category:formData.category,
                content:formData.content,
                linkUrl:formData.linkUrl,
                linkTitle:formData.linkTitle,
                language: formData.language,
            } : s
        )

        localStorage.setItem('snippets', JSON.stringify(updatedSnippets))

        setTimeout(()=>{
            navigate('/snippet-view', {state : {snippet : updatedSnippets.find((s)=> s.id=== state.snippet.id)}})
        }, 100)

        toast.success("Snippet has been Edited", {theme:"colored"})
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
                    <textarea className='mt-2 p-2 border-2 rounded-lg w-68 sm:w-135 md:w-175 h-30 border-gray-500' name="content" id="code" value={formData.content} onChange={handleChange} placeholder='Enter your code'></textarea>
                </div>    
            )
        }
        else if(formData.category==='Links'){
            return(
                <>
                    <input className='mt-2 mx-6 p-3 sm:w-135 md:w-175 border-2 border-gray-500 rounded-lg' name='linkUrl' type="url" value={formData.linkUrl} onChange={handleChange} placeholder='https://example.com'/> <br />
                    <input className='mt-3 mx-6 p-3 sm:w-135 md:w-175 border-2 border-gray-500 rounded-lg' name='linkTitle' type="text" value={formData.linkTitle} onChange={handleChange} placeholder='Link title' />
                </>
            )
        }
        else if(formData.category==='Notes'){
            return(
                <>
                <textarea value={formData.content} onChange={handleChange} className='mx-6 md:w-175 p-2 border-2 h-40 border-gray-500 rounded-lg' name="content" placeholder='Enter snippet content'></textarea>
                </>
            )
        }
    }


  return (
    <>
        <NavBar/>
        <div className='flex justify-center bg-gray-300 h-172 xl:h-[calc(100vh)] p-8'>
        <div className='bg-white w-80 sm:w-150 md:w-190 rounded-xl shadow-2xl'>
            <h1 className='font-bold py-6  text-3xl text-center'>Edit Snippet</h1>
            <form onSubmit={handleSubmit}>
            <div>
                <label className='font-bold px-6 text-xl' htmlFor="">Title</label> <br />
                <input className='mx-6 p-3 sm:w-135 md:w-175 border-2 border-gray-500 rounded-lg' type="text" name='title' value={formData.title} onChange={handleChange} placeholder='Enter snippet title' />
            </div>
             <br />

             <div>
                <label className='font-bold text-xl px-6' htmlFor="category">Snippet's Category</label> <br /> 
                <select className='mx-6 p-3 border-2 border-gray-500 w-69 sm:w-135 md:w-175 rounded-lg' name="category" id="category" value={formData.category} onChange={handleChange}>
                    <option value="Code">Code</option>
                    <option value="Links">Links</option>
                    <option value="Notes">Notes</option>
                </select>
             </div>
             <br />

             <div>
                <label className='font-bold px-6 text-xl' htmlFor="">Content</label> <br />
                {InputRender()}
             </div>
            
                <div className='flex justify-center mt-6 p-4 gap-7'>
                    <button type='submit' className='bg-green-600 text-white w-50 rounded-lg cursor-pointer p-3 text-sm sm:text-xl hover:bg-green-400'><i className='bx bx-save' style={{color:'#f8f9fc'}} ></i> Save Changes</button>
                    <button onClick={()=> navigate('/snippet-view', {state:{snippet : state.snippet}})} type='button' className='bg-red-500 text-white w-50 rounded-lg cursor-pointer p-3 text-sm sm:text-xl hover:bg-red-400'><i className='bx bx-message-square-x'></i> Cancel</button>
                </div>            
            </form>
        </div>
    </div>
    </>
  )
}

export default SnippetEdit