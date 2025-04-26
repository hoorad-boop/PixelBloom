"use client"

import React, { useState } from 'react'
import WorkspaceHeader from './_components/WorkspaceHeader'
import Sidebar from './_components/Sidebar'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function WorkspaceLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <WorkspaceHeader />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost"
          className="md:hidden absolute top-4 right-4 z-50 hover:bg-green-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-50 w-50" color='red' width={50} height={50} />
        </Button>

        {/* Sidebar with responsive states */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transform transition-transform duration-200 ease-in-out
          fixed md:relative
          md:translate-x-0
          h-full z-40
        `}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}