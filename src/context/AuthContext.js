import React from 'react';

const AuthContext = React.createContext({
    currentUser: null,
    login: () => {},
    logout: () => {}
});

export default AuthContext;