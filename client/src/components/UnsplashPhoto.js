import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PhotoModalUI from './PhotoModalUI';


const UnsplashPhoto = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false)
    const [imageData, setImageData] = useState({})

    //unsplash ui only useEffect
    const fetchPhoto = async() => {
      setLoading(true)
      try {
        const response = await fetch(`https://api.unsplash.com//photos/${id}?client_id=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();

        const {
          user:{profile_image:{medium: profile_picture}, username},
          urls:{regular: imageUrl},
          description,
          created_at,
          downloads, 
          likes,
          tags,
        } = data;

       //Handle Date Format
        const inputDate = new Date(created_at);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = inputDate.toLocaleDateString('en-US', options);


        const res = await fetch("/api/like/checkIfLiked", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies (JWT)
        body: JSON.stringify({ photoId: id }),
      });
      
      const isLiked = await res.json();

      setImageData({
          profile_picture,
          username,
          imageUrl,
          description,
          created_at: formattedDate,
          downloads,
          likes,
          tags,
          isLiked: isLiked.like
        })

      
       setLoading(false)
        
      } catch(error) {
        console.log(error)
        // setLoading(false)
      }
    }


   //unsplash ui only likePhoto prop
    const likePhoto = async() => {
        const res = await fetch("/api/like/likePhoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies (JWT)
        body: JSON.stringify({ id, regular: imageData.imageUrl , username: imageData.username, profile_picture: imageData.profile_picture }),
      });
      
      const data = await res.json();
     setImageData((prev) => ({
        ...prev,
        isLiked: data.liked, // or data.liked depending on your API
      }));
    }

    //usnplash ui only dislikePhoto prop
    const dislikePhoto = async() => {
        const res = await fetch("/api/like/unlikePhoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies (JWT)
        body: JSON.stringify({ photoId: id }),
      });
      
      const data = await res.json();
     setImageData((prev) => ({
        ...prev,
        isLiked: data.liked, // or data.liked depending on your API
      }));
    }

    // unpsplash ui only handleLike prop
  const handleLike = () => {
  if (!imageData.isLiked) {
    likePhoto();
  } else {
    dislikePhoto();
  }
}

    useEffect(() => {
        fetchPhoto()
    }, [id])

        const actions = {
        onToggleLike: handleLike,    
        };

        const capabilities = {
        like: true,
        download: true,
        delete: false,
        };
  
  return (
    <>
        <PhotoModalUI id={id} loading={loading} imageData={imageData} actions={actions} capabilities={capabilities}/>
    </>
  )
}


export default UnsplashPhoto