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
                    <label className="text-xs font-bold text-sub uppercase tracking-wider mb-2 block ml-1">Record Title</label>
                    <input type="text" value={transTitle} onChange={(e) => setTransTitle(e.target.value)} placeholder="E.g. Daily Coffee" className="w-full p-4 bg-app border-2 border-border rounded-2xl outline-none focus:border-accent text-main placeholder:text-sub/50 font-medium transition-colors" />
                </div>
                <div>
                    <label className="text-xs font-bold text-sub uppercase tracking-wider mb-2 block ml-1">Amount (৳)</label>
                    <input type="number" value={transAmount} onChange={(e) => setTransAmount(e.target.value)} placeholder="0" className="w-full p-4 bg-app border-2 border-border rounded-2xl outline-none focus:border-accent text-2xl font-bold text-main placeholder:text-sub/50 transition-colors" />
                </div>
                <div>
                    <label className="text-xs font-bold text-sub uppercase tracking-wider mb-2 block ml-1">Transaction Type</label>
                    <div className="flex gap-4 p-1 bg-app rounded-[1.25rem] border border-border">
                        <button onClick={() => setTransType('expense')} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${transType === 'expense' ? 'bg-brown text-white shadow-md scale-100' : 'text-sub hover:bg-card/50'}`}>Expense</button>
                        <button onClick={() => setTransType('income')} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${transType === 'income' ? 'bg-accent text-white shadow-md scale-100' : 'text-sub hover:bg-card/50'}`}>Income</button>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-sub uppercase tracking-wider mb-3 block ml-1">Select Date</label>
                    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                        {DAYS.map(d => (
                            <button key={d} onClick={() => setSelectedDay(d)} className={`shrink-0 w-12 h-14 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${selectedDay === d ? 'bg-accent border-accent text-white shadow-lg scale-105' : 'bg-app border-transparent text-main hover:border-border'}`}>
                                <span className="text-[10px] opacity-70">Day</span>
                                <span className="text-lg font-bold">{d}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleSaveTransaction} className="w-full py-4 bg-accent text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Save Transaction
                </button>
            </div>
        </div>
    );
}
