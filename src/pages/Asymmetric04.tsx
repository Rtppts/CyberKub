import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom"

const secretKey = "secretKey"; // Key for encryption/decryption

// Sample data (encrypted)
const sampleData = [
  { id: 1, studentId: CryptoJS.AES.encrypt("S12345", secretKey).toString(), name: CryptoJS.AES.encrypt("สมชาย ใจดี", secretKey).toString(), grade: CryptoJS.AES.encrypt("A", secretKey).toString() },
  { id: 2, studentId: CryptoJS.AES.encrypt("S67890", secretKey).toString(), name: CryptoJS.AES.encrypt("สมหญิง รักเรียน", secretKey).toString(), grade: CryptoJS.AES.encrypt("B", secretKey).toString() },
  { id: 3, studentId: CryptoJS.AES.encrypt("S11223", secretKey).toString(), name: CryptoJS.AES.encrypt("ธีรภัทร เก่งมาก", secretKey).toString(), grade: CryptoJS.AES.encrypt("C", secretKey).toString() },
  { id: 4, studentId: CryptoJS.AES.encrypt("S44556", secretKey).toString(), name: CryptoJS.AES.encrypt("อรวรรณ ขยันดี", secretKey).toString(), grade: CryptoJS.AES.encrypt("D", secretKey).toString() },
  { id: 5, studentId: CryptoJS.AES.encrypt("S77889", secretKey).toString(), name: CryptoJS.AES.encrypt("ณัฐวุฒิ ฉลาดมาก", secretKey).toString(), grade: CryptoJS.AES.encrypt("E", secretKey).toString() },
  { id: 6, studentId: CryptoJS.AES.encrypt("S99001", secretKey).toString(), name: CryptoJS.AES.encrypt("กิตติพงษ์ ใจเย็น", secretKey).toString(), grade: CryptoJS.AES.encrypt("F", secretKey).toString() },
  { id: 7, studentId: CryptoJS.AES.encrypt("S22334", secretKey).toString(), name: CryptoJS.AES.encrypt("สุพัตรา อดทน", secretKey).toString(), grade: CryptoJS.AES.encrypt("A", secretKey).toString() },
  { id: 8, studentId: CryptoJS.AES.encrypt("S55667", secretKey).toString(), name: CryptoJS.AES.encrypt("วรนุช รักดี", secretKey).toString(), grade: CryptoJS.AES.encrypt("B", secretKey).toString() },
  { id: 9, studentId: CryptoJS.AES.encrypt("S88990", secretKey).toString(), name: CryptoJS.AES.encrypt("สมพงษ์ ตั้งใจ", secretKey).toString(), grade: CryptoJS.AES.encrypt("C", secretKey).toString() },
  { id: 10, studentId: CryptoJS.AES.encrypt("S10112", secretKey).toString(), name: CryptoJS.AES.encrypt("ปริญญา ขยัน", secretKey).toString(), grade: CryptoJS.AES.encrypt("D", secretKey).toString() },
];

const Asymmetric04 = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState(sampleData);
  // const [password, setPassword] = useState("");
  // const [authenticated, setAuthenticated] = useState(false);

  // const handleLogin = () => {
  //   if (password === secretKey) {
  //     setAuthenticated(true);
  //   } else {
  //     alert("Incorrect password!");
  //   }
  // };

  // const decryptData = (encryptedText) => {
  //   const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  //   return bytes.toString(CryptoJS.enc.Utf8);
  // };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", fontSize: "100px" }}>
      DEW
      {/* <h1 style={{ textAlign: "center" }}>Encrypted Student Grades</h1>
      {!authenticated ? (
        <div style={{ textAlign: "center" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to unlock"
            style={{ padding: "10px", marginRight: "10px" }}
          />
          <button onClick={handleLogin} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Unlock
          </button>
        </div>
      ) : (
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{decryptData(item.studentId)}</td>
                <td>{decryptData(item.name)}</td>
                <td>{decryptData(item.grade)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
      <button style={{ width: "200px", height: "70px", fontSize: "50px" }} onClick={() => navigate("/palm")}>
        NEXT
      </button>
    </div>
  );
};

export default Asymmetric04;
