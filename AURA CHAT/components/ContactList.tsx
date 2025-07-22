
import React from 'react';
import { Contact } from '../types';
import { ClockIcon } from '../constants';

interface ContactListProps {
  onSelectContact: (contact: Contact) => void;
  selectedContactId: string | null;
  contacts: Contact[];
  eventChats: Contact[];
}

const formatTimeLeft = (expiry: number) => {
    const now = Date.now();
    const diff = expiry - now;
    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
}

const ContactListItem = ({ contact, onSelectContact, isSelected }: { contact: Contact, onSelectContact: (c: Contact) => void, isSelected: boolean }) => (
    <li
      onClick={() => onSelectContact(contact)}
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isSelected ? 'bg-green-100 dark:bg-green-900/50' : ''}`}
      aria-current={isSelected}
    >
      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">{contact.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{contact.lastMessageTime}</p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate w-4/5">{contact.lastMessage}</p>
          {contact.unreadCount > 0 && (
            <span className="bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {contact.unreadCount}
            </span>
          )}
        </div>
      </div>
    </li>
);

const EventChatListItem = ({ chat, onSelectContact, isSelected }: { chat: Contact, onSelectContact: (c: Contact) => void, isSelected: boolean }) => (
     <li
      onClick={() => onSelectContact(chat)}
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isSelected ? 'bg-green-100 dark:bg-green-900/50' : ''}`}
      aria-current={isSelected}
    >
      <div className="relative mr-4">
        <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
        <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5 border-2 border-white dark:border-gray-900">
            <ClockIcon className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">{chat.name}</h3>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-red-500 dark:text-red-400 truncate">{chat.expiry ? formatTimeLeft(chat.expiry) : 'Event'}</p>
        </div>
      </div>
    </li>
);

const ContactList: React.FC<ContactListProps> = ({ onSelectContact, selectedContactId, contacts, eventChats }) => {
  return (
    <div className="bg-white dark:bg-gray-900 w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {eventChats.length > 0 && (
            <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 px-2 uppercase">Events</h3>
                <ul>
                    {eventChats.map(chat => (
                        <EventChatListItem 
                            key={chat.id}
                            chat={chat}
                            onSelectContact={onSelectContact}
                            isSelected={selectedContactId === chat.id}
                        />
                    ))}
                </ul>
            </div>
        )}
        <div className="p-2">
           <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 my-1 px-2 uppercase">Chats</h3>
            <ul>
              {contacts.map((contact) => (
                <ContactListItem 
                    key={contact.id}
                    contact={contact}
                    onSelectContact={onSelectContact}
                    isSelected={selectedContactId === contact.id}
                />
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactList;