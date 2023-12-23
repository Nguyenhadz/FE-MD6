import * as React from 'react';
import {useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {findAllQuiz} from "../redux/service/QuizService";
import {useDispatch, useSelector} from "react-redux";

export default function ListQuizCard() {
    const dispatch = useDispatch();
    const quizzes = useSelector(state => {
        return state.quizzes.quizzes;
    })
    useEffect(() => {
        dispatch(findAllQuiz());
    }, [dispatch])

    const categories = [...new Set(quizzes.map((quiz) => quiz.categoryQuiz.id))];
    const filterByCategory = (quizzes, category) => {
        return quizzes.filter((quiz) => quiz.categoryQuiz.id === category);
    };

    return (
        <div>
            {categories.map((category) => (
                <ImageList
                    sx={{
                        gridAutoFlow: "column",
                        gridTemplateColumns: "repeat(auto-fit, 140px) !important", // Adjust width as needed
                        gridAutoColumns: "minmax(160px, 1fr)",
                    }}
                    height="160"
                >
                    <h3>{quizzes[category].categoryQuiz.description}</h3>
                    {filterByCategory(quizzes, category).map( (quiz) => (
                        <ImageListItem key={quiz.id}>
                            <img
                                srcSet={quiz.image}
                                src={quiz.image}
                                alt={quiz.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={quiz.categoryQuiz.description}
                                subtitle={<span>by: {quiz.description}</span>}
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ))}
        </div>
    );
}