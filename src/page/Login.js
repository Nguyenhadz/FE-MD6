import './Login.css'
import {Outlet} from "react-router";

export default function Login() {
    return (
        <>
            <div className="container-login">
                <div className="header">
                    <div className="login-header">
                        <div className="login-header-left">
                            <a href="#">
                                <img className="login-img"
                                     src="https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png"
                                     alt="Quizizz"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="main-content">
                        <div className="main-left">
                            <Outlet></Outlet>
                            <div className="main-left-bot">
                                <span>Don't have an account?</span>
                                <button className="btn btn-btn-primary signup">Sign up</button>
                            </div>
                        </div>
                        <div className="main-right"></div>
                    </div>
                </div>
            </div>
        </>
    )
}