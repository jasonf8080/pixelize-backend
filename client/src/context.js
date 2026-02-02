import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({children}) => { 

    const [activeCategory, setActiveCategory] = useState(null);
    const [images, setImages] = useState([])
    const [queryObject, setQueryObject] = useState({
      tempQuery: '', //Search input - value typed in, not submitted
      query: 'scenic',
      newQuery: true
    })
    


    return <AppContext.Provider value={{
      activeCategory, setActiveCategory,
      queryObject, setQueryObject, 
      images, setImages
      }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppContext, AppProvider}


//if((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2){