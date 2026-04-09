import { useLocation, useNavigate } from "react-router";

export function NavigationElement(){
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = ()=>{
        if(location.key !== "default"){
            navigate(-1);
        }
        else{
            navigate("/");
        }
    }

    const goForward = ()=>{
        navigate(1);
    }

    return(
        <div className="card shadow p-3">
            <div>
                <button className="btn btn-outline-secondary btn-sm me-2" title="vissza" onClick={goBack}><i className="bi bi-arrow-left"></i></button>
                <button className="btn btn-outline-secondary btn-sm" title="előre" onClick={goForward}><i className="bi bi-arrow-right"></i></button>
            </div>
        </div>
    )
}