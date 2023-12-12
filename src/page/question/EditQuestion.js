import CustomQuill from "../../react-quill/CustomQuill";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {createQuestion} from "../../service/QuestionService";
import {createAnswer} from "../../service/AnswerService";
import "./CreateQuestion.css"
import {useNavigate} from "react-router-dom";

export default function EditQuestion() {
    const navigate = useNavigate();
    const currentQuestion = useSelector((store) => {
        console.log(store.questionStore.currentQuestion)
        return store.questionStore.currentQuestion
    })
    const currentAnswers = useSelector((store) => {
        console.log(store.answersStore.currentAnswers)
        return store.answersStore.currentAnswers
    })
    const dispatch = useDispatch();

    const categoryQuestions =
        [
            {id: 1, name: 'Toán', user: {id: 1}},
            {id: 2, name: 'Vật lý', user: {id: 1}},
            {id: 3, name: 'Hóa', user: {id: 1}},
            {id: 4, name: 'Sinh học', user: {id: 1}}
        ]
    const levelQuestions =
        [
            {id: 1, name: 'Dễ', user: {id: 1}},
            {id: 2, name: 'Trung bình', user: {id: 1}},
            {id: 3, name: 'Khó', user: {id: 1}}
        ]
    const typeQuestions =
        [
            {id: 1, name: "Đúng sai"},
            {id: 2, name: "Một đáp án"},
            {id: 3, name: "Nhiều đáp án"}
        ]
    const formik = useFormik({
        initialValues: {
            question: currentQuestion,
            answer1: currentAnswers[0],
            answer2: currentAnswers[1],
            answer3: currentAnswers[2],
            answer4: currentAnswers[3]
        },
        onSubmit: async (values) => {
            const {question, answer1, answer2, answer3, answer4} = values;
            console.log(question)
            await dispatch(createQuestion({question: question}))
            await dispatch(createAnswer({answer: answer1}))
            await dispatch(createAnswer({answer: answer2}))
            await dispatch(createAnswer({answer: answer3}))
            await dispatch(createAnswer({answer: answer4}))
            // toast("Sửa thành công", {})
            navigate("/home/LayoutManagerQuestion/listQuestion")
        },
    });
    const answerCount = formik.values.question.typeQuestion?.id === 1 ? [1, 2] : [1, 2, 3, 4];
    const isCheckbox = formik.values.question.typeQuestion?.id === 3;
    const isRatio = formik.values.question.typeQuestion?.id === 1 || formik.values.question.typeQuestion?.id === 2;
    return (
        <>
            <div className={"rounded-[1rem] w-10/12 bg-purple-100 p-2 justify-center font-bold text-1xl h-max"}
                 style={{boxShadow: '30px 30px 30px 30px rgba(0, 0, 0, 0.2)'}}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className={"content-question w-full bg-amber-300 rounded-[0.5rem] p-2"}>
                        <span>Câu hỏi:</span>
                        <CustomQuill field={{name: "question.content", value: formik.values.question?.content}}
                                     form={formik}></CustomQuill>
                    </div>
                    <div className={"answer-question flex justify-around w-full mt-2 p-2"}>
                        {answerCount.map((index) => (
                            <div className={"w-1/5 m-2 rounded-[1rem] bg-amber-50"} key={index}>
                                <label className={"answer flex justify-around  w-full bg-blue-400 mt-0 p-2 rounded-t-[1rem]"}>
                                    <span>{`Câu trả lời ${index}`}</span>
                                    {isCheckbox ? (
                                        <input
                                            // className={"rounded-[0.5rem] bg-amber-200"}
                                            type={"checkbox"}
                                            name={`answer${index}.status`}
                                            checked={formik.values[`answer${index}`]?.status === 1}
                                            onChange={(e) => formik.setFieldValue(`answer${index}.status`, e.target.checked ? 1 : 0)}
                                        />
                                    ) : (
                                        isRatio && (
                                            <input
                                                // className={"rounded-[0.5rem] bg-amber-200"}
                                                type={"radio"}
                                                name={"answer.status"}
                                                checked={formik.values[`answer${index}`]?.status === 1}
                                                onChange={() => formik.setFieldValue(`answer${index}.status`, 1)}
                                            />
                                        )
                                    )}
                                </label>
                                <div className="custom-quill-container">
                                    <CustomQuill
                                        field={{
                                            name: `answer${index}.content`,
                                            value: formik.values[`answer${index}`]?.content
                                        }}
                                        form={formik}>
                                    </CustomQuill>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"flex h-10 justify-around items-center mt-2 rounded-[1rem] bg-amber-200"}>
                        <select
                            name="question.categoryQuestion.id"
                            value={formik.values.question.categoryQuestion?.id}
                            onChange={formik.handleChange}
                            className={"rounded-[1rem] h-6 w-1/5 text-center"}
                        >
                            {/*<option value={0}>-Category question-</option>*/}
                            {categoryQuestions.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <select
                            name="question.typeQuestion.id"
                            value={formik.values.question.typeQuestion?.id}
                            onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('question.typeQuestion.id', parseInt(e.target.value));
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
                            value={formik.values.question.levelQuestion?.id}
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
                        <button type="submit" className={"bg-gray-50 mt-2 border-2 rounded-full hover:text-white hover:bg-slate-900 w-24"}>Tạo câu hỏi</button>
                    </div>
                </form>
            </div>
        </>
    );
}