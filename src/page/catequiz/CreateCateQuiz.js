import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {createCateQuiz} from "../../service/CateQuizService";
import {Button} from "react-bootstrap";
import {Field, Form, Formik} from "formik";


export default function CreateCateQuiz() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <div className={"bg-cover bg-center h-screen flex items-center justify-center"}
                 style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}>
                <div
                    className={"w-3/5 h-5/6 bg-gray-100 bg-opacity-40 p-4 justify-center rounded-3xl shadow-lg"}>
                    <div className={"text-4xl font-extrabold font-sans text-orange-500 mt-2 flex justify-center"}>Tạo
                        Danh Mục Câu Hỏi
                        Của Bạn
                    </div>
                    <Formik initialValues={{
                        name: '',
                        description: ''
                    }}
                            onSubmit={(values) => {
                                console.log(values)
                                dispatch(createCateQuiz(values))
                            }}>
                        <Form>
                            <div className={"mt-4 ml-32 text-2xl font-bold font-serif text-orange-500"}>Tên</div>
                            <div className={"flex justify-center mt-4"}>
                                <Field >
                                    {({field, form}) => (
                                        <ReactQuill
                                            name={"name"}
                                            className={"w-3/5 h-5/6 bg-blue-300 rounded-3xl bg-opacity-50 shadow-lg"}
                                            value={field.value}
                                            onChange={field.onChange}
                                            modules={{toolbar: true}}
                                            formats={['bold', 'italic', 'underline', 'list', 'bullet']}
                                            placeholder="Nhập văn bản..."
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className={"mt-12 ml-32 text-2xl font-bold font-serif text-orange-500"}>Mô tả</div>
                            <div className={"flex justify-center mt-4 h-3/6"}>
                                <Field >
                                    {({field, form}) => (
                                        <ReactQuill
                                            name={"description"}
                                            className={"w-3/5 h-5/6 bg-blue-300 rounded-3xl bg-opacity-50  shadow-lg"}
                                            value={field.value}
                                            onChange={field.onChange}
                                            modules={{toolbar: true}}
                                            formats={['bold', 'italic', 'underline', 'list', 'bullet']}
                                            placeholder="Nhập văn bản..."
                                        />

                                    )}
                                </Field>
                            </div>
                            <div className={"mt-8 flex justify-center"}>
                                <Button
                                    className={"w-30 bg-amber-50 text-orange-500 font-bold font-serif rounded-3xl shadow-lg"}
                                    type={"submit"}>Tạo Mới</Button>
                            </div>

                        </Form>
                    </Formik>
                </div>

            </div>
        </>
    )

}