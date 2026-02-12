import React, { useMemo } from 'react';
import { MONTHS } from '../data/events';

// Helper to get color
const getMonthlyColor = (share) => {
    if (share >= 8.5) return { hex: '#22c55e', tailwind: 'bg-green-500', text: 'text-green-600', label: 'ALTO' };
    if (share >= 7.0) return { hex: '#eab308', tailwind: 'bg-yellow-500', text: 'text-yellow-600', label: 'MEDIO' };
    return { hex: '#ef4444', tailwind: 'bg-red-500', text: 'text-red-600', label: 'BAJO' };
};

const PieChart = ({ data, onSliceClick, totalVisitors }) => {
    let cumulativePercent = 0;
    const getCoordinates = (percent, radius = 1) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x * radius, y * radius];
    };

    return (
        <div className="relative w-80 h-80 lg:w-96 lg:h-96 shrink-0 select-none">
            <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full drop-shadow-xl">
                {data.map((month, i) => {
                    const slicePercent = month.shareOfTotal / 100;
                    const startPercent = cumulativePercent;
                    cumulativePercent += slicePercent;
                    const [startX, startY] = getCoordinates(startPercent);
                    const [endX, endY] = getCoordinates(cumulativePercent);
                    const colorHex = getMonthlyColor(month.shareOfTotal).hex;
                    const largeArc = slicePercent > 0.5 ? 1 : 0;
                    const pathData = `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArc} 1 ${endX} ${endY} Z`;
                    const midPercent = startPercent + (slicePercent / 2);
                    const [txtX, txtY] = getCoordinates(midPercent, 0.72);

                    return (
                        <g key={i} onClick={() => onSliceClick(month.index)} className="group cursor-pointer">
                            <path d={pathData} fill={colorHex} stroke="white" strokeWidth="0.015" className="pie-slice"><title>{month.name}</title></path>
                            <text x={txtX} y={txtY} textAnchor="middle" dominantBaseline="middle" className="pie-text" transform={`rotate(90 ${txtX} ${txtY})`}>{month.name.substring(0, 3).toUpperCase()}</text>
                            <text x={txtX} y={txtY} dy="0.11px" textAnchor="middle" dominantBaseline="middle" className="pie-text" style={{ fontSize: '0.055px', opacity: 0.95 }} transform={`rotate(90 ${txtX} ${txtY})`}>{month.shareOfTotal.toFixed(1)}%</text>
                        </g>
                    );
                })}
            </svg>
            <div className="absolute inset-0 m-auto w-[45%] h-[45%] bg-white rounded-full flex flex-col items-center justify-center shadow-inner pointer-events-none z-10 p-2">
                <span className="text-[10px] text-slate-400 font-bold tracking-widest mb-1">VISITANTES 2026</span>
                <span className="text-2xl lg:text-3xl font-black text-slate-800 leading-none">{(totalVisitors / 1000000).toFixed(2)}M</span>
                <span className="text-[10px] text-slate-400 mt-1">Estimación Total</span>
            </div>
        </div>
    );
};

export default PieChart;
