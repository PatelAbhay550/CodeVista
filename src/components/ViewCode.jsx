import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Swal from "sweetalert2";
import { FiCopy } from "react-icons/fi";

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

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code.content);

    Swal.fire({
      icon: "success",
      title: "Code Copied!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      {code ? (
        <div>
          <h2>Code Snippet</h2>
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {code.content}
          </SyntaxHighlighter>
          <p>
            Author:{" "}
            {code.author
              ? code.author.email
                ? `${code.author.username} (${code.author.email})`
                : "Unknown"
              : "Unknown"}
          </p>
          <p>Tags: {code.tags}</p>
          <button onClick={handleCopyClick} className="copy-button">
            <FiCopy /> Copy Code
          </button>
          <Link to="/" className="link-button">
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
