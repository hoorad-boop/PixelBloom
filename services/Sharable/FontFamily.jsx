import React, { useEffect, useState } from 'react'
import { FontFamilyList } from '../Options'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import WebFont from 'webfontloader'

function FontFamily() {
    const {canvasEditor} = useCanvasHook()
    const [fontsLoaded, setFontsLoaded] = useState(false)

    // Load fonts when component mounts
    useEffect(() => {
        WebFont.load({
            google: {
                families: FontFamilyList
            },
            active: () => {
                setFontsLoaded(true)
                // Re-render canvas after fonts are loaded
                if (canvasEditor) {
                    canvasEditor.renderAll()
                }
            }
        })
    }, [canvasEditor])

    const onFontFamilyChange = async (value) => {
        const activeObject = canvasEditor.getActiveObject()
        if (activeObject) {
            try {
                // Ensure font is loaded before applying
                await document.fonts.load(`16px ${value}`)
                activeObject.set({
                    fontFamily: value
                })
                canvasEditor.renderAll()
            } catch (error) {
                console.error(`Failed to load font: ${value}`, error)
            }
        }
    }

    if (!fontsLoaded) {
        return <div className="text-center p-4">Loading fonts...</div>
    }

    return (
        <div className='p-2 bg-gray-200/40 rounded-lg h-[200px] overflow-auto'>
            {FontFamilyList.map((font, index) => (
                <h2 
                    key={index} 
                    className='flex justify-center text-lg p-2 bg-yellow-300/60 
                        rounded-lg mb-2 cursor-pointer hover:bg-secondary/80 
                        transition-colors'
                    style={{
                        fontFamily: `${font}, sans-serif`,
                        opacity: document.fonts.check(`16px ${font}`) ? 1 : 0.5
                    }} 
                    onClick={() => onFontFamilyChange(font)}
                >
                    {font}
                </h2>
            ))}
        </div>
    )
}

export default FontFamily