import { createContext, useState, useEffect } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import firebase from '../lib/firebase/authConfig';

const AuthContext = createContext();

const formatUser = async (user) => ({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.za,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  })

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = async (currentUser) => {
        if (currentUser) {
            //console.log(currentUser)
            const formatedUser = await formatUser(currentUser);
            setUser(formatedUser);
            setSession(true);
            return formatedUser.email;
        }
        setUser(false);
        setSession(false);
        return false;   
    }

    const setSession = (session) => {
        if (session) {
            cookie.set('mybooksrhcs-auth', session, {
              expires: 1,
            });
        } else {
            cookie.remove('mybooksrhcs-auth');
        }
    }

    const signinGitHub = async () => {
        try {
            setLoading(true);
            const response = await firebase
                .auth()
                .signInWithPopup(new firebase.auth.GithubAuthProvider());            
            handleUser(response.user);
            Router.push('/mybooks');
           
        } finally {
            setLoading(false);
        }
    }

    const signinGoogle = async () => {
        try {
            setLoading(true);
            const response = await firebase
                .auth()
                .signInWithPopup(new firebase.auth.GoogleAuthProvider());            
            handleUser(response.user);
            Router.push('/mybooks');
        } finally {
            setLoading(false);
        }
    }

    const signinFacebook = async () => {
        try {
            setLoading(true);
            const response = await firebase
                .auth()
                .signInWithPopup(new firebase.auth.FacebookAuthProvider());            
            handleUser(response.user);
            Router.push('/mybooks');
           
        } finally {
            setLoading(false);
        }
    }

    const signout = async () => {
        try {
            Router.push('/');
            await firebase.auth().signOut();
            handleUser(false);

          } finally {
            setLoading(false);
          }
    }

    const userDelete = async () => {
        try {
            setLoading(true);
            await firebase.auth().currentUser.delete().then(() => {
                handleUser(false);
                Router.push('/');
            }).catch(err => {
                console.log("err userDelete", err)
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {   
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{
        user,
        loading,
        signinGitHub,
        signinGoogle,
        signinFacebook,
        signout,
        userDelete,
    }}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;