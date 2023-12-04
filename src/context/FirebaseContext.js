import { createContext } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from "../constats/firebaseConfig";

// Initialize Firebase

export const FirebaseContext = createContext();
export const FirebaseContextProvider = ( { children } ) => {
    const app = initializeApp( firebaseConfig );
    const db = getFirestore(  );
    return (
        <FirebaseContext.Provider value={{app,db}}>
            {children}
        </FirebaseContext.Provider>
    )
}
