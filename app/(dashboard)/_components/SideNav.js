"use client";
import { File, Shield, Upload, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Progress } from '../../../src/components/ui/progress';
import { useFileStorage } from './FileStorageContext';
import { useClerk } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

function SideNav({ closeSideBar }) {
  const { totalMBUsed = 0 } = useFileStorage() || {};
  const { signOut } = useClerk();
  const [activeIndex, setActiveIndex] = useState(0);
  const [storageUsage, setStorageUsage] = useState(0);
  const pathname = usePathname();

  const menuList = [
    { id: 1, name: 'Upload', icon: Upload, path: '/upload' },
    { id: 2, name: 'Files', icon: File, path: '/files' },
    { id: 3, name: 'Upgrade', icon: Shield, path: '/upgrade' }
  ];

  useEffect(() => {
    const currentPath = pathname;
    const activeMenu = menuList.findIndex(item => item.path === currentPath);
    if (activeMenu !== -1) {
      setActiveIndex(activeMenu);
    }
  }, [pathname]);

  // Update storage usage whenever totalMBUsed changes
  useEffect(() => {
    setStorageUsage(totalMBUsed);
  }, [totalMBUsed]);

  const storagePercentage = (storageUsage / 500) * 100;
  const isStorageLimitExceeded = storageUsage > 500;

  return (
    <div className='shadow-sm border-r h-full'>
      <div className='p-5 justify-center items-center flex'>
        <Link href={process.env.NEXT_PUBLIC_DOMAIN}>
          <Image src='/logoipsum-280.svg' width={100} height={80} alt='logo' className='cursor-pointer' />
        </Link>
      </div>
      <div className='flex flex-col float-left w-full'>
        {menuList.map((item, index) => (
          <Link href={item.path} key={index}>
            <button
              className={`flex gap-2 p-8 items-center justify-start px-20 hover:bg-gray-100 w-full text-gray-500 rounded-sm ${activeIndex === index ? 'bg-gray-200 text-primary' : ''}`}
              onClick={() => {
                setActiveIndex(index);
                closeSideBar();
              }}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </button>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          className='flex gap-2 p-8 items-center justify-start px-20 hover:bg-gray-100 w-full text-gray-500 rounded-sm'
          onClick={() => {
            signOut();
            closeSideBar();
          }}
        >
          <LogOut />
          <h2>Logout</h2>
        </button>
      </div>

      {/* Storage Usage Progress Bar */}
      <div className='mr-2 absolute bottom-10 border-t-2 w-full'>
        <div className='flex justify-center items-center'>
          <Progress
            value={Math.min(storagePercentage, 100)}
            className='w-[90%] mt-5 h-2 bg-gray-200 rounded-full overflow-hidden'
            innerClassName={`h-full rounded-full transition-all duration-300 ${isStorageLimitExceeded ? 'bg-red-500' : 'bg-blue-500'}`}
          />
        </div>

        <h2 className={`text-sm my-2 flex justify-center items-center ${isStorageLimitExceeded ? 'text-red-500' : 'text-gray-500'}`}>
          {(storageUsage || 0).toFixed(2)} MB used out of 500 MB
        </h2>

        {isStorageLimitExceeded && (
          <p className='text-xs text-center text-red-500'>Storage limit exceeded. Please upgrade your plan.</p>
        )}
      </div>
    </div>
  );
}

export default SideNav;
