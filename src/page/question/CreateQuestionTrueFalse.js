import React, {useEffect, useState} from "react";
import {createQuestion} from "../../redux/service/QuestionService";
import {createAnswer, deleteAnswerIsEmpty} from "../../redux/service/AnswerService";
import {showAllCateQuestion} from "../../redux/service/CateQuestionService";
import {findAllTypeQuestion} from "../../redux/service/TypeQuestionService";
import {findAllLevelQuestion} from "../../redux/service/LevelQuestionService";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {QuillToolbar} from "../catequiz/QuillToolbar";
import Editor from "../catequiz/Editor";
import {useNavigate} from "react-router-dom";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CustomQuill from "../../react-quill/CustomQuill";
import Typography from "@mui/material/Typography";
import {RadioButtonUncheckedRounded} from "@mui/icons-material";

export default function CreateQuestionTrueFalse() {

    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    const categoryQuestions = useSelector((store) => {
        return store.cateQuestions.cateQuestions
    })
    const typeQuestions = useSelector((store) => {
        return store.typeQuestionStore.typeQuestions
    })
    const levelQuestions = useSelector((store) => {
        return store.levelQuestionStore.levelQuestions
    })
    const createdQuestion = useSelector((store) => {
        return store.questionStore.createdQuestion
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showAllCateQuestion());
        dispatch(findAllTypeQuestion());
        dispatch(findAllLevelQuestion());
    }, []);
    useEffect(() => {
        formik.values.answer1.question.id = createdQuestion.id
        formik.values.answer2.question.id = createdQuestion.id
        if (createdQuestion !== {}) {
            dispatch(createAnswer({answer: formik.values.answer1})).then(() => console.log(1))
            dispatch(createAnswer({answer: formik.values.answer2})).then(() => console.log(2))
            formik.resetForm()

        }
    }, [createdQuestion])
    const answerCount = [1, 2];

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
                content: '',
                status: 1,
                categoryQuestion: {id: 1},
                levelQuestion: {id: 1},
                typeQuestion: {id: 1},
                user: {id: currentUser.id,}
            },
            answer1: {content: '', status: 0, question: {id: 0}},
            answer2: {content: '', status: 0, question: {id: 0}}
        },
        onSubmit: async (values) => {
            await dispatch(deleteAnswerIsEmpty())
            const {question} = values;
            await dispatch(createQuestion({question: question}))
        },
    });
    const colors = ["rgb(45 112 174)", "rgb(45 157 166)", "rgb(239 169 41)", "rgb(213 84 109)"]; // Mảng chứa các màu

    return (
        <>
            <div>
                <div className={"custom-quill-container flex"}>
                    <QuillToolbar></QuillToolbar>
                </div>
                <div className={"rounded-[1rem] w-full bg-fuchsia-700 p-2 justify-center font-bold text-1xl h-max"}
                     style={{boxShadow: '30px 30px 30px 30px rgba(0, 0, 0, 0.2)'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <div
                            className={"content-question w-full h-48  rounded-[0.5rem] p-2  focus: border-purple-400 border-opacity-50 border-2"}
                            // gán hàm xử lý sự kiện onFocus và onBlur cho div
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            // thiết lập màu nền cho div theo state hook
                            style={{backgroundColor: backgroundColor}}>
                            <span>Câu hỏi:</span>
                            <Editor field={{
                                name: 'question.content',
                                value: formik.values.question.content
                            }}
                                    form={formik}>
                            </Editor>
                        </div>

                        <div className={"answer-question flex justify-around flex-wrap"}>
                            {answerCount.map((index, colorIndex) => (
                                <div key={index} style={{
                                    width: '25%',
                                    minWidth: '200px',
                                    marginBottom: '10px',
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "auto"
                                }}>
                                    <RadioGroup
                                        aria-labelledby={`demo-radio-buttons-group-label-${index}`}
                                        name={`radio-buttons-group-${index}`}
                                        value={
                                            formik.values[`answer${index}`] && formik.values[`answer${index}`].status === 1
                                                ? `answer${index}`
                                                : "other"
                                        } onChange={(event) => {
                                        const answerIndex = parseInt(event.target.value.slice(-1)); // Lấy index từ value
                                        console.log(event.target.value)
                                        // Cập nhật trạng thái của đáp án được chọn
                                        formik.setFieldValue(`answer${answerIndex}.status`, 1);
                                        console.log(index)
                                        // Cập nhật trạng thái của các đáp án khác thành 0
                                        for (let i = 1; i <= answerCount.length; i++) {
                                            if (i !== answerIndex) {
                                                formik.setFieldValue(`answer${i}.status`, 0);
                                            }
                                        }
                                    }}>
                                        <FormControl className={"flex justify-around flex-column"}>
                                            {/*<FormLabel id={`demo-radio-buttons-group-label-${index}`}>*/}
                                            {/*    {`Câu trả lời ${index}`}*/}
                                            {/*</FormLabel>*/}
                                            <div className={"w-64 h-72 m-2 rounded-[1rem] bg-amber-50 "}
                                                 style={{backgroundColor: colors[colorIndex % colors.length]}
                                                 }>
                                                <div className="custom-quill-container flex flex-column">

                                                    <FormControlLabel
                                                        value={`answer${index}`}
                                                        control={
                                                            <Radio
                                                                icon={<RadioButtonUncheckedRounded
                                                                    sx={{
                                                                        width: 28,
                                                                        height: 28,
                                                                        // borderRadius: "50%",
                                                                        // border: "1px solid #ddd",
                                                                        // bgcolor: "initial",
                                                                        marginTop: 2,
                                                                        marginLeft: 2
                                                                    }}
                                                                />}
                                                                checkedIcon={<CheckRoundedIcon
                                                                    sx={{
                                                                        width: 28,
                                                                        height: 28,
                                                                        borderRadius: "50%",
                                                                        // border: "1px solid #ddd",
                                                                        bgcolor: "#00C985",
                                                                        marginTop: 2,
                                                                        marginLeft: 2
                                                                    }}
                                                                />}
                                                            />
                                                        }
                                                        label={""}
                                                        sx={{
                                                            width: 28,
                                                            height: 28,
                                                            // borderRadius: "50%",
                                                        }}
                                                        onClick={() => {
                                                            formik.setFieldValue(`answer${index}.status`, 1);
                                                        }}
                                                    />
                                                </div>
                                                <CustomQuill field={{
                                                    name: `answer${index}.content`,
                                                    value: formik.values[`answer${index}`] ? formik.values[`answer${index}`].content : ''
                                                }} form={formik} index={index}
                                                             style={{ // thêm thuộc tính style
                                                                 height: '250px', // thay đổi giá trị height
                                                                 outline: 'none',
                                                                 padding: '12px 15px',
                                                                 '-moz-tab-size': 4,
                                                             }}
                                                />
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