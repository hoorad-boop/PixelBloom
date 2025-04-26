import Image from 'next/image'
import React from 'react'
import RecentDesign from '../_components/RecentDesign'

function Projects() {
  return (
    <div className='p-3 sm:p-6 md:p-10 w-full min-h-screen bg-green-900/90 border-2 sm:border-4 md:border-6 border-yellow-500 shadow-retro rounded-xl'>
        <div className='flex flex-col items-center max-w-7xl mx-auto'>
            <div className='p-2 sm:p-3 bg-yellow-400 rounded-full border-2 sm:border-4 border-red-500'>
                <Image src={'/red-flower.png'} alt='red flower'
                width={200} height={200}
                className='w-14 h-14 sm:w-20 sm:h-20 object-cover hover:animate-spin'
                />
            </div>
            <h2 className='text-2xl sm:text-3xl md:text-4xl text-green-300 font-bold mt-3 sm:mt-5'>PROJECTS</h2>
            <p className='text-sm sm:text-base text-yellow-300 text-center mt-2'>
                Manage your recent designs and keep your creativity flowing!
            </p>
            <div className='mt-6 sm:mt-10 w-full'>
                <RecentDesign />
            </div>
        </div>
    </div>
  )
}

export default Projects