import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { firestore, auth } from "../firebase";

const Dashboard = ({ user }) => {
  const [allCodes, setAllCodes] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");

  const fetchAllCodes = async () => {
    try {
      const codesCollection = collection(firestore, "codes");
      const allCodesSnapshot = await getDocs(codesCollection);

      const allCodesData = allCodesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllCodes(allCodesData);
    } catch (error) {
      console.error("Error fetching all codes:", error.message);
    }
  };

  useEffect(() => {
    fetchAllCodes();
  }, []);

  const handleNewPost = async () => {
    try {
      const codesCollection = collection(firestore, "codes");
      await addDoc(codesCollection, {
        userId: user.uid,
        content: newPostContent,
        author: {
          username: user.displayName || "Anonymous",
          email: user.email,
        },
      });

      // Fetch all codes again after adding a new post
      fetchAllCodes();

      setNewPostContent("");
    } catch (error) {
      console.error("Error adding new post:", error.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName || user.email}!</h2>

          <p>Email: {user.email}</p>
          <Link to="/profile" className="link-button">
            View Profile
          </Link>

          <h3>All Code Snippets</h3>
          <ul>
            {allCodes.map((code) => (
              <li key={code.id}>
                <h4>{code.title}</h4>
                {code.content.substring(0, 100)}
                <Link className="code-view" to={`/view-code/${code.id}`}>
                  View Full Code
                </Link>
                <p>
                  Author:{" "}
                  {code.author
                    ? `${code.author.username} (${code.author.email})`
                    : "Unknown"}
                </p>
              </li>
            ))}
          </ul>
          <div className="paste">
            <h3>Create a New Post</h3>
            <Link className="code-paste" to="/paste-code">
              Create Post
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
