import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Verify on BACKEND if user is loggend in with good Token
    async function getUser() {
        setLoading(true);
        const res = await fetch("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setUser(data);
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (token) {
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <AppContext.Provider
            value={{ token, setToken, user, setUser, loading }}
        >
            {children}
        </AppContext.Provider>
    );
}
