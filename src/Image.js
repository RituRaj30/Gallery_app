import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Image = () => {

    const [images,setImages] = useState([]);
    const [uploadedUrls , setUploadedUrls] = useState([]);

  
    const upload = async () => {
        try{
            if(images.length===0) return;

            const p = images.map((image)=>{
                const formData = new FormData();
                formData.append('image',image);

                return axios.post('https://api.imgbb.com/1/upload?key=d309c44cb2231f7de56d7e15c8de2897',formData);
            })
            const responses = await Promise.all(p);
            const urls = responses.map((response)=>response.data.data.url);
            setUploadedUrls((prevUrls)=> [...prevUrls,...urls]);
            setImages([]);
        }catch(error){
            console.error(error);
        }
    }

    const change = async(e)=>{
        const files = Array.from(e.target.files);
        setImages((prevImages)=> [...prevImages,...files]);
    };




  return (
    <>
        <input type='file' onChange={change} />
        <button className='upload' onClick={upload}>Upload</button>
        {uploadedUrls.length>0 && (
            <div>
                <h2>Uploaded Images:</h2>
                {uploadedUrls.map((imageUrl,index)=>(
                    <div key={index}>
                        <img src={imageUrl} alt={`uploaded ${index}`}/>
                       
                        </div>
                ))}
                
            </div>
        )}
    </>
  )
}

export default Image