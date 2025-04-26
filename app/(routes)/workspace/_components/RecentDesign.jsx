"use client"

import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react'
import CustomCanvasDialog from './CustomCanvasDialog';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'next/navigation';
import { DeleteIcon } from 'lucide-react';
import { toast } from 'sonner';

function RecentDesign() {

    const [designList, setDesignList] = useState([]);
    const convex = useConvex();
    const {userDetail} = useContext(UserDetailContext);
    const router = useRouter();
    const deleteDesign = useMutation(api.designs.DeleteDesign);

    useEffect(() => {
        userDetail && GetRecentDesign();
    }, [userDetail])

    const GetRecentDesign = async () => {
        const result = await convex.query(api.designs.GetUserDesigns, {
            uid: userDetail?._id
        });
        console.log(result);
        setDesignList(result);
    }

    const DeleteDesign = async (designId) => {
        try {
            const result = await deleteDesign({
                id: designId
            })
            console.log(result);
            toast('Design Deleted.')
        } catch (error) {
            console.log(error)
            toast.error('Failed to Delete Design!')
        }
    }

    return (
        <div className='mt-7 p-5 bg-purple-900/90 rounded-xl 
            min-h-[100px] sm:min-h-[200px] border-4 border-yellow-500 shadow-retro'>
            <h2 className='font-bold text-2xl text-green-400'>Recent Design</h2>

            {designList?.length == 0 ? (
                <div className='flex flex-col gap-4 items-center mt-5'>
                    <h2 className='text-center text-yellow-300 text-base'>
                        You don't have any designs created, create a new one!
                    </h2>
                    <CustomCanvasDialog>
                        <Button className='bg-red-500 hover:bg-red-600 text-white 
                            px-4 py-2 rounded-lg shadow-retro text-sm transition-all duration-200'>
                            Create New
                        </Button>
                    </CustomCanvasDialog>
                </div>
            ) : (
                <div className='mt-3 sm:mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5'>
                    {designList?.map((design, index) => (
                        <div key={index} className="relative group">
                            <div 
                                className='bg-secondary rounded-lg overflow-hidden cursor-pointer 
                                    transition-transform duration-200 hover:scale-[1.02]'
                                onClick={() => router.push('/design/' + design?._id)}>
                                <img 
                                    src={design?.imagePreview} 
                                    alt={design?.name} 
                                    width={300}
                                    height={300}
                                    className='w-full h-[150px] sm:h-[200px] object-contain rounded-lg'
                                />
                            </div>
                            
                            {/* Delete Button - Always visible on mobile, hover on desktop */}
                            <Button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    DeleteDesign(design?._id);
                                }}
                                className='absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 
                                    rounded-full w-8 h-8 p-0 
                                    xl:opacity-0 xl:group-hover:opacity-100
                                    transition-all duration-200 xl:border-2 xl:border-yellow-500
                                    shadow-retro transform hover:scale-110'> 
                                <DeleteIcon className="h-4 w-4 text-yellow-300" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecentDesign