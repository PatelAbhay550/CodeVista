import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const validatePassword = () => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    try {
      if (!validatePassword()) {
        console.error("Password must be at least 6 characters long.");
        return;
      }

      // Create a new user
      await createUserWithEmailAndPassword(auth, email, password);

      // Save user data locally
      const user = {
        email,
        // Note: Storing password in localStorage is not secure.
        // This is just for demonstration purposes.
        password,
      };
      localStorage.setItem("user", JSON.stringify(user));

      // Auto sign in
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to the Dashboard after sign up and auto sign in
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the Dashboard after sign in
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Auth;
