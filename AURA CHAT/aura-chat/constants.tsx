import { Contact } from './types';

export const PREDEFINED_CONTACTS: Contact[] = [
  {
    id: 'contact-1',
    name: 'Priya',
    avatar: 'https://picsum.photos/seed/priya/200',
    lastMessage: "Sounds good! I'll be there.",
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
    status: {
      image: 'https://picsum.photos/seed/priya_status/400/800',
      timestamp: '2 hours ago',
    },
  },
  {
    id: 'contact-2',
    name: 'Rohan',
    avatar: 'https://picsum.photos/seed/rohan/200',
    lastMessage: "Just sent over the document.",
    lastMessageTime: '9:15 AM',
    unreadCount: 0,
  },
  {
    id: 'contact-3',
    name: 'Anjali',
    avatar: 'https://picsum.photos/seed/anjali/200',
    lastMessage: 'Can you review this presentation?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    status: {
      image: 'https://picsum.photos/seed/anjali_status/400/800',
      timestamp: '5 hours ago',
    },
  },
  {
    id: 'contact-4',
    name: 'Vikram',
    avatar: 'https://picsum.photos/seed/vikram/200',
    lastMessage: 'Happy Birthday! 🎉',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
  },
  {
    id: 'contact-5',
    name: 'Aarav',
    avatar: 'https://picsum.photos/seed/aarav/200',
    lastMessage: "I'm running a bit late, see you in 10.",
    lastMessageTime: '8:55 AM',
    unreadCount: 0,
    status: {
      image: 'https://picsum.photos/seed/aarav_status/400/800',
      timestamp: 'Just now',
    },
  },
  {
    id: 'contact-6',
    name: 'Diya',
    avatar: 'https://picsum.photos/seed/diya/200',
    lastMessage: "Let's catch up this weekend!",
    lastMessageTime: 'Yesterday',
    unreadCount: 3,
  },
  {
    id: 'contact-7',
    name: 'Kabir',
    avatar: 'https://picsum.photos/seed/kabir/200',
    lastMessage: 'Check out this cool article.',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
  },
  {
    id: 'contact-8',
    name: 'Mira',
    avatar: 'https://picsum.photos/seed/mira/200',
    lastMessage: 'Thanks for your help with the project!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    status: {
      image: 'https://picsum.photos/seed/mira_status/400/800',
      timestamp: '8 hours ago',
    },
  },
  {
    id: 'contact-9',
    name: 'Siddharth',
    avatar: 'https://picsum.photos/seed/siddharth/200',
    lastMessage: "Did you watch the game last night?",
    lastMessageTime: '7:12 AM',
    unreadCount: 5,
  },
  {
    id: 'contact-10',
    name: 'Zara',
    avatar: 'https://picsum.photos/seed/zara/200',
    lastMessage: "What's the plan for dinner?",
    lastMessageTime: '10:05 AM',
    unreadCount: 0,
  },
];

export const THEME_PRESETS = [
    { name: 'Aura Green', color: '#34D399', classes: { bg: 'bg-green-500', text: 'text-green-500', hoverBg: 'hover:bg-green-600', ring: 'focus:ring-green-500', border: 'border-green-500', darkText: 'dark:text-green-400' } },
    { name: 'Ocean Blue', color: '#3B82F6', classes: { bg: 'bg-blue-500', text: 'text-blue-500', hoverBg: 'hover:bg-blue-600', ring: 'focus:ring-blue-500', border: 'border-blue-500', darkText: 'dark:text-blue-400' } },
    { name: 'Sunset Orange', color: '#F97316', classes: { bg: 'bg-orange-500', text: 'text-orange-500', hoverBg: 'hover:bg-orange-600', ring: 'focus:ring-orange-500', border: 'border-orange-500', darkText: 'dark:text-orange-400' } },
    { name: 'Royal Purple', color: '#8B5CF6', classes: { bg: 'bg-purple-500', text: 'text-purple-500', hoverBg: 'hover:bg-purple-600', ring: 'focus:ring-purple-500', border: 'border-purple-500', darkText: 'dark:text-purple-400' } },
    { name: 'Hot Pink', color: '#EC4899', classes: { bg: 'bg-pink-500', text: 'text-pink-500', hoverBg: 'hover:bg-pink-600', ring: 'focus:ring-pink-500', border: 'border-pink-500', darkText: 'dark:text-pink-400' } },
];

export const FONT_OPTIONS = [
    { name: 'Inter', value: '"Inter", sans-serif' },
    { name: 'Roboto', value: '"Roboto", sans-serif' },
    { name: 'Lora', value: '"Lora", serif' },
    { name: 'Roboto Mono', value: '"Roboto Mono", monospace' },
];

export const BACKGROUND_OPTIONS = [
    { name: 'Default', value: '' },
    { name: 'Doodles', value: 'url(https://i.pinimg.com/originals/a7/f9/45/a7f9457a4b175a1c1664e156488a03a7.jpg)' },
    { name: 'Polka', value: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/full-bloom.png)'},
    { name: 'Geometry', value: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/geometric-leaves.png)'}
];

export const PaperclipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
    </svg>
);

export const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const VideoCameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} className={`h-6 w-6 ${props.className || ''}`.trim()} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

export const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const MicrophoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 11-14 0m7 10v3m-6 4h12a3 3 0 003-3V11a7 7 0 00-14 0v7a3 3 0 003 3z" />
    </svg>
);

export const DocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm10.5 0A2.25 2.25 0 0116.5 3.75h2.25A2.25 2.25 0 0121 6v2.25A2.25 2.25 0 0118.75 10.5H16.5a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM16.5 13.5a2.25 2.25 0 00-2.25 2.25V18a2.25 2.25 0 002.25 2.25h2.25A2.25 2.25 0 0021 18v-2.25a2.25 2.25 0 00-2.25-2.25H16.5z" clipRule="evenodd" />
    </svg>
);

export const GalleryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06l2.755-2.754a.75.75 0 011.06 0l3.978 3.978a.75.75 0 001.06 0l4.22-4.22a.75.75 0 011.06 0l3.125 3.124V6H3v10.06z" clipRule="evenodd" />
    </svg>
);

export const CurrencyRupeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M8.25 4.5a.75.75 0 01.75.75v2.25H15a.75.75 0 010 1.5H9v.75h4.5a.75.75 0 010 1.5H9v.75h6.75a.75.75 0 010 1.5H9.75v2.636a.75.75 0 01-1.5 0V12H6.75a.75.75 0 01-.75-.75V10.5a.75.75 0 01.75-.75h1.5V6H6a.75.75 0 010-1.5h2.25z" clipRule="evenodd" />
    </svg>
);

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
);

export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

export const MagicIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M9.422 2.262a.75.75 0 011.156 0l1.33 2.024a.75.75 0 00.578.37l2.255.22a.75.75 0 01.442 1.31l-1.72 1.432a.75.75 0 00-.23.69l.52 2.21a.75.75 0 01-1.12.822l-1.956-1.218a.75.75 0 00-.738 0l-1.956 1.218a.75.75 0 01-1.12-.822l.52-2.21a.75.75 0 00-.23-.69L2.69 6.186a.75.75 0 01.442-1.31l2.255-.22a.75.75 0 00.578-.37l1.33-2.024zM15.75 10.5a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75zM14.12 14.12a.75.75 0 010-1.061l.01-.01a.75.75 0 011.06 1.06l-.01.01a.75.75 0 01-1.06 0zM17.25 12a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75zM12.75 17.25a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75zM10.5 15.75a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);

export const PollIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M4.5 16.5a.75.75 0 000 1.5h15a.75.75 0 000-1.5H4.5z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M4.5 5.25A.75.75 0 015.25 4.5h13.5a.75.75 0 01.75.75v8.25a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V5.25zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 6.75zm.75 2.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm0 3a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" clipRule="evenodd" />
    </svg>
);

export const CanvasIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.25 3.25a.75.75 0 00-1.5 0v1.25a.75.75 0 001.5 0V3.25z" />
        <path fillRule="evenodd" d="M4.125 6.332A5.25 5.25 0 019.375 3h5.25a5.25 5.25 0 015.25 5.25v5.25c0 .414.05.818.143 1.206a.75.75 0 01-1.48.288A5.99 5.99 0 0018.375 15V9.375a3.75 3.75 0 00-3.75-3.75h-5.25a3.75 3.75 0 00-3.75 3.75v5.25a3.75 3.75 0 003.75 3.75h5.25c.414 0 .818-.05 1.206-.143a.75.75 0 01.288 1.48A5.99 5.99 0 0114.625 19.5h-5.25a5.25 5.25 0 01-5.25-5.25V6.332z" clipRule="evenodd" />
        <path d="M11.25 19.75a.75.75 0 00-1.5 0v1.25a.75.75 0 001.5 0v-1.25zM19.75 12.75a.75.75 0 01.75-.75h1.25a.75.75 0 010 1.5h-1.25a.75.75 0 01-.75-.75zM3.25 12.75a.75.75 0 01.75-.75h1.25a.75.75 0 010 1.5H4a.75.75 0 01-.75-.75z" />
    </svg>
);

export const PlusCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
    </svg>
);

export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
    </svg>
);

export const ARSparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M11.25 3.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM9.91 5.91a.75.75 0 00-1.06-1.06l-1.062 1.06a.75.75 0 001.061 1.062l1.06-1.06zM3.25 9.25a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM6.97 12.03a.75.75 0 00-1.06 1.06l1.06 1.062a.75.75 0 101.06-1.061l-1.06-1.06zM9.25 16.75a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5zM15.03 13.09a.75.75 0 00-1.06-1.06l-1.062 1.06a.75.75 0 001.061 1.062l1.06-1.06zM16.75 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12.03 6.97a.75.75 0 001.06-1.06l-1.06-1.062a.75.75 0 00-1.061 1.061l1.06 1.06zM10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" clipRule="evenodd" />
    </svg>
);

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M11.49 3.17a.75.75 0 011.02 0l1.125 1.125a.75.75 0 010 1.02l-1.125 1.125a.75.75 0 01-1.02 0L9.366 5.29a.75.75 0 010-1.02l1.125-1.125zM10 5.81L8.875 4.685a2.25 2.25 0 013.182 0L13.182 5.81a2.25 2.25 0 010 3.182L12.057 10l1.125 1.125a2.25 2.25 0 010 3.182L12.057 15.43l-1.125 1.125a2.25 2.25 0 01-3.182 0L6.625 15.43a2.25 2.25 0 010-3.182L7.75 11.125 6.625 10 5.5 11.125a2.25 2.25 0 01-3.182 0L1.192 9.995a2.25 2.25 0 010-3.182L2.318 5.687a2.25 2.25 0 013.182 0L6.625 6.81l1.125-1.125L8.875 4.56l-1.125-1.125a2.25 2.25 0 010-3.182L8.875.127a2.25 2.25 0 013.182 0L13.182 1.25l1.125 1.125a2.25 2.25 0 010 3.182L13.182 6.68l-1.125 1.125 1.125 1.125 1.125-1.125a2.25 2.25 0 013.182 0l1.125 1.125a2.25 2.25 0 010 3.182l-1.125 1.125a2.25 2.25 0 01-3.182 0l-1.125-1.125-1.125 1.125-1.125 1.125a2.25 2.25 0 01-3.182 0L8.875 14.32l-1.125-1.125-1.125 1.125a2.25 2.25 0 01-3.182 0L2.318 13.193a2.25 2.25 0 010-3.182l1.125-1.125L4.56 10l1.125 1.125 1.125-1.125a2.25 2.25 0 013.182 0L11.125 11.125l1.125-1.125z" clipRule="evenodd" />
    </svg>
);
