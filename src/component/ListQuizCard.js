import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {useEffect} from "react";
import {findAllQuiz} from "../redux/service/QuizService";
import {useDispatch, useSelector} from "react-redux";
const sharp = require('sharp');
const resizeImage = async (image, width, height) => {
    const resizedImage = await sharp(image)
        .resize(width, height)
        .toBuffer();
    return resizedImage;
};
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
                    {filterByCategory(quizzes, category).map(async (quiz) => (
                        <ImageListItem key={quiz.id}>
                            <img
                                srcSet={await resizeImage(quiz.image, 160, 120)}
                                src={await resizeImage(quiz.image, 160, 120)}
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