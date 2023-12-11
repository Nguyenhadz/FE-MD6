import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAll} from "../../service/QuestionService";
import {findAllAnswer} from "../../service/AnswerService";

export default function ListQuestion() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAll())
        dispatch(findAllAnswer())
    }, [dispatch])
    const questions = useSelector((store) => {
        console.log(store.questionStore.questions)
        return store.questionStore.questions
    })
    const answer = useSelector((store) => {
        return store.answersStore.answers
    })
    console.log(answer[0])
    return (
        <>
            <div className={"w-full border border-gray-300 bg-amber-6000"}>
                <div className={"flex justify-center"}>
                    <h1 className={"text-5xl"}>Danh sách các câu hỏi</h1>
                </div>
                <div>
                    {questions.map((q, index) => (
                        <div>
                            <div>
                                <p key={index}>{q.content}</p>
                            </div>
                            <div>
                                {answer.map((a, index) => (
                                    <div>
                                        {/*<p key={index}>{q.content}</p>*/}
                                        {
                                            q.id === a.question.id && (
                                                <h1 key={index}
                                                    style={a.status === 1 ? {color: "red"} : {}}>{a.content}</h1>)
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}