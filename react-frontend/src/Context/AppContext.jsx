import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState();

    // Verify on BACKEND if user is loggend in with good Token
    async function getUser() {
        const res = await fetch("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        // console.log(data);
        setUser(data);
    }

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user }}>
            {children}
        </AppContext.Provider>
    );
}
