import { createContext,useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const [token,setToken]=useState(null)
    const userisLoggenIn=!!token;

    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem('token',token)
    }
    const logoutHandler=()=>{
        localStorage.removeItem('token',token)
        setToken(null)
    }
    const contextValue = {
        token:token,
        isLoggedIn:userisLoggenIn,
        login:loginHandler,
        logout:logoutHandler
    }

  return <AuthContext.Provider value={contextValue}>
    {props.children}
    </AuthContext.Provider>;
};

export default AuthContext
