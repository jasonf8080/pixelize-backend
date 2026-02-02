import React from 'react'
import Loading from './Loading';
import Image from './Image';

const Photos = ({loading, images, page, totalPages, nextPage}) => {
  console.log(images)
  return (
    <section id="images" className='mt-6 max-w-7xl mx-auto px-5 md:px-10 pb-20'>
      {loading ? <Loading/> :  
      <>
      {images.length > 0 ?
      <>
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
      
      <div className="mt-10 flex justify-center">
        <button
          onClick={nextPage}
          className={`
            ${page > 5 || page === totalPages || loading ? "hidden" : ""}
            btn btn-primary uppercase
          `}
        >
          Load More
        </button>
      </div>

      
      </>
      :
      <h2 className='text-center min-h-[30vh] flex justify-center items-center'>Sorry No Results Matched Your Search</h2>
    }
</>
      }
   </section>
  )
}

export default Photos