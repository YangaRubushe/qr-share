"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from './../../../../firebaseConfig';
import TotalFileCard from './_components/TotalFileCard';
import FileList from './_components/FileList';
import Link from 'next/link';

function Files() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    if (user) {
      getAllUserFiles();
    }
  }, [user]);

  const getAllUserFiles = async () => {
    const q = query(collection(db, "uploadedFile"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress));

    const querySnapshot = await getDocs(q);
    const files = [];
    
    querySnapshot.forEach((doc) => {
      files.push(doc.data());
    });
    
    setFileList(files);
    setLoading(false); // Set loading to false once data is fetched
  };

  return (
    <div className='p-5 max-w-4xl mx-auto'>
      <h2 className='text-[20px] mb-4 font-semibold'>My Files</h2>

      {/* Display loader while data is being fetched */}
      {loading ? (
        <div className="max-h-[700px] mt-7">
          {/* Wrapper for the TotalFileCard and the table */}
          <div className="flex flex-col gap-6"> 
            <TotalFileCard totalFile={fileList?.length} />
            <div className="overflow-x-auto">
              <div className="w-full">
                <table className="table-auto w-full border border-gray-300 bg-white text-sm text-left text-gray-500 rounded-lg">
                  <thead className="bg-gray-100 border-b-2 border-gray-300 text-left">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Type</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Size</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Skeleton rows */}
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <tr className="odd:bg-gray-50 animate-pulse" key={index}>
                        <td className="whitespace-nowrap px-4 py-2">
                          <div className='h-6 bg-slate-200 rounded w-3/4'></div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <div className='h-6 bg-slate-200 rounded w-1/2'></div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <div className='h-6 bg-slate-200 rounded w-1/4'></div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <div className='h-6 bg-slate-200 rounded w-1/6'></div>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Check if fileList is empty
        fileList.length === 0 ? (
          <div className='mt-6 text-center'>
            <h2 className='mb-4'>You don't have any files</h2>
            <Link 
              href={process.env.NEXT_PUBLIC_DOMAIN} 
              className='inline-block p-2 text-white bg-primary rounded-md'>
              Upload Test
            </Link>
          </div>
        ) : (
          <div className='w-full'>
            <TotalFileCard totalFile={fileList?.length} />
            <FileList fileList={fileList} />
          </div>
        )
      )}
    </div>
  );
}

export default Files;
