import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div className='p-3 flex justify-between items-center shadow-retro 
      bg-gradient-to-r from-green-700 via-red-500 to-yellow-500 border-b-4 border-purple-700'>
        <Image src={'/logo.png'} alt='logo' 
        width={100} height={100} 
        className='hover:scale-110 transition-transform'
        />
        <UserButton />
    </div>
  )
}

export default WorkspaceHeader