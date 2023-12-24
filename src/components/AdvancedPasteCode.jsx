import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const AdvancedPasteCode = () => {
  const [title, setTitle] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [syntaxHighlighting, setSyntaxHighlighting] = useState("plaintext");
  const [pasteExpiration, setPasteExpiration] = useState("1d"); // Default to 1 day

  const navigate = useNavigate();

  const handlePasteCode = async () => {
    try {
      const codesCollection = collection(firestore, "codes");
      await addDoc(codesCollection, {
        title,
        content: codeContent,
        category,
        tags: tags.split(",").map((tag) => tag.trim()),
        syntaxHighlighting,
        pasteExpiration,
        createdAt: new Date(),
      });

      // Clear form fields after pasting
      setTitle("");
      setCodeContent("");
      setCategory("");
      setTags("");
      setSyntaxHighlighting("plaintext");
      setPasteExpiration("1d");

      console.log("Code pasted successfully!");

      // Redirect to Dashboard after pasting
      navigate("/");
    } catch (error) {
      console.error("Error pasting code:", error.message);
    }
  };

  return (
    <div>
      <h2>Advanced Code Paste</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <br />
      <label>
        Tags (comma and space-separated):
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </label>
      <br />

      <br />
      <label>
        Paste Expiration:
        <select
          value={pasteExpiration}
          onChange={(e) => setPasteExpiration(e.target.value)}
        >
          <option value="1d">1 Day</option>
          <option value="1w">1 Week</option>
          <option value="1m">1 Month</option>
          {/* Add more expiration options as needed */}
        </select>
      </label>
      <br />
      <label>
        Code:
        <textarea
          value={codeContent}
          onChange={(e) => setCodeContent(e.target.value)}
          placeholder="Paste your code here"
        />
      </label>
      <br />
      <button onClick={handlePasteCode}>Paste Code</button>
      <Link to="/" className="link-button">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default AdvancedPasteCode;
