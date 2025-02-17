import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader({setToggleBar}) {
  return (
    <div className='flex p-5  
    items-center justify-between w-full
    md:justify-end'>
        <AlignJustify className='md:hidden'
        onClick={()=>setToggleBar(true)}/>
        <Image src='/logoipsum-280.svg'
        alt='logo'
         width={100} height={80} 
         className='md:hidden cursor-pointer'
          />
        <UserButton/>
    </div>
  )
}

export default TopHeader