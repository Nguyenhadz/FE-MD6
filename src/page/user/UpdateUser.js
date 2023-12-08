import './updateUser.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getStudentById, updateUser} from "../../service/UserService";

import {Field, Form, Formik} from "formik";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { v4 } from "uuid";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {storage} from "../../firebase/FireBase";
import {keyboard} from "@testing-library/user-event/dist/keyboard";
export default function UpdateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [imageurl, setImageUrl] = useState([]);
    const imagelistref = ref(storage, "kien/");
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const  uploadFile = () => {
        if (image === null) return;
        const imageRef = ref(storage, `kien/${image.name + v4()}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl((prev) => [...prev, url]); // Lưu trữ URL của image vào state imageurl
                console.log("image uploaded successfully", imageurl);
                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
            });
        });
    };
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
                                    console.log(user.image)
                                    uploadFile( () => {dispatch(updateUser(values))})
                                }}>
                            <Form>
                            <div className="image" onClick={handleImageClick}>
                                <input
                                    id="imageInput"
                                    type="file"
                                    name="image"
                                    style={{ display: 'none' }}
                                    onChange={(event) => {
                                        setImage(event.target.files[0]);
                                    }}/>
                                <img src={imageurl[0]} alt={"lỗi"} />
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
