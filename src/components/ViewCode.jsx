import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ViewCode = ({ user }) => {
  const { id } = useParams();
  const [code, setCode] = useState(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const codeDoc = await getDoc(doc(firestore, "codes", id));

        if (codeDoc.exists()) {
          setCode({ id: codeDoc.id, ...codeDoc.data() });
        } else {
          console.error("Code not found");
        }
      } catch (error) {
        console.error("Error fetching code:", error.message);
      }
    };

    fetchCode();
  }, [id]);

  return (
    <div>
      {code ? (
        <div>
          <h2>Code Snippet</h2>
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {code.content}
          </SyntaxHighlighter>
          <p>Author: {code.author && code.author.username}</p>
          <Link to="/dashboard" className="link-button">
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <p>Loading code...</p>
      )}
    </div>
  );
};

export default ViewCode;
