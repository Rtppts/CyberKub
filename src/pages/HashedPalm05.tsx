import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sym from "./Symmetric02";


const Palm = () => {
  const checkpoint = localStorage.getItem("checkpoint");
  console.log("checkpoint:", checkpoint);

  const navigate = useNavigate(); // ใช้งาน useNavigate

  const targetWord = "หอสุรนภา";
  const flag = '14°52\'22"N 102°01\'25"E';
  const hint = "It's a casual slang word in Thai!";

  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [hashedWord, setHashedWord] = useState<string>("");

  const hashWord = async (word: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(word);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
  };

  const handleSubmit = async () => {
    if (userInput === targetWord) {
      setIsCorrect(true);
      setFeedback("Congratulations! You've cracked the challenge.");
      localStorage.setItem("checkpoint", "4");
    } else {
      setFeedback("Incorrect! Try again.");
    }
  };

  useEffect(() => {
    const fetchHash = async () => {
      const hashed = await hashWord(targetWord);
      setHashedWord(hashed);
    };
    fetchHash();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CTF Word Challenge</h1>
      <p style={styles.description}>
        Your goal is to guess the correct word:
      </p>
      <p style={styles.hash}>Hashed Answer: {hashedWord}</p>

      {!isCorrect ? (
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter your guess"
            value={userInput}
            onChange={handleInputChange}
            style={styles.input}
          />
          <button onClick={handleSubmit} style={styles.button}>
            Submit
          </button>
          <p style={styles.feedback}>{feedback}</p>
          <button
            onClick={() => setHintShown(!hintShown)}
            style={styles.hintButton}
          >
            {hintShown ? "Hide Hint" : "Show Hint"}
          </button>
          {hintShown && <p style={styles.hint}>{hint}</p>}
        </div>
      ) : (
        <div style={styles.successContainer}>
          <p style={styles.successMessage}>{feedback}</p>
          <p style={styles.flag}>Flag: {flag}</p>
        </div>
      )}

      {/* ปุ่มย้อนกลับ */}
      <button
        onClick={() => navigate("/symmetric02")}
        style={styles.backButton}
      >
        Back
      </button>

    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    marginTop: 50,
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  description: {
    margin: "10px 0",
  },
  inputContainer: {
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
  },
  feedback: {
    marginTop: "10px",
    fontSize: "14px",
    color: "red",
  },
  hintButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
  },
  hint: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
    fontStyle: "italic",
  },
  successContainer: {
    marginTop: "20px",
  },
  successMessage: {
    fontSize: "18px",
    color: "green",
  },
  flag: {
    fontSize: "20px",
    fontFamily: "monospace",
    background: "#eaffea",
    padding: "10px",
    borderRadius: "4px",
    display: "inline-block",
    marginTop: "10px",
  },
  hash: {
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
  },
  backButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginTop: "20px",
  },
};

export default Palm;
