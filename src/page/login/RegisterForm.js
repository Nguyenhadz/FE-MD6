import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, FormLabel} from 'react-bootstrap';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import "./LoginWithGmailForm.css"
import * as Yup from "yup";
import customAxios from "../../redux/service/Api";
import React from "react";

export default function RegisterForm() {
    const currentPath = window.location.pathname;
    const mainLeftBot = document.querySelector('.main-left-bot');
    if (currentPath === '/register') {
        mainLeftBot.style.display = 'none';
    } else {
        mainLeftBot.style.display = 'block';
    }
    const navigate = useNavigate();
    let validate = Yup.object().shape({
        username: Yup.string()
            .email("Định dạng email không hợp lệ")
            .required("Không được để trống"),
        name: Yup.string()
            .matches(/^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/, {
                message: "Tên không được có ký tự đặc biệt và số!",
                excludeEmptyString: true
            })
            .required("Không được để trống"),
        password: Yup.string()
            .required("Không được để trống")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!^%*?&]{8,}$/, "Tối thiểu 8 ký tự, ít nhất 1 chữ hoa, thường, ký tự đặc biệt và số"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], "Mật khẩu không khớp!")
            .required("Không được để trống")
    });
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
                    &lt;&nbsp;&nbsp;Quay lại
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
                    ĐĂNG KÝ
                </p>
            </div>
            <Formik initialValues={{
                name: '',
                username: '',
                password: '',
                roles: [
                    {
                        id: 3
                    }
                ]
            }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        try {
                            const res = await customAxios.post("/register", values);
                            if (res.status === 201) {
                                toast.success('Tạo tài khoản thành công', {});
                                navigate('/loginWithEmail');
                            }
                        } catch (error) {
                            if (error.response && error.response.status === 400) {
                                toast.error('Tài khoản đã tồn tại', {});
                            } else {
                                console.error("Đã xảy ra lỗi:", error);
                            }
                        }
                    }}
            >
                <div style={{width: '400px', height: '176px', marginTop: '0px'}}>
                    <Form>
                        {/*Nhập email*/}
                        <div className={'form-input'} style={{width: '400px', height: '64px'}}>
                            <FormLabel
                                style={{
                                    fontSize: '12px',
                                    color: 'rgb(109 109 109)',
                                    fontWeight: 'bold',
                                    height: '17px'
                                }}
                            >
                                Nhập địa chỉ email:
                            </FormLabel>
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
                                <img
                                    src={'https://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Email-icon.png'}
                                    alt={'icon'}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        lineHeight: '20px'
                                    }}
                                />
                                <Field
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
                                    name="username"
                                    placeholder="Starting typing..."
                                >
                                </Field>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: '12px'
                            }}>
                                <ErrorMessage name="username"></ErrorMessage>
                            </div>
                        </div>
                        <div className={'form-input'} style={{width: '400px', height: '64px', marginTop: '20px'}}>
                            <FormLabel
                                style={{
                                    fontSize: '12px',
                                    color: 'rgb(109 109 109)',
                                    fontWeight: 'bold',
                                    height: '17px'
                                }}
                            >
                                Họ và tên:
                            </FormLabel>
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
                                <img
                                    src={'https://icons.iconarchive.com/icons/iconsmind/outline/512/User-icon.png'}
                                    alt={'icon'}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        lineHeight: '20px'
                                    }}
                                />
                                <Field
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
                                    name="name"
                                    placeholder="Enter your name"
                                >
                                </Field>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: '12px'
                            }}>
                                <ErrorMessage name="name"></ErrorMessage>
                            </div>
                        </div>

                        <div className={'form-input'} style={{width: '400px', height: '64px', marginTop: '20px'}}>
                            <FormLabel
                                style={{
                                    fontSize: '12px',
                                    color: 'rgb(109 109 109)',
                                    fontWeight: 'bold',
                                    height: '17px'
                                }}
                            >
                                Mật khẩu:
                            </FormLabel>
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
                                <img
                                    src={'https://icons.iconarchive.com/icons/icons8/windows-8/512/Security-Password-2-icon.png'}
                                    alt={'icon'}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        lineHeight: '20px'
                                    }}
                                />
                                <Field
                                    style={{
                                        width: '350px',
                                        height: '20px',
                                        border: 'none',
                                        padding: '0',
                                        marginLeft: '10px',
                                        fontSize: '14px'
                                    }}
                                    className={'input-login'}
                                    type="password"
                                    name="password"
                                    placeholder="******"
                                >
                                </Field>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: '12px'
                            }}>
                                <ErrorMessage name="password"></ErrorMessage>
                            </div>
                        </div>

                        <div className={'form-input'} style={{width: '400px', height: '64px', marginTop: '20px'}}>
                            <FormLabel
                                style={{
                                    fontSize: '12px',
                                    color: 'rgb(109 109 109)',
                                    fontWeight: 'bold',
                                    height: '17px'
                                }}
                            >
                                Nhập lại mật khẩu:
                            </FormLabel>
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
                                <img
                                    src={'https://icons.iconarchive.com/icons/icons8/windows-8/512/Security-Password-2-icon.png'}
                                    alt={'icon'}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        lineHeight: '20px'
                                    }}
                                />
                                <Field
                                    style={{
                                        width: '350px',
                                        height: '20px',
                                        border: 'none',
                                        padding: '0',
                                        marginLeft: '10px',
                                        fontSize: '14px'
                                    }}
                                    className={'input-login'}
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="******"
                                >
                                </Field>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: '12px'
                            }}>
                                <ErrorMessage name="confirmPassword"></ErrorMessage>
                            </div>
                        </div>

                        <Field
                            as="select"
                            style={{
                                width: '100px',
                                height: '24px',
                                border: 'solid 1px rgb(227,192,192)',
                                backgroundColor: 'rgb(227,192,192)',
                                borderRadius: '5px',
                                padding: '0',
                                marginLeft: '10px',
                                marginTop: '30px',
                                fontSize: '16px'
                            }}
                            className={'input-login'}
                            name="roles[0].id"
                        >
                            <option value="3" label="Student"/>
                            <option value="2" label="Teacher"/>
                        </Field>
                        <div style={{
                            marginTop: '30px',
                            width: '400px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button style={{
                                backgroundColor: 'rgb(136 84 192)',
                                width: '150px',
                                height: '40px',
                                fontSize: '16px'
                            }} type="submit">
                                Đăng ký
                            </Button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}