import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

import Home from "./components/Home";
import Profile from "./components/Profile"; // Import the Profile component
import { auth } from "./firebase";
import AdvancedPasteCode from "./components/AdvancedPasteCode";
import ViewCode from "./components/ViewCode";

const App = () => {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser);
    } else {
      setUser(null);
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile user={user} />} />{" "}
        {/* Add the Profile route */}
        <Route path="/" element={<Auth />} />
        <Route path="/paste-code" element={<AdvancedPasteCode />} />
        <Route path="/view-code/:id" element={<ViewCode />} />
      </Routes>
    </Router>
  );
};

export default App;
