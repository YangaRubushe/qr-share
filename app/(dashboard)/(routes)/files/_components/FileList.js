import React, { useState, useEffect, useRef } from 'react';
import { MoreHorizontal, Eye, QrCode, Download } from 'lucide-react';
import * as QRCode from 'qrcode';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";

function FileList({ fileList, onDeleteFile }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const dropdownRef = useRef();
  const tableRef = useRef();

  useEffect(() => {
    if (fileList.length >= 7 && tableRef.current) {
      const tableContainer = tableRef.current;
      let scrollDirection = 'down';
      const scrollSpeed = 1;
      
      const scroll = () => {
        if (scrollDirection === 'down') {
          if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight) {
            scrollDirection = 'up';
          } else {
            tableContainer.scrollTop += scrollSpeed;
          }
        } else {
          if (tableContainer.scrollTop <= 0) {
            scrollDirection = 'down';
          } else {
            tableContainer.scrollTop -= scrollSpeed;
          }
        }
      };

      const intervalId = setInterval(scroll, 50);
      return () => clearInterval(intervalId);
    }
  }, [fileList]);

  const handleGenerateQR = async (file) => {
    try {
      if (file.shortUrl) {
        console.log('Generating QR for Short URL:', file.shortUrl);
        const qrUrl = await QRCode.toDataURL(file.shortUrl);
        setQrCodeUrl(qrUrl);
        setSelectedFile(file);
        setIsQrDialogOpen(true);
      } else {
        console.error('No short URL available for file:', file.fileName);
      }
    } catch (error) {
      console.error('QR Code generation failed for file:', file.fileName, error);
    }
  };

  const renderDropdown = (file, index) => (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
        className="inline-flex  items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
        type="button"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {dropdownOpen === index && (
        <div className="absolute right-0 z-50 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow" onClick={() => setDropdownOpen(null)}>
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link
                href={`/file-preview/${file.id}`}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => console.log("View clicked for file:", file.fileName)}
              >
                <Eye className="w-4 h-4 text-blue-500" /> View
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleGenerateQR(file)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <QrCode className="w-4 h-4" />
                QR Code
              </button>
            </li>
            <li>
              <Link
                href={`/f/${file.id}`}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => console.log("View clicked for file:", file.shortUrl)}
              >
                <Download className="w-4 h-4 text-blue-500" /> Download
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  const getFileType = (fileType) => {
    return fileType.split('/')[1];
  };

  return (
    <div className="max-h-[700px] mt-7">
      <div className="w-full overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden" ref={tableRef} style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table className="min-w-full divide-y divide-gray-300 border border-gray-300 bg-white text-sm text-left text-gray-500 rounded-lg">
              <thead className="bg-gray-100 border-b-2 border-gray-300 text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Type</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Size</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fileList.map((file, index) => (
                  <tr className="odd:bg-gray-50" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{getFileType(file.fileType)}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{(file.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {renderDropdown(file, index)}
                    </td>
                  </tr>
                ))}
                {/* Add three empty rows */}
                {[...Array(3)].map((_, i) => (
                  <tr key={`empty-${i}`} className={i % 2 === 0 ? 'odd:bg-gray-50' : 'even:bg-white'}>
                    <td className="whitespace-nowrap px-4 py-2">&nbsp;</td>
                    <td className="whitespace-nowrap px-4 py-2">&nbsp;</td>
                    <td className="whitespace-nowrap px-4 py-2">&nbsp;</td>
                    <td className="whitespace-nowrap px-4 py-2">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Code Dialog */}
      <AlertDialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
        <AlertDialogOverlay className="bg-black/70 opacity-50 " />
        <AlertDialogContent className="fixed inset-0 flex items-center justify-center"> 
          <AlertDialogHeader>
            <AlertDialogTitle>File Share Information</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedFile && (
                <div>
                  <div>File Name: {selectedFile.fileName}</div>
                  <div>File Size: {(selectedFile.fileSize / 1024 / 1024).toFixed(2)} MB</div>
                  <div>File Type: {getFileType(selectedFile.fileType)}</div>
                  <div>Password: {selectedFile.password || 'Not set'}</div>
                  {qrCodeUrl && (
                    <div className="mt-4 flex justify-center">
                      <img src={qrCodeUrl} alt="Generated QR Code" />
                    </div>
                  )}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex justify-end'>
            <AlertDialogCancel onClick={() => setIsQrDialogOpen(false)}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FileList;
