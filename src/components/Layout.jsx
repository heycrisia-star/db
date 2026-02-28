import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Map, UtensilsCrossed, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-lg transition-all font-bold text-sm h-full ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            }`
        }
    >
        <Icon className="w-5 h-5 md:w-4 md:h-4" />
        <span className="hidden md:inline">{label}</span>
        <span className="md:hidden text-[10px] uppercase text-center leading-none">{label}</span>
    </NavLink>
);

const LanguageSelector = () => {
    const { language, setLanguage, AVAILABLE_LANGUAGES } = useLanguage();

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg px-2 py-1 border border-slate-200 hover:bg-slate-200 transition-colors">
            <Globe className="w-4 h-4 text-slate-500" />
            <select
                value={language}
                onChange={handleChange}
                className="bg-transparent text-sm font-semibold text-slate-700 cursor-pointer outline-none appearance-none pr-4"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23475569%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.2rem top 50%', backgroundSize: '0.65rem auto' }}
            >
                {AVAILABLE_LANGUAGES?.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.code.toUpperCase()} - {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const Layout = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            {/* Mobile Top Bar */}
            <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-50 px-4 py-3 shadow-sm flex justify-between items-center bg-opacity-95 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg">
                        BCN
                    </div>
                </div>
                <LanguageSelector />
            </div>

            {/* Desktop Navigation Bar */}
            <nav className="hidden md:flex fixed top-0 w-full bg-white border-b border-slate-200 z-50 px-6 py-3 shadow-sm justify-between items-center bg-opacity-95 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg">
                        BCN
                    </div>
                    <span className="font-extrabold text-slate-800 tracking-tight">Barcelona<span className="text-blue-600">2026</span></span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <NavItem to="/" icon={UtensilsCrossed} label={t('nav.dining')} />
                        <NavItem to="/itinerary" icon={Map} label={t('nav.itinerary')} />
                        <NavItem to="/dashboard" icon={LayoutDashboard} label={t('nav.dashboard')} />
                    </div>
                    <div className="h-6 w-px bg-slate-200 mx-1"></div>
                    <LanguageSelector />
                </div>
            </nav>

            {/* Mobile Bottom Navigation (Tabs Only) */}
            <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 pb-safe">
                <div className="grid grid-cols-3 p-2 gap-1">
                    <NavItem to="/" icon={UtensilsCrossed} label={t('nav.dining')} />
                    <NavItem to="/itinerary" icon={Map} label={t('nav.itinerary')} />
                    <NavItem to="/dashboard" icon={LayoutDashboard} label={t('nav.dashboard')} />
                </div>
            </nav>

            {/* Content Padding for Fixed Navs */}
            <div className="pt-[60px] pb-[80px] md:pt-[70px] md:pb-0 flex-1">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default Layout;
