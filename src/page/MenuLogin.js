import {NavLink} from "react-router-dom";
export default function MenuLogin() {
    return(
        <div className="main-left-top">
            <div className="title-form">
                <p>Log in to Quizizz</p>
            </div>
            <div className="wrap-login">
                <NavLink className="btn btn-btn-primary" to={'#'}>Login with Google</NavLink>
            </div>
            <div className="wrap-login">
                <NavLink to={'/loginWithEmail'} className="btn btn-btn-primary">Login with Gmail</NavLink>
            </div>
            <div className="wrap-login">
                <NavLink className="btn btn-btn-primary" to={'#'}>Login with Github</NavLink>
            </div>
        </div>
    )
}
