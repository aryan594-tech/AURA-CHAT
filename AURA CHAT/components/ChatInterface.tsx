
import React, { useState, useEffect, useCallback } from 'react';
import { Contact, UserStatus } from '../types';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';
import StatusList from './StatusList';
import StatusViewer from './StatusViewer';
import { PREDEFINED_CONTACTS } from '../constants';
import { PlusCircleIcon } from '../constants';

// A simple modal for creating event chats. In a real app, this would be more complex.
const CreateEventChatModal = ({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string) => void; }) => {
    const [name, setName] = useState('');
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">Create Event Chat</h2>
                <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Event Name"
                    className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 rounded text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-600">Cancel</button>
                    <button 
                        onClick={() => {
                            if(name) {
                                onCreate(name);
                                onClose();
                            }
                        }} 
                        className="px-4 py-2 rounded text-white bg-green-600"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};


interface ChatInterfaceProps {
    username: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ username }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [activeTab, setActiveTab] = useState<'chats' | 'status'>('chats');
  const [viewingStatusOf, setViewingStatusOf] = useState<Contact | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [eventChats, setEventChats] = useState<Contact[]>([]);
  const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);

  const getEventChatsKey = useCallback(() => `eventChats_${username}`, [username]);
  const getUserStatusKey = useCallback(() => `userStatus_${username}`, [username]);

  // Load and manage event chats and user status from local storage
  useEffect(() => {
    const savedStatus = localStorage.getItem(getUserStatusKey());
    if (savedStatus) {
      setUserStatus(JSON.parse(savedStatus));
    }
    
    const checkExpiredEvents = () => {
        const savedEvents = localStorage.getItem(getEventChatsKey());
        let currentEvents = savedEvents ? JSON.parse(savedEvents) : [];
        const now = Date.now();
        const activeEvents = currentEvents.filter((event: Contact) => event.expiry && event.expiry > now);
        
        if (activeEvents.length !== currentEvents.length) {
            localStorage.setItem(getEventChatsKey(), JSON.stringify(activeEvents));
        }
        setEventChats(activeEvents);
    };
    
    checkExpiredEvents();
    const interval = setInterval(checkExpiredEvents, 60 * 1000); // Check every minute
    return () => clearInterval(interval);

  }, [getUserStatusKey, getEventChatsKey]);

  const handleSetUserStatus = (image: string) => {
    const newStatus: UserStatus = { image, timestamp: 'Just now' };
    setUserStatus(newStatus);
    localStorage.setItem(getUserStatusKey(), JSON.stringify(newStatus));
  };
  
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    if(activeTab !== 'chats') setActiveTab('chats');
  }

  const handleCreateEventChat = (name: string) => {
      const newEvent: Contact = {
          id: `event-${Date.now()}`,
          name,
          avatar: `https://picsum.photos/seed/${name}/200`,
          isEvent: true,
          expiry: Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
          lastMessage: "Event created!",
          lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unreadCount: 0,
      };
      const updatedEvents = [...eventChats, newEvent];
      setEventChats(updatedEvents);
      localStorage.setItem(getEventChatsKey(), JSON.stringify(updatedEvents));
      setSelectedContact(newEvent);
  };

  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="hidden md:flex flex-shrink-0 w-80 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Gemini Chat</h1>
            <div className="flex items-center space-x-2">
                <button onClick={() => setCreateEventModalOpen(true)} className="text-green-500 hover:text-green-600" aria-label="Create new event chat">
                    <PlusCircleIcon className="w-7 h-7" />
                </button>
            </div>
        </header>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <button 
                onClick={() => setActiveTab('chats')} 
                className={`flex-1 p-3 text-sm font-semibold transition-colors focus:outline-none ${activeTab === 'chats' ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                aria-pressed={activeTab === 'chats'}
            >
                CHATS
            </button>
            <button 
                onClick={() => setActiveTab('status')} 
                className={`flex-1 p-3 text-sm font-semibold transition-colors focus:outline-none ${activeTab === 'status' ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                aria-pressed={activeTab === 'status'}
            >
                STATUS
            </button>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar">
            {activeTab === 'chats' ? (
                <ContactList 
                    onSelectContact={handleSelectContact} 
                    selectedContactId={selectedContact?.id || null} 
                    contacts={PREDEFINED_CONTACTS}
                    eventChats={eventChats}
                />
            ) : (
                <StatusList
                    contacts={PREDEFINED_CONTACTS}
                    userStatus={userStatus}
                    onViewStatus={setViewingStatusOf}
                    onSetUserStatus={handleSetUserStatus}
                />
            )}
        </div>
      </div>
      <div className="flex-1">
        <ChatWindow contact={selectedContact} username={username} />
      </div>
      
      {viewingStatusOf && (
        <StatusViewer 
            contact={viewingStatusOf}
            onClose={() => setViewingStatusOf(null)}
        />
      )}
      {isCreateEventModalOpen && (
          <CreateEventChatModal 
            onClose={() => setCreateEventModalOpen(false)}
            onCreate={handleCreateEventChat}
          />
      )}
    </div>
  );
};

export default ChatInterface;