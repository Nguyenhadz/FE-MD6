import './updateUser.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {changePassword, getStudentById, updateUser} from "../../service/UserService";
import {auth, firestore, storage} from '../../firebase/FireBase';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export default function UpdateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        dispatch(getStudentById(id))
    }, [])
    const user = useSelector(state => {
        console.log(state.users.user)
        return state.users.user
    })

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };
    const validate = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống"),
        currentPassword: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống"),
        newPassword: Yup.string()
            .min(8, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống")
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/, "Mật khẩu phải có cả chữ và số"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống")
    });

    return (
        <>

                <div className={"updateUser"}>
                    <p className={"title"}>Settings</p>
                    {Object.keys(user).length > 0 &&
                    <div className={"body"}>
                        <div className={"profile"}>
                            <span>Profile</span>
                        </div>
                        <Formik initialValues={{
                            id: parseInt(id),
                            name: user.name,
                            image: user.image,
                            roles: [
                                {
                                    id: user.roles[0].id
                                }
                            ]

                        }}
                                enableReinitialize={true}
                                validationSchema={validate}
                                onSubmit={(values) => {
                                    console.log(values)
                                    dispatch(updateUser(values))
                                    navigate("/home")
                                }}>
                            <Form>
                            <div className="image" onClick={handleImageClick}>
                                <input
                                    id="imageInput"
                                    type="file"
                                    name="image"
                                    style={{ display: 'none' }}
                                />
                                <img src={user.image} alt={"lỗi"} />
                            </div>
                            <div className="avatar">
                                <span className={"lineAvatar"}>Name</span>
                                    <Field className={"form-control"} name={"name"} id={"line1"}></Field>
                                <ErrorMessage name="name"></ErrorMessage>
                            </div>
                            <div className="avatar">
                                <span className={"lineAvatar"}>Email</span>
                                <input  type="text" placeholder={user.username} id={"line2"} disabled={true}/>

                            </div>
                            <button type="submit" className="btn btn-primary ml-3">Save</button>
                            </Form>
                        </Formik>
                    </div>}
                    <p className={"title"} style={{marginTop: "10px"}}>Change Password</p>
                    <div className={"body"}>
                        <div className={"profile"}>

                        </div>
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

                                <div className="avatar">
                                    <span className={"lineAvatar"}>Current Password</span>
                                    <Field className={"form-control"} name={"currentPassword"} id={"line3"}></Field>
                                    <ErrorMessage name="currentPassword"></ErrorMessage>
                                </div>
                                <div className="avatar">
                                    <span className={"lineAvatar"}>New Password</span>
                                    <Field className={"form-control"} name={"newPassword"} id={"line3"}></Field>
                                    <ErrorMessage name="newPassword"></ErrorMessage>
                                </div>
                                <div className="avatar">
                                    <span className={"lineAvatar"}>Confirm Password</span>
                                    <Field className={"form-control"} name={"confirmPassword"} id={"line3"}></Field>
                                    <ErrorMessage name="confirmPassword"></ErrorMessage>
                                </div>
                                <button type="submit" className="btn btn-primary ml-3" style={{marginTop:"20px"}}>Save</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
        </>
    )
}
