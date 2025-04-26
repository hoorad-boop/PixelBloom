import { Button } from '@/components/ui/button'
import { UserButton } from '@stackframe/stack'
import { Download, Save } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useCanvasHook } from '../[designId]/page'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ImageKit from 'imagekit'

function DesignHeader({ DesignInfo }) {

    const [designName, setDesignName] = useState(DesignInfo?.name);
    const {canvasEditor} = useCanvasHook();
    const {designId} = useParams();
    const saveDesign = useMutation(api.designs.SaveDesign);
    const router = useRouter();

    var imagekit = new ImageKit({
                publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
                privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
                urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
            });
    
    /**
     * Used to save design in JSON format in DataBase
     */
    const onSave = async () => {
        if (canvasEditor) {
            try {
                // Base64Image
                const base64Image = canvasEditor?.toDataURL({
                    format: 'png',
                    quality: 0.5,
                });

                // Get List of Files
                const existingFiles = await imagekit.listFiles({
                    searchQuery: `name="${designId}.png"`,
                });

                // Delete Old File if Exists
                if (existingFiles && existingFiles.length > 0) {
                    await imagekit.deleteFile(existingFiles[0].fileId);
                }

                // Upload New File
                const imageRef = await imagekit.upload({
                    file: base64Image,
                    fileName: designId + ".png",
                    isPublished: true,
                    useUniqueFileName: false,
                });
                console.log(imageRef);

                // Save Design to Database
                const JsonDesign = canvasEditor.toJSON();
                const result = await saveDesign({
                    id: designId,
                    name: designName || "Nameless Design",
                    jsonDesign: JsonDesign,
                    imagePreview: imageRef.url, // Imagekit Image URL
                });
                console.log(result);

                toast('Saved!');
            } catch (error) {
                console.error("Error saving design:", error);
                toast.error("Failed to save design.");
            }
        }
    }

    const onExport = () => {
        const dataUrl = canvasEditor?.toDataURL({
            format: 'png',
            quality: 1
        })

        const link = document?.createElement("a");
        link.href = dataUrl;
        link.download = "YourDesign.png",
            link.click();
    }

  return (
    <div className='p-2 sm:p-3 flex overflow-hidden items-center justify-between bg-gradient-to-r from-yellow-300 via-secondary to-primary'>
        <Image 
            src={'/logo-white.png'} 
            alt='logo' 
            width={120} 
            height={1} 
            className='w-[80px] sm:w-[120px]'
        />
        <input 
            className='text-teal-900 border-none outline-none bg-transparent
            text-sm sm:text-base w-[120px] sm:w-auto px-2 rounded-md
            focus:bg-white/80 transition-colors'
            value={designName ? designName : "Nameless Design"} 
            onChange={(e) => setDesignName(e.target.value)}
        />
        <div className='flex gap-2 sm:gap-5 items-center'>
            <Image 
            src={'/yellow-flower.png'} 
            alt='yellow flower' 
            width={50} 
            height={50} 
            className='w-8 h-8 sm:w-12 sm:h-12 cursor-pointer hover-spin'
            onClick={() => router.push('/workspace')}
            />
            <Button 
            onClick={onSave}
            className='text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 hidden sm:flex'
            >
                <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> Save
            </Button>
            <Button 
            onClick={() => onExport()}
            className='text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 hidden sm:flex'
            >
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> Export
            </Button>
            {/* Mobile Icons */}
            <Button 
            onClick={onSave}
            className='sm:hidden p-2'
            variant="ghost"
            >
                <Save className="h-5 w-5" />
            </Button>
            <Button 
            onClick={() => onExport()}
            className='sm:hidden p-2'
            variant="ghost"
            >
                <Download className="h-5 w-5" />
            </Button>
            <UserButton />
        </div>
    </div>
  )
}

export default DesignHeader