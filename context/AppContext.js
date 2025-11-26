import React, { createContext, useState } from 'react';


export const AppContext = createContext();


export function AppProvider({ children }) {
const [theme, setTheme] = useState('light');
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userName, setUserName] = useState('Slyvia');
const [selectedMajor, setSelectedMajor] = useState('');


const value = {
    theme,
    setTheme,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    selectedMajor,
    setSelectedMajor,
};


return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}