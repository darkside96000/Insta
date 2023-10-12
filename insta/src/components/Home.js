import React ,{useEffect ,useState } from 'react'
import './Home.css';
import { useNavigate} from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([])
  const navigate=useNavigate();
  useEffect(() => {
    const token =localStorage.getItem("jwt");
    if(!token){
      navigate("./SignUp");
    }
    //fetch
    fetch("http://localhost:5000/allposts",{
      headers:
      {"Authorization" : "Skirr" + localStorage.getItem("jwt")},
    }).then(res=>res.json())
    .then(result=>setData(result))
    .catch(err=>console.log(err))
  }, [])
  
  return (
    <div className='home'>

      {/*card */}
      {data.map((posts)=>{
        return(   <div className="card" >
          
        {/* card-header */}
        <div className="card-header">
          <div className="card-pic">
            <img src='https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60' 
                      alt='img' />
          </div>
          <h5>{posts.postedBy.name}</h5>
        </div>
        {/* card-image */}
        <div className="card-image">
          <img src={posts.photo} alt='img' />
        </div>

        {/* Card-Content */}

        <div className="card-content">
          <span className="material-symbols-outlined">favorite</span>
          <p>1 Like</p>
          <p>{posts.body}</p>
        </div>
        {/* add-comment */}

        <div className="add-comment">
          <span className="material-symbols-outlined">mood</span>
          <input type="text" placeholder='add a comment' />
          <button className='comment' style={{color:"#339ce3", background:"none",marginBottom:"5px",marginRight:"-95px"}}> Post</button>

        </div>
      </div>)
    

      })}
      </div>
  );
}

export default Home;
