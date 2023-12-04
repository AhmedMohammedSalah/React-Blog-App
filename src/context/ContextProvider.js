import React from 'react'
import { FirebaseContextProvider } from './FirebaseContext'
import { PostsProvider } from './PostsContext'
import { AuthProvider } from './AuthContext'

const ContextProvider = ( { children } ) => {
    return (
        <FirebaseContextProvider>
            <AuthProvider>
                <PostsProvider>
                    {children}
                </PostsProvider>
            </AuthProvider>
        </FirebaseContextProvider>
    )
}

export default ContextProvider
