import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom';
import { Photo } from '../Pages';
import { Link } from 'react-router-dom';

const Image = ({id, regular, username, profile_picture, link}) => {
  
 
 //regular = regular.replace("w=1080", "w=10");

  //regular -- string
  //username -- string,
  //profile_picture -- string,
  //id -- string

  const navigate = useNavigate();

  // const {setShowModal, setPhotoID, setPagePosition} = useGlobalContext();

  // const handleClick = async() => {
  //     setPagePosition(window.scrollY);
  //     setPhotoID(id)
  //     setShowModal(true)
      
  // }



  const linkToProfile = () => {
    navigate(`/profile/${username}`)
  }

  console.log(regular)


  return (
    
   
    <div className="grid-image relative rounded-md w-[100%] h-auto group duration-200 overflow-hidden cursor-pointer" >
         <Link to={link || `/photo/${id}`}>
           <img className='object-cover rounded-md w-full h-full grid-main-image' src={regular} alt="/"/>
         </Link>

        <div className="absolute bottom-0 translate-y-[100%] left-0 flex justify-around items-center w-full
         bg-black bg-opacity-80 text-white p-4 rounded-b-md md:group-hover:translate-y-0 duration-200">
            <Link to={`/profile/${username}`}>
               <p className='text-white'>{username}</p>
            </Link>
            <img src={profile_picture} alt="" className="w-10 h-10 rounded-full" />
        </div>
    </div>
  ) 
}


export default Image
 