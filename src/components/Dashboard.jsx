
import React, { useState, useEffect, useMemo } from 'react';
import { CalendarDays, BarChart2, Calendar, PieChart as PieIcon, Zap, List } from 'lucide-react';
import { MONTHS, MASTER_EVENTS_LIST, TYPES, LOCATIONS } from '../data/events';
import PieChart from './PieChart';
import MapView from './MapView';
import { useLanguage } from '../context/LanguageContext';

// --- HELPERS DE COLOR ---
const getMonthlyColor = (share) => {
    if (share >= 8.5) return { hex: '#22c55e', tailwind: 'bg-green-500', text: 'text-green-600', label: 'ALTO' };
    if (share >= 7.0) return { hex: '#eab308', tailwind: 'bg-yellow-500', text: 'text-yellow-600', label: 'MEDIO' };
    return { hex: '#ef4444', tailwind: 'bg-red-500', text: 'text-red-600', label: 'BAJO' };
};

const getWeeklyColor = (occupancy) => {
    if (occupancy >= 85) return { hex: '#22c55e', tailwind: 'bg-green-500', label: 'Saturación' };
    if (occupancy >= 65) return { hex: '#eab308', tailwind: 'bg-yellow-500', label: 'Alta' };
    return { hex: '#ef4444', tailwind: 'bg-red-500', label: 'Media/Baja' };
};

// --- GENERACIÓN DE DATOS ---
const getMondayOfWeek = (weekNo) => {
    const d = new Date("2026-01-01");
    const dayNum = d.getDay() || 7;
    d.setDate(d.getDate() + 4 - dayNum);
    const yearStart = new Date(d);
    const simpleDate = new Date(yearStart.getTime() + (weekNo - 1) * 7 * 24 * 60 * 60 * 1000);
    const day = simpleDate.getDay() || 7;
    if (day !== 1) simpleDate.setHours(-24 * (day - 1));
    return simpleDate;
};

const generateYearData = () => {
    const weeks = [];
    const monthBase = [220000, 200000, 210000, 230000, 200000, 290000, 270000, 250000, 210000, 200000, 160000, 180000];
    const MAX_CAPACITY = 350000;

    for (let i = 1; i <= 52; i++) {
        const mondayDate = getMondayOfWeek(i);
        const monthIdx = mondayDate.getMonth();
        let load = monthBase[monthIdx];

        const weekEvents = MASTER_EVENTS_LIST.filter(e => e.weekId === i);

        weekEvents.forEach(e => {
            if (e.type === 'BIZ' || e.name.includes("Mobile")) load += 70000;
            else if (e.name.includes("F1") || e.name.includes("Tour")) load += 100000;
            else if (e.name.includes("Primavera")) load += 110000;
            else if (e.name.includes("Sant Jordi")) load += 60000;
            else load += 30000;
        });

        const occupancy = Math.min((load / MAX_CAPACITY) * 100, 100);

        weeks.push({
            id: i,
            monthIndex: monthIdx,
            startDateStr: `${mondayDate.getDate()} ${MONTHS[monthIdx].substring(0, 3)}`,
            visitors: Math.round(load),
            occupancy: Math.round(occupancy),
            events: weekEvents
        });
    }
    return weeks;
};

const DATA = generateYearData();
const TOTAL_ANNUAL_VISITORS = DATA.reduce((acc, curr) => acc + curr.visitors, 0);

const MONTHLY_DATA = MONTHS.map((name, index) => {
    const weeksInMonth = DATA.filter(w => w.monthIndex === index);
    const totalVisitors = weeksInMonth.reduce((acc, w) => acc + w.visitors, 0);
    const shareOfTotal = (totalVisitors / TOTAL_ANNUAL_VISITORS) * 100;
    const avgOccupancy = Math.round(weeksInMonth.reduce((acc, w) => acc + w.occupancy, 0) / weeksInMonth.length);
    return { name, index, totalVisitors, avgOccupancy, shareOfTotal, weeks: weeksInMonth };
});

const Dashboard = () => {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState('annual');
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(5);
    const [selectedWeekId, setSelectedWeekId] = useState(23);

    const weeksToShow = useMemo(() => DATA.filter(w => w.monthIndex === selectedMonthIndex).sort((a, b) => a.id - b.id), [selectedMonthIndex]);
    const currentWeekData = DATA.find(w => w.id === selectedWeekId) || weeksToShow[0] || DATA[0];

    const scrollToListMonth = (monthIndex) => {
        const element = document.getElementById(`month-header-${monthIndex}`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handlePieSliceClick = (index) => {
        scrollToListMonth(index);
    };

    const handleMonthChange = (index) => {
        setSelectedMonthIndex(index);
        const firstWeek = DATA.find(w => w.monthIndex === index);
        if (firstWeek) setSelectedWeekId(firstWeek.id);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 pb-20">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2"><BarChart2 className="text-blue-600" /> {t('dashboard.title')}</h1>
                    <p className="text-xs text-slate-500 font-medium mt-1">{t('dashboard.subtitle')}</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button onClick={() => setViewMode('weekly')} className={`px-4 py-2 text-sm font-bold rounded-md transition-all flex items-center gap-2 ${viewMode === 'weekly' ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}><Calendar className="w-4 h-4" /> {t('dashboard.calendar_btn')}</button>
                    <button onClick={() => setViewMode('annual')} className={`px-4 py-2 text-sm font-bold rounded-md transition-all flex items-center gap-2 ${viewMode === 'annual' ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}><PieIcon className="w-4 h-4" /> {t('dashboard.annual_btn')}</button>
                </div>
            </div>

            {/* Annual View */}
            {viewMode === 'annual' && (
                <div className="flex flex-col lg:flex-row items-start justify-center gap-8 animate-fade-in py-4">
                    <div className="flex-shrink-0 mx-auto lg:mx-0">
                        <PieChart data={MONTHLY_DATA} onSliceClick={handlePieSliceClick} totalVisitors={TOTAL_ANNUAL_VISITORS} />
                        <div className="mt-4 text-center text-xs text-slate-400">{t('dashboard.pie_hint')}</div>
                    </div>

                    <div className="flex-1 w-full h-[65vh] lg:h-[500px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                        <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-blue-600" /> {t('dashboard.event_calendar')}
                            </h3>
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{t('dashboard.chronological')}</span>
                        </div>

                        <div className="overflow-y-auto custom-scroll p-0 flex-1 relative">
                            {MONTHS.map((monthName, mIdx) => {
                                const monthEvents = MASTER_EVENTS_LIST.filter(e => e.monthIdx === mIdx);
                                if (monthEvents.length === 0) return null;

                                return (
                                    <div key={mIdx} id={`month-header-${mIdx}`} className="border-b border-slate-100 last:border-0">
                                        <div className="sticky top-0 bg-slate-100/95 backdrop-blur-sm px-4 py-2 text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 z-20 shadow-sm">
                                            {monthName}
                                        </div>
                                        <div className="divide-y divide-slate-50 bg-white">
                                            {monthEvents.map((evt) => (
                                                <div key={evt.id} className="p-3 hover:bg-blue-50 transition-colors flex gap-3 items-start group">
                                                    <div className="w-14 shrink-0 text-center pt-1">
                                                        <div className="text-xs font-black text-slate-700 uppercase">{evt.date.split(' ')[0]}</div>
                                                        <div className="text-[9px] font-bold text-slate-400 uppercase">{evt.date.split(' ')[1] || ''}</div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{evt.name}</h4>
                                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-white shadow-sm ${TYPES[evt.type].bg}`}>
                                                                {TYPES[evt.type].short}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">{evt.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Weekly View */}
            {viewMode === 'weekly' && (
                <div>
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-2 custom-scroll">
                        {MONTHS.map((m, idx) => (
                            <button key={m} onClick={() => handleMonthChange(idx)}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${selectedMonthIndex === idx ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                {m}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 h-64 flex items-end justify-between gap-2 relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase">{t('dashboard.weekly_occupancy')} {MONTHS[selectedMonthIndex]}</div>
                                {weeksToShow.map(week => {
                                    const isActive = week.id === selectedWeekId;
                                    const colorClass = getWeeklyColor(week.occupancy).tailwind;
                                    return (
                                        <div key={week.id} onClick={() => setSelectedWeekId(week.id)} className="flex-1 flex flex-col justify-end h-full cursor-pointer group relative z-10">
                                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-20">{week.visitors.toLocaleString()} ({week.occupancy}%)</div>
                                            {week.events.length > 0 && <div className="mb-1 mx-auto animate-bounce"><Zap className={`w-3 h-3 ${isActive ? 'text-blue-600 fill-blue-600' : 'text-slate-300'}`} /></div>}
                                            <div className={`w-full rounded-t-sm chart-bar ${colorClass} ${isActive ? 'ring-2 ring-blue-500 brightness-110' : 'opacity-80'}`} style={{ height: `${week.occupancy}%` }}></div>
                                            <div className={`text-[10px] text-center mt-2 font-bold ${isActive ? 'text-blue-700' : 'text-slate-300'}`}>S{week.id}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                                <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('dashboard.week')} {currentWeekData.id}</span>
                                        <h2 className="text-2xl font-black text-slate-800 leading-none mt-1">{currentWeekData.startDateStr}</h2>
                                        <div className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold text-white ${getWeeklyColor(currentWeekData.occupancy).tailwind}`}>
                                            {currentWeekData.occupancy}% {t('dashboard.occupancy')}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-slate-700">{currentWeekData.visitors.toLocaleString()}</div>
                                        <div className="text-[10px] text-slate-400 uppercase">{t('dashboard.visitors')}</div>
                                    </div>
                                </div>

                                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase"><List className="w-4 h-4" /> {t('dashboard.key_events')}</h4>
                                {currentWeekData.events.length > 0 ? (
                                    <div className="space-y-3">
                                        {currentWeekData.events.map((evt, idx) => (
                                            <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex gap-3 items-start hover:border-blue-200 transition-colors">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0 ${TYPES[evt.type].bg} shadow-sm uppercase leading-tight text-center`}>
                                                    {evt.date.split(' ')[0]}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm">{evt.name}</div>
                                                    <div className="text-xs text-slate-500 leading-snug">{evt.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-slate-400 text-sm italic bg-slate-50 rounded border border-dashed border-slate-200">{t('dashboard.no_events')}</div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="bg-white p-1 rounded-xl shadow-lg border border-slate-200 sticky top-4">
                                <div className="p-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-slate-500 uppercase">{t('dashboard.impact_map')}</span>
                                </div>
                                <div className="h-[400px]">
                                    <MapView activeWeek={currentWeekData} />
                                </div>
                                <div className="p-3 grid grid-cols-2 gap-2">
                                    {Object.values(TYPES).map((t, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-600 font-medium">
                                            <span className={`w-2 h-2 rounded-full ${t.bg}`}></span> {t.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
