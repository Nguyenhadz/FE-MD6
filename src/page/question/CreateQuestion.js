import CustomQuill from "../../react-quill/CustomQuill";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {createQuestion} from "../../service/QuestionService";

export default function CreateQuestion() {
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    // const [typeQ, setTypeQ] = useState(2)
    // useEffect()
    const dispatch = useDispatch();
    let createdQuestion = {};
    const categoryQuestions = [
        {
            id: 1,
            name: 'Toán',
            user: {
                id: 1
            }
        },
        {
            id: 2,
            name: 'Lý',
            user: {
                id: 1
            }
        },
        {
            id: 3,
            name: 'Hóa',
            user: {
                id: 1
            }
        },
        {
            id: 4,
            name: 'Sinh học',
            user: {
                id: 1
            }
        },
    ]
    const levelQuestions = [
        {
            id: 1,
            name: 'Dễ',
            user: {
                id: 1
            }
        },
        {
            id: 2,
            name: 'TB',
            user: {
                id: 1
            }
        },
        {
            id: 3,
            name: 'Khó',
            user: {
                id: 1
            }
        },
    ]
    const typeQuestions = [
        {
            id: 1,
            name: "Đúng sai"
        },
        {
            id: 2,
            name: "Một đáp án"
        },
        {
            id: 3,
            name: "Nhiều đáp án"
        }
    ]
    const formik = useFormik({
        initialValues: {
            question: {
                content: '',
                status: 1,
                categoryQuestion: {
                    id: 0,
                },
                levelQuestion: {
                    id: 0,
                },
                typeQuestion: {
                    id: 0,
                },
                user: {
                    id: currentUser.id,
                },
            },
            answer1: {
                content: '',
                status: 0,
            },
            answer2: {
                content: '',
                status: 0,
            },
            answer3: {
                content: '',
                status: 0,
            },
            answer4: {
                content: '',
                status: 0,
            },
        },
        onSubmit: (values) => {
            const {question, answer1, answer2, answer3, answer4} = values;
            console.log(answer1)
            console.log(answer2)
            console.log(answer3)
            console.log(answer4)
            dispatch(createQuestion({question : question})).then(
                // eslint-disable-next-line react-hooks/rules-of-hooks
                createdQuestion = useSelector((store) => {
                    return store.questionStore.createdQuestion
            })
                // dispatch();
            )
        },
    });
    const answerCount = formik.values.question.typeQuestion.id === 1 ? [1, 2] : [1, 2, 3, 4];
    const isCheckbox = formik.values.question.typeQuestion.id === 3;
    const isRatio = formik.values.question.typeQuestion.id === 1 || formik.values.question.typeQuestion.id === 2;

    return (
        <>
            <div className={"rounded-[20px] w-10/12 bg-purple-900 p-2 justify-center font-bold text-2xl"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"content-question w-full bg-amber-300"}>
                        <span>Câu hỏi:</span>
                        <CustomQuill field={{name: "question.content", value: formik.values.question.content}}
                                     form={formik}></CustomQuill>
                    </div>
                    <div className={"answer-question flex justify-center w-full mt-2 p-2"}>
                        {answerCount.map((index) => (
                            <div className={"w-1/4 m-2"} key={index}>
                                <label className={`answer w-full bg-blue-400 mt-2 p-2 justify-evenly`}>
                                    <span>{`Câu trả lời ${index}`}</span>
                                    {isCheckbox ? (
                                        <input
                                            type={"checkbox"}
                                            name={`answer${index}.status`}
                                            checked={formik.values[`answer${index}`].status === 1}
                                            onChange={(e) => formik.setFieldValue(`answer${index}.status`, e.target.checked ? 1 : 0)}
                                        />
                                    ) : (
                                        isRatio && (
                                            <input
                                                type={"radio"}
                                                name={"answer.status"}
                                                checked={formik.values[`answer${index}`].status === 1}
                                                onChange={() => formik.setFieldValue(`answer${index}.status`, 1)}
                                            />
                                        )
                                    )}
                                </label>
                                <CustomQuill field={{
                                    name: `answer${index}.content`,
                                    value: formik.values[`answer${index}`].content
                                }} form={formik}></CustomQuill>
                            </div>
                        ))}
                    </div>
                    <div className={"flex justify-around mt-2"}>
                        <select
                            name="question.categoryQuestion.id"
                            value={formik.values.question.categoryQuestion.id}
                            onChange={formik.handleChange}
                        >
                            {categoryQuestions.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <select
                            name="question.typeQuestion.id"
                            value={formik.values.question.typeQuestion.id}
                            onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('question.typeQuestion.id', parseInt(e.target.value));
                            }}
                        >
                            {typeQuestions.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                        <select
                            name="question.levelQuestion.id"
                            value={formik.values.question.levelQuestion.id}
                            onChange={formik.handleChange}
                        >
                            {levelQuestions.map((level) => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"flex justify-center"}>
                        <button type="submit" className={"bg-gray-50 mt-2 border-2"}>CREATE</button>
                    </div>
                </form>
            </div>
        </>
    );
}