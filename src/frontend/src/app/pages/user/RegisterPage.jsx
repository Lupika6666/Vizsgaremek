import { useNavigate } from "react-router";
import { RegisterForm } from "../../../features/user/components/RegisterForm";
import { userApi } from "../../../features/user/api/userApi";
import { toast } from "sonner";

export function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = async(email, password, name, readerId)=>{
        try {
            //1. kérés indítása
            const data = await userApi.register(email, password, name, readerId);
            
            const successMessage = data.valasz ? data.valasz : "Sikeres regisztráció";
            toast.success(successMessage);
            navigate("/login");
        }
        catch (error) {
            const errorMessage = error.response?.data?.valasz;
            if(errorMessage){
                toast.error(errorMessage);
            }
            else{
                toast.error("Szerver hiba történt!");
            }
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <RegisterForm onRegister={handleRegister} />
            </div>
        </div>
    )
}