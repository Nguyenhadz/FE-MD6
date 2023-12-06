import {Field, Form, Formik} from "formik";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {login} from "../service/UserService";
import {useNavigate} from "react-router-dom";

export default function LoginWithGmailForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
                <Formik initialValues={{
                    username: '',
                    password: ''
                }}
                        onSubmit={(values) => {
                            dispatch(login(values)).then((res) => {
                                if (res.type === 'user/login/rejected') {
                                    toast.error('Login failed, you entered the wrong name or password\n', {});
                                    navigate('')
                                } else {
                                    // eslint-disable-next-line no-undef
                                    toast.success('Logged in successfully\n', {});
                                    navigate('/home')
                                }
                            })
                        }}
                >

                    <Form>
                        <FormGroup className="mb-3 form-login">
                            <FormLabel htmlFor={'gmail'} style={{margin: '20px 0 0 20px'}}>Gmail:</FormLabel>
                            <div style={{width: '100px'}}>
                                <Field type="text" id="gmail" class = "input-type" name="username"
                                       placeholder="gmail" />
                            </div>
                        </FormGroup>

                        <FormGroup className="mb-3 form-login">
                            <FormLabel htmlFor={'password'} style={{margin: '5px 0 0 20px'}}>Password:</FormLabel>
                            <div style={{width: '100px'}}>
                                <Field type="text" id="password" class = "input-type-2" name="password"
                                       placeholder="password" />
                            </div>
                        </FormGroup>
                        <Button
                            variant="primary"
                            type="submit" style={{margin: '20px 0 200px 200px'}}>
                            Login
                        </Button>
                    </Form>
                </Formik>
        </>
    )
}