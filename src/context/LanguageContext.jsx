import React, { createContext, useState, useContext } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get('lang');
        return (lang && ['es', 'en', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ca'].includes(lang)) ? lang : 'es';
    });

    const t = (key) => {
        return TRANSLATIONS[language]?.[key] || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
