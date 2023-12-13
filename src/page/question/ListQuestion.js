import * as React from 'react';
import {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {deleteAnswersByQuestionId, findAllAnswer, findAnswersByQuestionId} from "../../service/AnswerService";
import {deleteQuestions, findAll, findByContent, findById} from "../../service/QuestionService";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export default function ListQuestion() {
    useEffect(() => {
        dispatch(findAll())
        dispatch(findAllAnswer())
    }, [])

    const parser = new DOMParser();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const user = useSelector((store) => {
        return store.users.currentUser
    })

    const questions = useSelector((store) => {
        return store.questionStore.questions
    });

    const answers = useSelector((store) => {
        return store.answersStore.answers
    })

    const currentUserQuestions = questions
        ? Object.values(questions).filter(
            (question) => question.user?.id === user?.id
        )
        : [];

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            dispatch(findAll());
        } else {
            dispatch(findByContent(searchTerm));
        }
    };

    const filteredQuestions = Array.from(searchTerm
        ? currentUserQuestions.filter((question, index) =>
            question.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : currentUserQuestions);

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const totalQuestions = filteredQuestions.length;
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const getTotalQuestionCountBeforeCurrentPage = () => {
        if (currentPage === 1) {
            return 0;
        }
        return questionsPerPage * (currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < Math.ceil(currentUserQuestions.length / questionsPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const getQuestionNumber = (index) => {
        return getTotalQuestionCountBeforeCurrentPage() + index + 1;
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return currentQuestions && (
        <div className={"w-11/12 mt-0 justify-content-lg-end shadow-md from-blue-800"}
             style={{marginTop: "0 !important"}}>
            <form className="form-inline my-5 my-lg-0 ">
                <input className="form-control mr-sm-2 my-2" type="search" placeholder="Search" aria-label="Search"
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <Button className="btn btn-info bg-indigo-500 my-2 my-sm-0 " type="submit" onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </form>
            {currentQuestions.map((question, index) => {
                if (question.user.id !== user.id) {
                    return null;
                }
                let letterIndex = 0;
                const questionNumber = getQuestionNumber(index);
                return (
                    <Accordion className={"bg-emerald-300"} key={question.id}>
                        <AccordionSummary
                            className={"bg-green-300"}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls={`panel${question.id}-content`}
                            id={`panel${question.id}-header`}>
                            <div className={"flex justify-content-lg-start rounded w-full h-full"}>
                                <div>
                                    <Typography>
                                        <h1 className={"font-sans font-bold hover:font-serif"}>Câu {questionNumber}: &nbsp;</h1>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography>
                                        <p className={"font-serif"}>{parser.parseFromString(question.content, 'text/html').body.firstChild?.textContent}</p>
                                    </Typography>
                                </div>
                            </div>
                        </AccordionSummary>
                            <AccordionDetails className={"bg-neutral-200"}>
                                {answers
                                    .filter((answer, index) => answer.question?.id === question?.id)
                                    .map((answer, index) => {
                                        const currentLetter = String.fromCharCode(65 + (letterIndex % 26));
                                        letterIndex++;
                                        return (
                                            <>
                                                <span className={"flex"}>
                                                <h3 className="font-serif">{currentLetter}.&nbsp;</h3>
                                                <p className="font-mono" key={answer?.id}
                                                   style={{color: answer?.status === 1 ? 'red' : 'black'}}>
                                                    {parser.parseFromString(answer?.content, 'text/html').body.firstChild?.textContent}
                                                </p>
                                            </span>
                                            </>
                                        );
                                    })}
                                <div className={"flex justify-center"}>
                                    <Typography className={"mr-0"}>
                                        {question &&
                                            <Button className={"btn btn-outline-warning bg-amber-100 "}
                                                    onClick={async () => {
                                                        await dispatch(findById({id: question.id}))
                                                        await dispatch(findAnswersByQuestionId({id: question.id}))
                                                        navigate("/home/LayoutManagerQuestion/editQuestion/" + question.id)
                                                    }}>
                                                Sửa
                                            </Button>
                                        }
                                    </Typography>
                                    <Typography className={"mr-0"}>
                                        {question &&
                                            <Button className={"btn btn-outline-warning bg-amber-100 "}
                                                    onClick={async () => {
                                                        await dispatch(deleteAnswersByQuestionId(question.id))
                                                        await dispatch(deleteQuestions(question.id))
                                                    }}>Xóa
                                            </Button>}
                                    </Typography>
                                </div>
                            </AccordionDetails>
                    </Accordion>
                );
            })}
            <nav aria-label="Page navigation example" className={"flex w-10/12"}>
                <div>
                    <button onClick={goToPrevPage} disabled={currentPage === 1}
                            className="page-link disabled bg-green-300 rounded">
                        Trước
                    </button>
                </div>
                <ul className="pagination justify-content-end">
                    {Array.from({length: Math.ceil(totalQuestions / questionsPerPage)}, (_, i) => i + 1).map((pageNumber, index) => (
                        <li key={pageNumber} className="page-item bg-green-300 rounded">
                            <button className="page-link bg-green-300 rounded" onClick={() => paginate(pageNumber)}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="pagination-navigation">
                    <button onClick={goToNextPage}
                            disabled={currentPage === Math.ceil(currentUserQuestions.length / questionsPerPage)}
                            className="page-link bg-green-300 rounded">
                        Sau
                    </button>
                </div>
                <div className="pagination-navigation">
                    <button className="page-link disabled bg-green-300 rounded">Trang hiện
                        tại: &nbsp;{currentPage}</button>
                </div>
            </nav>
        </div>
    );
}