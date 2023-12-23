import * as React from 'react';
import {useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {findAllQuiz} from "../redux/service/QuizService";
import {useDispatch, useSelector} from "react-redux";
import Paper from "@mui/material/Paper";
import {Grade} from "@mui/icons-material";
import Grid from "@mui/material/Grid";

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
                <div>
                    <h3>{quizzes[category].categoryQuiz.description}</h3>
                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns: "repeat(auto-fit, 280px) !important", // Adjust width as needed
                            gridAutoColumns: "minmax(320px, 1fr)",
                            overflow: 'hidden',
                            padding: '10px'
                        }}
                    >
                        {filterByCategory(quizzes, category).map((quiz) => (
                            <ImageListItem key={quiz.id} width='160px' height="160px">
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden', // Hide scrollbar
                                    }}
                                    elevation={3}>
                                    <img
                                        srcSet={quiz.image}
                                        src={quiz.image}
                                        alt={quiz.title}
                                        loading="lazy"
                                        style={{objectFit: "fill", height: "100%", width: "100%", padding: 6}}
                                    />
                                    <ImageListItemBar
                                        title={quiz.categoryQuiz.description}
                                        subtitle={<span>by: {quiz.description}</span>}
                                        position="below"
                                    />
                                </Paper>

                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            ))}
        </div>
    );
}