import {Field, Form, Formik} from "formik";
import {Button, FormLabel} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {login} from "../service/UserService";
import {NavLink, useNavigate} from "react-router-dom";
import "./LoginWithGmailForm.css"

export default function LoginWithGmailForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="main-left-top">
            <div>
                <button onClick={
                    () => {
                        navigate("/")
                    }}
                        style={{
                            fontSize: '12px',
                            color: 'rgb(136 84 192)',
                            fontWeight: 'bold',
                            border: 'none',
                            width: '80px',
                            height: '25px',
                            borderRadius: '5px'
                        }}
                > &lt;&nbsp;&nbsp;Go back
                </button>
            </div>
            <div
                style={{
                    width: '400px',
                    height: '32px',
                    marginTop: '10px'
                }}>
                <p
                    style={{
                        fontSize: '20px',
                        color: 'rgb(0,0,0)',
                        fontWeight: 'bold',
                        margin: '0 0 16px'
                    }}
                >
                    Continue with email
                </p>
            </div>
            <Formik initialValues={{
                username: '',
                password: ''
            }}
                    onSubmit={(values) => {
                        dispatch(login(values)).then((res) => {
                            if (res.type === 'user/login/rejected') {
                                toast.error('Login failed, you entered the wrong name or password\n', {
                                    autoClose: 500,
                                });
                                navigate('')
                            } else {
                                // eslint-disable-next-line no-undef
                                toast.success('Logged in successfully\n', {
                                    autoClose: 500,
                                });
                                navigate('/home')
                            }
                        })
                    }}
            >
                <div
                    style={{
                        width: '400px',
                        height: '176px',
                        marginTop: '10px'
                    }}>
                    <Form>
                        <div
                            className={'form-input'}
                            style={{
                                width: '400px',
                                height: '64px'
                            }}>
                            <FormLabel
                                style={{
                                    fontSize: '12px',
                                    color: 'rgb(109 109 109)',
                                    fontWeight: 'bold',
                                    height: '17px'
                                }}
                            >
                                Email hoặc tên đăng nhập:
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
                        </div>

                        <div
                            className={'form-input'}
                            style={{
                                width: '400px',
                                height: '64px',
                                marginTop: '20px'
                            }}>
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
                        </div>
                        <div
                            style={{
                                marginTop: '15px',
                                textDecoration: 'none'
                            }}
                        >
                            <NavLink
                                style={{
                                    marginTop: '20px',
                                    fontSize: '14px'
                                }}
                                to={'/forgot'}
                            >
                                Quên mật khẩu?
                            </NavLink>
                        </div>
                        <div
                            style={{
                                marginTop: '20px',
                                width: '400px',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            <Button
                                style={{
                                    backgroundColor: 'rgb(136 84 192)',
                                    width: '400px',
                                    height: '40px',
                                    fontSize: '16px'
                                }}
                                type="submit">
                                Đăng nhập
                            </Button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}