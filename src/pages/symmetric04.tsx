import { useState } from "react";
import { useNavigate } from "react-router-dom";

// กำหนดค่าของ RSA
const n = 3233; // ค่า n เป็นผลคูณของจำนวนเฉพาะ p และ q
const e = 17; // ค่า e เป็นเลขชี้กำลังสาธารณะ (public exponent)
const d = 2753; // ค่า d เป็นเลขชี้กำลังส่วนตัว (private exponent)

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

// ฟังก์ชันเข้ารหัสข้อความ (ใช้ค่า e และ n)
const encrypt = (text: string) => {
  return text.split("").map(char => modExp(char.charCodeAt(0), e, n));
};

// ฟังก์ชันถอดรหัสข้อความ (ใช้ค่า d และ n)
const decrypt = (encryptedArray: any[], userInput: number) => {
  const privateKeyToUse = userInput === d ? d : userInput;
  return encryptedArray.map(num => String.fromCharCode(modExp(num, privateKeyToUse, n))).join("");
};

// ฟังก์ชันสร้างข้อมูลนักเรียนแบบสุ่ม
const generateRandomData = () => {
  const names = ["Alice Johnson", "Bob Smith", "Charlie Brown", "David Lee", "Ella Adams", "Frank Wright", "Grace Scott", "Henry Hall", "Isla Green", "Jack White", "Katie Lewis", "Liam Young", "Mia Turner", "Noah Harris", "Olivia King", "Paul Allen", "Quinn Baker", "Ryan Nelson", "Sophia Clark", "Tom Walker"];
  return names.map((name, index) => ({
    id: index + 6,
    studentId: encrypt(`S100${index + 6}`),
    name: encrypt(name),
    grade: encrypt(["A", "B+", "B", "C+", "C", "D+", "D", "F"][Math.floor(Math.random() * 8)])
  }));
};

// ข้อมูลตัวอย่างที่ถูกเข้ารหัส
const sampleData = [
  { id: 1, studentId: encrypt("S10001"), name: encrypt("John Doe"), grade: encrypt("A") },
  { id: 2, studentId: encrypt("S10002"), name: encrypt("Jane Smith"), grade: encrypt("B+") },
  { id: 3, studentId: encrypt("S10003"), name: encrypt("Robert Brown"), grade: encrypt("C") },
  { id: 4, studentId: encrypt("14°52'16\"N 102°01'21\"E"), name: encrypt("N/A"), grade: encrypt("N/A") },
  { id: 5, studentId: encrypt("S10005"), name: encrypt("Michael White"), grade: encrypt("F") },
  ...generateRandomData()
];

const App = () => {
  const navigate = useNavigate();
  const [privateKeyInput, setPrivateKeyInput] = useState("");
  const [decryptedKey, setDecryptedKey] = useState<number | null>(null);
  const [hints, setHints] = useState([false, false, false]);

  // ฟังก์ชันตรวจสอบค่ากุญแจส่วนตัว
  const handleDecrypt = () => {
    const userPrivateKey = parseInt(privateKeyInput.trim(), 10);
    if (isNaN(userPrivateKey)) {
      alert("❌ กรุณาใส่ Private Key เป็นตัวเลข!");
      return;
    }
    setDecryptedKey(userPrivateKey);
  };

  // ฟังก์ชันแสดง/ซ่อนคำใบ้
  const toggleHint = (index: number) => {
    setHints(hints.map((hint, i) => (i === index ? !hint : hint)));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center", backgroundColor: "#222", color: "white", minHeight: "100vh" }}>
      <h1>🔐 RSA Encrypted Micro Processor Student Grades</h1>

      {/* ช่องกรอก Private Key */}
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

      {/* ปุ่มแสดงคำใบ้ */}
      <div>
        {["How many building in SUT ? Ahhh if you have no idea it can help you ==> https://apmap.sut.ac.th/      But I think you should try to count by your self before 555... Enjoy (เท่าที่เห็นด้วยตาจากตัวช่วย คือ Hint 1 มองให้ลึกเเละกว้างเข้าไว้)", "From above,what is the name of disappear place? {The distance between it and Kasalongkham Cafeteria? (ตัวเลขที่ได้คือ Hin 2)}", "Your desired destination = (Hint1/2+1) union (Hint2+53)==>{Union=ต่อกัน}"]
          .map((hint, index) => (
          <div key={index} style={{ margin: "5px" }}>
            <button 
              onClick={() => toggleHint(index)}
              style={{ padding: "10px", backgroundColor: "#ffcc00", color: "black", border: "none", cursor: "pointer" }}
            >
              {hints[index] ? "Hide Hint" : "Show Hint"} {index + 1}
            </button>
            {hints[index] && <p style={{ marginTop: "5px" }}>{hint}</p>}
          </div>
        ))}
      </div>

      {/* ตารางข้อมูลที่ถูกเข้ารหัส */}
      <div style={{ maxWidth: "80%", margin: "0 auto", backgroundColor: "#fff", color: "black", padding: "20px", borderRadius: "10px", maxHeight: "400px", overflowY: "scroll" }}>
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
      <button style={{ marginTop: "20px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }} onClick={() => navigate("/palm")}>
        Next ➡
      </button>

    </div>
  );
};

export default App;
