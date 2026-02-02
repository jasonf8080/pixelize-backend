import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CiUser } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { logout } from '../features/authSlice'


const ProfileIcon = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((store) => store.auth)
    const [showProfileOptions, setShowProfileOptions] = useState(false)

    const handleButtonClick = (action) => {
        setShowProfileOptions(!showProfileOptions)
        if(action === 'logout'){
             dispatch(logout())
        } else {
           return
        }
    }
    if(!user.username){
        return (
        <Link className='flex ml-5' to={`/login`}>
            <span className='mr-2 items-center capitalize'>Login</span>
            <CiUser className='text-xl translate-y-[2px]' />
        </Link>)
    } else {
        return (
        <button onClick={() => setShowProfileOptions(!showProfileOptions)} className="flex items-center ml-2 md:ml-5 relative">
            <p className='hidden md:block pt-1 mr-2'>{user.username}</p>
            <CiUser className='text-2xl md:text-lg'/>

            {showProfileOptions && 
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="z-[99] absolute top-full left-[-100px] md:left-[-25%] w-32 shadow-lg text-left bg-white dark:bg-[#222] dark:text-white
            rounded-lg border-2 border-slate-100  dark:border-black/25 mt-2"
            >
                <Link to={`myprofile/${user.username}`} 
                    onClick={handleButtonClick}
                    className='block px-4 pt-2 capitalize cursor-pointer hover:bg-slate-100 dark:hover:bg-[#333] w-full text-left pb-1 '>
                        View Profile
                </Link>

                <button 
                    onClick={() => handleButtonClick('logout')}
                    className='block px-4 pb-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-[#333] w-full text-left pt-1 text-red-500'>
                        Logout
                </button>

            </motion.div>
            }
        </button>

  )
    }
 
}

export default ProfileIcon
