import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux' 
import defaultUser from '../images/defaultUser.webp'
import Image from './Image'
import { useDispatch } from 'react-redux'
import { getAllPosts } from '../features/postSlice'
import { useParams } from 'react-router-dom'
import Loading from './Loading'

const Posts = () => {
  const dispatch = useDispatch();
  const {postId} = useParams();
  const {user} = useSelector((store) => store.auth)
  const {loading, posts} = useSelector((store) => store.post)


  useEffect(() => { 
    dispatch(getAllPosts())
  }, [])

  if(loading){
    return <Loading/>
  }

  return (
      <section className='text-center  max-w-7xl mx-auto px-5 md:px-10'>
        {posts.length < 1 ? 
        <section className='flex min-h-[300px] flex-col justify-center items-center dark:text-white'>
          <h1 className='mb-4'>No posts created yet</h1>
          <button className="btn btn-outline">+ Create Post</button>
        </section>

          :
         <div className='images-grid' >
        {posts.map((post, index) => {
           const {image, _id} = post;
          return <>
           <Image
            key={_id}
            id={_id}
            regular={image}
            username={user.username}
            profile_picture={user.avatarUrl || defaultUser}
            link={`/profile/post/${_id}`}
          />
          </>
        })}
      </div>}
    </section>
  )
}

export default Posts
