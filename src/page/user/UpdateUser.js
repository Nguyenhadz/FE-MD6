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
    // useEffect(() => {
    //     // Làm việc với Firestore
    //     const fetchData = async () => {
    //         const data = await firestore.collection('exampleCollection').get();
    //         console.log(data.docs.map(doc => doc.data()));
    //     };
    //     fetchData();
    //     // Làm việc với Authentication
    //     const checkAuthState = () => {
    //         auth.onAuthStateChanged(user => {
    //             if (user) {
    //                 console.log('User is signed in:', user.uid);
    //             } else {
    //                 console.log('User is signed out');
    //             }
    //         });
    //     };
    //     checkAuthState();
    // }, []);
    // const handleImageUpload = async (event) => {
    //     const file = event.target.files[0];
    //
    //     // Tạo tên duy nhất cho tệp ảnh được tải lên
    //     const fileName = `${Date.now()}_${file.name}`;
    //
    //     // Tải tệp lên Firebase Storage
    //     const storageRef = storage.ref();
    //     const fileRef = storageRef.child(fileName);
    //     await fileRef.put(file);
    //
    //     // Lấy URL tải về của tệp đã tải lên
    //     const url = await fileRef.getDownloadURL();
    //
    //     // Cập nhật URL ảnh của người dùng trong Firestore
    //     await firestore.collection('users').doc(id).update({
    //         image: url,
    //     });
    //
    //     // Cập nhật trạng thái local với URL ảnh mới
    //     dispatch({
    //         type: "UPDATE_USER_IMAGE",
    //         payload: {id, image: url},
    //     });
    // };
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
                            id: id,
                            name: user.name,
                            username: user.username

                        }}
                                enableReinitialize={true}
                                onSubmit={(values) => {
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
                                    <Field className={"form-control"} name={"username"} id={"line2"}></Field>
                            </div>
                            <button type="submit" className="btn btn-primary ml-3">Save</button>
                            </Form>
                        </Formik>
                    </div>

                </div>}
        </>
    )
}
