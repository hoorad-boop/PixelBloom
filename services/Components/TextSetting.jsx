import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { IText } from 'fabric';
import React from 'react'

function TextSetting() {

    const {canvasEditor} = useCanvasHook();
    const onAddTextClick = (type) => {
        if (canvasEditor) {
            if (type == 'Heading') {
                const textRef = new IText('Add Heading', {
                    fontSize: 30,
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100,
                });

                canvasEditor.add(textRef);

            } else if (type == 'Subheading') {
                const textRef = new IText('Add Subheading', {
                    fontSize: 20,
                    fontWeight: '400',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100,
                });

                canvasEditor.add(textRef);

            } else {
                const textRef = new IText('Paragraph', {
                    fontSize: 13,
                    fontWeight: 'normal',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100,
                });

                canvasEditor.add(textRef);
            }
        }
    }

  return (
    <div className='flex flex-col gap-3'>
        <h2 className='flex justify-center font-bold text-2xl p-3 bg-secondary rounded-xl cursor-pointer'
            onClick={() => onAddTextClick('Heading')}
        >Add Heading</h2>
        <h2 className='flex justify-center font-medium text-xl p-3 bg-secondary rounded-xl cursor-pointer'
            onClick={() => onAddTextClick('Subheading')}
        >Add Subheading</h2>
        <h2 className='flex justify-center text-md p-3 bg-secondary rounded-xl cursor-pointer'
            onClick={() => onAddTextClick('Para')}
        >Paragraph</h2>
    </div>
  )
}

export default TextSetting