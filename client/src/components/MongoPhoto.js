import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMemo, useCallback } from 'react';

import PhotoModalUI from './PhotoModalUI';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDeletePost } from '../features/postSlice';
import DeletePost from '../components/DeletePost'


const MongoPhoto = () => {
    const {postId} = useParams();
    const [loading, setLoading] = useState(false)
    const [imageData, setImageData] = useState({})
    const {deletePost} = useSelector((store) => store.post)
    const dispatch = useDispatch();

    //unsplash ui only useEffect
    const fetchPhoto = async() => {
      setLoading(true)
      try {
        const res = await fetch(`/api/post/getSinglePost/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // send cookies (JWT)
        });

        const data = await res.json();

        const {
            _id,
            caption,
            image,
            tags,
            userId:{username, avatarUrl},
            createdAt
        } = data;


       //Handle Date Format
        const inputDate = new Date(createdAt);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = inputDate.toLocaleDateString('en-US', options);
       

          //imageData is expecting these fields-- so in both instances unsplash and mongo fetch.. you need to massage data to get in this desired object
 // const { imageUrl, username, profile_picture, description, created_at, downloads,likes, tags, isLiked} = imageData;

        setImageData({
            imageUrl: image,
            username: username,
            profile_picture: avatarUrl,
            description: caption,
            created_at: formattedDate,
            tags
        })
      
       setLoading(false)
        
      } catch(error) {
        console.log(error)
        // setLoading(false)
      }
    }


    // const deletePost = () => {
    //     console.log('delete Post')
    // }

    useEffect(() => {
        fetchPhoto();
    }, [postId])


     const onDeletePost = useCallback(() => {
  dispatch(toggleDeletePost());
}, [dispatch]);


const actions = useMemo(() => ({
  onDeletePost,
}), [onDeletePost]);


        const capabilities = {
            delete: true,
        };

 
  return (
    <>
        {deletePost && <DeletePost/>}
        <PhotoModalUI id={postId} loading={loading} imageData={imageData} actions={actions} capabilities={capabilities}/>
    </>
  )
}


export default MongoPhoto