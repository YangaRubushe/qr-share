import React from 'react'

function TotalFileCard({totalFile}) {
  return (
    <div className='p-3 border rounded-md w-full md:w-3/4 lg:w-full mt-3 animate-pulse'>
        <h2 className='text-gray-500'>Total File: {totalFile}</h2>
    </div>
  )
}

export default TotalFileCard
