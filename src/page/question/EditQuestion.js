import React, {useEffect, useState} from "react";
import {editQuestions, findAllQuestionByUser} from "../../redux/service/QuestionService";
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

export default function EditQuestion({question}) {
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
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
                id: question.id,
                content: question.content,
                status: question.status,
                typeQuestion: {
                    id: question.typeQuestion.id,
                },
                categoryQuestion: {
                    id: question.categoryQuestion.id
                },
                levelQuestion: {
                    id: question.levelQuestion.id
                },
                user: {
                    id: question.user.id
                }
            },
            answers: question.answers
        },

        onSubmit: async (values) => {
            await dispatch(editQuestions(values))
            await dispatch(findAllQuestionByUser(currentUser.id))
        }
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
                                value: question.content
                            }}
                                    form={formik}
                                    onTextChange={(content) => formik.setFieldValue(`question.content`, content)}>
                            </Editor>
                        </div>

                        <div className={"answers-question flex justify-around w-full"}>
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
                                            const updatedAnswers = formik.values.answers.map((answer, i) => {
                                                return i === index
                                                    ? {...answer, status: "1"}
                                                    : {...answer, status: "0"};
                                            });

                                            formik.setFieldValue(`answers`, updatedAnswers);
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
                                                        value={`answers${index}`}
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
                                // value={question.answers.question.categoryQuestion.id}
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
                                value={question.levelQuestion.id}
                                onChange={formik.handleChange}
                                className={"rounded-[1rem] h-6 w-1/5 text-center"}

                            >
                                {levelQuestions.map((level) => (
                                    <option key={level.id} value={level.id}>{level.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"flex justify-center"}>
                            <button type="submit"
                                    className={"h-10 w-40 bg-gray-50 mt-2 border-2 rounded-full hover:text-white hover:bg-slate-900"}>
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}