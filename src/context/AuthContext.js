import { createContext, useContext, useEffect,  useState } from "react";
import { FirebaseContext } from "./FirebaseContext";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged,signOut
} from 'firebase/auth'
export const AuthContext = createContext();
export const AuthProvider = ( { children } ) => {
    const { app } = useContext( FirebaseContext );
    const auth = getAuth( app );
    const [user, setUser] = useState(null)
    useEffect( () => {
        let unsubscribe = () => { };
            unsubscribe = onAuthStateChanged( auth, ( user ) => {
                console.log( 'user :', user );
                setUser(user )
            })

        return () => {
            unsubscribe();
        };
    }, [auth]);
    const signUp = async(email,pass) => {
        const creds = await createUserWithEmailAndPassword( auth, email, pass );
        console.log('credts : ',creds)
    }
    const signIn = async(email,pass) => {
        const creds = await signInWithEmailAndPassword( auth, email, pass );
        console.log('credts : ',creds)
        
    }
    const logout = async (  ) => {
        await signOut( auth);
    }

    
    return <AuthContext.Provider value={{logout, signIn,signUp,user,isAuth:!!user}}>
        {children}
    </AuthContext.Provider>
}
