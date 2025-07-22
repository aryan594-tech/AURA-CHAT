
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Contact, Message, MessageAuthor, MessageType, PaymentDetails, PollDetails, PollOption } from '../types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { getGeminiReply, getMagicReplyAndSummary } from '../services/geminiService';
import { LockIcon, PhoneIcon, VideoCameraIcon, ARSparklesIcon } from '../constants';
import CreatePollModal from './CreatePollModal';
import ChatCanvas from './ChatCanvas';
import VideoCallModal from './VideoCallModal';

interface ChatWindowProps {
  contact: Contact | null;
  username: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ contact, username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const [magicSuggestions, setMagicSuggestions] = useState<string[]>([]);
  const [magicSummary, setMagicSummary] = useState<string | null>(null);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getLocalStorageKey = useCallback(() => {
    return contact ? `chatHistory_${username}_${contact.id}` : null;
  }, [contact, username]);

  const saveMessages = useCallback((updatedMessages: Message[]) => {
      const key = getLocalStorageKey();
      if (key) {
        localStorage.setItem(key, JSON.stringify(updatedMessages));
      }
      setMessages(updatedMessages);
  }, [getLocalStorageKey]);

  useEffect(() => {
    if (contact) {
      const key = getLocalStorageKey();
      if (key) {
        const savedMessages = localStorage.getItem(key);
        setMessages(savedMessages ? JSON.parse(savedMessages) : []);
      }
      setMagicSuggestions([]);
      setMagicSummary(null);
    } else {
      setMessages([]);
    }
  }, [contact, getLocalStorageKey]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  useEffect(() => {
    if (magicSummary) {
      const timer = setTimeout(() => setMagicSummary(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [magicSummary]);

  const handleSendMessage = useCallback(async (type: MessageType, content: string, details?: PaymentDetails | PollDetails) => {
    if (!contact) return;
    setMagicSuggestions([]);

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      author: MessageAuthor.USER,
      type: type,
      content: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (type === MessageType.PAYMENT) userMessage.payment = details as PaymentDetails;
    if (type === MessageType.POLL) userMessage.poll = details as PollDetails;
    
    const updatedMessages = [...messages, userMessage];
    saveMessages(updatedMessages);
    
    if (type === MessageType.TEXT) {
      setIsTyping(true);
      const geminiReplyText = await getGeminiReply(contact.id, content, updatedMessages);
      setIsTyping(false);
  
      const contactMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        author: MessageAuthor.CONTACT,
        type: MessageType.TEXT,
        content: geminiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      saveMessages([...updatedMessages, contactMessage]);
    } else if (type === MessageType.PAYMENT && userMessage.payment) {
        setIsTyping(true);
        setTimeout(() => {
            const contactMessage: Message = {
                id: `msg-${Date.now() + 1}`,
                author: MessageAuthor.CONTACT,
                type: MessageType.TEXT,
                content: `Thanks for the payment of ₹${userMessage.payment?.amount}! I've received it.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            saveMessages([...updatedMessages, contactMessage]);
            setIsTyping(false);
        }, 1500);
    }

  }, [contact, messages, saveMessages]);

  const handleMagicReply = async () => {
    setIsMagicLoading(true);
    setMagicSuggestions([]);
    const { summary, suggestions } = await getMagicReplyAndSummary(messages, username);
    setMagicSummary(summary);
    setMagicSuggestions(suggestions);
    setIsMagicLoading(false);
  };

  const handleCreatePoll = (question: string, options: string[]) => {
    const pollDetails: PollDetails = {
      question,
      options: options.map((opt, i) => ({ id: `opt-${i}`, text: opt, votes: 0 })),
      voters: [],
    };
    handleSendMessage(MessageType.POLL, `Poll: ${question}`, pollDetails);
    setIsPollModalOpen(false);
  };

  const handleVote = (messageId: string, optionId: string) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId && msg.poll) {
        const hasVoted = msg.poll.voters.includes(msg.author === MessageAuthor.USER ? 'user' : 'contact');
        if (!hasVoted) {
          const newPoll = { ...msg.poll };
          newPoll.options = newPoll.options.map(opt => 
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          );
          newPoll.voters = [...newPoll.voters, MessageAuthor.USER]; // Assume user is voting
          
          // Simulate contact voting
           setTimeout(() => {
                const finalMessages = messages.map(m => {
                    if(m.id === messageId && m.poll) {
                        const contactHasVoted = m.poll.voters.includes(MessageAuthor.CONTACT);
                        if (!contactHasVoted) {
                           const contactPoll = { ...m.poll };
                           const randomOptionId = contactPoll.options[Math.floor(Math.random() * contactPoll.options.length)].id;
                           contactPoll.options = contactPoll.options.map(opt => opt.id === randomOptionId ? { ...opt, votes: opt.votes + 1} : opt);
                           contactPoll.voters = [...contactPoll.voters, MessageAuthor.CONTACT];
                           return { ...m, poll: contactPoll };
                        }
                    }
                    return m;
                });
                saveMessages(finalMessages);
           }, 1000);
          
          return { ...msg, poll: newPoll };
        }
      }
      return msg;
    });
    saveMessages(updatedMessages);
  };

  const handleSendCanvas = (imageData: string) => {
    handleSendMessage(MessageType.IMAGE, imageData);
    setIsCanvasOpen(false);
  };

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h2 className="text-xl mt-4 font-semibold">Welcome to Gemini Secure Chat</h2>
        <p className="mt-2">Select a contact to start messaging</p>
         <p className="mt-8 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-md flex items-center">
            <LockIcon /> Messages are end-to-end encrypted.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800/50 relative">
      <header className="p-4 flex items-center bg-white dark:bg-gray-900 shadow-md z-10 flex-shrink-0">
        <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full mr-4" />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{contact.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">{isTyping ? 'typing...' : (contact.isEvent ? 'Event Chat' : 'online')}</p>
        </div>
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
            <button onClick={() => setIsVideoCallOpen(true)} className="hover:text-green-500 transition-colors"><VideoCameraIcon /></button>
            <button onClick={() => setIsVideoCallOpen(true)} className="hover:text-green-500 transition-colors"><PhoneIcon /></button>
            <button onClick={() => setIsVideoCallOpen(true)} className="hover:text-green-500 transition-colors"><ARSparklesIcon className="h-6 w-6" /></button>
        </div>
      </header>

      {magicSummary && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full shadow-lg z-20 backdrop-blur-sm">
          <strong>Summary:</strong> {magicSummary}
        </div>
      )}

      <main className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-4">
            <p className="text-center text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-md my-2">
                <LockIcon />
                Messages are end-to-end encrypted. No one outside of this chat, not even Gemini Secure Chat, can read or listen to them.
            </p>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} onVote={handleVote} />
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <MessageInput 
        onSendMessage={handleSendMessage} 
        contact={contact} 
        onMagicReply={handleMagicReply}
        magicSuggestions={magicSuggestions}
        isMagicLoading={isMagicLoading}
        onShowPollModal={() => setIsPollModalOpen(true)}
        onShowCanvas={() => setIsCanvasOpen(true)}
      />

      <CreatePollModal 
        isOpen={isPollModalOpen}
        onClose={() => setIsPollModalOpen(false)}
        onCreate={handleCreatePoll}
      />
      
      {isCanvasOpen && (
        <ChatCanvas 
            onClose={() => setIsCanvasOpen(false)}
            onSend={handleSendCanvas}
        />
      )}

      {isVideoCallOpen && (
        <VideoCallModal
            contact={contact}
            onClose={() => setIsVideoCallOpen(false)}
        />
      )}

    </div>
  );
};

export default ChatWindow;