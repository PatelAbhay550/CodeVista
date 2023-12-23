import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const CodeList = () => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get a reference to the "codes" collection in Firestore
        const codesCollection = collection(firestore, "codes");

        // Get all documents in the "codes" collection
        const snapshot = await getDocs(codesCollection);

        // Map the data from each document and update the state
        const codeData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCodes(codeData);
      } catch (error) {
        console.error("Error fetching codes:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <div>
      <h2>Code List</h2>
      {codes.map((code) => (
        <div key={code.id}>
          <h3>{code.username}</h3>
          <p>{code.snippet}</p>
        </div>
      ))}
    </div>
  );
};

export default CodeList;
