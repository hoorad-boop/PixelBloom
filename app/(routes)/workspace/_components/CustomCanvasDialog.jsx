import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
  

function CustomCanvasDialog({ children }) {

    const [name, setName] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const {userDetail} = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);
    const createDesignRecord = useMutation(api.designs.CreateNewDesign);
    const router = useRouter();

    /**
     * Used to create new design and save to db
     * 
     */
    const onCreate = async () => {
        try {
            toast('Loading...')
            setLoading(true);
            const result = await createDesignRecord({
                name: name,
                width: Number(width),
                height: Number(height),
                uid: userDetail?._id
            });
    
            setLoading(false);
            // Navigate to Editor Screen
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
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-purple-900/95 border-4 border-yellow-500 shadow-retro">
            <DialogHeader>
                <DialogTitle className="text-yellow-400">Create Custom Canvas</DialogTitle>
                <DialogDescription asChild>
                    <div>
                        <h2 className='text-green-300'>Provide Canvas Descriptions:</h2>
                        <div className='mt-5'>
                            <label className="text-yellow-300">Design Name</label>
                            <Input 
                                className='mt-1 bg-green-100/10 border-2 border-green-500 
                                    text-yellow-100 placeholder-green-300/50' 
                                placeholder="Design Name" 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <div className='mt-5 flex gap-5 w-full'>
                                <div className='w-full'>
                                    <label className="text-yellow-300">Width</label>
                                    <Input 
                                        className='mt-1 bg-green-100/10 border-2 border-green-500 
                                            text-yellow-100 placeholder-green-300/50' 
                                        type='number' 
                                        placeholder={500} 
                                        onChange={(e) => setWidth(e.target.value)} 
                                    />
                                </div>
                                <div className='w-full'>
                                    <label className="text-yellow-300">Height</label>
                                    <Input 
                                        className='mt-1 bg-green-100/10 border-2 border-green-500 
                                            text-yellow-100 placeholder-green-300/50' 
                                        type='number' 
                                        placeholder={500} 
                                        onChange={(e) => setHeight(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end mt-6'>
                            <Button 
                                className='w-full bg-red-600 hover:bg-red-700 text-yellow-300
                                    border-2 border-yellow-500 shadow-retro'
                                disabled={loading || !name || !width || !height}
                                onClick={onCreate}
                            >
                                {loading ? 
                                    <Loader2Icon className='animate-spin text-yellow-300' /> 
                                    :
                                    'Create'
                                }
                            </Button>
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CustomCanvasDialog