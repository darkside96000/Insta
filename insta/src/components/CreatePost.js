import React,{useState,useEffect} from 'react'
import './CreatePost.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  

    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("")

    const navigate= useNavigate()
    //toast Function:
  const notifyA=(msg)=>toast.error(msg)
  
  const notifyB=(message)=>toast.success(message)

    useEffect(() => {
      //saving fetch request in mongo db
      if(url){
        fetch("http://localhost:5000/createPost",{
        method:"post",
        headers:{"Content-Type":"application/json",
        "Authorization":"Skirr"+ localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      body,
      pic:url
    })
      }).then(res=>res.json())
      .then(data=>{if(data.error){
        notifyA(data.error)
      }else{
        notifyB("Posted successfully")
        navigate("/")
      }
    })
      .catch(err=>console.log(err))
  
      }
      
    }, [url])
    

// posting Image to Cloudinary
    const postDetails=()=>{
      console.log(body,image)
      const data= new FormData();
      data.append("file",image)
      data.append("upload_preset","Insta-Clone")
      data.append("cloud_name","darkside96000")
      fetch("https://api.cloudinary.com/v1_1/darkside96000/image/upload",{
        method:"post",
        body:data
      }).then(res=>res.json())
      .then(data=>setUrl(data.url))
      .catch(err=>console.log(err))

      //Sacing post to mongo db
      

    }






    const loadfile=(event)=>{
        var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }

    };
  return (
    <div className='create-post'>
        {/* header */}
      <div className="post-header">
        <h4 style={{margin:"3px auto" ,display:"flex"}}>Create new post</h4>
        <button id='post-btn' onClick={()=>{postDetails()}}>share</button>
      </div>
      <hr/>
      {/* image-preview */}
      <img id='output' alt="img" src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png'/>
      <div className="main-div">
        <input type="file" accept='image/*' onChange={(event)=>{loadfile(event);
      setImage(event.target.files[0]) 
      }}
        
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
            <div className="card-pic">
                <img src='https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60' alt=''/>
            </div>
            <h5>darkside096000</h5>
        </div>
        {/* text-area */}
        <textarea value={body} onChange={(e)=>{
          setBody(e.target.value)
        }} type="text" placeholder='write a caption' style={{width:"100%",outline:"none",border:"none"}}></textarea>
      </div>
    </div>
  )
}

export default CreatePost;
