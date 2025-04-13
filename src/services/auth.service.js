import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  import { auth } from "../firebase/firebase.config";
  
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
        console.error("Registration Error:", error.code, error.message);
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('Email already in use.');
        } else if (error.code === 'auth/weak-password') {
            throw new Error('Password should be at least 6 characters.');
        }
         else {
            throw new Error('Registration failed. Please try again later.');
        }
    }
  };
  
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
          console.error("Login Error:", error.code, error.message);
          if (error.code === 'auth/invalid-credential') {
              throw new Error('Invalid credentials. Please check your email and password.');
          } else {
              throw new Error('Login failed. Please try again later.');
          }
    }
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  };
  const getCurrentUser = () => {
      return new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
              unsubscribe();
              resolve(user);
          }, reject);
      });
  };
  const authService = {
    register,
    login,
    logout,
    getCurrentUser
  };
  export default authService;