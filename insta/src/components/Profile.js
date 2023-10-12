import React ,{useEffect,useState} from 'react'
import './Profile.css';

const Profile = () => {
const [pic, setPic] = useState([])


useEffect(() => {
  fetch("http://localhost:5000/myposts",{
    headers:{
      Authorization : "Skirr" + localStorage.getItem("jwt")},
  })
  .then(res=>res.json())
  .then((result)=>{
  setPic(result)
  })  
}, [])


  return (
    <div className='profile'>
      <div className='profile-frame' >
        {/* Profile-Frame */}
        <div className="profile-pic" >
          <img src='https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'
            alt='img' />
          {/* profile-data */}
          <div className="profile-data">
            <h1>sonuroy96000</h1>
            <div className="profile-info" style={{display:"flex"}}>
              <p>12 posts</p>
              <p>989 followers</p>
              <p>112 following</p>
            </div>
          </div>
        </div>
      </div>
      <hr style={{width:"90%",
    opacity:"0.8",
    margin:"25px auto"
    }}/>
      {/* galary */}
      <div className="galary">
        {pic.map((pics)=>{
          return <img key={pics._id} src={pics.photo} className='item'></img>

        })}
       </div>
    </div>
  );
}

export default Profile;
