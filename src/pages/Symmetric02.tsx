import React, { useState } from "react";
import CryptoJS from "crypto-js";

import { useNavigate } from "react-router-dom"

const App = () => {
  const navigate = useNavigate();

  const secretKey = "secretKey123";
  const encryptedClue = CryptoJS.AES.encrypt("AccessToken123", secretKey).toString(); // สร้างข้อความเข้ารหัส

  const [inputKey, setInputKey] = useState("");
  const [decryptedToken, setDecryptedToken] = useState("");
  const [response, setResponse] = useState("");

  // Handle decryption
  const handleDecrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedClue, inputKey);
      const token = bytes.toString(CryptoJS.enc.Utf8);

      if (token) {
        setDecryptedToken(token);
        setResponse("Decryption successful! Use this Token: " + token);
      } else {
        setResponse("Decryption failed. Incorrect key.");
      }
    } catch (error) {
      setResponse("An error occurred. Please try again.");
    }
  };

  // Handle token submission
  const handleSubmitToken = () => {
    if (decryptedToken === "AccessToken123") {
      setResponse("Login successful! You have accessed the system.");
    } else {
      setResponse("Invalid token. Try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Challenge-Response Authentication</h1>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Encrypted Clue</h2>
        <p>{encryptedClue}</p>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Decrypt the Clue</h2>
        <input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Enter the decryption key"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleDecrypt}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Decrypt
        </button>
        <p style={{ marginTop: "10px" }}>{response}</p>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Submit the Token</h2>
        <button
          onClick={handleSubmitToken}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Token
        </button>
        <p style={{ marginTop: "10px" }}>{response}</p>
      </div>

      <button style={{ width: "200px", height: "70px", fontSize: "50px" }} onClick={() => navigate("/HashAut03")}>
        NEXT
      </button>
      
      <button
        onClick={() => navigate("/symmetric02")}
        
      >
        Back
      </button>


    </div>
  );
};

export default App;



// <button style={{ width: "200px", height: "70px", fontSize: "50px" }} onClick={() => navigate("/HashAut03")}>
// NEXT
// </button>
// <button
// onClick={() => navigate("/symmetric02")}

// >
// Back
// </button>
// const navigate = useNavigate();




{/* <button onClick={() => localStorage.setItem("checkpoint", "2")}>
    NEXT
</button> */}