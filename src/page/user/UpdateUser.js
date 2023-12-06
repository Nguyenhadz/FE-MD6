import './updateUser.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getStudentById, updateUser} from "../../service/UserService";
import {auth, firestore, storage} from '../../firebase/FireBase';
import {Field, Form, Formik} from "formik";

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

    return (
        <>
            {Object.keys(user).length > 0 &&
                <div className={"updateUser"}>
                    <p className={"title"}>Settings</p>
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
                                onSubmit={(values) => {
                                    console.log(values)
                                    dispatch(updateUser(values))
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
                            </div>
                            <div className="avatar">
                                <span className={"lineAvatar"}>Email</span>
                                <input type="text" placeholder={user.username} id={"line2"} disabled={true}/>
                                    {/*<Field className={"form-control"}  id={"line2"}></Field>*/}
                            </div>
                            <button type="submit" className="btn btn-primary ml-3">Save</button>
                            </Form>
                        </Formik>
                    </div>

                </div>}
        </>
    )
}
