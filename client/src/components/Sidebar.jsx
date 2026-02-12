import React from 'react';
import { HardDrive, Clock, Trash2, Cloud, Plus, Star, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => {
    const { darkMode } = useTheme();
    return (
        <motion.button
            whileHover={{ x: 5, backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 246, 255, 1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                active
                    ? (darkMode ? "bg-blue-600/20 text-blue-400 font-semibold" : "bg-blue-50 text-blue-600 font-semibold")
                    : (darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800")
            )}
        >
            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"
                />
            )}
            <Icon size={20} className={cn("z-10 transition-colors", active ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500")} />
            <span className="z-10">{label}</span>
        </motion.button>
    );
};

const Sidebar = ({ onUploadClick }) => {
    const { darkMode } = useTheme();

    return (
        <aside className={cn(
            "w-64 h-screen fixed left-0 top-0 pt-24 px-4 flex flex-col border-r backdrop-blur-xl z-40 transition-colors duration-300",
            darkMode ? "bg-slate-900/80 border-slate-700" : "bg-white/70 border-gray-100"
        )}>
            <div className="mb-8">
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onUploadClick}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/20 transition-all font-medium text-lg relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                    <Plus size={24} />
                    <span>New Upload</span>
                </motion.button>
            </div>

            <nav className="space-y-1 flex-1">
                <SidebarItem icon={HardDrive} label="My Drive" active={true} />
                <SidebarItem icon={Clock} label="Recent" />
                <SidebarItem icon={Star} label="Starred" />
                <SidebarItem icon={Trash2} label="Trash" />
            </nav>

            <div className={cn(
                "mt-auto mb-6 p-5 rounded-2xl border backdrop-blur-md relative overflow-hidden",
                darkMode ? "bg-slate-800/50 border-slate-700" : "bg-gradient-to-br from-white to-blue-50/50 border-white shadow-lg shadow-blue-500/5"
            )}>
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <Cloud size={18} />
                    </div>
                    <span className={cn("font-medium text-sm", darkMode ? "text-gray-200" : "text-gray-700")}>Storage</span>
                </div>

                <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                </div>
                <p className={cn("text-xs", darkMode ? "text-gray-400" : "text-gray-500")}>
                    11.5 GB of 15 GB used
                </p>

                <button className="mt-3 w-full py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    Upgrade Plan
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
