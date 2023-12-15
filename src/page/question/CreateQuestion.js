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
import {FormLabel} from "react-bootstrap";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CustomQuill from "../../react-quill/CustomQuill";

export default function CreateQuestion() {
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
    }, [dispatch]);
    useEffect(() => {
        formik.values.answer1.question.id = createdQuestion.id
        formik.values.answer2.question.id = createdQuestion.id
        formik.values.answer3.question.id = createdQuestion.id
        formik.values.answer4.question.id = createdQuestion.id
        if (createdQuestion !== {}) {
            if (test !== 0) {
                dispatch(createAnswer({answer: formik.values.answer1})).then(() => console.log(1))
                dispatch(createAnswer({answer: formik.values.answer2})).then(() => console.log(2))
                if (test === 2 || test === 3) {
                    dispatch(createAnswer({answer: formik.values.answer3})).then(() => console.log(3))
                    dispatch(createAnswer({answer: formik.values.answer4})).then(() => console.log(4))
                }
                formik.resetForm()
            }
        }
    }, [createdQuestion])
    const [backgroundColor, setBackgroundColor] = useState("#461A42");
    const [test, setTest] = useState(1)
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
                categoryQuestion: {id: 1,},
                levelQuestion: {id: 1,},
                typeQuestion: {id: 2,},
                user: {id: currentUser.id,}
            },
            answer1: {content: '', status: 0, question: {id: 0}},
            answer2: {content: '', status: 0, question: {id: 0}},
            answer3: {content: '', status: 0, question: {id: 0}},
            answer4: {content: '', status: 0, question: {id: 0}}
        },
        onSubmit: async (values) => {
            await dispatch(deleteAnswerIsEmpty())
            const {question} = values;
            await dispatch(createQuestion({question: question}))
        },
    });


    const answerCount = formik.values.question.typeQuestion.id === 1 ? [1, 2] : [1, 2, 3, 4];

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

                        <div className={"answer-question flex flex-wrap"}>
                            {answerCount.map((index) => (
                                <div key={index} style={{width: '25%', minWidth: '200px', marginBottom: '10px'}}>
                                    <RadioGroup
                                        aria-labelledby={`demo-radio-buttons-group-label-${index}`}
                                        name={`radio-buttons-group-${index}`}
                                        value={formik.values[`answer${index}`].status === 1 ? `answer${index}` : "other"}
                                        onChange={(event) => {
                                            if (event.target.value === "other") {
                                                formik.setFieldValue(`answer${index}.status`, 0);
                                                formik.setFieldValue(`question.status`, 0); // Set question.status to 0
                                            } else {
                                                formik.setFieldValue(`question.typeQuestion.id`, parseInt(event.target.value));
                                                formik.setFieldValue(`answer1.status`, parseInt(event.target.value.slice(-1)) === 1 ? 1 : 0);
                                                formik.setFieldValue(`answer2.status`, parseInt(event.target.value.slice(-1)) === 2 ? 1 : 0);
                                                if (parseInt(event.target.value.slice(-1)) >= 3) {
                                                    formik.setFieldValue(`answer3.status`, parseInt(event.target.value.slice(-1)) === 3 ? 1 : 0);
                                                    formik.setFieldValue(`answer4.status`, parseInt(event.target.value.slice(-1)) === 4 ? 1 : 0);
                                                }
                                                formik.setFieldValue(`question.status`, 1); // Set question.status to 1
                                            }
                                        }}
                                    >
                                        <FormControl>
                                            <FormLabel id={`demo-radio-buttons-group-label-${index}`}>
                                                {`Câu trả lời ${index}`}
                                            </FormLabel>
                                            <div className={"w-72 h-72 m-2 rounded-[1rem] bg-amber-50"}>
                                                <div className="custom-quill-container flex">
                                                    {/* Phần CustomQuill */}
                                                    {/*{formik.values[`answer${index}`]?.content && (*/}
                                                    <CustomQuill field={{
                                                        name: `answer${index}.content`,
                                                        value: formik.values[`answer${index}`].content
                                                    }} form={formik} index={index}/>
                                                    {/*)}*/}

                                                    <FormControlLabel
                                                        value={`answer${index}`}
                                                        control={
                                                            <Radio
                                                                icon={<CheckRoundedIcon
                                                                    sx={{
                                                                        width: 28,
                                                                        height: 28,
                                                                        borderRadius: "50%",
                                                                        border: "1px solid #ddd",
                                                                        bgcolor: "initial",
                                                                        marginTop: 2,
                                                                        marginLeft: 2
                                                                    }}
                                                                />}
                                                                checkedIcon={<CheckRoundedIcon
                                                                    sx={{
                                                                        width: 28,
                                                                        height: 28,
                                                                        borderRadius: "50%",
                                                                        border: "1px solid #ddd",
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
                                                            borderRadius: "50%",
                                                        }}
                                                        onClick={() => {
                                                            formik.setFieldValue(`answer${index}.status`, 1);
                                                        }}
                                                    />
                                                </div>
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
                                        <span dangerouslySetInnerHTML={{__html: category.name}}/>
                                    </option>
                                ))}
                            </select>
                            <select
                                name="question.typeQuestion.id"
                                value={formik.values.question.typeQuestion.id}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue('question.typeQuestion.id', parseInt(e.target.value));
                                    setTest(parseInt(e.target.value))
                                }}
                                className={"rounded-[1rem] h-6 w-1/5 text-center"}
                            >
                                {/*<option value={0}>-Type question-</option>*/}
                                {typeQuestions.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
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