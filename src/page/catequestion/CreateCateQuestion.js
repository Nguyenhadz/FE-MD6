import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {createCateQuestion} from "../../redux/service/CateQuestionService";
import CustomQuills from "../catequiz/CustomQuills";
import {Link} from "react-router-dom";
import React from "react";

export default function CreateCateQuestion() {

    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            user: {
                id: currentUser.id
            }
        },
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            dispatch(createCateQuestion(values))
            resetForm();
        }
    })
    return (
        <>
            <div className={"bg-cover bg-center h-screen flex"}
                 style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}>
                <Link to={"/home/showListCateQuestion"}>
                    <button className={"w-20 h-10 rounded-lg ml-6 mt-5 bg-orange-400 hover:bg-red-500 text-white"}>Trở
                        về
                    </button>
                </Link>
                <div
                    className={"w-3/5 h-5/6 bg-gray-100 bg-opacity-70 p-4 mt-20 ml-64 rounded-3xl shadow-lg"}>
                    <div className={"text-4xl font-extrabold font-sans text-orange-500 mt-2 flex justify-center"}>Tạo
                        Danh Mục Câu Hỏi
                        Của Bạn
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={"mt-4 ml-32 text-2xl font-bold font-serif text-orange-500"}>Tên</div>
                        <div className={"flex justify-center mt-4"}>
                            <CustomQuills field={{name: "name", value: formik.values.name}}
                                          form={formik}></CustomQuills>
                        </div>
                        <div className={"mt-12 ml-32 text-2xl font-bold font-serif text-orange-500"}>Mô tả</div>
                        <div className={"flex justify-center mt-4 h-1/6"}>
                            <CustomQuills field={{name: "description", value: formik.values.description}}
                                          form={formik}></CustomQuills>
                        </div>
                        <div className={"mt-8 flex justify-center"}>
                            <button
                                className={"w-40 h-10 bg-amber-50 text-orange-500 font-bold font-serif rounded-3xl shadow-lg"}
                                type={"submit"}>Tạo Mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}