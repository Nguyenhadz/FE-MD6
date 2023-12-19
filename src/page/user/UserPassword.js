import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {changePassword, getStudentById} from "../../redux/service/UserService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Button} from "react-bootstrap";

export default function ChangePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getStudentById(id))
    }, [])

    const validate = Yup.object().shape({
        currentPassword: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống"),
        newPassword: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Tối thiểu 8 ký tự, ít nhất 1 chữ hoa, thường, ký tự đặc biệt và số"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống")
    })
    return (
        <>
            <div className={"flex flex-col justify-center"}>
                <div className={"-mt-6 flex flex-col justify-center"}>
                    <p className={"justify-center flex mt-20 text-3xl font-bold mb-10"}>Đổi mật khẩu</p>
                    <div className={"flex justify-center "}>
                        <div className={"h-3/5 w-5/12 mt-2 shadow-lg p-6 bg-white rounded-2xl"}>
                            <Formik initialValues={{
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: ''

                            }}
                                    validationSchema={validate}
                                    onSubmit={(values) => {
                                        console.log(values)
                                        dispatch(changePassword(values))
                                        navigate("/home")
                                    }}>
                                <Form>
                                    <div className="mt-3">
                                        <span className={"ml-8 font-black"}>Mật khẩu hiện tại</span>
                                        <Field className={"form-control w-4/5 ml-16"} name={"currentPassword"}
                                               type={"password"}></Field>
                                        <div className={"ml-16"}>
                                            <ErrorMessage name="currentPassword"></ErrorMessage>
                                        </div>

                                    </div>
                                    <div className="mt-3">
                                        <span className={"ml-8 font-black"}>Mật khẩu mới</span>
                                        <Field className={"form-control w-4/5 ml-16"} name={"newPassword"}
                                               type={"password"}></Field>
                                        <div className="ml-16">
                                            <ErrorMessage name="newPassword"></ErrorMessage>
                                        </div>

                                    </div>
                                    <div className="mt-3">
                                        <span className={"ml-8 font-black"}>Nhập lại mật khẩu mới</span>
                                        <Field className={"form-control w-4/5 ml-16"} name={"confirmPassword"}
                                               type={"password"}></Field>
                                        <div className="ml-16">
                                            <ErrorMessage name="confirmPassword"></ErrorMessage>
                                        </div>
                                    </div>
                                    <div className={"justify-center flex"}>
                                        <Button type="submit"
                                                className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded ml-8 mb-4 w-25 h-25">Save
                                        </Button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
