
export enum MessageAuthor {
  USER = 'user',
  CONTACT = 'contact',
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document',
  VOICE = 'voice',
  PAYMENT = 'payment',
  POLL = 'poll',
}

export interface PaymentDetails {
  amount: string;
  note: string;
  status: 'completed' | 'pending' | 'failed';
  transactionId: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollDetails {
  question: string;
  options: PollOption[];
  voters: string[]; // Array of user/contact IDs who have voted
}

export interface Message {
  id:string;
  author: MessageAuthor;
  type: MessageType;
  content: string; // For TEXT, message. For IMAGE/VOICE, base64 URL. For DOCUMENT, filename. For PAYMENT, a summary.
  timestamp: string;
  duration?: number; // For voice notes
  payment?: PaymentDetails;
  poll?: PollDetails;
}

export interface UserStatus {
    image: string;
    timestamp: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status?: UserStatus;
  isEvent?: boolean;
  expiry?: number; // Timestamp for event chat expiration
}