import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [loggedInUser, setLoggedInUser] = useState(null);

return (
<AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
{children}
</AuthContext.Provider>
);
};
