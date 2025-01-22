import { useNavigate } from "react-router-dom";
import { /*SetStateAction,*/ useState } from "react";
import sha256 from "crypto-js/sha256";
import BGaut from "../../public/aut/BGAUT.png"

function HashAut() {
    const navigate = useNavigate();
    const [inputToHash, SetInputToHash] = useState("");
    const [hashedValue, setHashedValue] = useState("");
    const hashAns = sha256("F11-421.MicroP").toString();

    const hashAns2 = sha256("11421").toString();

    const [Password, SetPassword] = useState("");

    const handleHash = () => {
        if (inputToHash !== "") {
            const hash = sha256(inputToHash).toString();
            setHashedValue(hash);
        }
        else{
            alert("กรุณากรอกข้อมูล");
        }
    };

    const checkpassword = () => {
        const check = (sha256(Password).toString() === hashAns2);
        // console.log("check", check);
        if(check){
            navigate("/Asymmetric04")
        }
        else{
            alert("❌ รหัสไม่ถูกต้อง! โปรดลองอีกครั้ง");
        }
    };

    return (
        <div style={{ backgroundImage: BGaut, height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "600px", padding: "40px", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "white", textAlign: "center", borderRadius: "15px", boxShadow: "0px 0px 20px rgba(0, 0, 255, 1)", border: "5px solid white", fontFamily: "Arial, sans-serif" }}>
                <img src="../../public/aut/nullavatar.png" alt="" style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "20px" }} />
                <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>อาจารย์ ดร. วิชัย</h1>
                <p style={{ fontSize: "18px", lineHeight: "1.5", marginBottom: "30px" }}>
                    อาจารย์ประจำสาขาวิชา<br />
                    ประวัติการทำงาน<br />
                    โทรศัพท์ : 044-224646<br />
                    โทรสาร : -<br />
                    หมายเลขห้อง : CPE07<br />
                    E-mail : wichai@sut.ac.th
                </p>
                <b style={{ fontSize: "30px", color: "red"}}>โปรดกรอกรหัสผ่าน</b>
                <p><a style={{fontSize: "20px", color: "white"}} target="_blank" href="https://reg2.sut.ac.th/registrar/room_timeall.asp?cmd=">Hint</a></p>
                {hashAns}
                <input 
                    type="number" 
                    onChange={(e) => SetPassword(e.target.value)}
                    style={{ fontWeight: 700, fontSize: "35px", width: "400px", height: "40px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "20px" }}
                />

                <button
                    style={{ width: "200px", height: "50px", fontSize: "20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }}
                    onClick={checkpassword}
                >
                    ยืนยัน
                </button>

            </div>

            <div style={{ marginLeft: "70px", width: "700px", padding: "40px", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "white", textAlign: "center", borderRadius: "15px", boxShadow: "0px 0px 20px rgba(0, 0, 255, 1)", border: "5px solid white", fontFamily: "Arial, sans-serif" }}>
                <p style={{ fontSize: "18px", lineHeight: "1.5", marginBottom: "20px" }}>โปรดกรอกข้อความเพื่อแปลงค่าเป็น SHA256</p>
                <input 
                    type="text"
                    onChange={(e) => SetInputToHash(e.target.value)}
                    style={{ fontWeight: 700, fontSize: "35px", width: "400px", height: "40px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "20px" }}
                />

                <button 
                    style={{ marginLeft: "15px", width: "200px", height: "50px", fontSize: "20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "15px" }} 
                    onClick={handleHash}
                >
                    แปลงค่า
                </button>

                {hashedValue && (
                    <p style={{ fontSize: "18px", color: "lightgreen", wordBreak: "break-word" }}>
                        {hashedValue}
                    </p>
                )}
                {hashedValue === hashAns && (
                    <p style={{ fontWeight: 500, fontSize: "30px", color: "lime", marginTop: "15px" }}>
                        ✅ ผลการ Hash ตรงกับที่ต้องการ
                    </p>
                )}
            </div>
        </div>
    );
}

export default HashAut;
