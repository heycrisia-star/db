import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="w-full py-6 bg-slate-100 text-center text-slate-500 text-sm border-t border-slate-200 mt-auto">
            <div className="flex flex-col gap-2">
                <p>
                    {t('footer.property')} <a href="https://www.legacytoursspain.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">www.legacytoursspain.com</a>
                </p>
                <p className="font-medium text-xs uppercase tracking-wide opacity-80">{t('footer.exclusive')}</p>
            </div>
        </footer>
    );
};

export default Footer;
