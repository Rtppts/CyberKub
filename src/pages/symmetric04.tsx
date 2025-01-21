import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom"
const secretKey = "secretKey"; // Key for encryption/decryption
const demoPassword = "eng234014"; // Example password for access

// Sample data (encrypted)
const gradeOptions = ["A", "B", "C", "D", "F", "B+", "C+", "D+"];
const thaiNames = [
  "สมชาย ใจดี", "สมหญิง รักเรียน", "ธีรภัทร เก่งมาก", "อรวรรณ ขยันดี", "ณัฐวุฒิ ฉลาดมาก",
  "กิตติพงษ์ ใจเย็น", "สุพัตรา อดทน", "วรนุช รักดี", "สมพงษ์ ตั้งใจ", "ปริญญา ขยัน",
  "อนุชา กล้าหาญ", "มานพ มั่นคง", "กาญจนา สุขใจ", "ปรเมศวร์ ฉลาดสุด", "วิไลลักษณ์ สงบเย็น",
  "ยุทธนา วิริยะ", "ปัทมา ซื่อตรง", "ศิริพร อดกลั้น", "อภิสิทธิ์ ขยันมาก", "เกศินี สมบูรณ์",
  "สุนิสา สง่างาม", "อนุวัฒน์ จริงใจ", "อรพรรณ พากเพียร", "ศราวุธ มานะ", "จันทนา สดใส",
  "ปัญญา สุขสันต์", "สมบัติ แน่วแน่", "อัมพร สุขสม", "ปิยะนุช ตั้งใจ", "สุกัญญา มั่นใจ"
];

const sampleData = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  studentId: CryptoJS.AES.encrypt(`S${10000 + index}`, secretKey).toString(),
  name: CryptoJS.AES.encrypt(thaiNames[index], secretKey).toString(),
  grade: CryptoJS.AES.encrypt(gradeOptions[Math.floor(Math.random() * gradeOptions.length)], secretKey).toString(),
}));

const App = () => {

  const navigate = useNavigate();
  const [data, setData] = useState(sampleData);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    if (password === demoPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password! Try Again 'You can see the help below'");
    }
  };

  const decryptData = (encryptedText: any) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8) || "[Decryption Error]";
    } catch (error) {
      console.error("Decryption failed:", error);
      return "[Error]";
    }
  };

  const handleEditGrade = (id: number) => {
    const newGrade = prompt("Enter new grade (A, B, C, D, F, B+, C+, D+):");
    if (newGrade && gradeOptions.includes(newGrade)) {
      setData(data.map(item => 
        item.id === id ? { ...item, grade: CryptoJS.AES.encrypt(newGrade, secretKey).toString() } : item
      ));
    } else {
      alert("Invalid grade entered!");
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#000000", textAlign: "center",height:"900px" }}>
      <h1 style={{ color: "#FFFFFF" }}>Cyber Security Student Grades</h1>
      {!authenticated ? (
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to unlock"
            style={{ padding: "10px", marginRight: "10px" }}
          />
          <button onClick={handleLogin} style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none" }}>
            Unlock
          </button>
          <div style={{ backgroundColor: "#333", color: "#fff", padding: "10px", marginBottom: "10px", borderRadius: "5px",height:"600px",marginTop: "10px" }}>
            
          </div>
        </div>
      ) : (
        <div>
          <div style={{ maxHeight: "750px", overflowY: "auto", margin: "20px auto", width: "80%", backgroundColor: "white", border: "1px solid #ddd" }}>
            <table border={1} style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#28a745", color: "white" }}>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Manages</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{decryptData(item.studentId)}</td>
                    <td>{decryptData(item.name)}</td>
                    <td>{decryptData(item.grade)}</td>
                    <td>
                      <button onClick={() => handleEditGrade(item.id)} style={{ marginRight: "5px", backgroundColor: "#ffc107", border: "none", padding: "5px", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>Save</button>
            
            <button style={{ width: "200px", height: "70px", fontSize: "50px" }} onClick={() => navigate("/symmetric02")}>
              NEXT
            </button>
            
        </div>
      )}
    </div>
  );
};

export default App;