import { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthContextProvider = props => {
    const [authState, setAuthState] = useState({
        isAuthenticated: localStorage.getItem('authenticated')
            ? localStorage.getItem('authedUser')
                ? localStorage.getItem('authedUser')
                : false
            : false
        ,
        user: localStorage.getItem('authedUser')
    })
    const handleAuth = (isAuth, user = null) => {
        let loggedOut = false
        if (isAuth) {
            localStorage.setItem('authenticated', true)
            localStorage.setItem('authedUser', user)
        }
        else {
            loggedOut = true
            localStorage.removeItem('authenticated')
            localStorage.removeItem('authedUser')
        }
        setAuthState({
            ...authState,
            user: user,
            isAuthenticated: isAuth,
            loggedOut: loggedOut
        })
    }
    return <AuthContext.Provider value={{ ...authState, handleAuth }}>
        {props.children}
    </AuthContext.Provider>
}

export {
    AuthContext,
    AuthContextProvider
}