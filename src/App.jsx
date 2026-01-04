import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Home,
  Settings
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('spendwise_theme') || 'light';
  });

  const [isEditingName, setIsEditingName] = useState(false);

  // Dashboard States
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // New Transaction Form States
  const [transTitle, setTransTitle] = useState('');
  const [transAmount, setTransAmount] = useState('');
  const [transType, setTransType] = useState('expense');

  // --- Utilities ---
  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(50);
  };

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
    localStorage.setItem('spendwise_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('dark'); // Clean up legacy
  }, [theme]);

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



  const saveUserName = () => {
    setIsEditingName(false);
    toast.success("Name updated!");
  };

  const handleResetApp = () => {
    if (window.confirm("ARE YOU SURE? This will delete ALL your data permanently.")) {
      vibrate();
      localStorage.clear();
      setTodos([]);
      setTransactions([]);
      setUserName('Radit Anan');
      setTheme('light');
      setView('home');
      toast.success("App reset successfully");
      window.location.reload();
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    vibrate();

    const newTodo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: { seconds: Date.now() / 1000 }
    };

    setTodos(prev => [newTodo, ...prev]);
    setInputValue('');
    toast.success("Task added");
  };

  const handleSaveTransaction = () => {
    if (!transTitle || !transAmount) {
      toast.error("Please enter a title and amount.");
      return;
    }
    vibrate();

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
    toast.success("Transaction saved");
  };

  const toggleTodo = (id, completed) => {
    vibrate();
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !completed } : t));
  };

  const deleteTodo = (id) => {
    vibrate();
    setTodos(prev => prev.filter(t => t.id !== id));
    toast.success("Task deleted");
  };

  const deleteTransaction = (id) => {
    vibrate();
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast.success("Transaction deleted");
  };

  return (
    <div className="min-h-screen bg-app text-main flex flex-col items-center pb-24 transition-colors duration-300">
      {/* V3: Toaster at Bottom */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerStyle={{ bottom: 100 }}
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }}
      />

      <Navbar view={view} setView={setView} userInitials={userInitials} />

      <div className="w-full max-w-md p-4 sm:p-8 flex-1">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-6"
            >
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
            <motion.div
              key="transactions"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <TransactionList
                transactions={transactions}
                MONTHS={MONTHS}
                deleteTransaction={deleteTransaction}
                setView={setView}
              />
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Profile
                userInitials={userInitials}
                userName={userName}
                setUserName={setUserName}
                isEditingName={isEditingName}
                setIsEditingName={setIsEditingName}
                saveUserName={saveUserName}
                theme={theme}
                setTheme={setTheme}
                setView={setView}
                handleResetApp={handleResetApp}
              />
            </motion.div>
          )}

          {view === 'add-transaction' && (
            <motion.div
              key="add"
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
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
        <div className="max-w-xs mx-auto bg-card/90 backdrop-blur-xl border border-border/50 rounded-full p-2 flex justify-between items-center shadow-2xl pointer-events-auto">

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setView('home'); vibrate(); }}
            className={`p-3 rounded-full transition-all relative ${view === 'home' ? 'bg-accent text-white shadow-lg' : 'text-sub'}`}
          >
            <Home size={20} />
            {view === 'home' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-accent rounded-full -z-10" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setView('add-transaction'); vibrate(); }}
            className="p-4 bg-brown text-white rounded-full -translate-y-4 border-4 border-app shadow-xl"
          >
            <Plus size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setView('profile'); vibrate(); }}
            className={`p-3 rounded-full transition-all relative ${view === 'profile' ? 'bg-accent text-white shadow-lg' : 'text-sub'}`}
          >
            <Settings size={20} />
            {view === 'profile' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-accent rounded-full -z-10" />}
          </motion.button>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.no - scrollbar:: -webkit - scrollbar { display: none; } body { overflow - x: hidden; } ` }} />
    </div>
  );
}
