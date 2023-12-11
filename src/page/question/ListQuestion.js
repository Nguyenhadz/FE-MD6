import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAll} from "../../service/QuestionService";

export default function ListQuestion() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAll())
    }, [dispatch])
    const questions = useSelector((store) => {
        console.log(store.questionStore.questions)
        return store.questionStore.questions
    })
    return (
        <>
            <div className={"w-full border border-gray-300 bg-amber-6000"}>
                <div className={"flex justify-center"}>
                    <h1 className={"text-5xl"}>Danh sách các câu hỏi</h1>
                </div>
                <div>
                    {questions.map((q, index) => (
                        <p key={index}>{q.content}</p>
                    ))}
                </div>
            </div>
        </>
    )
}