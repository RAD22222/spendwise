import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Home,
  Settings
} from 'lucide-react';

import Navbar from './components/Navbar';
import StatsCard from './components/StatsCard';
import MonthSlider from './components/MonthSlider';
import TodoList from './components/TodoList';
import TransactionList from './components/TransactionList';
import Profile from './components/Profile';
import AddTransaction from './components/AddTransaction';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function App() {
  // Mock User for Offline Mode
  const [user] = useState({ uid: 'offline-user', displayName: 'Guest' });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('spendwise_todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('spendwise_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false); // No loading needed for local
  const [view, setView] = useState('home');

  // Settings States
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('spendwise_username') || 'Radit Anan';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('spendwise_darkmode') === 'true';
  });

  const [isEditingName, setIsEditingName] = useState(false);

  // Dashboard States
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // New Transaction Form States
  const [transTitle, setTransTitle] = useState('');
  const [transAmount, setTransAmount] = useState('');
  const [transType, setTransType] = useState('expense');

  // --- Persistence Effects ---
  useEffect(() => {
    localStorage.setItem('spendwise_todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('spendwise_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('spendwise_username', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('spendwise_darkmode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Derived Balance Calculation
  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const userInitials = useMemo(() => {
    return userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }, [userName]);

  // --- Actions ---

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const saveUserName = () => {
    setIsEditingName(false);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: { seconds: Date.now() / 1000 } // Simulate Firestore timestamp structure for sorting
    };

    setTodos(prev => [newTodo, ...prev]);
    setInputValue('');
  };

  const handleSaveTransaction = () => {
    if (!transTitle || !transAmount) {
      alert("Please enter a title and amount.");
      return;
    }

    const newTrans = {
      id: Date.now().toString(),
      title: transTitle,
      amount: Number(transAmount),
      type: transType,
      month: selectedMonth,
      day: selectedDay,
      createdAt: { seconds: Date.now() / 1000 }
    };

    setTransactions(prev => [newTrans, ...prev]);

    setTransTitle('');
    setTransAmount('');
    setView('home');
  };

  const toggleTodo = (id, completed) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center pb-24 transition-colors duration-300">

      <Navbar view={view} setView={setView} userInitials={userInitials} />

      <div className="w-full max-w-md p-4 sm:p-8 flex-1">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <StatsCard stats={stats} />
              <MonthSlider MONTHS={MONTHS} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
              <TodoList
                todos={todos}
                loading={loading}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleAddTodo={handleAddTodo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                setView={setView}
              />
            </motion.div>
          )}

          {view === 'transactions' && (
            <motion.div key="transactions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <TransactionList
                transactions={transactions}
                MONTHS={MONTHS}
                deleteTransaction={deleteTransaction}
                setView={setView}
              />
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Profile
                userInitials={userInitials}
                userName={userName}
                setUserName={setUserName}
                isEditingName={isEditingName}
                setIsEditingName={setIsEditingName}
                saveUserName={saveUserName}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                setView={setView}
              />
            </motion.div>
          )}

          {view === 'add-transaction' && (
            <motion.div key="add" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <AddTransaction
                transTitle={transTitle}
                setTransTitle={setTransTitle}
                transAmount={transAmount}
                setTransAmount={setTransAmount}
                transType={transType}
                setTransType={setTransType}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                DAYS={DAYS}
                handleSaveTransaction={handleSaveTransaction}
                setView={setView}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Nav Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:hidden pointer-events-none z-50">
        <div className="max-w-xs mx-auto bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full p-2 flex justify-between items-center shadow-2xl pointer-events-auto">
          <button onClick={() => setView('home')} className={`p-3 rounded-full transition-all ${view === 'home' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}><Home size={20} /></button>
          <button onClick={() => setView('add-transaction')} className="p-4 bg-indigo-600 text-white rounded-full -translate-y-4 border-4 border-slate-50 dark:border-slate-950 transition-all hover:scale-110 active:scale-90"><Plus size={24} /></button>
          <button onClick={() => setView('profile')} className={`p-3 rounded-full transition-all ${view === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}><Settings size={20} /></button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; } body { overflow-x: hidden; }` }} />
    </div>
  );
}
