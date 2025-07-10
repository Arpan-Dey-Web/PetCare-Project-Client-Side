import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import {
  createUserWithEmailAndPassword,  
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.init";
// import axios from "axios";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const logInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
const logInWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
}
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInuser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    return signOut(auth);
  };
  const updataUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };



  useEffect(() => {
    // console.log(user);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // if (currentUser?.email) {
      //   const useremail = { email: currentUser?.email};
        
      //   axios
      //     .post(
      //       "https://assaignment-11-server-iota.vercel.app/jwt",
      //       useremail,
      //       {
      //         withCredentials: true,
      //       }
      //     )
      //     .then((res) => {
      //       // console.log(res.data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }

      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const context = {
    logInWithGoogle,
    logInWithGithub,
    createUser,
    signInuser,
    signOutUser,
    updataUserProfile,
    user,
    setUser,
    loading,
    setLoading,
  };
  return <AuthContext value={context}>{children}</AuthContext>;
};

export default AuthProvider;
