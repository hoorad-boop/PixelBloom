import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios'
import { FabricImage } from 'fabric';
import { SearchIcon } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react'

function SearchImage() {

    const [imageList, setImageList] = useState([]);
    const [searchInput, setSearchInput] = useState();
    const {canvasEditor} = useCanvasHook();

    useEffect(() => {
        GetImageList('Gradient')
    }, [])
    
    const GetImageList = async (searchInput) => {
        const result = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: searchInput,
                page: 1,
                per_page: 20
            },
            headers: {
                Authorization: `Client-ID ` + process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
            }
        });

        setImageList(result?.data?.results);
        //console.log(result);
        //console.log("Image URL", result?.data?.results[0]?.urls?.thumb);
        
    }

    /**
     * To add selected image to canvas
     */
    const addImageToCanvas = async (imageUrl) => {
        const canvasImageRef = await FabricImage.fromURL(
            imageUrl,
            {
                crossOrigin: 'anonymous'
            }
        )
        canvasEditor.add(canvasImageRef);
        canvasEditor.renderAll();
    }

  return (
    <div className='mt-5'>
        <h2 className='font-bold'>Search Images</h2>
        <div className='flex gap-2 items-center my-2'>
            <Input placeholder={'Search an image'} onChange={(e) => setSearchInput(e.target.value)} />
            <Button onClick={() => GetImageList(searchInput)}><SearchIcon /></Button>
        </div>
        <div className='mt-3 grid grid-cols-2 gap-2 overflow-auto h-[470px]'>
            {imageList.map((image, index) => (
                <div key={index} onClick={() => addImageToCanvas(image?.urls?.regular)}
                    className='cursor-pointer'
                >
                    <img src={image?.urls?.thumb} alt={image?.slug} 
                        width={300} height={300} 
                        className='w-full h-[80px] rounded-sm object-cover'
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default SearchImage