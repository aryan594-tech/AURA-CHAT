
import React, { useState } from 'react';
import { CloseIcon, PlusIcon } from '../constants';

interface CreatePollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (question: string, options: string[]) => void;
}

const CreatePollModal: React.FC<CreatePollModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    if (!isOpen) return null;

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, '']);
        }
    };
    
    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    }

    const handleSubmit = () => {
        const validOptions = options.map(o => o.trim()).filter(o => o);
        if (question.trim() && validOptions.length >= 2) {
            onCreate(question.trim(), validOptions);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="poll-modal-title"
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 id="poll-modal-title" className="text-lg font-semibold">Create Poll</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700" aria-label="Close poll creation">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </header>

                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="poll-question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question</label>
                        <input
                            id="poll-question"
                            type="text"
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            placeholder="What do you want to ask?"
                            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Options</label>
                        <div className="space-y-2">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={e => handleOptionChange(index, e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
                                    />
                                    {options.length > 2 && (
                                        <button onClick={() => removeOption(index)} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full">
                                          <CloseIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                     {options.length < 5 && (
                        <button onClick={addOption} className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 hover:underline">
                            <PlusIcon className="w-4 h-4" />
                            <span>Add option</span>
                        </button>
                     )}
                </div>

                <footer className="p-4 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                    <button 
                        onClick={handleSubmit}
                        disabled={!question.trim() || options.filter(o => o.trim()).length < 2}
                        className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Create
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default CreatePollModal;
