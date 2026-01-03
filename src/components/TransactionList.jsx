import React from 'react';
import { ChevronLeft, History, ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';

export default function TransactionList({ transactions, MONTHS, deleteTransaction, setView }) {

    // Group transactions by Month and Year
    const groupedTransactions = transactions.reduce((acc, t) => {
        const dateKey = `${MONTHS[t.month]} 2026`; // Assuming 2026 for now as per code
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(t);
        return acc;
    }, {});

    const getSmartIcon = (title) => {
        const lower = title.toLowerCase();
        if (lower.includes('coffee') || lower.includes('cafe')) return '☕';
        if (lower.includes('food') || lower.includes('burger') || lower.includes('dinner')) return '🍔';
        if (lower.includes('uber') || lower.includes('taxi') || lower.includes('transport')) return '🚖';
        if (lower.includes('gym') || lower.includes('fitness')) return '💪';
        if (lower.includes('salary') || lower.includes('income')) return '💰';
        if (lower.includes('rent') || lower.includes('home')) return '🏠';
        if (lower.includes('shopping') || lower.includes('cloth')) return '🛍️';
        return '💸';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setView('home')} className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm"><ChevronLeft size={20} /></button>
                <h2 className="text-xl font-bold">Transaction Ledger</h2>
            </div>

            <div className="space-y-6 pb-20">
                {!transactions.length ? (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2 mt-10">
                        <History size={40} className="opacity-20" />
                        <p>No transactions yet</p>
                    </div>
                ) : (
                    Object.entries(groupedTransactions).map(([date, items]) => (
                        <div key={date} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{date}</h3>
                            <div className="space-y-4">
                                {items.map((t) => (
                                    <div key={t.id} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl">
                                                {getSmartIcon(t.title)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-slate-100">{t.title}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">
                                                    {t.type === 'income' ? 'Income' : 'Expense'} • {MONTHS[t.month]} {t.day}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <p className={`font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {t.type === 'income' ? '+' : '-'} ৳{t.amount?.toLocaleString()}
                                            </p>
                                            <button onClick={() => deleteTransaction(t.id)} className="p-2 text-slate-300 hover:text-rose-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
