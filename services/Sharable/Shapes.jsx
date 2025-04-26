import React from 'react'
import { ShapeList } from '../Options'
import Image from 'next/image'
import { Circle, Line, Rect, Triangle } from 'fabric'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'

function Shapes() {

    const {canvasEditor} = useCanvasHook();

    const onShapeSelect = (shape) => {
        const properties = {
            left: 100,
            top: 100,
            radius: 50,
            width: 100,
            height: 100,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 1
        }
        
        if (shape.name == 'Circle') {
            const circleRef = new Circle ({
                ...properties
            })
            canvasEditor.add(circleRef);
        } else if (shape.name == 'Square') {
            const squareRef = new Rect ({
                ...properties
            })
            canvasEditor.add(squareRef);
        } else if (shape.name == 'Triangle') {
            const triangleRef = new Triangle ({
                ...properties,
            })
            canvasEditor.add(triangleRef);
        } else if (shape.name == 'Line') {
            const squareRef = new Line ([50, 50, 200, 200], {
                stroke: 'black',
                strokeWidth: 5
            })
            canvasEditor.add(squareRef);
        }
        canvasEditor.renderAll();
    }

  return (
    <div>
        <div className='grid grid-cols-3 gap-3'>
            {ShapeList.map((shape, index) => (
                <div key={index} className='p-2 border rounded-xl' onClick={() => onShapeSelect(shape)}>
                    <Image src={shape.icon} alt={shape.name} 
                        width={100} height={100}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Shapes