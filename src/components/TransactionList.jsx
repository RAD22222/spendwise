import React from 'react';
import { ChevronLeft, History, ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';

export default function TransactionList({ transactions, MONTHS, deleteTransaction, setView }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setView('home')} className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm"><ChevronLeft size={20} /></button>
                <h2 className="text-xl font-bold">Transaction Ledger</h2>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
                <div className="max-h-[70vh] overflow-y-auto no-scrollbar">
                    {!transactions.length ? (
                        <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
                            <History size={40} className="opacity-20" />
                            <p>No transactions yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50 dark:divide-slate-800">
                            {transactions.map((t) => (
                                <div key={t.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-2xl ${t.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600' : 'bg-rose-100 dark:bg-rose-900/20 text-rose-600'}`}>
                                            {t.type === 'income' ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 dark:text-slate-100">{t.title}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">{MONTHS[t.month]} {t.day}, 2026</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className={`font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {t.type === 'income' ? '+' : '-'} ৳{t.amount?.toLocaleString()}
                                        </p>
                                        <button onClick={() => deleteTransaction(t.id)} className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
