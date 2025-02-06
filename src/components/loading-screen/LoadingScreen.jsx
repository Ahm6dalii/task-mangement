import React from 'react'
import { Triangle } from 'react-loader-spinner'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingScreen = () => {
  return (
    <div className=' h-[100vh] w-full flex items-center justify-center'>
        <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    {/* <AiOutlineLoading3Quarters className='animate-spin' /> */}

    </div>
  )
}
