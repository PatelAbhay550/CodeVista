import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check if user is already signed in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { email, password } = JSON.parse(storedUser);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // If successful, navigate to the Dashboard
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Auto sign-in failed:", error.message);
        });
    }
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const validatePassword = () => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    try {
      if (!validatePassword()) {
        console.error("Password must be at least 6 characters long.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      // Save user data in localStorage
      const user = {
        email,
        password,
      };
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the Dashboard after sign up
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Save user data in localStorage on sign in
      const user = {
        email,
        password,
      };
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the Dashboard after sign in
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div>
      <div className="">
        <h2>Authentication</h2>
        <div className="inp">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
        </div>
        <div className="options">
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
      <div className="text-ar">
        <h1>Paste Your Code And Share!</h1>
        <p>Simple app for Pasting and Sharing your code on the way.</p>
        <p>
          Just <span className="code-paste">Sign up</span> and share
        </p>
      </div>
    </div>
  );
};

export default Auth;
