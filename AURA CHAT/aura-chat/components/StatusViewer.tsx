import React, { useState, useEffect } from 'react';
import { Contact } from '../types';
import { CloseIcon } from '../constants';

interface StatusViewerProps {
    contact: Contact;
    onClose: () => void;
}

const STATUS_DURATION = 5000; // 5 seconds

const StatusViewer: React.FC<StatusViewerProps> = ({ contact, onClose }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate the progress bar
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = (elapsedTime / STATUS_DURATION) * 100;
            if (newProgress >= 100) {
                onClose();
            } else {
                setProgress(newProgress);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [onClose]);

    if (!contact.status) {
        onClose();
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="status-viewer-heading"
        >
            <div className="w-full max-w-lg mx-auto">
                {/* Progress Bar */}
                <div className="h-1 bg-white/30 rounded-full mb-2">
                    <div 
                        className="h-1 bg-white rounded-full transition-all duration-50" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                {/* Header */}
                <header className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <h2 id="status-viewer-heading" className="font-semibold text-white">{contact.name}</h2>
                            <p className="text-xs text-gray-300">{contact.status.timestamp}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white" aria-label="Close status viewer">
                        <CloseIcon />
                    </button>
                </header>
            </div>
            
            {/* Status Image */}
            <div className="flex-1 flex items-center justify-center w-full max-w-lg">
                <img 
                    src={contact.status.image} 
                    alt={`Status from ${contact.name}`}
                    className="max-h-full max-w-full object-contain rounded-lg"
                />
            </div>
        </div>
    );
};

export default StatusViewer;
