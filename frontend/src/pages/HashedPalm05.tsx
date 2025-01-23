import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";

const Palm = () => {
  const checkpoint = localStorage.getItem("checkpoint");
  console.log("checkpoint:", checkpoint);

  const navigate = useNavigate();
  const targetWord = sha256("หอสุรนภา").toString(); // เปลี่ยนเป็น sha256 ของคำที่ต้องการ
  const flag = "ยินดีด้วยคุณรู้สถานที่ลับนี้แล้ว";
  const hints = [
    "Hint 1: มีรหัสของนักศึกษาคนนึงแปลกๆ ดูเหมือนจะเป็นเลขของตำแหน่งบางอย่าง",
    "Hint 2: โดดเด่น",
  ];

  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [inputToHash, SetInputToHash] = useState("");
  const [hashedValue, setHashedValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hint1Shown, setHint1Shown] = useState(false);
  const [hint2Shown, setHint2Shown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleHash = () => {
    if (inputToHash !== "") {
      const hash = sha256(inputToHash).toString();
      setHashedValue(hash);
    }
    else {
      alert("กรุณากรอกข้อมูล");
    }
  };

  const handleSubmit = () => {
    const hashedInput = sha256(userInput).toString(); // คำนวณ sha256 ของคำที่กรอก
    if (hashedInput === targetWord) {
      setIsCorrect(true);
      setFeedback("Congratulations! You've cracked the challenge.");
      localStorage.setItem("checkpoint", "4");
    } else {
      setFeedback("Incorrect! Try again.");
    }
  };

  return (
    <div style={{ backgroundImage: "url('../palm/BGPALM.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", overflowX: "hidden", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div style={styles.container}>
      <h1 style={styles.title}>สถานที่นี้คือ</h1>
      <p style={styles.description}>ค่า hash ที่ต้องการ : 03d8062c0e681102a93f92a43f513a97926665b9dba8b16a9c7527d288098d40</p>

      {!isCorrect ? (
        <div style={styles.inputContainer} >
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

          {/* Hint Section */}
          <div style={styles.hintContainer}>
            <button
              onClick={() => setHint1Shown(!hint1Shown)}
              style={styles.hintButton}
            >
              {hint1Shown ? "Hide Hint 1" : "Show Hint 1"}
            </button>
            {hint1Shown && <p style={styles.hint}>{hints[0]}</p>}
          </div>

          <div style={styles.hintContainer}>
            <button
              onClick={() => setHint2Shown(!hint2Shown)}
              style={styles.hintButton}
            >
              {hint2Shown ? "Hide Hint 2" : "Show Hint 2"}
            </button>
            {hint2Shown && <p style={styles.hint}>{hints[1]}</p>}
          </div>
        </div>
      ) : (
        <div style={styles.successContainer}>
          <p style={styles.successMessage}>{feedback}</p>
          <p style={styles.flag}>Congratulations : {flag}</p>
        </div>
      )}

      <button onClick={() => navigate("/Asymmetric04")} style={styles.backButton}>
        Back
      </button>
      <div>
        <p></p>
        <hr></hr>
        <h1 style={styles.title}>ลองเอามา Hash</h1>

        <p></p>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => SetInputToHash(e.target.value)}
          style={{ width: "400px", height: "40px", fontSize: "16px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "20px" }}
        />

        <button
          style={{ marginLeft: "15px", width: "200px", height: "50px", fontSize: "20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "15px" }}
          onClick={handleHash}
        >
          แปลงค่า
        </button>

        {hashedValue && (
          <p style={{ fontSize: "18px", color: "black", wordBreak: "break-word" }}>
            {hashedValue}
          </p>
        )}
        {hashedValue === targetWord && (
          <p style={{ fontSize: "20px", color: "black", marginTop: "15px" }}>
            ✅ ผลการ Hash ตรงกับที่ต้องการ
          </p>
        )}
      </div>
    </div>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    margin: "0 auto",
    maxWidth: "600px",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
    borderRadius: "10px",
    boxShadow: "0px 0px 20px rgba(255, 0, 0, 0.3)",
    border: "5px solid white",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  description: {
    margin: "10px 0",
  },
  inputContainer: {
    marginTop: "20px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    width: "280px",
    border: "1px solid #00796b",
    borderRadius: "8px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  inputFocus: {
    borderColor: "#004d40",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#004d40",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginLeft: "10px",
    transition: "background 0.3s, transform 0.2s",
  },
  buttonHover: {
    background: "#00796b",
    transform: "scale(1.05)",
  },
  feedback: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#d32f2f",
    fontWeight: "bold",
  },
  hintContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
    padding: "10px",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  hintButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#004d40",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    transition: "transform 0.2s, background 0.3s",
  },
  hint: {
    fontSize: "14px",
    color: "#004d40",
    fontStyle: "italic",
    margin: 0,
  },
  successContainer: {
    marginTop: "20px",
  },
  successMessage: {
    fontSize: "18px",
    color: "green",
    fontWeight: "bold",
  },
  flag: {
    fontSize: "18px",
    fontFamily: "monospace",
    background: "#c8e6c9",
    padding: "10px",
    borderRadius: "8px",
    display: "inline-block",
    marginTop: "20px",
  },
  backButton: {
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginTop: "20px",
    transition: "transform 0.2s, background 0.3s",
  },
};



export default Palm;
