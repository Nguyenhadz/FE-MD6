import {useSelector} from "react-redux";

export default function ResultAfterTest() {
    const result = useSelector((store) => {
        return store.resultStore.result
    })
    const quiz = useSelector((store) => {
        return store.quizzes.quiz
    })
    const user =  useSelector((store) => {
        return store.users.currentUser
    })
    return(
        <>
            <div className={"m-auto w-10/12 h-4/5 border-8 bg-amber-100 p-5 justify-center flex"}>
                <div className={"text-3xl"}>
                    <h1>KẾT QUẢ BÀI THI</h1>
                    <p>Tên người thi: {user.name} </p>
                    <p>Số câu trả lời đúng là: {result.numberTrue}</p>
                    <p>Số câu trả lời sai là: {quiz.questions.length - result.numberTrue}</p>
                    <p>Điểm của bạn là: {Math.floor(result.totalScore)}</p>
                    {(result.totalScore >= quiz.passScore) ? (<p className={"text-blue-700"}>CHÚC MỪNG BẠN ĐÃ VƯỢT QUA BÀI THI</p>) : (
                        <p className={"text-red-700"}>CHÚC BẠN MAY MẮN LẦN SAU</p>)}
                </div>
            </div>
        </>
    )
}