import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export function AuthProvider(Props) {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userName = localStorage.getItem("auth_name");

    // @todo: validate token with api
    if (userName) {
      setAuth({
        token,
        userName,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {Props.children}
    </AuthContext.Provider>
  );
}
