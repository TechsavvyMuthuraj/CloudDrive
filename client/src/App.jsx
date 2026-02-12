import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import FileCard from './components/FileCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils/cn';
import AuthSuccess from "./pages/AuthSuccess";

<Route path="/auth-success" element={<AuthSuccess />} />


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('https://clouddrive-o572.onrender.com/api/files/list', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setFiles(data);
        } else {
          console.error('Failed to fetch files');
        }
      } catch (error) {
        console.error('Error fetching files', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFiles();
    }
  }, [user]);

  const handleUploadClick = () => {
    document.getElementById('hidden-file-input').click();
  }

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch('https://clouddrive-o572.onrender.com/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        body: formData
      });

      if (response.ok) {
        const newFile = await response.json();
        setFiles([newFile, ...files]);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await fetch(`https://clouddrive-o572.onrender.com/api/files/download/${fileId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Download failed');
      }
    } catch (error) {
      console.error('Error downloading', error);
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      const response = await fetch(`https://clouddrive-o572.onrender.com/api/files/delete/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.ok) {
        setFiles(files.filter(f => f.id !== fileId));
        if (selectedFile?.id === fileId) setSelectedFile(null);
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting', error);
    }
  };

  return (
    <Layout onUploadClick={handleUploadClick}>
      <input type="file" id="hidden-file-input" className="hidden" onChange={handleUpload} />

      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h1 className={cn("text-3xl font-bold tracking-tight mb-1", darkMode ? "text-white" : "text-slate-800")}>My Drive</h1>
          <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Manage your files and folders</p>
        </div>
        <div className={cn("text-sm font-medium px-4 py-2 rounded-full border backdrop-blur-sm", darkMode ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-white/50 border-white text-slate-600")}>
          {files.length} Items
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>
          </div>
          <p className="mt-4 text-slate-400 text-sm animate-pulse">Syncing your files...</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence>
            {files.map(file => (
              <FileCard
                key={file.id}
                file={file}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onSelect={setSelectedFile}
                isSelected={selectedFile?.id === file.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {files.length === 0 && !loading && (
        <div className="text-center py-32 opacity-80">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📁</span>
          </div>
          <h3 className={cn("text-xl font-semibold mb-2", darkMode ? "text-white" : "text-slate-800")}>No files yet</h3>
          <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Upload your first file to get started.</p>
        </div>
      )}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Correct Auth Success Route */}
            <Route path="/auth-success" element={<AuthSuccess />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}


export default App;
