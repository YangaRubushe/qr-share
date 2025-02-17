"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav'
import TopHeader from './_components/TopHeader'
import Toast from '../_components/Toast';
import { FileStorageProvider } from './_components/FileStorageContext'; // Make sure to use the correct path

function Layout({ children }) {
  const [toggle, setToggle] = useState(false);
  
  return (
    <FileStorageProvider>
      <div>
        <div className='h-full w-64 flex-col fixed inset-y-0 z-30 md:flex hidden bg-white'>
          <SideNav closeSideBar={() => setToggle(false)}/>
        </div>
     
        {toggle && (
          <div className='h-full w-64 flex-col fixed inset-y-0 z-30 bg-white flex'>
            <SideNav closeSideBar={() => setToggle(false)}/>
          </div>
        )}

        <div className='md:ml-64'>
          <TopHeader setToggleBar={() => setToggle(true)} />
          {children}
          {/* <Toast/> */}
        </div>
      </div>
    </FileStorageProvider>
  )
}

export default Layout