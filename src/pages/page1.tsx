import React from "react";

function Page1() {
    return (
        <div style={{ backgroundImage: "url('../../public/BGPage1.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", overflowX: "hidden", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{ width: "900px", padding: "40px", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "white", textAlign: "center", borderRadius: "15px", boxShadow: "0px 0px 20px rgba(255, 0, 0, 1)", border: "5px solid white", fontFamily: "Arial, sans-serif"}}>
                <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>⚠️ เครื่องของคุณถูกเข้ารหัส! ⚠️</h1>
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>โปรดชำระเงิน 2 BTC ที่ Address:</p>
                <p style={{ fontSize: "34px", fontWeight: "bold", color: "yellow" }}>XXXXXX</p>
                <p style={{ fontSize: "28px" }}>หากไม่ชำระภายใน 2 ชั่วโมง ไฟล์ทั้งหมดจะถูกลบ!</p>
            </div>
        </div>
    );
}

export default Page1;
