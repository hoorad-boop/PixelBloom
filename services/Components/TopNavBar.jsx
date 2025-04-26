import React, { useEffect, useState } from 'react'
import ShapesSettings from '../Sharable/ShapesSettings'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import TextSettingsNavbar from './TextSettingsNavbar';

function TopNavBar() {

  const {canvasEditor} = useCanvasHook();
  const [showShapeSettings, setShowShapeSettings] = useState(false);
  const [enableTextSettings, setEnableTextSettings] = useState(false);
  
  if (canvasEditor) {
    canvasEditor.on('selection:created', function(e) {
      const activeObject = canvasEditor.getActiveObject();
      if (!activeObject.text) {
        setShowShapeSettings(true);
        setEnableTextSettings(false);
      } 
      if (activeObject.text) {
        setEnableTextSettings(true);
        setShowShapeSettings(false);
      }
    })

    canvasEditor.on('selection:updated', function() {
      const activeObject = canvasEditor.getActiveObject();
      if (!activeObject.text) {
        setShowShapeSettings(true);
        setEnableTextSettings(false);
      } 
      if (activeObject.text) {
        setEnableTextSettings(true);
        setShowShapeSettings(false);
      }
    })

    canvasEditor.on('selection:cleared', function() {
      setShowShapeSettings(false);
      setEnableTextSettings(false);
    })
  }

  return (
    <div className='ml-2 flex items-center justify-between p-3 bg-background'>
        {showShapeSettings && <ShapesSettings />}
        {enableTextSettings && <TextSettingsNavbar />}
    </div>
  )
}

export default TopNavBar