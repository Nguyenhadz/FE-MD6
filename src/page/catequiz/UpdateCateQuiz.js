import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {createCateQuiz, findCateQuizById, updateCateQuiz} from "../../service/CateQuizService";
import {Button} from "react-bootstrap";
import {Field, Form, Formik, useFormik} from "formik";
import CustomQuills from "./CustomQuills";
import CustomQuill from "../../react-quill/CustomQuill";
import React, {useEffect} from "react";
import {getStudentById} from "../../service/UserService";


export default function UpdateCateQuiz() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const {id} = useParams();
    // useEffect(() => {
    //     dispatch(findCateQuizById(id))
    // }, [])

    const cateQuiz = useSelector(state => {
        console.log(state)
        return state.cateQuiz.cateQuiz
    })

    const formik = useFormik({
        initialValues:{
            id: cateQuiz.id,
            name: cateQuiz.name,
            description: cateQuiz.description,
        },
        onSubmit:(values,{ resetForm }) =>{
            dispatch(updateCateQuiz(values)).then(()=> {
                navigate('/home/showListCateQuiz')
            });
        }
    })

    return (
        <>
            <div className={"bg-cover bg-center h-screen flex"}
                 style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}>
                <Link to={"/home/showListCateQuiz"}>
                    <button className={"w-20 h-10 rounded-lg ml-6 mt-5 bg-orange-400 hover:bg-red-500 text-white"}>Trở về
                    </button>
                </Link>
                <div
                    className={"w-3/5 h-5/6 bg-gray-100 bg-opacity-70 p-4 mt-20 ml-64 rounded-3xl shadow-lg"}>
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
                                type={"submit"}>Cập nhật</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )

}