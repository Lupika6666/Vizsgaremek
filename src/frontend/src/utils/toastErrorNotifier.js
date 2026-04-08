import { toast } from "sonner";

export function toastErrorNotifier(error) {
    const errorMessage = error.response?.data?.valasz;

    if (errorMessage) {
        toast.error(errorMessage);
        if(errorMessage === "Validációs hiba!"){
            error.response.data.hibak.map(msg=>toast.warning(msg.uzenet));
        }
    }
    else {
        toast.error("Szerver hiba történt!");
    }
}