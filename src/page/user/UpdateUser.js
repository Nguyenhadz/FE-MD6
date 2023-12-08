import './styles/tailwind.css';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {changePassword, getStudentById, updateUser} from "../../service/UserService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import {v4} from "uuid";
import { IoIosMail } from "react-icons/io";
import {keyboard} from "@testing-library/user-event/dist/keyboard";
import {storage} from "../../firebase/FireBase";
import {Button} from "react-bootstrap";

export default function UpdateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    useEffect(() => {
        dispatch(getStudentById(id))
    }, [])
    const user = useSelector(state => {
        console.log(state.users.user)
        return state.users.user
    })

    const uploadFile = () => {
        if (image === null) return
        const imageRef = ref(storage, `kien/${image.name + v4()}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {

                setUploadedImageUrl(url); // Lưu URL sau khi upload thành công vào state mới
                console.log("image uploaded successfully", url);
                console.log("image uploaded successfully", uploadedImageUrl);
            });
        });
    };
    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };
    const validate = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống")
    });
    const validate1 = Yup.object().shape({
        currentPassword: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống"),
        newPassword: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống")
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/, "Mật khẩu phải có cả chữ và số"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống")
    })


    return (
        <>
            <div className={"flex flex-col justify-center"}>
                <div className={"flex flex-col justify-center"}>
                    <p className={"justify-center flex mt-24 text-3xl font-bold"}>Settings</p>
                    <div className={"flex justify-center "}>
                        {Object.keys(user).length > 0 &&
                            <div className={"h-3/5 w-5/12 mt-2  shadow-lg p-6 bg-white rounded-2xl"}>
                                <div className={"mt-4"}>
                                    <span className={"ml-8 text-2xl  font-bold text-orange-200"}>Profile</span>
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
                                            dispatch((updateUser(values)))
                                            navigate("/home")
                                        }}>
                                    <Form>
                                                <div className={"justify-center flex"}>
                                                    <input
                                                        id="imageInput"
                                                        type="file"
                                                        name="image"
                                                        style={{display: 'none'}}
                                                        onChange={(event) => {
                                                            setImage(event.target.files[0]);
                                                        }}/>
                                                    <img onClick={handleImageClick}
                                                         className={"h-24 w-24 rounded-full "} src={user.image}
                                                         alt={"lỗi"}/>
                                                </div>
                                                <div className={"justify-center flex"}>
                                                    <Button
                                                        className={"mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"}
                                                        onClick={uploadFile}>Upload File</Button>
                                                </div>

                                            <div>
                                                <span className={"ml-8 font-black"}>Name</span>
                                                <Field className={"form-control w-4/5 ml-16"} name={"name"}></Field>
                                                <div className="ml-16">
                                                    <ErrorMessage name="name"></ErrorMessage>
                                                </div>

                                            </div>
                                            <div className="mt-4">
                                                <span className={"ml-8 font-black"}>Email</span>
                                                <div className={"flex"}><IoIosMail  className={"ml-10"}/>
                                                <Field className={"form-control w-4/5 ml-2"}  value={user.username}
                                                       id={"line2"}
                                                       disabled={true}/>
                                                </div>

                                            </div>
                                            <Field type={"hidden"} name={"image"} value={uploadedImageUrl}></Field>
                                            <Button type="submit"
                                                    className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded ml-8 mb-4" >Save</Button>
                                    </Form>
                                </Formik>
                            </div>}
                    </div>
                </div>

                <div className={"-mt-6 flex flex-col justify-center"}>
                    <p className={"justify-center flex mt-20 text-3xl font-bold mb-10"}>Change Password</p>
                    <div className={"flex justify-center "}>
                        <div className={"h-3/5 w-5/12 mt-2 shadow-lg p-6 bg-white rounded-2xl"}>
                            <Formik initialValues={{
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: ''

                            }}
                                    validationSchema={validate1}
                                    onSubmit={(values) => {
                                        console.log(values)
                                        dispatch(changePassword(values))
                                        navigate("/home")
                                    }}>
                                <Form>
                                    <div className="mt-3">
                                        <span className={"ml-8 font-black"}>Current Password</span>
                                        <Field className={"form-control w-4/5 ml-16"} name={"currentPassword"}
                                               type={"password"}></Field>
                                        <div className={"ml-16"}>
                                            <ErrorMessage name="currentPassword"></ErrorMessage>
                                        </div>

                                    </div>
                                    <div className="mt-3">
                                        <span className={"ml-8 font-black"}>New Password</span>
                                        <Field className={"form-control w-4/5 ml-16"} name={"newPassword"}
                                               type={"password"}></Field>
                                        <div className="ml-16">
                                            <ErrorMessage name="newPassword"></ErrorMessage>
                                        </div>

                                    </div>
                                    <div className="mt-3">
                                        <span className={"ml-8 font-black"}>Confirm Password</span>
                                        <Field className={"form-control w-4/5 ml-16"} name={"confirmPassword"}
                                               type={"password"}></Field>
                                        <div className="ml-16">
                                            <ErrorMessage name="confirmPassword"></ErrorMessage>
                                        </div>
                                    </div>
                                    <Button type="submit"
                                            className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded ml-8 mb-4">Save
                                    </Button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
