import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../features/authSlice";
import {motion} from 'framer-motion'

const Message = () => {
    const dispatch = useDispatch();
    const {message} = useSelector((store) => store.auth)
    useEffect(() => {
        setTimeout(() => {
             dispatch(clearMessage())
        }, 3000)
    }, [])

  return (
    <motion.div
        initial={{opacity: 0, x: 50}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.3}}
        exit={{opacity: 0}}
      className="
        fixed
        top-8
        right-10
        z-50
        rounded-xl
        border
        border-slate-200
        bg-white
        px-8
        py-5
        text-sm
        text-slate-700
        shadow-xl
        dark:border-[#444]
        dark:bg-[#222]
        dark:text-slate-200
      "
    >
      {message}
    </motion.div>
  );
};

export default Message
