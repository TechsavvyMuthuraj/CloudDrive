import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { HardDrive, Moon, Sun, Cloud, Shield, Lock, ArrowRight, Check } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'} font-['Poppins']`}>

            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 ${darkMode ? 'bg-purple-900/40' : 'bg-purple-300'}`}
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 ${darkMode ? 'bg-blue-900/40' : 'bg-cyan-300'}`}
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className={`absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 ${darkMode ? 'bg-indigo-900/40' : 'bg-pink-300'}`}
                />
            </div>

            {/* Navbar / Top Bar */}
            <nav className="relative z-20 flex justify-between items-center p-6 px-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/30">
                        <HardDrive size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">CloudSpace</span>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-100'} shadow-md transition-colors`}
                >
                    {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
                </motion.button>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-6 pt-10 pb-20 flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-100px)] gap-12 lg:gap-24">

                {/* Left Side: Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`w-full max-w-[480px] p-10 rounded-3xl border shadow-2xl backdrop-blur-xl ${darkMode
                            ? 'bg-slate-900/60 border-slate-700 shadow-purple-900/20'
                            : 'bg-white/70 border-white/50 shadow-xl shadow-blue-500/10'
                        }`}
                >
                    <div className="text-center mb-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                        >
                            Welcome Back
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-lg`}
                        >
                            Access your secure cloud storage
                        </motion.p>
                    </div>

                    <div className="space-y-6">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.5)" }}
                            whileTap={{ scale: 0.97 }}
                            onClick={login}
                            className="group relative w-full flex items-center justify-center gap-4 bg-white text-slate-700 hover:text-blue-700 font-semibold py-4 px-6 rounded-2xl border-2 border-transparent hover:border-blue-100 shadow-lg shadow-gray-200/50 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6 z-10" />
                            <span className="text-lg z-10">Sign in with Google</span>
                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 z-10" />
                        </motion.button>

                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-gray-300/50"></div>
                            <span className={`flex-shrink-0 mx-4 text-sm ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Trusted by Teams</span>
                            <div className="flex-grow border-t border-gray-300/50"></div>
                        </div>

                        <div className="flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Fake Logos for "Social Proof" style */}
                            <div className="h-8 w-20 bg-gray-300/50 rounded animate-pulse" />
                            <div className="h-8 w-20 bg-gray-300/50 rounded animate-pulse delay-75" />
                            <div className="h-8 w-20 bg-gray-300/50 rounded animate-pulse delay-150" />
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-200/50 text-center">
                        <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} flex justify-center gap-6`}>
                            <a href="#" className="hover:text-blue-500 hover:underline transition-all">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-500 hover:underline transition-all">Terms of Service</a>
                            <a href="#" className="hover:text-blue-500 hover:underline transition-all">Help Center</a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Feature Showcase (Desktop) */}
                <div className="hidden lg:flex flex-col flex-1 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="text-5xl font-bold mb-8 leading-tight">
                            Your workspace, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Reimagined.</span>
                        </h2>

                        <div className="space-y-6">
                            {[
                                { icon: Shield, title: "Bank-grade Security", desc: "End-to-end encryption for all your data." },
                                { icon: Cloud, title: "Unlimited Sync", desc: "Access your files from any device, anywhere." },
                                { icon: Lock, title: "Privately Shared", desc: "Granular access controls for your team." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + (index * 0.2) }}
                                    className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-white/50'}`}
                                >
                                    <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Floating 3D Elements Placeholder or CSS Shapes */}
                    <div className="relative h-64 mt-10 perspective-1000">
                        <motion.div
                            animate={{ rotateY: [0, 10, 0], rotateX: [0, -10, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute right-10 top-10 w-40 h-40 rounded-3xl transform rotate-12 backdrop-blur-md border ${darkMode ? 'bg-purple-500/20 border-purple-400/30' : 'bg-white/30 border-white/60'
                                }`}
                        />
                        <motion.div
                            animate={{ rotateY: [0, -15, 0], rotateX: [0, 5, 0], y: [0, -20, 0] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute left-20 top-20 w-32 h-32 rounded-full backdrop-blur-md border ${darkMode ? 'bg-blue-500/20 border-blue-400/30' : 'bg-blue-400/10 border-white/60 shadow-lg'
                                }`}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
