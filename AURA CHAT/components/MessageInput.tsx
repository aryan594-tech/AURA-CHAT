
import React, { useState, useRef, useEffect } from 'react';
import { PaperclipIcon, SendIcon, DocumentIcon, GalleryIcon, CurrencyRupeeIcon, MagicIcon, PollIcon, CanvasIcon } from '../constants';
import { MessageType, PaymentDetails, Contact, PollDetails } from '../types';
import PaymentModal from './PaymentModal';

interface MessageInputProps {
  onSendMessage: (type: MessageType, content: string, details?: PaymentDetails | PollDetails) => void;
  contact: Contact | null;
  onMagicReply: () => void;
  magicSuggestions: string[];
  isMagicLoading: boolean;
  onShowPollModal: () => void;
  onShowCanvas: () => void;
}

const AttachmentPopover = ({ onSelect, onTriggerFile }: { onSelect: (type: string) => void; onTriggerFile: (accept: string) => void; }) => {
    const items = [
        { type: 'poll', label: 'Poll', icon: <PollIcon className="h-6 w-6 text-orange-500"/>, action: () => onSelect('poll') },
        { type: 'payment', label: 'Payment', icon: <CurrencyRupeeIcon className="h-6 w-6 text-purple-500"/>, action: () => onSelect('payment') },
        { type: 'canvas', label: 'Canvas', icon: <CanvasIcon className="h-6 w-6 text-red-500"/>, action: () => onSelect('canvas') },
        { type: 'gallery', label: 'Photo & Video', icon: <GalleryIcon className="h-6 w-6 text-pink-500" />, action: () => onTriggerFile('image/*,video/*') },
        { type: 'document', label: 'Document', icon: <DocumentIcon className="h-6 w-6 text-blue-500"/>, action: () => onTriggerFile('*/*') },
    ];

    return (
        <div 
            className="absolute bottom-16 left-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-20 overflow-hidden"
        >
            <ul className="py-2">
                {items.map(item => (
                    <li key={item.type}>
                        <button onClick={item.action} className="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            {item.icon}
                            <span className="ml-4 font-medium">{item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const MessageInput: React.FC<MessageInputProps> = ({ 
    onSendMessage, 
    contact, 
    onMagicReply,
    magicSuggestions,
    isMagicLoading,
    onShowPollModal,
    onShowCanvas,
}) => {
  const [text, setText] = useState('');
  const [isAttachmentPopoverOpen, setIsAttachmentPopoverOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSendText = (content: string) => {
    if (content.trim()) {
      onSendMessage(MessageType.TEXT, content.trim());
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText(text);
    }
  };
  
  const handleAttachmentClick = () => {
      setIsAttachmentPopoverOpen(prev => !prev);
  };
  
  const triggerFile = (accept: string) => {
    if (fileInputRef.current) {
        fileInputRef.current.accept = accept;
        fileInputRef.current.click();
    }
    setIsAttachmentPopoverOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          if (loadEvent.target?.result) {
            onSendMessage(MessageType.IMAGE, loadEvent.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        onSendMessage(MessageType.DOCUMENT, file.name);
      }
    }
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePopoverSelect = (type: string) => {
    setIsAttachmentPopoverOpen(false);
    if(type === 'payment') setIsPaymentModalOpen(true);
    if(type === 'poll') onShowPollModal();
    if(type === 'canvas') onShowCanvas();
  };

  const handleMakePayment = (details: Omit<PaymentDetails, 'status' | 'transactionId'>) => {
      const paymentDetails: PaymentDetails = {
          ...details,
          status: 'completed',
          transactionId: `T${Date.now()}`
      };
      onSendMessage(MessageType.PAYMENT, `Payment of ₹${details.amount} sent.`, paymentDetails);
      setIsPaymentModalOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
        setIsAttachmentPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {magicSuggestions.length > 0 && (
            <div className="px-4 pt-2 flex flex-wrap gap-2">
                {magicSuggestions.map((suggestion, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleSendText(suggestion)}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 dark:hover:bg-green-900"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        )}
        <div className="relative p-4 flex items-center space-x-3">
           {isAttachmentPopoverOpen && 
            <div ref={popoverRef}>
                <AttachmentPopover onSelect={handlePopoverSelect} onTriggerFile={triggerFile} />
            </div>
           }
           
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex">
            <button ref={buttonRef} onClick={handleAttachmentClick} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                <PaperclipIcon />
            </button>
            <button 
                onClick={onMagicReply} 
                className="text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors ml-2" 
                aria-label="Generate AI reply"
                disabled={isMagicLoading}
            >
                {isMagicLoading ? (
                    <svg className="animate-spin h-6 w-6 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <MagicIcon className="w-6 h-6" />
                )}
            </button>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={() => handleSendText(text)}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!text.trim()}
            aria-label="Send Message"
          >
            <SendIcon />
          </button>

          {contact && <PaymentModal 
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            onPay={handleMakePayment}
            contact={contact}
          />}
        </div>
    </div>
  );
};

export default MessageInput;