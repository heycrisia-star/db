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

const Layout = () => {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            {/* Mobile Top Bar (Logo Only) */}
            <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-50 px-4 py-3 shadow-sm flex justify-center items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg">
                        BCN
                    </div>
                    <span className="font-extrabold text-slate-800 tracking-tight">Barcelona<span className="text-blue-600">2026</span></span>
                </div>
            </div>

            {/* Desktop Navigation Bar */}
            <nav className="hidden md:flex fixed top-0 w-full bg-white border-b border-slate-200 z-50 px-6 py-3 shadow-sm justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg">
                        BCN
                    </div>
                    <span className="font-extrabold text-slate-800 tracking-tight">Barcelona<span className="text-blue-600">2026</span></span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <NavItem to="/" icon={Map} label={t('nav.itinerary')} />
                        <NavItem to="/dining" icon={UtensilsCrossed} label={t('nav.dining')} />
                        <NavItem to="/dashboard" icon={LayoutDashboard} label={t('nav.dashboard')} />
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation (Tabs Only) */}
            <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 pb-safe">
                <div className="grid grid-cols-3 p-2 gap-1">
                    <NavItem to="/" icon={Map} label={t('nav.itinerary')} />
                    <NavItem to="/dining" icon={UtensilsCrossed} label={t('nav.dining')} />
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
