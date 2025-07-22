import React, { useState, useEffect, Fragment } from 'react';
import { Contact } from '../types';
import { CurrencyRupeeIcon, LockIcon, CloseIcon } from '../constants';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPay: (details: { amount: string; note: string }) => void;
    contact: Contact;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPay, contact }) => {
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setAmount('');
            setNote('');
        }
    }, [isOpen]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount && parseFloat(amount) > 0) {
            onPay({ amount, note });
        }
    }

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 id="payment-modal-title" className="text-lg font-semibold text-gray-800 dark:text-gray-100">Send Payment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" aria-label="Close payment modal">
                        <CloseIcon className="h-6 w-6"/>
                    </button>
                </header>

                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Paying</p>
                            <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">{contact.name}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-3xl font-light text-gray-400 dark:text-gray-500">₹</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-4xl font-bold pl-10 pr-4 py-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                autoFocus
                                required
                                min="1"
                                step="any"
                                aria-label="Amount in Rupees"
                            />
                        </div>

                        <div className="mb-6">
                            <input
                                type="text"
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                placeholder="Add a note (optional)"
                                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Payment note"
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={!amount || parseFloat(amount) <= 0}
                            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            <LockIcon className="h-4 w-4 mr-2" />
                            Pay Securely
                        </button>
                    </form>
                </div>
                
                <footer className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Secure UPI</p>
                </footer>
            </div>
        </div>
    );
};

export default PaymentModal;
