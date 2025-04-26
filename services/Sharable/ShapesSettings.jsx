import React from 'react'
import { shapesSettingsList } from '../Options'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TrashIcon } from 'lucide-react'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'


function ShapesSettings() {

  const {canvasEditor} = useCanvasHook();

  const onDelete = () => {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
        canvasEditor.remove(activeObject);
    }
  }

  return (
    <div className='flex flex-wrap gap-6'>
        {shapesSettingsList.map((shape, index) => (
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
        <TrashIcon onClick={onDelete} className='flex items-center hover:scale-105 transition-all cursor-pointer' />
    </div>
  )
}

export default ShapesSettings