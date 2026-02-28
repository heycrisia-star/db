import React, { createContext, useState, useContext } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export const AVAILABLE_LANGUAGES = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文 (Mandarin)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية (Arabic)' },
    { code: 'ru', name: 'Русский (Russian)' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'de', name: 'Deutsch' }
];

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get('lang');
        const validCodes = AVAILABLE_LANGUAGES.map(l => l.code);
        return (lang && validCodes.includes(lang)) ? lang : 'es';
    });

    const t = (key) => {
        return TRANSLATIONS[language]?.[key] || TRANSLATIONS['es']?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, AVAILABLE_LANGUAGES }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
