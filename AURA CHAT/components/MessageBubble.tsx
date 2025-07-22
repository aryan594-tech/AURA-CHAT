
import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageAuthor, MessageType, PollDetails, PollOption } from '../types';
import { DocumentIcon as FileIcon } from '../constants'; // Renaming for clarity
import { CheckCircleIcon, PollIcon } from '../constants';

const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return '0:00';
    const totalSeconds = Math.floor(timeInSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const AudioPlayer = ({ src, duration, isUser }: { src: string; duration?: number; isUser: boolean; }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [internalDuration, setInternalDuration] = useState(duration || 0);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
                setCurrentTime(audio.currentTime);
            }
        };
        
        const handleMetadata = () => {
            if(audio.duration && isFinite(audio.duration)){
                setInternalDuration(audio.duration);
            }
        }

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            if(audio) {
              audio.currentTime = 0;
            }
        };
        
        audio.addEventListener('loadedmetadata', handleMetadata);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', handleMetadata);
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(error => console.error("Audio play failed:", error));
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        const progressBar = progressRef.current;
        if (!audio || !progressBar || !isFinite(audio.duration)) return;

        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * audio.duration;
        audio.currentTime = newTime;
    };
    
    const playerClasses = isUser ? 'text-white' : 'text-gray-600 dark:text-gray-300';
    const progressBgClass = isUser ? 'bg-white/30' : 'bg-gray-300 dark:bg-gray-500';
    const progressFgClass = isUser ? 'bg-white' : 'bg-green-500';

    return (
        <div className={`flex items-center space-x-2 ${playerClasses} w-60 sm:w-64`}>
            <audio ref={audioRef} src={src} preload="metadata"></audio>
            <button onClick={togglePlayPause} aria-label={isPlaying ? "Pause audio" : "Play audio"}>
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 100-2H8V8a1 1 0 00-1-1zm5 1a1 1 0 10-2 0v4a1 1 0 102 0V8z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.118v3.764a1 1 0 001.555.832l3.197-1.882a1 1 0 000-1.664l-3.197-1.882z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
            <div className="flex-grow flex flex-col justify-center">
                <div ref={progressRef} onClick={handleSeek} className={`h-1.5 ${progressBgClass} rounded-full cursor-pointer w-full`}>
                    <div className={`h-1.5 ${progressFgClass} rounded-full`} style={{ width: `${progress}%` }}></div>
                </div>
                 <div className="text-xs mt-1 text-right w-full">
                    {`${formatTime(currentTime)} / ${formatTime(internalDuration)}`}
                 </div>
            </div>
        </div>
    );
};

const PollBubble = ({ poll, messageId, onVote, isUser }: { poll: PollDetails; messageId: string; onVote: (msgId: string, optionId: string) => void; isUser: boolean; }) => {
    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
    const hasVoted = poll.voters.includes(isUser ? 'user' : 'contact');

    const bubbleColor = isUser ? 'bg-green-500' : 'bg-white dark:bg-gray-700';
    const textColor = isUser ? 'text-white' : 'text-gray-800 dark:text-gray-100';
    const metaColor = isUser ? 'text-green-200' : 'text-gray-500 dark:text-gray-400';

    return (
        <div className={`w-72 sm:w-80 rounded-lg shadow-md ${bubbleColor}`}>
            <div className={`p-3 border-b ${isUser ? 'border-green-400' : 'border-gray-200 dark:border-gray-600'}`}>
                <div className="flex items-start">
                    <PollIcon className={`h-5 w-5 mr-3 mt-1 flex-shrink-0 ${textColor}`} />
                    <h4 className={`font-bold ${textColor}`}>{poll.question}</h4>
                </div>
            </div>
            <div className="p-3 space-y-2">
                {poll.options.map(option => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                        <div key={option.id}>
                            {hasVoted ? (
                                <div className="relative w-full text-sm rounded-md p-2 text-left bg-gray-500/20 overflow-hidden">
                                    <div 
                                        className={`absolute top-0 left-0 h-full rounded-md ${isUser ? 'bg-white/20' : 'bg-green-500/30'}`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                    <div className="relative flex justify-between">
                                        <span className={`font-medium ${textColor}`}>{option.text}</span>
                                        <span className={`font-semibold ${textColor}`}>{Math.round(percentage)}%</span>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => onVote(messageId, option.id)}
                                    className={`w-full text-sm rounded-md p-2 text-left transition-colors ${isUser ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'} ${textColor}`}
                                >
                                    {option.text}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={`px-3 py-2 text-xs text-right ${metaColor}`}>
                {totalVotes} vote{totalVotes !== 1 ? 's' : ''} &middot; {hasVoted ? "You've voted" : "Tap to vote"}
            </div>
        </div>
    );
};


const MessageBubble = ({ message, onVote }: { message: Message; onVote: (msgId: string, optionId: string) => void; }) => {
    const isUser = message.author === MessageAuthor.USER;

    const bubbleClasses = isUser
        ? 'bg-green-600 text-white self-end rounded-bl-none'
        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start rounded-br-none';
    
    const plainBubbleClasses = isUser
        ? 'self-end'
        : 'self-start';

    const renderMessageContent = () => {
        switch (message.type) {
            case MessageType.TEXT: {
                const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%?=~_|])|(\bwww\.[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%?=~_|])/ig;
                const parts = message.content.split(urlRegex).filter(part => part);

                return (
                    <p className="text-sm whitespace-pre-wrap break-words">
                        {parts.map((part, index) => {
                             if (urlRegex.test(part)) {
                                const href = part.startsWith('www.') ? `http://${part}` : part;
                                return <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={`hover:underline ${isUser ? 'text-green-200' : 'text-blue-500 dark:text-blue-400'}`}>{part}</a>;
                            }
                            return part;
                        })}
                    </p>
                );
            }
            case MessageType.IMAGE:
                return (
                    <a href={message.content} target="_blank" rel="noopener noreferrer" aria-label="View image in full screen">
                        <img src={message.content} alt="User sent content" className="rounded-lg max-w-xs cursor-pointer" loading="lazy"/>
                    </a>
                );
            case MessageType.DOCUMENT: {
                const isUserDoc = isUser ? 'text-green-100' : 'text-gray-700 dark:text-gray-300';
                const docBg = isUser ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600';
                return (
                    <div className={`flex items-center space-x-3 p-3 ${docBg} rounded-lg`}>
                        <FileIcon className={`h-8 w-8 ${isUserDoc}`} />
                        <span className={`text-sm font-medium ${isUserDoc} break-all`}>{message.content}</span>
                    </div>
                );
            }
            case MessageType.VOICE:
                 return <AudioPlayer src={message.content} duration={message.duration} isUser={isUser} />;
            case MessageType.PAYMENT:
                 if (!message.payment) return null;
                 const { amount, note } = message.payment;
                 return (
                     <div className={`w-72 rounded-lg ${isUser ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
                         <div className={`p-3 border-b ${isUser ? 'border-green-400' : 'border-gray-300 dark:border-gray-500'}`}>
                            <h4 className={`font-bold text-lg ${isUser ? 'text-white' : 'text-gray-800 dark:text-gray-100'}`}>
                                 Payment {isUser ? 'Sent' : 'Received'}
                             </h4>
                         </div>
                         <div className="p-3">
                             <p className={`text-3xl font-light mb-2 ${isUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                 ₹{amount}
                             </p>
                             {note && <p className={`text-sm italic mb-3 ${isUser ? 'text-green-100' : 'text-gray-600 dark:text-gray-300'}`}>"{note}"</p>}
                             <div className="flex items-center text-sm">
                                 <CheckCircleIcon className={`h-5 w-5 mr-2 ${isUser ? 'text-green-200' : 'text-green-600 dark:text-green-400'}`} />
                                 <span className={isUser ? 'text-green-100' : 'text-gray-700 dark:text-gray-200'}>
                                     Transaction {message.payment.status}
                                 </span>
                             </div>
                         </div>
                         <div className={`px-3 py-2 text-xs rounded-b-lg ${isUser ? 'bg-green-700/50' : 'bg-gray-300/50 dark:bg-gray-700/50'}`}>
                             ID: {message.payment.transactionId}
                         </div>
                     </div>
                 );
            case MessageType.POLL:
                 if (!message.poll) return null;
                 return <PollBubble poll={message.poll} messageId={message.id} onVote={onVote} isUser={isUser} />;
            default:
                return null;
        }
    };
    
    const isSpecialBubble = message.type === MessageType.PAYMENT || message.type === MessageType.DOCUMENT || message.type === MessageType.POLL;

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md md:max-w-lg shadow-sm ${isSpecialBubble ? plainBubbleClasses : `${bubbleClasses} rounded-2xl px-3 py-2`}`}>
                <div className="min-w-[50px]">
                    {renderMessageContent()}
                </div>
                 {!isSpecialBubble && (
                     <div className={`text-xs mt-1 ${isUser ? 'text-green-200' : 'text-gray-400 dark:text-gray-500'} text-right`}>
                         {message.timestamp}
                     </div>
                 )}
            </div>
        </div>
    );
};

export default MessageBubble;