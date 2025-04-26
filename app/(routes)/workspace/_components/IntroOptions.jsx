"use client"

import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { canvasSizeOptions } from '@/services/Options'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { toast } from 'sonner'

function IntroOptions() {

  const createDesignRecord = useMutation(api.designs.CreateNewDesign);
  const {userDetail} = useContext(UserDetailContext);
  const router = useRouter();
  
  const OnCanvasOptionSelect = async (option) => {
    try {
        toast('Loading...')
        const result = await createDesignRecord({
        name: option.name,
        width: option.width,
        height: option.height,
        uid: userDetail?._id
        });

        console.log(result);
        router.push('/design/' + result);
    } catch (error) {
        if (!userDetail) {
            toast.error('Please Sign In.')
        } else {
        toast.error('Failed to Create New Design.')
        }
    }
  }

  return (
    <div className='p-3 sm:p-5 bg-green-900/90 rounded-lg sm:rounded-xl 
        border-2 sm:border-4 border-red-500 shadow-retro'>
        <div className='flex flex-col items-center'>
            <div className='transform hover:rotate-180 transition-transform duration-500'>
                <Image src={'/red-flower.png'} 
                    alt='red flower'
                    width={200} 
                    height={200}
                    className='w-14 h-14 sm:w-20 sm:h-20 object-cover'
                />
            </div>
            <h2 className='text-xl sm:text-2xl md:text-3xl text-yellow-400 font-bold mt-2 sm:mt-3'>
                WORKSPACE
            </h2>
        </div>
        <div className='flex flex-wrap gap-3 sm:gap-6 items-center 
            mt-4 sm:mt-10 p-2 sm:p-3 w-auto justify-center bg-purple-600/60 
            rounded-lg sm:rounded-xl border-2 sm:border-4 border-yellow-500'>
            {canvasSizeOptions.map((option, index) => (
                <div key={index} 
                    className='flex flex-col items-center justify-between cursor-pointer 
                    hover:transform hover:scale-105 transition-all duration-200'
                    onClick={() => OnCanvasOptionSelect(option)}>
                    <Image src={option.icon} 
                        alt={option.name}
                        width={60} 
                        height={60}
                        className='w-10 h-10 sm:w-[60px] sm:h-[60px] transition-all' 
                    />
                    <h2 className='text-xs sm:text-sm mt-1 sm:mt-2 font-medium text-green-300'>
                        {option.name}
                    </h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default IntroOptions