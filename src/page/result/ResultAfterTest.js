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

    const dynamicStyle = `
    @keyframes pulse {
      0%, 100% {
          background-color: inherit;
      }
      50% {
          background-color: #e5e7eb; /* Màu xám nhạt, thay đổi thành màu bạn muốn */
      }
    }
  `;

    return(
        <>
            ${result.totalScore >= quiz.passScore ? <div className={`ml-28 mt-16 h-4/5 w-10/12 border-8 p-5 flex border-orange-200 
             'bg-green-300 animate-pulse'`}>
            <div className={'-ml-24'}>
                <img    src={"https://firebasestorage.googleapis.com/v0/b/blog-bb78f.appspot.com/o/images%2Fpass.png?alt=media&token=f90b7255-42df-45a2-b826-4bab2160b0f6"}
                        alt="fault"
                        style={{objectFit: 'cover',
                            width: 500,
                            height: 500
                        }}
                /></div>
            <div className={"mt-14 font-sans text-center"}>
                <h1 className={'text-5xl font-bold mb-5'}>KẾT QUẢ BÀI THI</h1>
                <p className={'text-3xl mb-2'}>Tên bài thi: {quiz.title} </p>
                <p className={'text-3xl mb-2'}>Tên người thi: {user.name} </p>
                <p className={'text-3xl mb-2'}>Số câu trả lời đúng là: {result.numberTrue}</p>
                <p className={'text-3xl mb-2'}>Số câu trả lời sai là: {quiz.questions.length - result.numberTrue}</p>
                <p className={'text-3xl mb-2'}>Điểm của bạn là: {Math.floor(result.totalScore)}</p>
                <p className={"text-3xl text-red-700 mb-2"}>CHÚC MỪNG BẠN ĐÃ VƯỢT QUA BÀI THI</p>
            </div>
            <div className="overflow-hidden rounded-full w-32 h-32">
                <img
                    src={user.image}
                    alt="fault"
                    className="w-full h-full object-cover"
                />
            </div>
        </div> :
            <div className={`ml-28 mt-16 h-4/5 w-10/12 border-8 p-5 flex border-red-600`}>
                <div className={'-ml-8'}>
                    <img    src={"https://firebasestorage.googleapis.com/v0/b/blog-bb78f.appspot.com/o/images%2Ffailed_chuan.png?alt=media&token=7881d231-4e2d-49da-891e-1f0609e44e4d"}
                            alt="fault"
                            style={{objectFit: 'cover',
                                width: 500,
                                height: 500
                            }}
                    /></div>
                <div className={"mt-14 ml-10 font-sans text-center"}>
                    <h1 className={'text-5xl font-bold mb-5'}>KẾT QUẢ BÀI THI</h1>
                    <p className={'text-3xl mb-2'}>Tên bài thi: {quiz.title} </p>
                    <p className={'text-3xl mb-2'}>Tên người thi: {user.name} </p>
                    <p className={'text-3xl mb-2'}>Số câu trả lời đúng là: {result.numberTrue}</p>
                    <p className={'text-3xl mb-2'}>Số câu trả lời sai là: {quiz.questions.length - result.numberTrue}</p>
                    <p className={'text-3xl mb-2'}>Điểm của bạn là: {Math.floor(result.totalScore)}</p>
                    <p className={'text-3xl text-blue-700 mb-2'}>CHÚC BẠN MAY MẮN LẦN SAU</p>
                </div>
                <div className="overflow-hidden rounded-full ml-16 w-32 h-32">
                    <img
                        src={user.image}
                        alt="fault"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            }

        </>
    )
}