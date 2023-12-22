import GoogleLogin from "@leecheuk/react-google-login";

export default function LoginWithGoogle() {

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div>
            <h2>React Google Login</h2>
            <br/>
            <br/>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage}
                         clientId={"757826435897-ml841crl0fmnsjvaqo9gskls8fmrlh0c.apps.googleusercontent.com"}/>
        </div>
    )
}