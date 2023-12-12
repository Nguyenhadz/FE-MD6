import CustomQuill from "../../react-quill/CustomQuill";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {createQuestion} from "../../service/QuestionService";
import {createAnswer, findAnswerByQuestionId} from "../../service/AnswerService";
import {useEffect} from "react";
import "./CreateQuestion.css"
import {useParams} from "react-router-dom";

export default function EditQuestion() {
    const dispatch = useDispatch();
    const {id} = useParams()
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    dispatch(findAnswerByQuestionId({id: id}))
    // const currentAnswer = useSelector((store) => {return store.answersStore.currentAnswer})
    // console.log(currentAnswer)
    // console.log(currentQuestion)

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

    // const formik = useFormik({
    //     initialValues: {
    //         question: {
    //             content: '',
    //             status: 1,
    //             categoryQuestion: {id: 0,},
    //             levelQuestion: {id: 0,},
    //             typeQuestion: {id: 0,},
    //             user: {id: currentUser.id,}
    //         },
    //         answer1: {content: '', status: 0, question: {id: 0}},
    //         answer2: {content: '', status: 0, question: {id: 0}},
    //         answer3: {content: '', status: 0, question: {id: 0}},
    //         answer4: {content: '', status: 0, question: {id: 0}}
    //     },
    //     onSubmit: async (values) => {
    //         const {question} = values;
    //         await dispatch(createQuestion({question: question}))
    //     },
    // });
    // formik.values.question = currentQuestion
    // formik.values.answer1 = currentAnswer[0]
    // formik.values.answer2 = currentAnswer[1]
    // formik.values.answer3 = currentAnswer[2]
    // formik.values.answer4 = currentAnswer[3]
    // console.log(currentQuestion)
    // console.log(currentAnswer[0])
    // console.log(currentAnswer[1])
    // console.log(currentAnswer[2])
    // console.log(currentAnswer[3])
    return (
        <>
            <div className={"rounded-[1rem] w-10/12 bg-purple-100 p-2 justify-center font-bold text-1xl"}>
                hihi
            </div>
        </>
    );
}