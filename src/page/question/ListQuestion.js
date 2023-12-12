import * as React from 'react';
import {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {findAllAnswer} from "../../service/AnswerService";
import {findAll, findByContent, findById} from "../../service/QuestionService";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export default function ListQuestion() {
    const parser = new DOMParser();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const questions = useSelector((store) => {
        console.log(store.questionStore.questions)
        return store.questionStore.questions
    })
    const answers = useSelector((store) => {
        return store.answersStore.answers
    })
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            dispatch(findAll()); // Hiển thị lại danh sách câu hỏi ban đầu khi ô tìm kiếm trống
        } else {
            dispatch(findByContent(searchTerm));
        }
    };
    useEffect(() => {
        dispatch(findAll())
        dispatch(findAllAnswer())
    }, [dispatch])

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const getTotalQuestionCountBeforeCurrentPage = () => {
        if (currentPage === 1) {
            return 0;
        }
        return questionsPerPage * (currentPage - 1);
    };
    const goToNextPage = () => {
        if (currentPage < Math.ceil(questions.length / questionsPerPage)) {
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


    return (
        <div className={"w-75 justify-content-lg-end shadow-md from-blue-800"}>
            <form className="form-inline my-5 my-lg-0 ">
                <input className="form-control mr-sm-2 my-2" type="search" placeholder="Search" aria-label="Search"
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={handleSearch}>Tìm kiếm</button>
            </form>
            {currentQuestions.map((question, index) => {
                let letterIndex = 0; // Reset index for each question
                const questionNumber = getQuestionNumber(index);

                return (
                    <Accordion key={question.id}>
                        <AccordionSummary
                            className={"ql-color-red bg-blue-500"}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls={`panel${question.id}-content`}
                            id={`panel${question.id}-header`}
                        >
                            <Typography>
                                <h1 className={"font-sans font-bold hover:font-serif"}>Câu {questionNumber}: &nbsp;</h1>
                            </Typography>
                            <Typography>
                                <p className={"font-serif"}>{parser.parseFromString(question.content, 'text/html').body.firstChild.textContent}</p>
                            </Typography>
                            <Typography className={"mr-0"}>
                            <Button className={"btn btn-outline-warning mr-0"} onClick={async () => {
                                await dispatch(findById({id: question.id}))
                                navigate("/home/LayoutManagerQuestion/editQuestion/" + question.id)
                            }}>Sửa</Button>

                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {answers
                                .filter((answer) => answer.question.id === question.id)
                                .map((answer) => {
                                    const currentLetter = String.fromCharCode(65 + (letterIndex % 26));

                                    // Increment letter index for next iteration
                                    letterIndex++;

                                    return (
                                        <>
            <span className={"flex"}>
         <h3 className="font-serif">{currentLetter}.&nbsp;</h3>
         <p className="font-mono" key={answer.id} style={{color: answer.status === 1 ? 'red' : 'black'}}>
          {parser.parseFromString(answer.content, 'text/html').body.firstChild.textContent}
         </p>
                        </span>
                                        </>

                                    );
                                })}
                        </AccordionDetails>
                    </Accordion>
                );
            })}
            {/* Pagination */}
            <nav aria-label="Page navigation example" className={"flex w-10/12"}>
                <div>
                    <button onClick={goToPrevPage} disabled={currentPage === 1} className="page-link disabled">
                        Trang trước
                    </button>
                </div>
                <ul className="pagination justify-content-end">
                    {Array.from({length: Math.ceil(questions.length / questionsPerPage)}, (_, i) => i + 1).map((pageNumber) => (
                        <li key={pageNumber} className="page-item">
                            <button className="page-link" onClick={() => paginate(pageNumber)}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                </ul>
                {/* Nút điều hướng */}
                <div className="pagination-navigation">
                    <button onClick={goToNextPage}
                            disabled={currentPage === Math.ceil(questions.length / questionsPerPage)}
                            className="page-link">
                        Trang tiếp theo
                    </button>
                </div>
                <div className="pagination-navigation ml-auto">
                    <button className="page-link disabled">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Trang hiện
                        tại: &nbsp;{currentPage}</button>
                </div>
            </nav>
        </div>
    );
}