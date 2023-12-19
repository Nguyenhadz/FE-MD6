import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getStudentById, updateUser} from "../../redux/service/UserService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {v4} from "uuid";
import {IoIosMail} from "react-icons/io";
import {storage} from "../../firebase/FireBase";
import {Button} from "react-bootstrap";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {Avatar, Stack} from "@mui/material";

export default function UserProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    useEffect(() => {
        dispatch(getStudentById(id))
    }, [])
    const user = useSelector(state => {
        return state.users.user
    })

    const uploadFile = async () => {
        if (image === null) return;
        const imageRef = ref(storage, `kien/${image.name + v4()}`);
        try {
            const snapshot = await uploadBytes(imageRef, image);
            const url = await getDownloadURL(snapshot.ref);
            setUploadedImageUrl(url);
            return url;
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    const handleImageClick = () => {
        const input = document.querySelector("input[name='image']");
        input.click();
    };

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const validate = Yup.object().shape({
        name: Yup.string()
            .min(2, "Quá ngắn!")
            .max(50, "Qúa dài!")
            .required("Không được để trống")
    });
    const handleSubmit = async (values) => {
        const url = await uploadFile();
        dispatch(updateUser({...values, image: url}));
    }
    return (
        <>
            <div className={"flex flex-col justify-center"}>

                <div className={"flex flex-col justify-center"}>
                    <p className={"justify-center flex mt-24 text-3xl font-bold"}>Cài đặt</p>
                    <div className={"flex justify-center "}>
                        {Object.keys(user).length > 0 &&
                            <div className={"h-3/5 w-5/12 mt-2  shadow-lg p-6 bg-white rounded-2xl"}>
                                <div className={"mt-4"}>
                                    <span className={"ml-8 text-2xl  font-bold text-orange-200"}>Hồ sơ</span>
                                </div>
                                <Formik initialValues={{
                                    id: parseInt(id),
                                    name: user.name,
                                    image: uploadedImageUrl ? uploadedImageUrl : user.image,
                                    roles: [
                                        {
                                            id: user.roles[0].id
                                        }
                                    ]

                                }}
                                        enableReinitialize={true}
                                        validationSchema={validate}
                                        onSubmit={(values) => {
                                            handleSubmit(values).then(r => {
                                                navigate("/home")
                                            })
                                        }}>
                                    <Form>
                                        <div className={"justify-center flex"}>
                                            <input
                                                id="imageInput"
                                                type="file"
                                                name="image"
                                                style={{display: 'none'}}
                                                onChange={handleChange}/>
                                            <Stack direction="row" spacing={2}>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={file ? file : user.image}
                                                    sx={{width: 112, height: 112}}
                                                    onClick={handleImageClick}
                                                />
                                            </Stack>
                                        </div>

                                        <div>
                                            <span className={"ml-8 font-black"}>Tên</span>
                                            <Field className={"form-control w-4/5 ml-16"} name={"name"}></Field>
                                            <div className="ml-16">
                                                <ErrorMessage name="name"></ErrorMessage>
                                            </div>

                                        </div>
                                        <div className="mt-4">
                                            <span className={"ml-8 font-black"}>Email</span>
                                            <div className={"flex"}><IoIosMail className={"ml-10"}/>
                                                <Field className={"form-control w-4/5 ml-2"} value={user.username}
                                                       id={"line2"}
                                                       disabled={true}/>
                                            </div>

                                        </div>
                                        <Field type={"hidden"} name={"image"} value={uploadedImageUrl}></Field>
                                        <div className={"justify-center flex"}>
                                            <Button type="submit"
                                                    className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded ml-8 mb-4 justify-center flex w-25 h-25">
                                                Lưu thông tin
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
