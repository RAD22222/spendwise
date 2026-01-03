import React from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

function SwipeableTodo({ t, toggleTodo, deleteTodo }) {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0]);

    const handleDragEnd = (_, info) => {
        if (info.offset.x < -80) {
            deleteTodo(t.id);
        }
    };

    return (
        <div className="relative overflow-hidden mb-2 rounded-xl group">
            {/* Delete Background */}
            <div className="absolute inset-0 bg-rose-500 text-white flex items-center justify-end px-4 rounded-xl">
                <Trash2 size={18} />
            </div>

            {/* Foreground Content */}
            <motion.div
                style={{ x, touchAction: 'none' }}
                drag="x"
                dragConstraints={{ left: -100, right: 0 }}
                onDragEnd={handleDragEnd}
                className="relative bg-white dark:bg-slate-900 p-3 flex items-center gap-3 rounded-xl border border-slate-100 dark:border-slate-800 z-10"
            >
                <button onClick={() => toggleTodo(t.id, t.completed)} className="text-indigo-500 shrink-0 transition-transform active:scale-125">
                    {t.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
                <span className={`text-sm flex-1 ${t.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>{t.text}</span>

                {/* Desktop Delete Button (still useful) */}
                <button onClick={() => deleteTodo(t.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all hidden sm:block"><Trash2 size={14} /></button>
            </motion.div>
        </div>
    );
}

export default function TodoList({ todos, loading, inputValue, setInputValue, handleAddTodo, toggleTodo, deleteTodo, setView }) {
    return (
        <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg">My Tasks</h3>
                <button onClick={() => setView('add-transaction')} className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-xl hover:scale-105 active:scale-95 transition-all"><Plus size={20} /></button>
            </div>
            <form onSubmit={handleAddTodo} className="px-6 py-4">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Add a quick task..." className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" />
            </form>
            <div className="px-6 pb-6 max-h-[40vh] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                    {loading ? <div className="py-4 text-center">...</div> : todos.map(t => (
                        <motion.div key={t.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}>
                            <SwipeableTodo t={t} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {!loading && todos.length === 0 && (
                    <div className="text-center text-slate-400 py-4 text-sm">No tasks yet</div>
                )}
            </div>
        </section>
    );
}
