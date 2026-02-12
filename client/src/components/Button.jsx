import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const Button = ({ children, className, variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
        secondary: 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
        danger: 'bg-red-50 text-red-600 hover:bg-red-100',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
