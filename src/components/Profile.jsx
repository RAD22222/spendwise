import React from 'react';
import { ChevronLeft, Edit2, Check, Moon, Sun } from 'lucide-react';

export default function Profile({
    userInitials,
    userName,
    setUserName,
    isEditingName,
    setIsEditingName,
    saveUserName,
    isDarkMode,
    toggleDarkMode,

    setView,
    handleResetApp
}) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <button onClick={() => setView('home')} className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm"><ChevronLeft size={20} /></button>
                <h2 className="text-xl font-bold">Profile & Settings</h2>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors text-center">
                <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] mx-auto flex items-center justify-center text-3xl font-bold shadow-xl shadow-indigo-200 dark:shadow-none mb-6">
                    {userInitials}
                </div>

                {isEditingName ? (
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-indigo-200 dark:border-indigo-800 max-w-xs mx-auto">
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="bg-transparent border-none outline-none flex-1 px-4 font-bold text-lg text-center" autoFocus onKeyDown={(e) => e.key === 'Enter' && saveUserName()} />
                        <button onClick={saveUserName} className="p-2 bg-indigo-600 text-white rounded-xl"><Check size={18} /></button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-3">
                        <h3 className="text-2xl font-bold">{userName}</h3>
                        <button onClick={() => setIsEditingName(true)} className="p-2 text-slate-400 hover:text-indigo-600"><Edit2 size={18} /></button>
                    </div>
                )}


                <div className="mt-10 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                            </div>
                            <span className="font-bold">Dark Mode</span>
                        </div>
                        <button onClick={toggleDarkMode} className={`w-14 h-8 rounded-full p-1 transition-all ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                            <div className={`w-6 h-6 bg-white rounded-full shadow transition-all transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <button onClick={handleResetApp} className="w-full p-4 bg-rose-50 text-rose-500 hover:bg-rose-100 dark:bg-rose-900/10 dark:hover:bg-rose-900/20 rounded-2xl font-bold transition-colors">
                        Reset All Data
                    </button>
                </div>
            </div>
        </div>
    );
}
