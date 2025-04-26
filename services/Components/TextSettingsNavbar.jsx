import React from 'react'
import { TextSettingsList } from '../Options'
import { TrashIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import FontStyles from '../Sharable/FontStyles';

function TextSettingsNavbar() {

  const {canvasEditor} = useCanvasHook();
  
  const onDelete = () => {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
        canvasEditor.remove(activeObject);
    }
  }

  return (
    <div className='flex flex-wrap items-align justify-between gap-4'>
            {TextSettingsList.map((shape, index) => (
                <div key={index} className='flex items-center hover:scale-105 transition-all cursor-pointer'>
                    <Popover>
                      <PopoverTrigger>
                        <shape.icon />
                      </PopoverTrigger>
                      <PopoverContent>
                        {shape.component}
                      </PopoverContent>
                    </Popover>
                </div>
            ))}

            <FontStyles />

            <TrashIcon onClick={onDelete} className='flex items-center hover:scale-105 transition-all cursor-pointer' />
    </div>
  )
}

export default TextSettingsNavbar