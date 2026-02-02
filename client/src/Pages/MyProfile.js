import React, { useState } from 'react'
import { EditProfile, User } from '../components'
import MongoUser from '../components/MongoUser'
import Tabs from '../components/Tabs'
import Posts from '../components/Posts'
import Likes from '../components/Likes'
import CreatePost from '../components/CreatePost'
import { useSelector } from 'react-redux'


const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false) //Editing Mode Toggle
  const [tab, setTab] = useState("posts"); // "posts" | "likes"

  //Create Post Modal
  const {createPost} = useSelector((store) => store.post)

  return (
    <>
        {!isEditing ? 
            <MongoUser 
            totalPhotos={20}
            actions={'edit'}
            isEditing={isEditing} 
            setIsEditing={setIsEditing}
            />
            : 
            <EditProfile
            isEditing={isEditing} 
            setIsEditing={setIsEditing}
            />
        }

        {/* Tabs -- Posts & Likes */}
        <Tabs tab={tab} setTab={setTab}/>
        {tab === 'posts' && <Posts/>}
        {tab === 'likes' && <Likes/>}
       
        {createPost && <CreatePost/>}
  
    </>
  )
}

export default MyProfile
