import { useNavigate } from "react-router-dom"
function Page1() {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundImage: "url('../BGPage1.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", overflowX: "hidden", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{ width: "900px", padding: "40px", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "white", textAlign: "center", borderRadius: "15px", boxShadow: "0px 0px 20px rgba(255, 0, 0, 1)", border: "5px solid white", fontFamily: "Arial, sans-serif"}}>
                <h1 style={{ fontSize: "52px", fontWeight: "bold" }}>⚠️ กลัวติด F ⚠️</h1>
                <p style={{ fontSize: "40px", fontWeight: "bold" }}>ต้องการแอบดูคะแนน</p>
                <p style={{ fontSize: "32px",}}>และถ้ามีผลการสอบไม่ดีจะทำลายแหล่งที่เก็บเกรด</p>
                <p style={{ fontSize: "44px", fontWeight: "bold", color: "red" }}>ชื่อวิชา: ENXXX-XXXX</p>
                {/* <p style={{ fontSize: "28px" }}>โปรดติดต่อที่ปรึกษาหรือเจ้าหน้าที่การศึกษา</p> */}
                <button style={{width: "200px", height: "70px", fontSize: "50px"}} onClick={() => navigate("/symmetric02")}>
                    START
                </button>
            </div>
        </div>
    );
}

export default Page1;
