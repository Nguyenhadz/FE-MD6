import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {findQuizById} from "../redux/service/QuizService";

const DetailQuizByCategory = ({quiz, handleClose}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const second = quiz.time % 60;
    const minute = Math.floor(quiz.time / 60);


    return (
        <div className={'text-xl mt-10 flex flex-col justify-center'}>
            <div className={"ml-7"}>
                <div className={'flex justify-between'}>
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <b>Tên bài thi: &nbsp;
                                    <span dangerouslySetInnerHTML={{__html: quiz.title}}></span>
                                </b>
                            </div>
                        </div>
                        <div className={"mb-3"}><span className={'font-bold'}> Mô tả: &nbsp;</span> <span dangerouslySetInnerHTML={{__html: quiz.description}}></span>
                        </div>
                        <div className={"mb-3"}><span className={'font-bold'}> Người tạo: &nbsp;</span> {quiz.user?.name}</div>
                        <div className={"mb-3"}><span className={'font-bold'}> Số lượng câu hỏi: &nbsp;</span> {quiz.questions?.length}</div>

                        <div className={"mb-3"}><span className={'font-bold'}> Mức độ: &nbsp;</span> {quiz.levelQuiz?.name}</div>
                        <div className={"mb-3"}><span className={'font-bold'}> Điểm đạt: &nbsp;</span> {quiz.passScore}</div>
                        <div className={"mb-3"}><span className={'font-bold'}> Thời gian thi: &nbsp;</span> {minute} &nbsp;phút, {second} &nbsp;giây</div>

                    </div>
                    <div className={'mr-10'}>
                        <img src={quiz.image} alt={"fault"} style={{ width: '400px', height: '300px' }}/>
                        <div className={"flex mt-3 border-solid border-2 rounded border-orange-200"}><span className={'font-bold ml-3'}> Thể loại: &nbsp;</span> <span
                            dangerouslySetInnerHTML={{__html: quiz.categoryQuiz?.name}}></span></div>
                    </div>
                </div>
            </div>
            <div className="ml-96">
                <div className="font-bold text-xl">
                    <button type="submit"
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10  mx-auto "}
                            onClick={async () => {
                                await dispatch(findQuizById(quiz.id))
                                await navigate("/home/doingQuiz/" + quiz.id)
                            }}
                    >
                        Làm bài thi
                    </button>
                    <button type="submit"
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10  mx-auto "}
                            onClick={ () => {
                              handleClose();
                            }}
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>

    );
};
export default DetailQuizByCategory;
