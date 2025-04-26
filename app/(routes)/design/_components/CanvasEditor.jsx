import { Canvas } from 'fabric';
import React, { useEffect, useRef, useState } from 'react'
import { useCanvasHook } from '../[designId]/page';
import TopNavBar from '@/services/Components/TopNavBar';

function CanvasEditor({ DesignInfo }) {
    const canvasRef = useRef();
    const [canvas, setCanvas] = useState(null);
    const {canvasEditor, setCanvasEditor} = useCanvasHook();
    

    /**
     * Used to init the canvas with default width and height
     */
    useEffect(() => {
        if (canvasRef.current && DesignInfo) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: DesignInfo?.width / 1.2,
                height: DesignInfo?.height / 1.2,
                backgroundColor: '#fff',
                preserveObjectStacking: true
            })


            // set high resolution canvas
            const scaleFactor = window.devicePixelRatio || 1;
            initCanvas.set({
                width: DesignInfo?.width * scaleFactor,
                height: DesignInfo?.height * scaleFactor,
                zoom: 1 / scaleFactor
            })

            if (DesignInfo?.jsonTemplate) {
                initCanvas.loadFromJSON(DesignInfo.jsonTemplate, () => {
                    initCanvas.requestRenderAll();
                })
            }
            
            initCanvas.renderAll();
            setCanvas(initCanvas)
            setCanvasEditor(initCanvas);
            return () => {
                initCanvas.dispose();
            }
        }
    }, [DesignInfo])

    /**
     * Used to delete the selected element/object
     */
    /* useEffect(() => {
        const handleKeyDown = (event) => {
            if (event?.key == 'Delete' && 'Shift' || event?.key == 'Backspace' && 'Shift') {
                if (canvasEditor) {
                    const activeObject = canvasEditor.getActiveObject();
                    if (activeObject) {
                        canvasEditor.remove(activeObject);
                        canvasEditor.renderAll();
                    }
                }
            } 
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [canvasEditor]) */

  return (
    <div className='bg-gray-100 w-full h-[calc(100vh-64px)] overflow-auto'>
        <TopNavBar />
        <div className='mt-16 sm:mt-20 flex flex-col items-center justify-center 
            p-2 sm:p-4 md:p-6'>
            <div className='relative w-full h-full flex items-center justify-center'>
                <canvas id='canvas' ref={canvasRef} 
                    className='max-w-full max-h-full shadow-lg' />
            </div>
        </div>
    </div>
  )
}

export default CanvasEditor