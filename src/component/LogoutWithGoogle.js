import {toast} from "react-toastify";
import GoogleLogin, {GoogleLogout} from "@leecheuk/react-google-login";

const clientId = "896921977592-c587tni3auvf2frtn4ildbrbs2bps4ki.apps.googleusercontent.com"

function LogoutWGG() {
    const onSuccess = () =>{
        toast.success("Logout Success!!!");
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            >
            </GoogleLogout>
        </div>
    );
}
export default LogoutWGG;