import React from 'react'

export function CardGrid() {
  return (
    <div className='grid grid-cols-2 gap-2 p-2'>
        <div className='w-full h-10 bg-red-400'></div>
        <div className='w-full h-10 bg-red-600'></div>
        <div className='w-full h-10 bg-red-600'></div>
        <div className='w-full h-10 bg-red-400'></div>
    </div>
  )
}
