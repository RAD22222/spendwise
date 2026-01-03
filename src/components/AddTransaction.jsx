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
        <div className="bg-card rounded-[2.5rem] p-8 border border-border relative shadow-2xl transition-colors">
            <div className="flex justify-between mb-8">
                <button onClick={() => setView('home')} className="p-2 bg-app rounded-full text-sub active:bg-accent active:text-white transition-colors"><ChevronLeft size={20} /></button>
                <h2 className="text-xl font-bold text-main">New {transType === 'income' ? 'Income' : 'Expense'}</h2>
                <button onClick={() => setView('home')} className="p-2 bg-app rounded-full text-sub active:bg-accent active:text-white transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-[10px] uppercase font-bold text-sub mb-2 block">Record Title</label>
                    <input type="text" value={transTitle} onChange={(e) => setTransTitle(e.target.value)} placeholder="E.g. Daily Coffee" className="w-full p-4 bg-app rounded-2xl outline-none focus:ring-2 focus:ring-accent text-main placeholder:text-sub" />
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-sub mb-2 block">Amount (৳)</label>
                    <input type="number" value={transAmount} onChange={(e) => setTransAmount(e.target.value)} placeholder="0" className="w-full p-4 bg-app rounded-2xl outline-none focus:ring-2 focus:ring-accent text-2xl font-bold text-main placeholder:text-sub" />
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setTransType('expense')} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${transType === 'expense' ? 'bg-rose-500 text-white shadow-lg' : 'bg-app text-sub'}`}>Expense</button>
                    <button onClick={() => setTransType('income')} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${transType === 'income' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-app text-sub'}`}>Income</button>
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-sub mb-3 block">Select Date</label>
                    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                        {DAYS.map(d => (
                            <button key={d} onClick={() => setSelectedDay(d)} className={`shrink-0 w-12 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${selectedDay === d ? 'bg-accent text-white shadow-lg' : 'bg-app text-main'}`}>
                                <span className="text-[10px] opacity-60">Day</span>
                                <span className="text-lg font-bold">{d}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleSaveTransaction} className="w-full py-4 bg-accent text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:bg-accent/90 active:scale-95">Save Transaction</button>
            </div>
        </div>
    );
}
