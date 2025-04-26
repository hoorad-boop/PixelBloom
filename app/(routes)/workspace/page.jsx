import React from 'react'
import IntroOptions from './_components/IntroOptions'
import RecentDesign from './_components/RecentDesign'

function Workspace() {
  return (
    <div className='min-h-full overflow-y-auto p-2 sm:p-4 md:p-6 w-full bg-green-900'>
      <div className="max-w-7xl mx-auto">
        <IntroOptions />
        <RecentDesign />
      </div>
    </div>
  )
}

export default Workspace