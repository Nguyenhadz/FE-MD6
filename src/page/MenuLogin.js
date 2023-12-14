import {NavLink} from "react-router-dom";
export default function MenuLogin() {
    return(
        <div className="main-left-top">
            <div className="title-form">
                <p>Đăng nhập vào Quizizz</p>
            </div>
            <div className="wrap-login">
                <NavLink className="btn btn-btn-primary" to={'#'}>Đăng nhập bằng Google</NavLink>
            </div>
            <div className="wrap-login">
                <NavLink to={'/loginWithEmail'} className="btn btn-btn-primary">Đăng nhập bằng Email</NavLink>
            </div>
            <div className="wrap-login">
                <NavLink className="btn btn-btn-primary" to={'#'}>Đăng nhập bằng Github</NavLink>
            </div>
        </div>
    )
}
