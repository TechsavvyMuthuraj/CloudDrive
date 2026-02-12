import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

const Layout = ({ children, onUploadClick }) => {
    const { darkMode } = useTheme();

    return (
        <div className={cn(
            "min-h-screen transition-colors duration-500 overflow-hidden relative",
            darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
        )}>
            {/* Animated Ambient Background - Reduced intensity for readability */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={cn("absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40", darkMode ? "bg-blue-900" : "bg-purple-200")}
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className={cn("absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-30", darkMode ? "bg-purple-900" : "bg-blue-200")}
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className={cn("absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-30", darkMode ? "bg-indigo-950" : "bg-indigo-100")}
                />
            </div>

            <Navbar />
            <Sidebar onUploadClick={onUploadClick} />

            <main className="pt-24 pl-72 pr-8 pb-8 min-h-screen relative z-10">
                <div className={cn(
                    "h-[calc(100vh-8rem)] rounded-3xl border shadow-xl backdrop-blur-3xl overflow-y-auto custom-scrollbar p-8 transition-all duration-300",
                    darkMode
                        ? "bg-slate-900/40 border-slate-800 shadow-black/20"
                        : "bg-white/60 border-white/60 shadow-blue-500/5"
                )}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
