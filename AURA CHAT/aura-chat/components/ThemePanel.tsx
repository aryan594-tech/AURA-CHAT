import React from 'react';
import { useTheme, ThemeSettings } from './ThemeContext';
import { THEME_PRESETS, FONT_OPTIONS, BACKGROUND_OPTIONS } from '../constants';
import { CloseIcon } from '../constants';

interface ThemePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const ThemePanel: React.FC<ThemePanelProps> = ({ isOpen, onClose }) => {
    const { theme, setTheme } = useTheme();

    const updateTheme = (change: Partial<ThemeSettings>) => {
        setTheme(prev => ({ ...prev, ...change }));
    };

    return (
        <div className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-2xl z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-80 border-l border-gray-200 dark:border-gray-700`}>
            <div className="flex flex-col h-full">
                <header className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold">Theme Settings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>

                <div className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
                    {/* Mode */}
                    <section>
                        <h3 className="font-semibold mb-2">Mode</h3>
                        <div className="flex items-center space-x-2 rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                            <button 
                                onClick={() => updateTheme({ mode: 'light' })}
                                className={`flex-1 py-1.5 rounded-md text-sm font-medium ${theme.mode === 'light' ? 'bg-white shadow' : ''}`}
                            >
                                Light
                            </button>
                             <button 
                                onClick={() => updateTheme({ mode: 'dark' })}
                                className={`flex-1 py-1.5 rounded-md text-sm font-medium ${theme.mode === 'dark' ? 'bg-gray-800 text-white shadow' : 'dark:text-gray-300'}`}
                            >
                                Dark
                            </button>
                        </div>
                    </section>

                    {/* Accent Color */}
                    <section>
                        <h3 className="font-semibold mb-2">Accent Color</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {THEME_PRESETS.map(preset => (
                                <button 
                                    key={preset.name}
                                    onClick={() => updateTheme({ themeName: preset.name })}
                                    className={`h-10 w-full rounded-lg border-2 ${theme.themeName === preset.name ? 'border-blue-500' : 'border-transparent'}`}
                                    style={{ backgroundColor: preset.color }}
                                    aria-label={`Set theme to ${preset.name}`}
                                ></button>
                            ))}
                        </div>
                        <div className="mt-3">
                            <label className="flex items-center p-2 rounded-lg border-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                style={{ borderColor: theme.themeName === 'custom' ? theme.customPrimaryColor : 'transparent' }}
                            >
                                <input
                                    type="color"
                                    value={theme.customPrimaryColor}
                                    onChange={e => updateTheme({ themeName: 'custom', customPrimaryColor: e.target.value })}
                                    className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                                />
                                <span className="ml-3 font-medium">Custom</span>
                            </label>
                        </div>
                    </section>

                    {/* Chat Wallpaper */}
                    <section>
                         <h3 className="font-semibold mb-2">Chat Wallpaper</h3>
                         <div className="grid grid-cols-3 gap-2">
                             {BACKGROUND_OPTIONS.map(bg => (
                                <button
                                    key={bg.name}
                                    onClick={() => updateTheme({ chatBackground: bg.value })}
                                    className={`h-16 rounded-lg border-2 flex items-center justify-center text-xs font-semibold ${theme.chatBackground === bg.value ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
                                    style={{ backgroundImage: bg.value, backgroundSize: 'cover' }}
                                >
                                    {bg.value === '' && <span className="text-gray-500">Default</span>}
                                </button>
                             ))}
                         </div>
                    </section>

                    {/* Font Style */}
                    <section>
                        <h3 className="font-semibold mb-2">Font Style</h3>
                        <select
                            value={theme.fontFamily}
                            onChange={e => updateTheme({ fontFamily: e.target.value })}
                            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                           {FONT_OPTIONS.map(font => (
                               <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>{font.name}</option>
                           ))}
                        </select>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ThemePanel;
