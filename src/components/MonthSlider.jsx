import React from 'react';
import { Calendar } from 'lucide-react';

export default function MonthSlider({ MONTHS, selectedMonth, setSelectedMonth }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-2 text-slate-400">
                <label className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-1"><Calendar size={12} /> Overview For</label>
                <span className="text-xs font-bold text-indigo-600">{MONTHS[selectedMonth]} 2026</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1 snap-x">
                {MONTHS.map((month, idx) => (
                    <button key={month} onClick={() => setSelectedMonth(idx)} className={`shrink-0 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all snap-start ${selectedMonth === idx ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400'}`}>
                        {month.slice(0, 3)}
                    </button>
                ))}
            </div>
        </div>
    );
}
