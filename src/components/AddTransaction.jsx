import React from 'react';
import { ChevronLeft, X } from 'lucide-react';

export default function AddTransaction({
    transTitle,
    setTransTitle,
    transAmount,
    setTransAmount,
    transType,
    setTransType,
    selectedDay,
    setSelectedDay,
    DAYS,
    handleSaveTransaction,
    setView
}) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 relative shadow-2xl transition-colors">
            <div className="flex justify-between mb-8">
                <button onClick={() => setView('home')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><ChevronLeft size={20} /></button>
                <h2 className="text-xl font-bold">New {transType === 'income' ? 'Income' : 'Expense'}</h2>
                <button onClick={() => setView('home')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><X size={20} /></button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block">Record Title</label>
                    <input type="text" value={transTitle} onChange={(e) => setTransTitle(e.target.value)} placeholder="E.g. Daily Coffee" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block">Amount (৳)</label>
                    <input type="number" value={transAmount} onChange={(e) => setTransAmount(e.target.value)} placeholder="0" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-2xl font-bold" />
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setTransType('expense')} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${transType === 'expense' ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>Expense</button>
                    <button onClick={() => setTransType('income')} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${transType === 'income' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>Income</button>
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-3 block">Select Date</label>
                    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                        {DAYS.map(d => (
                            <button key={d} onClick={() => setSelectedDay(d)} className={`shrink-0 w-12 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${selectedDay === d ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800'}`}>
                                <span className="text-[10px] opacity-60">Day</span>
                                <span className="text-lg font-bold">{d}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleSaveTransaction} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none transition-all hover:bg-indigo-700 active:scale-95">Save Transaction</button>
            </div>
        </div>
    );
}
