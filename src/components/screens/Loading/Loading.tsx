import React from 'react'

export const Loading = () => {
  return (
    <div className='pt-16 bg-gradient-to-br justify-center items-center from-black to-slate-900 h-screen flex flex-col'>
        <span className="flex align-middle loading loading-spinner loading-lg"></span>
        <p className='flex justify-center pt-2'>Cargando</p>
    </div>
    
  )
}
