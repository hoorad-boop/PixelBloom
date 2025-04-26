import { sideBarMenu } from '@/services/Options'
import React, { useState } from 'react'
import SideBarSettings from './SideBarSettings'
import { ChevronLeft } from 'lucide-react'

function SideBar() {
    const [selectedOption, setSelectedOption] = useState();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* Main Sidebar */}
            <div className='w-[120px] flex flex-col bg-green-100/90 border-r border-green-300'>
                {/* Scrollable content */}
                <div className='flex-1 overflow-y-auto p-4'>
                    {sideBarMenu.map((menu, index) => (
                        <div key={index} 
                            className={`
                                w-full p-3 mb-4 flex flex-col items-center justify-center
                                hover:bg-yellow-200 rounded-lg cursor-pointer
                                transition-all duration-200
                                ${menu.name === selectedOption?.name 
                                    ? 'bg-yellow-300 border-2 border-green-400' 
                                    : 'border-2 border-transparent'
                                }
                            `}
                            onClick={() => {
                                setSelectedOption(menu);
                                setIsSettingsOpen(true);
                            }}
                        >
                            <menu.icon className='text-green-600 h-6 w-6 transition-colors
                                hover:text-green-800' />
                            <h2 className='mt-2 text-sm text-green-700 font-medium text-center'>
                                {menu.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Settings Panel */}
            <div className={`
                relative
                ${isSettingsOpen ? 'w-[300px]' : 'w-0'}
                transition-all duration-300 ease-in-out
                bg-yellow-50/90 border-r border-green-200
            `}>
                {/* Toggle Button - Fixed Position */}
                <button 
                    className="absolute -right-4 top-3 z-50 bg-green-100 
                        hover:bg-green-200 rounded-full p-1.5
                        border border-green-300 hidden md:block
                        shadow-lg transition-colors"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                    <ChevronLeft 
                        className={`h-5 w-5 text-green-700 transition-transform duration-300
                            ${!isSettingsOpen ? 'rotate-180' : 'rotate-0'}`} 
                    />
                </button>
                
                {/* Settings Content */}
                <div className="h-full overflow-y-auto">
                    {selectedOption && <SideBarSettings selectedOption={selectedOption} />}
                </div>
            </div>
        </div>
    )
}

export default SideBar