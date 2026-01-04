import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function StatsCard({ stats }) {
    return (
        <div className="bg-highlight p-6 rounded-[2rem] text-main shadow-xl shadow-stone-500/10 border border-border/50">
            <p className="text-sub text-sm font-bold uppercase tracking-wider">Total Balance</p>
            <h2 className="text-4xl font-black mt-2 text-main tracking-tight">৳ {stats.balance.toLocaleString()}</h2>
            <div className="flex gap-4 mt-8">
                <div className="flex-1 bg-card/60 p-4 rounded-2xl flex items-center gap-3 border border-border/50 shadow-sm">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full">
                        <ArrowDownCircle size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-sub">Income</p>
                        <p className="text-lg font-bold text-main">৳ {stats.income.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex-1 bg-card/60 p-4 rounded-2xl flex items-center gap-3 border border-border/50 shadow-sm">
                    <div className="p-2 bg-rose-100 text-rose-600 rounded-full">
                        <ArrowUpCircle size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-sub">Expense</p>
                        <p className="text-lg font-bold text-main">৳ {stats.expense.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
