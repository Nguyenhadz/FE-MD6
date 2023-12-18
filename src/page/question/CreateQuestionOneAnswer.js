import React, {useEffect, useState} from "react";
import {createQuestion} from "../../redux/service/QuestionService";
import {showAllCateQuestion} from "../../redux/service/CateQuestionService";
import {findAllTypeQuestion} from "../../redux/service/TypeQuestionService";
import {findAllLevelQuestion} from "../../redux/service/LevelQuestionService";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import Editor from "../catequiz/Editor";
import {useNavigate} from "react-router-dom";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CustomQuill from "../../react-quill/CustomQuill";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {RadioButtonUncheckedRounded} from "@mui/icons-material";
import {QuillToolbar} from "../catequiz/QuillToolbar";

export default function CreateQuestionOneAnswer() {
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    console.log(currentUser.id)
    const categoryQuestions = useSelector((store) => {
        return store.cateQuestions.cateQuestions
    })
    const levelQuestions = useSelector((store) => {
        return store.levelQuestionStore.levelQuestions
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showAllCateQuestion());
        dispatch(findAllTypeQuestion());
        dispatch(findAllLevelQuestion());
    }, [dispatch]);
    const [backgroundColor, setBackgroundColor] = useState("#461A42");
    const handleFocus = () => {
        setBackgroundColor("#281226");
    };

    const handleBlur = () => {
        setBackgroundColor("#461A42");
    };

    const formik = useFormik({
        initialValues: {
            question: {
                content: "",
                status: 1,
                typeQuestion: {
                    id: 2,
                },
                categoryQuestion: {
                    id: 1
                },
                levelQuestion: {
                    id: 1
                },
                user: {
                    id: currentUser.id
                },
                answers: []
            },
            answers: [
                {
                    content: "",
                    status: 0
                },
                {
                    content: "",
                    status: 0
                },
                {
                    content: "",
                    status: 0
                },
                {
                    content: "",
                    status: 0
                }
            ]
        },

        onSubmit: async (values) => {
            await dispatch(createQuestion(values))
        },
    });

    const colors = ["rgb(45 112 174)", "rgb(45 157 166)", "rgb(239 169 41)", "rgb(213 84 109)"]; // Mảng chứa các màu


    return (
        <>
            <div className={"w-full h-full"}>

                <div className={"custom-quill-container flex"}>
                    <QuillToolbar></QuillToolbar>
                </div>
                <div className={"rounded-[1rem] w-full bg-fuchsia-700 p-2 justify-center font-bold text-1xl h-max"}
                     style={{boxShadow: '30px 30px 30px 30px rgba(0, 0, 0, 0.2)'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <div
                            className={"content-question w-full h-48  rounded-[0.5rem] p-2  focus: border-purple-400 border-opacity-50 border-2"}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={{backgroundColor: backgroundColor}}>
                            <span>Câu hỏi:</span>
                            <Editor field={{
                                name: 'question.content',
                                value: formik.values.question.content
                            }}
                                    form={formik}>
                            </Editor>
                        </div>

                        <div className={"answer-question flex justify-around w-full"}>
                            {formik.values.answers.map((item, index, colorIndex) => (
                                <div key={index} className={"w-1/4"}>
                                    <RadioGroup
                                        aria-labelledby={`demo-radio-buttons-group-label-${index}`}
                                        name={`radio-buttons-group-${index}`}
                                        value={
                                            formik.values.answers[index].status === "1"
                                                ? `answer${index}`
                                                : "other"
                                        }
                                        onChange={(event) => {
                                            // Sử dụng hàm map để duyệt qua mảng answers
                                            formik.setFieldValue(
                                                `answers`,
                                                formik.values.answers.map((answer, i) => {
                                                    // console.log(formik.values.answers[i].status)
                                                    console.log("i" + i)
                                                    console.log("index" + index)
                                                    // Sử dụng toán tử ba ngôi để kiểm tra điều kiện và trả về giá trị tương ứng
                                                    return i === index
                                                        ? {...answer, status: "1"} // Nếu i bằng index thì cập nhật status thành 1
                                                        : {...answer, status: "0"}; // Nếu không thì cập nhật status thành 0
                                                })
                                            );
                                        }}
                                        style={{width: "95%"}}
                                    >
                                        <FormControl className={"w-full"}>
                                            <div
                                                className={"w-full h-72 m-2 rounded-[1rem] bg-amber-50 flex flex-column"}
                                                style={{backgroundColor: colors[index % colors.length]}}
                                            >
                                                <div className="custom-quill-container flex flex-column">

                                                    <FormControlLabel
                                                        value={`answer${index}`}
                                                        onClick={() => {
                                                            formik.setFieldValue(`answers[${index}].status`, 1);
                                                        }}
                                                        sx={{
                                                            width: 28,
                                                            height: 28,
                                                            borderRadius: "50%",
                                                            display: "flex",
                                                        }}
                                                        control={
                                                            <Radio
                                                                icon={<RadioButtonUncheckedRounded
                                                                    sx={{
                                                                        width: 28,
                                                                        height: 28,
                                                                        borderRadius: "50%",
                                                                        // border: "1px solid #ddd",
                                                                        // bgcolor: "initial",
                                                                        marginTop: 2,
                                                                        marginLeft: 1
                                                                    }}
                                                                />}
                                                                checkedIcon={<CheckRoundedIcon
                                                                    sx={{
                                                                        width: 28,
                                                                        height: 28,
                                                                        borderRadius: "50%",
                                                                        bgcolor: "#00C985",
                                                                        marginTop: 2,
                                                                        marginLeft: 1
                                                                    }}
                                                                />}
                                                            />
                                                        }
                                                        label={""}

                                                    />
                                                </div>
                                                <Box sx={{
                                                    width: 500,
                                                    maxWidth: "100%",
                                                    height: "100%",
                                                    overflow: "auto"
                                                }}>
                                                    <CustomQuill
                                                        field={{
                                                            name: `answers[${index}].content`,
                                                            value: formik.values.answers[index].content
                                                        }}
                                                        form={formik}
                                                        onChange={(content) => formik.setFieldValue(`answers[${index}].content`, content)}
                                                        index={index}
                                                        style={{
                                                            height: '250px',
                                                            outline: 'none',
                                                            padding: '12px 15px',
                                                            '-moz-tab-size': 4,
                                                            '--ql-toolbar-display': 'none' // Ẩn toolbar
                                                        }}
                                                    />
                                                </Box>
                                            </div>
                                        </FormControl>
                                    </RadioGroup>
                                </div>
                            ))}
                        </div>
                        <div className={"flex h-10 justify-around items-center mt-2 rounded-[1rem] bg-amber-200"}>
                            <select
                                name="question.categoryQuestion.id"
                                value={formik.values.question.categoryQuestion.id}
                                onChange={formik.handleChange}
                                className={"rounded-[1rem] h-6 w-1/5 text-center"}
                            >
                                {categoryQuestions && categoryQuestions.length > 0 && categoryQuestions.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        <Typography dangerouslySetInnerHTML={{__html: category.name}}/>
                                    </option>
                                ))}
                            </select>
                            <select
                                name="question.levelQuestion.id"
                                value={formik.values.question.levelQuestion.id}
                                onChange={formik.handleChange}
                                className={"rounded-[1rem] h-6 w-1/5 text-center"}

                            >
                                {/*<option value={0}>-Level question-</option>*/}
                                {levelQuestions.map((level) => (
                                    <option key={level.id} value={level.id}>{level.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"flex justify-center"}>
                            <button type="submit"
                                    className={"h-10 w-40 bg-gray-50 mt-2 border-2 rounded-full hover:text-white hover:bg-slate-900"}>Tạo
                                câu hỏi
                            </button>
                            <button type="button" onClick={() => navigate("/home/layoutManagerQuestion/listQuestion")}
                                    className={"h-10 w-40 bg-gray-50 mt-2 border-2 rounded-full hover:text-white hover:bg-slate-900"}>Quay
                                lại
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}