import React, {lazy, Suspense, useEffect} from 'react';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Navbar, Loading } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './features/authSlice';
import ProtectedRoute from './Pages/ProtectedRoute';
import Message from './components/Message';
import UnsplashPhoto from './components/UnsplashPhoto';
import MongoPhoto from './components/MongoPhoto';
import ProtectedRouteAlt from './Pages/ProtectedRouteAlt';

const Home = lazy(() => import('./Pages/Home'))
const Profile = lazy(() => import('./Pages/Profile'))
const MyProfile = lazy(() => import('./Pages/MyProfile'))
const Auth = lazy(() => import('./Pages/Auth'))
const Error = lazy(() => import('./Pages/Error'))



function App() {
   const dispatch = useDispatch();
   const {message} = useSelector((store) => store.auth)

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Navbar/>
       <Suspense fallback={<div className='flex justify-center items-center min-h-screen'><Loading/></div>}>
        {message && <Message/>}
  
      <Routes>
           <Route path='/' element={<Home/>}></Route>
           <Route path='/photo/:id' element={<UnsplashPhoto/>}></Route>
           <Route path='/profile/:username' element={<Profile/>}></Route> 
           <Route path='/profile/post/:postId' element={<MongoPhoto/>}></Route> 
           <Route element={<ProtectedRoute />}><Route path="/myprofile/:username" element={<MyProfile />} /></Route>
           <Route element={<ProtectedRouteAlt />}><Route path="/login" element={<Auth />} /></Route>
           <Route path='*' element={<Error/>}></Route>
      </Routes>
      </Suspense>
     
    </BrowserRouter>
  );
}

export default App;
