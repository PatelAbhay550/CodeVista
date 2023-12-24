import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { auth } from "./firebase";
import AdvancedPasteCode from "./components/AdvancedPasteCode";
import ViewCode from "./components/ViewCode";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-post" element={<AdvancedPasteCode />} />
        <Route path="/view-code/:id" element={<ViewCode user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
