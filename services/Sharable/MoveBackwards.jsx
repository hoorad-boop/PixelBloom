import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Button } from '@/components/ui/button';
import React from 'react'

function MoveBackwards() {
  const {canvasEditor} = useCanvasHook();
  
    const MoveBackward = () => {
          if (canvasEditor) {
              const activeObject = canvasEditor.getActiveObject();
              if (activeObject) {
                  canvasEditor.sendObjectBackwards(activeObject);
              }
          }
      }
  
    return (
      <div onClick={MoveBackward} className='cursor-pointer flex justify-center'>
        <Button variant={'ghost'} className='w-full'>Move Backward</Button>
      </div>
    )
}

export default MoveBackwards