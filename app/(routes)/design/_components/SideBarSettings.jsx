import React from 'react'

function SideBarSettings({selectedOption}) {
    return (
        <div className='p-5'>
            {/* Fixed Header */}
            <div className='bg-yellow-50/90 p-3 mb-4 rounded-sm border-b border-green-200'>
                <h2 className='font-bold text-lg text-green-700'>
                    {selectedOption?.name}
                </h2>
                <p className='text-sm text-green-600 mt-1'>
                    {selectedOption?.desc}
                </p>
            </div>
            
            {/* Scrollable Content */}
            <div>
                {selectedOption?.component}
            </div>
        </div>
    )
}

export default SideBarSettings