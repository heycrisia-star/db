
import React from 'react';
import { RESTAURANTS } from '../data/restaurants';
import { Star, Utensils, Euro } from 'lucide-react';
import Infographic from './Infographic';
import diningInfoImg from '../assets/barcelona-dining-infographic.jpg';
import { useLanguage } from '../context/LanguageContext';

const Dining = () => {
    const { t, language } = useLanguage();
    const restaurants = RESTAURANTS[language] || RESTAURANTS.es;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 mb-2">{t('dining.title')}</h1>
                <p className="text-slate-500">{t('dining.subtitle')}</p>
            </div>

            <Infographic src={diningInfoImg} alt="Guía Gastronómica Barcelona" title={t('infographic.dining')} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((rest, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-slate-800">{rest.name}</h3>
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                                {rest.price}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                <Star className="w-4 h-4 fill-current" /> {rest.rating.split(' ')[0]}
                            </div>
                            <div className="flex items-center gap-1 text-blue-600 font-medium">
                                <Utensils className="w-4 h-4" /> {rest.style}
                            </div>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                            {rest.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dining;
