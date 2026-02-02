import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User, Loading } from '../components';

import { useGlobalContext } from '../context';
import { handleBlur } from '../helpers';
import Photos from '../components/Photos';
 
const Profile = () => {

     const {username} = useParams();
     const [loading, setLoading] = useState(false);
     const [page, setPage] = useState(0)
     const [totalPhotos, setTotalPhotos] = useState(null)
     const [allPhotos, setAllPhotos] = useState([])
     const [images, setImages] = useState([]);
     const itemsPerPage = 10;
     
     
    const url = `https://api.unsplash.com//users/${username}/photos?client_id=${process.env.REACT_APP_API_KEY}&orientation=squarish&per_page=50`

      const fetchData = async() => {
         setLoading(true)
      try {
         const response = await fetch(url)
         const data = await response.json();  

          setTotalPhotos(data.length);
         
         const pageCount = Math.ceil(data.length / itemsPerPage)
         
         const newData = Array.from({length: pageCount}, (_, index) => {
            const startIndex = index * itemsPerPage
            const endIndex = startIndex + itemsPerPage;

            return data.slice(startIndex, endIndex)
         })

         setAllPhotos(newData)
         setImages(newData[page])
         setLoading(false)


   } catch (error) {
      setLoading(false)
   }
  }

  

const nextPage = () => {
    setPage(prevPage => {
        // Use the previous page value to update the page state
        const newPage = prevPage + 1;

        // Now update the activePhotos state using the newPage value
        setImages(prevActivePhotos => [...prevActivePhotos, ...allPhotos[newPage]]);

        // Return the newPage value to update the page state
        return newPage;
    });
}

     
     useEffect(() => {
       window.scrollTo(0, 0)
        fetchData();
      }, [username])
      
      useEffect(() => {
         const images = document.querySelectorAll('.grid-main-image')
         handleBlur(images)
      }, [allPhotos, page])





  return (
  <>
     <User totalPhotos={totalPhotos >= 50 ? 50 : totalPhotos}/>
      
      {loading ?  <Loading/> : 
       <Photos loading={loading}
        images={images}
        page={page + 1} //Not fetching by &page=1, setting up custom pagination so default is 0
        nextPage={nextPage}
        totalPages={totalPhotos >= 50 ? 5 : Math.ceil(totalPhotos / 10)} />
        }
   </>
  )
}

export default Profile