
import React from 'react';
import { RESTAURANTS } from '../data/restaurants';
import { Star, Utensils, Euro } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Filter, ArrowUpDown } from 'lucide-react';

const Dining = () => {
    const { t, language } = useLanguage();
    const restaurants = RESTAURANTS[language] || RESTAURANTS.es;

    const [filterCategory, setFilterCategory] = React.useState('all');
    const [sortBy, setSortBy] = React.useState('default');

    const categoryToKey = {
        "Tapas & Pinchos": "cat.tapas",
        "Mediterránea & Local": "cat.mediterranea",
        "Carnes & Brasas": "cat.carnes",
        "Italiana & Pizza": "cat.italiana",
        "Asiática & Sushi": "cat.asiatica",
        "Mexicana & Latina": "cat.mexicana",
        "Burgers & Street Food": "cat.burgers",
        "Alta Cocina & Autor": "cat.altacocina",
        "Desayunos, Cafés & Dulces": "cat.desayunos",
        "Bares & Coctelerías": "cat.bares"
    };

    // Get unique categories for the filter
    const categories = React.useMemo(() => {
        const uniqueStyles = new Set(restaurants.map(r => r.style));
        return Array.from(uniqueStyles).sort();
    }, [restaurants]);

    // Apply filter and sort
    const processedRestaurants = React.useMemo(() => {
        let result = [...restaurants];

        if (filterCategory !== 'all') {
            result = result.filter(r => r.style === filterCategory);
        }

        switch (sortBy) {
            case 'rating':
                result.sort((a, b) => {
                    const ratingA = parseFloat(a.rating) || 0;
                    const ratingB = parseFloat(b.rating) || 0;
                    return ratingB - ratingA;
                });
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // default is the original order
                break;
        }

        return result;
    }, [restaurants, filterCategory, sortBy]);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 mb-2">{t('dining.title')}</h1>
                <p className="text-slate-500">{t('dining.subtitle')}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-slate-500" />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-auto p-2.5 outline-none"
                    >
                        <option value="all">{t('dining.all_categories') || 'Todas las categorías'}</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{t(categoryToKey[cat]) || cat}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <ArrowUpDown className="w-5 h-5 text-slate-500" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-auto p-2.5 outline-none"
                    >
                        <option value="default">{t('dining.sort_default') || 'Recomendados'}</option>
                        <option value="rating">{t('dining.sort_rating') || 'Mejor valorados'}</option>
                        <option value="name">{t('dining.sort_name') || 'Nombre (A-Z)'}</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedRestaurants.map((rest, idx) => (
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
                                <Utensils className="w-4 h-4" /> {t(categoryToKey[rest.style]) || rest.style}
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
