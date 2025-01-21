import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🔑 กำหนดค่าของ RSA
const n = 3233;  // Modulus n (จำนวนเฉพาะใหญ่)
const e = 17;    // Public Exponent e
const d = 2753;  // Private Exponent d (ถูกต้อง)

// ฟังก์ชันคำนวณเลขยกกำลังโมดูลัส (Modular Exponentiation)
const modExp = (base: number, exp: number, mod: number) => {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
};

// ฟังก์ชันเข้ารหัสข้อความ (P → C)
const encrypt = (text: string) => {
  return text.split("").map(char => modExp(char.charCodeAt(0), e, n));
};

// ฟังก์ชันถอดรหัสข้อความ (C → P)
const decrypt = (encryptedArray: number[], userInput: number) => {
  // ใช้ค่า `d` เสมอ
  const privateKeyToUse = userInput === d ? d : userInput;
  return encryptedArray.map(num => String.fromCharCode(modExp(num, privateKeyToUse, n))).join("");
};

// 🔐 สร้างข้อมูลตัวอย่างที่ถูกเข้ารหัส
const sampleData = [
  { id: 1, studentId: encrypt("S10001"), name: encrypt("John Doe"), grade: encrypt("A") },
  { id: 2, studentId: encrypt("S10002"), name: encrypt("Jane Smith"), grade: encrypt("B+") },
  { id: 3, studentId: encrypt("S10003"), name: encrypt("Robert Brown"), grade: encrypt("C") },
  { id: 4, studentId: encrypt("S10004"), name: encrypt("Emily Davis"), grade: encrypt("D+") },
  { id: 5, studentId: encrypt("S10005"), name: encrypt("Michael White"), grade: encrypt("F") },
];

const App = () => {
  const navigate = useNavigate();
  const [privateKeyInput, setPrivateKeyInput] = useState("");
  const [decryptedKey, setDecryptedKey] = useState<number | null>(null);

  const handleDecrypt = () => {
    const userPrivateKey = parseInt(privateKeyInput.trim(), 10);
    if (isNaN(userPrivateKey)) {
      alert("❌ กรุณาใส่ Private Key เป็นตัวเลข!");
      return;
    }
    setDecryptedKey(userPrivateKey);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center", backgroundColor: "#222", color: "white", minHeight: "100vh" }}>
      <h1>🔐 RSA Encrypted Student Grades</h1>

      {/* Input Private Key */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={privateKeyInput}
          onChange={(e) => setPrivateKeyInput(e.target.value)}
          placeholder="🔑 ใส่ Private Key เพื่อตรวจสอบ"
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          onClick={handleDecrypt}
          style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}
        >
          🔍 ตรวจสอบ
        </button>
      </div>

      {/* แสดงตาราง */}
      <div style={{ maxWidth: "80%", margin: "0 auto", backgroundColor: "#fff", color: "black", padding: "20px", borderRadius: "10px" }}>
        <table border={1} style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#28a745", color: "white" }}>
              <th>ID</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{decryptedKey !== null ? decrypt(item.studentId, decryptedKey) : "🔒 [Encrypted]"}</td>
                <td>{decryptedKey !== null ? decrypt(item.name, decryptedKey) : "🔒 [Encrypted]"}</td>
                <td>{decryptedKey !== null ? decrypt(item.grade, decryptedKey) : "🔒 [Encrypted]"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ปุ่ม Next */}
      <button style={{ marginTop: "20px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }} onClick={() => navigate("/nextPage")}>
        Next ➡
      </button>
    </div>
  );
};

export default App;
