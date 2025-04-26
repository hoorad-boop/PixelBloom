"use client"

import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import DesignHeader from '../_components/DesignHeader';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import SideBar from '../_components/SideBar';
import CanvasEditor from '../_components/CanvasEditor';
import { CanvasContext } from '@/context/CanvasContext';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

function DesignEditor() {
    const { designId } = useParams();
    const [canvasEditor, setCanvasEditor] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const DesignInfo = useQuery(api.designs.GetDesign, {
      id: designId
    });

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <CanvasContext.Provider value={{canvasEditor, setCanvasEditor}}>
        <DesignHeader DesignInfo={DesignInfo} />
        <div className="flex flex-1 overflow-hidden relative">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost"
            className="md:hidden absolute top-2 right-2 z-50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-20 w-20" />
          </Button>

          {/* Sidebar with responsive states */}
          <div className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            transform transition-transform duration-200 ease-in-out
            fixed md:relative md:translate-x-0 h-full z-40
          `}>
            <SideBar />
          </div>

          {/* Main Canvas */}
          <div className="flex-1 overflow-hidden">
            <CanvasEditor DesignInfo={DesignInfo} />
          </div>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 md:hidden z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      </CanvasContext.Provider>
    </div>
  )
}

export default DesignEditor

export const useCanvasHook = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("Error")
  }
  return context
}