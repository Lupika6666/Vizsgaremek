import { Link, useNavigate } from "react-router";
import { useUser } from "../../../features/user/stores/userProvider";
import { userApi } from "../../../features/user/api/userApi";
import { LoginForm } from "../../../features/user/components/LoginForm";
import { toast } from "sonner";

export function LoginPage(){
    const navigate = useNavigate();

    const { login } = useUser();

    const handleLogin = async (email, password) => {

        try {
            //1. kérés indítása
            const data = await userApi.login(email, password);

            login(data.token);
            
            const successMessage = data.valasz ? data.valasz : "Sikeres bejelentkezés";
            toast.success(successMessage);
            navigate("/");
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
                <LoginForm onLogin={handleLogin} />
                <p>Még nem regisztrált?</p>
                <Link className="btn btn-success" to="/regisztracio">Regisztráció</Link>
            </div>
        </div>
    )
}