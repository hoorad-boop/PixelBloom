import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { Button } from '@/components/ui/button';
import React from 'react'

function MoveForward() {

    const {canvasEditor} = useCanvasHook();

    const MoveForward = () => {
        if (canvasEditor) {
            const activeObject = canvasEditor.getActiveObject();
            if (activeObject) {
                canvasEditor.bringObjectForward(activeObject);
                console.log(activeObject);
            }
        }
    }

  return (
    <div onClick={MoveForward} className='cursor-pointer flex justify-center'>
        <Button variant={'ghost'} className='w-full'>Move Forward</Button>
    </div>
  )
}

export default MoveForward