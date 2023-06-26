import { createContext,useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const preToken = localStorage.getItem('token')
    const [token, setToken] = useState(preToken)
    const userisLoggenIn=!!token;

    const logoutHandler=()=>{
        localStorage.removeItem('token')
        setToken(null)
    }
    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem('token',token)
        setTimeout(loggedOut,50000)
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
