import './Login.css'
import {Outlet} from "react-router";
import {useNavigate} from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();
    const handleSignUpClick = () => {
        navigate('/register');
    };
    return (
        <>
            <div className="container-login">
                <div className="header">
                    <div className="login-header">
                        <div className="login-header-left">
                                <img className="login-img"
                                     src="https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png"
                                     alt="Quizizz"/>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="main-content">
                        <div className="main-left">
                            <Outlet></Outlet>
                            <div className="main-left-bot">
                                <span>Bạn chưa có tài khoản?</span>
                                <button className="btn btn-btn-primary signup" onClick={handleSignUpClick}>Đăng ký
                                </button>
                            </div>
                        </div>
                        <div className="main-right"></div>
                    </div>
                </div>
            </div>
        </>
    )
}