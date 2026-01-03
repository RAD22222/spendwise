import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function StatsCard({ stats }) {
    return (
        <div className="bg-accent p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-500/20">
            <p className="text-white/80 text-sm font-medium">Available Balance</p>
            <h2 className="text-3xl font-bold mt-1">৳ {stats.balance.toLocaleString()}</h2>
            <div className="flex gap-4 mt-6">
                <div className="flex-1 bg-white/10 p-3 rounded-2xl flex items-center gap-2">
                    <ArrowDownCircle size={18} className="text-emerald-300" />
                    <div>
                        <p className="text-[10px] text-white/80">Income</p>
                        <p className="text-sm font-bold">৳ {stats.income.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex-1 bg-white/10 p-3 rounded-2xl flex items-center gap-2">
                    <ArrowUpCircle size={18} className="text-rose-300" />
                    <div>
                        <p className="text-[10px] text-white/80">Expense</p>
                        <p className="text-sm font-bold">৳ {stats.expense.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
