"use client";
import { File, Shield, Upload, LogOut } from 'lucide-react'; // Import LogOut icon
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Progress } from '../../../src/components/ui/progress'; // Verify this path
import { useFileStorage } from './FileStorageContext'; // Ensure you import your context
import { useClerk } from '@clerk/nextjs'; // Import Clerk for authentication

function SideNav({ closeSideBar }) {
  const { totalMBUsed = 0 } = useFileStorage() || {}; // Use context to get total MB used
  const { signOut } = useClerk(); // Get signOut function from Clerk
  const [activeIndex, setActiveIndex] = useState(0);

  const menuList = [
    { id: 1, name: 'Upload', icon: Upload, path: '/upload' },
    { id: 2, name: 'Files', icon: File, path: '/files' },
    { id: 3, name: 'Upgrade', icon: Shield, path: '/upgrade' }
  ];

  const storagePercentage = (totalMBUsed / 500) * 100;
  const isStorageLimitExceeded = totalMBUsed > 500;

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
            signOut(); // Call the signOut function to log out
            closeSideBar(); // Close the sidebar after logout
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
            value={Math.min(storagePercentage, 100)} // Ensure the value does not exceed 100
            className='w-[90%] mt-5 h-2 bg-gray-200 rounded-full overflow-hidden'
            innerClassName='bg-blue-500 h-full rounded-full'
          />
        </div>

        <h2 className={`text-sm my-2 flex justify-center items-center ${isStorageLimitExceeded ? 'text-red-500' : 'text-gray-500'}`}>
          {totalMBUsed.toFixed(2)} MB used out of 500 MB
        </h2>

        {isStorageLimitExceeded && (
          <p className='text-xs text-red-500'>Storage limit exceeded. Please upgrade your plan.</p>
        )}
      </div>
    </div>
  );
}

export default SideNav;
