import React, { useRef } from 'react';
import { Contact, UserStatus } from '../types';
import { PlusIcon } from '../constants';

interface StatusListProps {
    contacts: Contact[];
    userStatus: UserStatus | null;
    onViewStatus: (contact: Contact) => void;
    onSetUserStatus: (imageBase64: string) => void;
}

const StatusList: React.FC<StatusListProps> = ({ contacts, userStatus, onViewStatus, onSetUserStatus }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleMyStatusClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                if (loadEvent.target?.result) {
                    onSetUserStatus(loadEvent.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    const contactsWithStatus = contacts.filter(c => c.status);

    return (
        <div className="p-2 space-y-2">
            <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* My Status */}
            <div className="p-2">
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">My Status</h3>
                 <div
                    onClick={handleMyStatusClick}
                    className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    role="button"
                    aria-label="Add or view your status"
                 >
                    <div className="relative">
                        <img 
                            src={userStatus?.image || 'https://via.placeholder.com/150/6366f1/ffffff?text=U'} 
                            alt="My status"
                            className="w-12 h-12 rounded-full object-cover" 
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full border-2 border-white dark:border-gray-900">
                             <PlusIcon className="w-5 h-5 text-white p-0.5" />
                        </div>
                    </div>
                    <div className="ml-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">Add to my status</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Share a photo or video</p>
                    </div>
                </div>
            </div>

            {/* Recent Updates */}
            {contactsWithStatus.length > 0 && (
                <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">Recent Updates</h3>
                    <ul>
                        {contactsWithStatus.map(contact => (
                            <li key={contact.id}>
                                <div
                                    onClick={() => onViewStatus(contact)}
                                    className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    role="button"
                                    aria-label={`View status from ${contact.name}`}
                                >
                                    <div className="p-0.5 border-2 border-green-500 rounded-full">
                                      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">{contact.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{contact.status?.timestamp}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StatusList;
