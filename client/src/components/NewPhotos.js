import React from 'react'

const NewPhotos = () => {
  return (
    <div className='images-grid' >
        {images.map((image, index) => {
           const {urls:{regular}, user:{username, profile_image:{medium: profile_picture}}, id} = image;
           console.log(regular, username, profile_picture, id)
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
      </div>
  )
}

export default NewPhotos
