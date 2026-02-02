import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'
import { Modal, Photos, Categories, Searchbar } from '../components'
import { handleBlur } from '../helpers'



const Home = () => {

    const {queryObject, setQueryObject} = useGlobalContext();

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
   
   const url = `https://api.unsplash.com//search/photos/?client_id=${process.env.REACT_APP_API_KEY}&page=${page}&query=${queryObject.query}&orientation=squarish&per_page=10`;
    
    const fetchImages = async() => {
      
        if(queryObject.newQuery){  // Only show loader if new search term
          setLoading(true)
        }

        try {
          const response = await fetch(url);
          const data = await response.json();

          if(queryObject.newQuery){  //New Search
            setPage(1)
            setImages(data.results)
            setTotalPages(data.total_pages);
          } 


          if(!queryObject.newQuery){  // Next Page
            setImages([...images, ...data.results])
          }


          setLoading(false)

        } catch (error) {
          console.log(error)
          setLoading(false)
        }
    }
    

    //Fetch Images when query or page changes
    useEffect(() => {
        fetchImages();
    }, [queryObject.query, page])


     //Handle image loading with blurry images
    useEffect(() => {
        const images = document.querySelectorAll('.grid-main-image')
        handleBlur(images)
    }, [images])


    //Pagination
    const nextPage = () => {
      setQueryObject({...queryObject, newQuery: false})
      setPage(page + 1);
    }

  
  return (
    <>
      <Categories/>
      <Searchbar/>
      <Photos
       loading={loading} 
       images={images} 
       page={page}
       nextPage={nextPage}
       totalPages={totalPages}/>
   </>
  )
}


export default Home