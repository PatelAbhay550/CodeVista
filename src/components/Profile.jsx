import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Profile = ({ user }) => {
  const [newDisplayName, setNewDisplayName] = useState("");

  useEffect(() => {
    // Set the current display name to the state when the component mounts
    if (user) {
      setNewDisplayName(user.displayName || "");
    }
  }, [user]);

  const handleUpdateName = async () => {
    try {
      // Update the user's display name using updateProfile function
      await updateProfile(auth.currentUser, { displayName: newDisplayName });

      // Save the display name to Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(
        userDocRef,
        { displayName: newDisplayName },
        { merge: true }
      );

      // Update the local state with the new display name
      setNewDisplayName(newDisplayName);
    } catch (error) {
      console.error("Error updating display name:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Your Profile</h2>
          <p>Email: {user.email}</p>
          <p>Display Name: {user.displayName || "Not set"}</p>

          <h3>Update Display Name</h3>
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
          <button onClick={handleUpdateName}>Update Name</button>

          <h3>Actions</h3>
          <Link to="/" className="link-button">
            Back to Dashboard
          </Link>
          <br />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
