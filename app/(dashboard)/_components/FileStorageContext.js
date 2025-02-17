import React, { createContext, useState, useContext, useEffect } from 'react';

const FileStorageContext = createContext();

export const FileStorageProvider = ({ children }) => {
  const [totalMBUsed, setTotalMBUsed] = useState(0);

  const updateTotalMBUsed = (fileList) => {
    const totalBytes = fileList.reduce((acc, file) => acc + (file.fileSize || 0), 0);
    const totalMB = totalBytes / (1024 * 1024);
    setTotalMBUsed(totalMB);
  };

  return (
    <FileStorageContext.Provider value={{ totalMBUsed, updateTotalMBUsed }}>
      {children}
    </FileStorageContext.Provider>
  );
};

export const useFileStorage = () => {
  const context = useContext(FileStorageContext);
  if (context === undefined) {
    return { totalMBUsed: 0, updateTotalMBUsed: () => {} };
  }
  return context;
};