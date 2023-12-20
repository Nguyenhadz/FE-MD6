import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createResult} from "../../redux/service/ResultService";
import {toast} from "react-toastify";

const DoingQuiz = () => {
    const idQuiz = useParams().idQuiz;
    const quiz = useSelector((store) => store.quizzes.quiz);
    const idUser = useSelector((store) => store.users.currentUser.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [answers, setAnswers] = useState(
        quiz.questions.reduce((acc, question) => {
            acc[question.id] = [];
            return acc;
        }, {})
    );

    const [countdown, setCountdown] = useState(quiz.time);

    const handleCheckboxChange = (questionId, answerId) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers };
            const index = updatedAnswers[questionId].indexOf(answerId);
            if (index === -1) {
                updatedAnswers[questionId].push(answerId);
            } else {
                updatedAnswers[questionId].splice(index, 1);
            }
            return updatedAnswers;
        });
    };

    const handleRadioChange = (questionId, answerId) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: [answerId],
        }));
    };

    const sortedQuestions = quiz.questions
        .slice()
        .sort((a, b) => a.index - b.index)
        .map((question, index) => ({ ...question, index: index + 1 }));

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            // Hết thời gian, thực hiện submit ở đây
            handleSubmit().then(() => {});
        }
    }, [countdown]);

    const handleSubmit = async () => {
        const values = {
            user: {
                id: idUser,
            },
            quiz: {
                id: parseInt(idQuiz),
            },
            answers: Object.values(answers).flat().map((id) => ({ id })),
        };
        console.log(values);
        console.log("Nộp bài em ei")
        await dispatch(createResult(values))
        toast.success("Nộp bài thành công", {})
        await navigate("/home/result")
    };
    return (
        <div>
            <div className={"m-auto text-1xl text-red-600 font-bold"}>{`Thời gian còn lại: ${countdown} giây`}</div>
            {sortedQuestions.map((question) => (
                <div key={question.id}>
                    <h3 className={"text-1xl text-blue-700 font-bold"}>{`Câu ${question.index}:`}</h3>
                    <span dangerouslySetInnerHTML={{__html: question.content}}></span>
                    {question.typeQuestion.id === 1 || question.typeQuestion.id === 2 ? (
                        question.answers.map((answer) => (
                            <div key={answer.id}>
                                <div className={"flex"}>
                                    <input
                                        type={(question.typeQuestion.id === 1 || question.typeQuestion.id === 2) ? 'radio' : 'checkbox'}
                                        name={`answers.${question.id}`}
                                        value={answer.id}
                                        checked={answers[question.id].includes(answer.id)}
                                        onChange={() =>
                                            (question.typeQuestion.id === 1 || question.typeQuestion.id === 2)
                                                ? handleRadioChange(question.id, answer.id)
                                                : handleCheckboxChange(question.id, answer.id)
                                        }
                                    />
                                    <span dangerouslySetInnerHTML={{__html: answer.content}}></span>
                                </div>
                            </div>
                        ))
                    ) : (
                        question.answers.map((answer) => (
                            <div key={answer.id}>
                                <div className={"flex"}>
                                    <input
                                        type="checkbox"
                                        name={`answers.${question.id}[${answer.id}]`}
                                        value={answer.id}
                                        checked={answers[question.id].includes(answer.id)}
                                        onChange={() => handleCheckboxChange(question.id, answer.id)}
                                    />
                                    <span dangerouslySetInnerHTML={{__html: answer.content}}></span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ))}
            <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} type="button" onClick={handleSubmit}>
                Nộp bài
            </button>
        </div>
    );
};

export default DoingQuiz;
