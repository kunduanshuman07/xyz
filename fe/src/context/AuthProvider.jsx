import { LinearProgress } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkUser = () => {
        const user = localStorage.getItem("User");
        if (user) {
            setAuth(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        checkUser();
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {loading ? <LinearProgress color='info' /> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}