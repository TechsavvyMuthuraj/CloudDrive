import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for tokens in URL params (from backend redirect)
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            setUser({ token: accessToken });
        } else {
            const storedToken = localStorage.getItem('accessToken');
            if (storedToken) {
                setUser({ token: storedToken });
            }
        }
        setLoading(false);
    }, []);

    const login = async () => {
        // Get Auth URL from backend
        try {
            const response = await fetch('https://clouddrive-o572.onrender.com/api/auth/url');
            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
