
import React, { useState } from 'react';
import { Contact } from '../types';
import { CloseIcon, PhoneIcon, MicrophoneIcon } from '../constants';

interface VideoCallModalProps {
    contact: Contact;
    onClose: () => void;
}

const ARFilterButton = ({ label, icon, onSelect, isSelected }: {label: string, icon: string, onSelect: () => void, isSelected: boolean}) => (
    <button onClick={onSelect} className="flex flex-col items-center space-y-1 flex-shrink-0">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl transition-all ${isSelected ? 'bg-blue-500/30 border-2 border-blue-400' : 'bg-black/20'}`}>
            {icon}
        </div>
        <span className="text-xs text-white">{label}</span>
    </button>
);


const VideoCallModal: React.FC<VideoCallModalProps> = ({ contact, onClose }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const filters = [
        { id: 'none', label: 'None', icon: '🙂' },
        { id: 'sunglasses', label: 'Shades', icon: '😎' },
        { id: 'party', label: 'Party', icon: '🥳' },
        { id: 'stars', label: 'Cosmic', icon: '🤩' },
        { id: 'love', label: 'Love', icon: '😍' },
    ];
    
    const renderFilterOverlay = () => {
        switch(activeFilter) {
            case 'sunglasses':
                return <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-8xl">😎</div>;
            case 'party':
                return <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-8xl">🥳</div>;
            case 'stars':
                return <>
                    <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">✨</div>
                    <div className="absolute bottom-1/4 right-1/4 text-6xl animate-pulse [animation-delay:0.5s]">🌟</div>
                </>;
            case 'love':
                 return <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-8xl">😍</div>;
            default:
                return null;
        }
    }

    return (
        <div 
            className="fixed inset-0 bg-black/90 flex flex-col items-center justify-between z-50 p-4 text-white"
            role="dialog"
            aria-modal="true"
        >
            {/* Header */}
            <header className="w-full flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">{contact.name}</h2>
                    <p className="text-sm text-gray-300">Connecting...</p>
                </div>
                <button onClick={onClose} aria-label="Close video call"><CloseIcon /></button>
            </header>

            {/* Video Feeds */}
            <div className="w-full flex-grow flex items-center justify-center relative my-4">
                {/* Contact's Video Feed (Placeholder) */}
                 <div className="absolute top-4 right-4 w-32 h-48 bg-gray-700 rounded-lg shadow-lg flex items-center justify-center">
                    <img src={contact.avatar} className="w-full h-full object-cover rounded-lg" />
                 </div>

                {/* User's Video Feed (Placeholder) */}
                <div className="w-full max-w-2xl h-[60vh] bg-gray-800 rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                    <span className="text-gray-500">Your Camera</span>
                    {renderFilterOverlay()}
                </div>
            </div>


            {/* Filter Tray */}
            <div className="w-full max-w-2xl mb-4">
                <div className="bg-black/30 backdrop-blur-md p-2 rounded-xl">
                    <div className="flex items-center space-x-4 overflow-x-auto custom-scrollbar pb-2">
                       {filters.map(filter => (
                           <ARFilterButton 
                                key={filter.id}
                                label={filter.label}
                                icon={filter.icon}
                                onSelect={() => setActiveFilter(filter.id)}
                                isSelected={activeFilter === filter.id}
                           />
                       ))}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <footer className="w-full flex justify-center items-center space-x-6">
                <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-white text-black' : 'bg-gray-700/50'}`}
                    aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                    <MicrophoneIcon />
                </button>
                 <button onClick={onClose} className="p-4 rounded-full bg-red-600 hover:bg-red-700" aria-label="End call">
                    <PhoneIcon className="rotate-[135deg]" />
                </button>
            </footer>
        </div>
    );
};

export default VideoCallModal;
