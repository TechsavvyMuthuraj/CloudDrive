import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Download, Trash2, Share2, Check } from 'lucide-react';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

const FileCard = ({ file, onDownload, onDelete, onSelect, isSelected }) => {
    const { darkMode } = useTheme();
    const [showMenu, setShowMenu] = useState(false);

    const handleShare = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(file.webViewLink);
        // You might want to add a toast notification header here
        setShowMenu(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col backdrop-blur-md",
                isSelected
                    ? (darkMode ? "border-blue-500 bg-blue-900/20 ring-1 ring-blue-500" : "border-blue-500 bg-blue-50 ring-1 ring-blue-500")
                    : (darkMode ? "bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:shadow-2xl hover:shadow-black/50" : "bg-white/80 border-white/60 hover:border-white hover:shadow-xl hover:shadow-blue-500/10")
            )}
            onClick={() => onSelect(file)}
        >
            {/* Selection Checkbox */}
            <div className={cn(
                "absolute top-3 left-3 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200",
                isSelected ? "bg-blue-500 scale-100" : "bg-gray-200/50 scale-0 group-hover:scale-100"
            )}>
                <Check size={14} className="text-white" />
            </div>

            {/* Thumbnail Area */}
            <div className={cn(
                "h-40 flex items-center justify-center relative overflow-hidden",
                darkMode ? "bg-slate-900/50" : "bg-gray-50/50"
            )}>
                {file.thumbnailLink ? (
                    <img src={file.thumbnailLink} alt={file.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                ) : (
                    <div className={cn("p-6 rounded-2xl shadow-inner", darkMode ? "bg-slate-800" : "bg-white")}>
                        <img src={file.iconLink} alt="icon" className="w-12 h-12" />
                    </div>
                )}

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); onDownload(file.id, file.name); }}
                        className="p-2.5 bg-white/90 rounded-full shadow-lg hover:bg-white text-gray-700 tooltip"
                        title="Download"
                    >
                        <Download size={18} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleShare}
                        className="p-2.5 bg-white/90 rounded-full shadow-lg hover:bg-white text-gray-700 tooltip"
                        title="Share"
                    >
                        <Share2 size={18} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
                        className="p-2.5 bg-white/90 rounded-full shadow-lg hover:bg-red-50 text-red-600 tooltip"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </motion.button>
                </div>
            </div>

            {/* Footer Info */}
            <div className="p-4 relative">
                <h3 className={cn("text-sm font-semibold truncate pr-6", darkMode ? "text-gray-200" : "text-gray-800")} title={file.name}>
                    {file.name}
                </h3>
                <div className="flex justify-between items-center mt-1">
                    <p className={cn("text-xs font-medium uppercase tracking-wider", darkMode ? "text-gray-500" : "text-gray-400")}>
                        {file.mimeType.split('.').pop().split('/').pop()}
                    </p>
                    <p className={cn("text-xs", darkMode ? "text-gray-600" : "text-gray-400")}>
                        24 MB
                    </p>
                </div>

                <button
                    className={cn(
                        "absolute right-2 top-3 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                        darkMode ? "hover:bg-slate-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
                    )}
                    onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                >
                    <MoreVertical size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default FileCard;
