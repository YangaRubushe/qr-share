import React from 'react';
import QRCode from 'qrcode.react'; // Ensure this package is installed
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QRGenerator = ({ qrValue, isOpen, onClose }) => {
    console.log("QRGenerator component rendered");

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Generated QR Code</AlertDialogTitle>
                    <AlertDialogDescription>
                        Scan the QR code below to access the URL.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center my-4">
                    <QRCode value={qrValue} size={200} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        
    );
    
};

// Ensure you're using default export
export default QRGenerator;
