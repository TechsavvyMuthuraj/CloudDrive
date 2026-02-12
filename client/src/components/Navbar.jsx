import React from 'react';
import { Search, Bell, Moon, Sun, Settings, HardDrive } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const Navbar = () => {
    const { logout, user } = useAuth();
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header className={cn(
            "h-20 fixed top-0 left-0 right-0 z-50 px-6 flex items-center justify-between transition-colors duration-300 backdrop-blur-xl border-b",
            darkMode ? "bg-slate-900/80 border-slate-700" : "bg-white/70 border-white/20"
        )}>
            {/* Logo Area */}
            <div className="flex items-center gap-3 w-64 pl-2">
                <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20">
                    <HardDrive size={20} />
                </div>
                <span className={cn("text-xl font-bold tracking-tight", darkMode ? "text-white" : "text-slate-800")}>
                    CloudSpace
                </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl px-8">
                <div className={cn(
                    "relative group transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/10 rounded-full",
                    darkMode ? "bg-slate-800" : "bg-gray-100/50 border border-gray-200"
                )}>
                    <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", darkMode ? "text-gray-500 group-focus-within:text-blue-400" : "text-gray-400 group-focus-within:text-blue-500")} />
                    <input
                        type="text"
                        placeholder="Search your files..."
                        className={cn(
                            "w-full bg-transparent border-none py-3 pl-12 pr-4 rounded-full focus:outline-none text-sm font-medium transition-colors",
                            darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-700 placeholder-gray-400"
                        )}
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className={cn(
                        "p-2.5 rounded-full transition-colors",
                        darkMode ? "bg-slate-800 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-500 hover:text-gray-900"
                    )}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>

                <div className="h-8 w-[1px] bg-gray-200 dark:bg-slate-700 mx-1"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className={cn("text-sm font-semibold", darkMode ? "text-white" : "text-gray-800")}>
                            {user?.email?.split('@')[0] || 'User'}
                        </p>
                        <p className={cn("text-xs", darkMode ? "text-gray-500" : "text-gray-500")}>
                            Pro Plan
                        </p>
                    </div>
                    <div className="relative group">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 p-[2px]"
                        >
                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 p-0.5 overflow-hidden">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=random`}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </motion.button>

                        {/* Dropdown */}
                        <div className={cn(
                            "absolute right-0 top-full mt-4 w-48 py-2 rounded-2xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right",
                            darkMode ? "bg-slate-800 border-slate-700 shadow-black/50" : "bg-white border-gray-100 shadow-blue-500/10"
                        )}>
                            <button className={cn("w-full text-left px-4 py-2 text-sm flex items-center gap-2", darkMode ? "hover:bg-slate-700 text-gray-300" : "hover:bg-gray-50 text-gray-700")}>
                                <Settings size={16} /> Settings
                            </button>
                            <button
                                onClick={logout}
                                className={cn("w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-red-500", darkMode ? "hover:bg-red-900/20" : "hover:bg-red-50")}
                            >
                                <div className="w-4 h-4 border-2 border-red-500 rounded-full flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                </div>
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
