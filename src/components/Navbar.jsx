import React from 'react';
import { LayoutList, PieChart } from 'lucide-react';

export default function Navbar({ view, setView, userInitials }) {
    return (
        <nav className="w-full max-w-2xl px-6 py-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                <div className="p-2 bg-indigo-600 rounded-xl text-white">
                    <LayoutList size={20} />
                </div>
                <span className="font-bold text-lg hidden sm:inline">SpendWise</span>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setView('transactions')}
                    className={`p-2 rounded-full transition-colors ${view === 'transactions' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                    <PieChart size={20} />
                </button>
                <button
                    onClick={() => setView('profile')}
                    className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-xs border transition-all ${view === 'profile'
                            ? 'bg-indigo-600 text-white border-indigo-600 scale-110 shadow-lg'
                            : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 border-indigo-200 dark:border-indigo-800 hover:scale-105'
                        }`}
                >
                    {userInitials}
                </button>
            </div>
        </nav>
    );
}
