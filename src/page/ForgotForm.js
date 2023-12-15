import customAxios from "../redux/service/Api";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";
import React from "react";
import {useNavigate} from "react-router-dom";
import { MdEmail } from "react-icons/md";

export default function ForgotForm() {
    const navigate = useNavigate();
    return (
        <div className="main-left-top">
            <div>
                <button onClick={() => {
                    navigate("/")
                }} style={{
                    fontSize: '12px',
                    color: 'rgb(136 84 192)',
                    fontWeight: 'bold',
                    border: 'none',
                    width: '80px',
                    height: '25px',
                    borderRadius: '5px'
                }}>
                    &lt;&nbsp;&nbsp;Go back
                </button>
            </div>
            <div style={{width: '400px', height: '32px', marginTop: '10px'}}>
                <p style={{
                    fontSize: '20px',
                    color: 'rgb(0,0,0)',
                    fontWeight: 'bold',
                    margin: '0 0 16px',
                    textAlign: 'center'
                }}>
                    Forgot Password?
                </p>
            </div>
            <div style={{width: '400px', height: '60px', marginTop: '10px'}}>
                <label style={{
                    fontSize: '12px',
                    color: 'rgb(109 109 109)',
                    fontWeight: 'bold',
                    height: '17px'
                }}>
                    Enter the email:
                </label>
                <div
                    style={{
                        width: '400px',
                        color: 'rgb(227,192,192)',
                        height: '40px',
                        border: 'solid rgb(227,192,192) 1px',
                        borderRadius: '5px',
                        padding: '10px',
                        display: 'flex'
                    }}
                    className={'parent-login'}>
                    <MdEmail />
                    <input
                        style={{
                            width: '350px',
                            height: '20px',
                            border: 'none',
                            padding: '0',
                            marginLeft: '10px',
                            fontSize: '14px'
                        }}
                        className={'input-login'}
                        type="text"
                        id = {'username'}
                        name="username"
                        placeholder="Starting typing..."
                    >
                    </input>
                </div>
            </div>
            <Button
                style={{
                    backgroundColor: 'rgb(136 84 192)',
                    width: '400px',
                    height: '40px',
                    fontSize: '16px',
                    marginTop:'50px'
                }}
                type="submit"
                onClick = {async () => {
                    try {
                        const res = await customAxios.get("users/fbu/" + document.getElementById("username").value)
                        console.log(res)
                        if (res.status === 200) {
                            toast.success("Đã gửi mail reset password về email cua bạn", {})
                            await customAxios.get("/forgot/" + document.getElementById("username").value)
                            navigate("/loginWithEmail")
                        }
                    }catch (e) {
                        toast.error('Tài khoản không tồn tại', {});
                    }
                }}>
                Reset Password
            </Button>
        </div>
    )
}