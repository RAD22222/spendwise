import React from 'react';
import { ChevronLeft, Edit2, Check, Sun, Moon, Cloud, Scroll } from 'lucide-react';

export default function Profile({
    userInitials,
    userName,
    setUserName,
    isEditingName,
    setIsEditingName,
    saveUserName,
    theme,
    setTheme,
    setView,
    handleResetApp
}) {
    const themes = [
        { id: 'light', name: 'Light', icon: Sun, color: 'bg-indigo-100 text-indigo-600' },
        { id: 'dark', name: 'Dark', icon: Moon, color: 'bg-slate-900 text-indigo-400' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <button onClick={() => setView('home')} className="p-2 bg-card rounded-full border border-border shadow-sm"><ChevronLeft size={20} /></button>
                <h2 className="text-xl font-bold">Profile & Settings</h2>
            </div>

            <div className="bg-card rounded-[2.5rem] p-8 border border-border shadow-sm transition-colors text-center">
                <div className="w-24 h-24 bg-accent text-white rounded-[2rem] mx-auto flex items-center justify-center text-3xl font-bold shadow-xl shadow-indigo-500/20 mb-6">
                    {userInitials}
                </div>

                {isEditingName ? (
                    <div className="flex items-center gap-2 bg-app p-2 rounded-2xl border border-accent/20 max-w-xs mx-auto">
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="bg-transparent border-none outline-none flex-1 px-4 font-bold text-lg text-center text-main" autoFocus onKeyDown={(e) => e.key === 'Enter' && saveUserName()} />
                        <button onClick={saveUserName} className="p-2 bg-accent text-white rounded-xl"><Check size={18} /></button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-3">
                        <h3 className="text-2xl font-bold text-main">{userName}</h3>
                        <button onClick={() => setIsEditingName(true)} className="p-2 text-sub hover:text-accent"><Edit2 size={18} /></button>
                    </div>
                )}


                <div className="mt-10 space-y-4">
                    <div className="p-4 bg-app rounded-3xl text-left">
                        <span className="font-bold text-sm text-sub uppercase tracking-wider ml-2">Appearance</span>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id)}
                                    className={`p-3 rounded-xl flex items-center gap-3 transition-all border-2 ${theme === t.id ? 'border-accent bg-card shadow-md' : 'border-transparent hover:bg-card/50'}`}
                                >
                                    <div className={`p-2 rounded-lg ${t.color}`}>
                                        <t.icon size={16} />
                                    </div>
                                    <span className={`font-medium ${theme === t.id ? 'text-main' : 'text-sub'}`}>{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={handleResetApp} className="w-full p-4 bg-rose-50 text-rose-500 hover:bg-rose-100 dark:bg-rose-900/10 dark:hover:bg-rose-900/20 rounded-2xl font-bold transition-colors mt-4">
                        Reset All Data
                    </button>
                </div>
            </div>
        </div>
    );
}
