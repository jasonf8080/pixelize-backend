import React, { useEffect, useState } from 'react'
import Photos from './Photos';
import Image from './Image';
import Loading from './Loading';

const Likes = () => {
  const [loading, setLoading] = useState(false)
  const [likes, setLikes] = useState([])

  const fetchLikes = async () => {
    setLoading(true)
      try {
        const res = await fetch("/api/like/getUserLikes", {
          method: "GET",
          credentials: "include", // send cookies (JWT)
        });
  
        const data = await res.json();
        console.log(data)
        setLikes(data)
  
        setLoading(false)
        if (!res.ok) {
          throw new Error(data?.message || "Failed to fetch likes");
        }
  
        return data; // array of liked photos
        
      } catch (error) {
        
      }
      
      
  };


  useEffect(() => {
    fetchLikes();
  }, [])

  if(loading){
    return <Loading/>
  }

  return (
    <section className='text-center max-w-7xl mx-auto px-5 md:px-10'>
       {likes.length < 1 ?
        <section className='flex  min-h-[300px] flex-col justify-center items-center dark:text-white'>
          <h1 className='mb-4'>No posts liked yet</h1>
        </section> :
        <div className='images-grid' >
        {likes.map((like, index) => {
           const {photoUnsplashId, id, regular, username, profile_picture} = like.photoId;
           console.log(like.photoId)
          return <>
           <Image
            key={id}
            id={id}
            regular={regular}
            username={username}
            profile_picture={profile_picture}
          />
          </>
        })}
      </div>}
    </section>
  )
}

export default Likes
