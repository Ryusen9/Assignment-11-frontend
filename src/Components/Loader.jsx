import Lottie from 'lottie-react'
import React from 'react'
import loadingAnimation from "../../public/Lottie/Loading animation.json"

const Loader = () => {
  return (
    <div className='flex items-center justify-center min-h-screen w-full absolute top-0 left-0 z-[9999]'>
        <div className='h-full w-full'>
            <Lottie animationData={loadingAnimation}/>
        </div>
    </div>
  )
}

export default Loader