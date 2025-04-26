"use client"

import { WorkspaceMenu } from '@/services/Options'
import { CirclePlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import CustomCanvasDialog from './CustomCanvasDialog'

function Sidebar() {
    const path = usePathname();
    const router = useRouter();

    return (
        <div className='w-[140px] h-[calc(100vh-86px)] flex flex-col bg-purple-900/90 border-r-4 border-yellow-500'>
            {/* Fixed top section */}
            <div className='p-1 border-b border-yellow-500/30'>
                <CustomCanvasDialog>
                    <div className='p-3 flex items-center flex-col hover:cursor-pointer'>
                        <CirclePlus className='bg-red-600 text-white rounded-full h-10 w-10 hover:scale-110 transition-transform' />
                        <h2 className='text-sm text-yellow-300 mt-2'>Create</h2>
                    </div>
                </CustomCanvasDialog>
            </div>

            {/* Scrollable menu section */}
            <div className='flex-1 overflow-y-auto py-4 px-3 scrollbar-thin'>
                <div className='grid grid-cols-1 gap-3'>
                    {WorkspaceMenu.map((menu, index) => (
                        <div key={index} 
                            className={`p-3 flex items-center flex-col
                            group hover:bg-green-900 rounded-xl cursor-pointer border-2 border-transparent
                            ${menu.path == path && 'bg-green-900 border-yellow-500'}
                            transition-all duration-200
                            `}
                            onClick={() => router.push(menu.path)}>
                            <menu.icon className='group-hover:text-yellow-300 text-yellow-500 h-6 w-6' />
                            <h2 className='text-sm group-hover:text-yellow-300 text-yellow-500 mt-1'>{menu.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar