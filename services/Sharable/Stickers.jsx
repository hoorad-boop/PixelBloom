import React from 'react'
import { StickerList } from '../Options'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { FabricImage } from 'fabric';

function Stickers() {

    const {canvasEditor} = useCanvasHook();

    const onUploadSticker = async (url) => {
        const canvasSticker = await FabricImage.fromURL(
            url,
            {
              crossOrigin: 'anonymous'
            }
        );
        canvasEditor.add(canvasSticker);
  }

  return (
    <div>
        <h2 className='m-3 font-bold'>Stickers</h2>
        <div className='h-[400px] overflow-auto rounded-xl'>
          <div className='grid grid-cols-3 gap-4'>
            {StickerList.map((sticker, index) => (
              <div key={index} className='cursor-pointer'
                onClick={() => onUploadSticker(sticker)}>
                <img src={sticker} alt='sticker' 
                  width={50} height={50} />
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Stickers