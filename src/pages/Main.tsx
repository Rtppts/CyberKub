import { useNavigate } from "react-router-dom"
function Page1() {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundImage: "url('../../public/BGPage1.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", overflowX: "hidden", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{ width: "900px", padding: "40px", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "white", textAlign: "center", borderRadius: "15px", boxShadow: "0px 0px 20px rgba(255, 0, 0, 1)", border: "5px solid white", fontFamily: "Arial, sans-serif"}}>
                <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>⚠️ ติด F  ⚠️</h1>
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>โปรดแก้ผ้า</p>
                <p style={{ fontSize: "34px", fontWeight: "bold", color: "red" }}>XXX</p>
                <p style={{ fontSize: "28px" }}>หากไม่จะโดนตุ๋ยดิวตามถึงบ้าน!</p>
                <button style={{width: "200px", height: "70px", fontSize: "50px"}} onClick={() => navigate("/symmetric02")}>
                    NEXT
                </button>
            </div>
        </div>
    );
}

export default Page1;
