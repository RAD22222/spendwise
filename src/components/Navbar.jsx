import React from 'react';
import { LayoutList, PieChart } from 'lucide-react';

export default function Navbar({ view, setView, userInitials }) {
    return (
        <nav className="w-full max-w-2xl px-6 py-4 flex justify-between items-center border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                <div className="p-2 bg-accent rounded-xl text-white">
                    <LayoutList size={20} />
                </div>
                <span className="font-bold text-lg hidden sm:inline text-main">SpendWise</span>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setView('transactions')}
                    className={`p-2 rounded-full transition-colors ${view === 'transactions' ? 'bg-accent text-white shadow-lg' : 'text-sub hover:bg-app'}`}
                >
                    <PieChart size={20} />
                </button>
                <button
                    onClick={() => setView('profile')}
                    className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-xs border transition-all ${view === 'profile'
                        ? 'bg-accent text-white border-accent scale-110 shadow-lg'
                        : 'bg-accent-light text-accent border-accent/20 hover:scale-105'
                        }`}
                >
                    {userInitials}
                </button>
            </div>
        </nav>
    );
}
