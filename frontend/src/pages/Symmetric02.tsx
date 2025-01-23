// Import React และ useNavigate
// import { useState } from "react";
// @ts-ignore
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ฟังก์ชันสำหรับเข้ารหัสและถอดรหัสแบบ Symmetric (Caesar Cipher ตัวอย่าง)
const caesarEncrypt = (message: string | string[], key: number) => {
  let encrypted = "";
  for (let i = 0; i < message.length; i++) {
    const charCode = (message as string).charCodeAt(i);
    if (charCode >= 32 && charCode <= 126) { // จำกัดเฉพาะ ASCII ที่พิมพ์ได้
      encrypted += String.fromCharCode(((charCode - 32 + key) % 95) + 32);
    } else {
      encrypted += message[i];
    }
  }
  return encrypted;
};

const caesarDecrypt = (encrypted: string | string[], key: number) => {
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i++) {
    const charCode = (encrypted as string).charCodeAt(i);
    if (charCode >= 32 && charCode <= 126) { // จำกัดเฉพาะ ASCII ที่พิมพ์ได้
      decrypted += String.fromCharCode(((charCode - 32 - key + 95) % 95) + 32);
    } else {
      decrypted += encrypted[i];
    }
  }
  return decrypted;
};

const Sym = () => {
  // ตารางสี 3x3 พร้อมชื่ออาจารย์
  const squares = [
    { color: "#99ccff", name: "อาจารย์ปริญ" }, // ฟ้าอ่อน
    { color: "#66b2ff", name: "อาจารย์ฟาง" }, // ฟ้าสด
    { color: "#3399ff", name: "อาจารย์วิชัย" }, // น้ำเงินสด
    { color: "#4da6ff", name: "อาจารย์คมศัลล์" }, // ฟ้าสดใส
    { color: "#80bfff", name: "อาจารย์สุภาพร" }, // ฟ้าอ่อนพิเศษ
    { color: "#b3d9ff", name: "อาจารย์คะชา" }, // ฟ้าขาว
    { color: "#99e6e6", name: "อาจารย์กิติศักดิ์" }, // เขียวมิ้นท์
    { color: "#66cccc", name: "อาจารย์นิตยา" }, // เขียวเข้ม
  ];
  

  // คำใบ้ที่เข้ารหัสและ key สำหรับแต่ละคำใบ้
  const hints = [
    { text: caesarEncrypt("เซ่น", 5801000), key: 5801000 },
    { text: caesarEncrypt("สอนปีสอง", 10400), key: 10400 },
    { text: caesarEncrypt("เจอบ่อยสุด", 4070), key: 4070 },
  ];

  // สถานะของเกม
  const [currentHints, setCurrentHints] = useState<string[]>([]);
  const [inputKey, setInputKey] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนเส้นทาง

  // เป้าหมายที่ถูกต้อง (สุ่ม)
  const targetColor = "#3399ff";

  // ฟังก์ชันสำหรับปลดล็อกคำใบ้
  // ฟังก์ชันสำหรับปลดล็อกคำใบ้
  const unlockHint = (hintIndex: number) => {
    const key = parseInt(inputKey, 10);

    // ตรวจสอบว่าปลดล็อกคำใบ้ก่อนหน้าหรือยัง
    if (hintIndex > 0 && !currentHints.includes(caesarDecrypt(hints[hintIndex - 1].text, hints[hintIndex - 1].key))) {
      setMessage("หาคำใบ้ก่อนหน้าก่อนค่อยใบ้ข้อนี้ได้.");
      return;
    }

    // ตรวจสอบ key
    if (!isNaN(key) && key === hints[hintIndex].key) {
      setCurrentHints((prevHints) => [...prevHints, caesarDecrypt(hints[hintIndex].text, key)]);
      setMessage("Hint unlocked!");
    } else {
      setMessage("Incorrect key! Try again.");
    }
  };


  // ฟังก์ชันสำหรับการเลือกสี
  const selectColor = (color: string) => {
    setSelectedColor(color);
    if (color === targetColor) {
      setMessage("Congratulations! You found the target color.");
      setTimeout(() => navigate("/HashAut03"), 2000); // เปลี่ยนเส้นทางหลัง 2 วินาที
    } else {
      window.alert("คุณตอบผิด! เกมจบแล้ว ระบบจะนำคุณไปที่หน้า Main");
      navigate("/Main");
    }
  };



  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>จงเดาว่าใครให้ F กับคุณ</h1>
      <p>คุณต้องเดาให้ถูกว่าใครให้ F กับคุณโดยคุณสามารถเดาได้ 1 ครั้ง!</p>
      <p>คำใบ้แรกเป็นเลขที่เกี่ยวกับสัญลักษณ์มอ คำใบ้ที่สอง"ติดต่อ หน่วยประสานงาน มทส" คำใบ้ที่สามมันอยู่ใน footer เว็บสัญลักษณ์มอนั่นแหละไปหาเอา</p>

      {/* กระดานเกม */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px", justifyContent: "center" }}>
        {squares.map((square, index) => (
          <div
            key={index}
            onClick={() => selectColor(square.color)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: square.color,
              border: selectedColor === square.color ? "3px solid black" : "1px solid gray",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {square.name}
          </div>
        ))}
      </div>

      {/* ป้อน Key เพื่อปลดล็อกคำใบ้ */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter key to unlock hint"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
        <button onClick={() => unlockHint(0)}>Unlock Hint 1</button>
        <button onClick={() => unlockHint(1)}>Unlock Hint 2</button>
        <button onClick={() => unlockHint(2)}>Unlock Hint 3</button>
      </div>

      {/* แสดงคำใบ้ */}
      {currentHints.length > 0 && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          <p>Hints:</p>
          <ul>
            {currentHints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* แสดงข้อความ */}
      {message && (
        <div style={{ marginTop: "20px", color: message.includes("Congratulations") ? "green" : "red" }}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Sym;
