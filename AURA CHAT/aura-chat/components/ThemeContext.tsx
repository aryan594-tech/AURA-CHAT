import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { THEME_PRESETS, FONT_OPTIONS, BACKGROUND_OPTIONS } from '../constants';

export interface ThemeSettings {
    mode: 'light' | 'dark';
    themeName: string;
    customPrimaryColor: string;
    fontFamily: string;
    chatBackground: string;
}

interface ThemeContextType {
    theme: ThemeSettings;
    setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
    getThemeClasses: () => { bg: string; text: string; hoverBg: string; ring: string; border: string; darkText: string, style?: React.CSSProperties, customPrimaryColor?: string };
}

const defaultTheme: ThemeSettings = {
    mode: 'dark',
    themeName: 'Aura Green',
    customPrimaryColor: '#34D399',
    fontFamily: FONT_OPTIONS[0].value,
    chatBackground: BACKGROUND_OPTIONS[0].value,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeSettings>(() => {
        try {
            const savedTheme = localStorage.getItem('aura-chat-theme');
            return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
        } catch (error) {
            return defaultTheme;
        }
    });

    useEffect(() => {
        localStorage.setItem('aura-chat-theme', JSON.stringify(theme));
        
        const root = document.documentElement;
        if (theme.mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        document.body.style.fontFamily = theme.fontFamily;

    }, [theme]);
    
    const getThemeClasses = useCallback(() => {
        if (theme.themeName === 'custom') {
            return { 
                bg: '', text: '', hoverBg: '', ring: '', border: '', darkText: '',
                style: { backgroundColor: theme.customPrimaryColor },
                customPrimaryColor: theme.customPrimaryColor,
            };
        }
        const preset = THEME_PRESETS.find(p => p.name === theme.themeName) || THEME_PRESETS[0];
        return { ...preset.classes, style: {} };
    }, [theme.themeName, theme.customPrimaryColor]);

    const value = useMemo(() => ({ theme, setTheme, getThemeClasses }), [theme, getThemeClasses]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};