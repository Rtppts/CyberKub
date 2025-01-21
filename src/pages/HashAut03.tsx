import { useNavigate } from "react-router-dom"
function HashAut() {
    const navigate = useNavigate();

    return (
        <div>
           <h1 style={{fontSize: "50px"}}>สถานที่สอน</h1>
           <input type="text" style={{width: "400px", height: "80px"}}/>
             
            <button style={{width: "200px", height: "70px", fontSize: "50px"}} onClick={() => navigate("/Asymmetric04")}>
                NEXT
            </button>
        </div>
    );
}

export default HashAut;
