import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {useEffect, useState} from "react";
import {findAllQuiz} from "../redux/service/QuizService";
import {store} from "../redux/store/Store";
import {useDispatch, useSelector} from "react-redux";

export default function ListQuizCard() {
    const dispatch = useDispatch();
    const quizzes = useSelector(state => {
        return state.quizzes.quizzes;
    })
    useEffect(() => {
        dispatch(findAllQuiz());
    }, [])
    const categories = [...new Set(quizzes.map((quiz) => quiz.category))];
    const filterByCategory = (quizzes, category) => {
        return quizzes.filter((quiz) => quiz.category === category);
    };
    return (
        <ImageList
            sx={{
                gridAutoFlow: "column",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr)) !important",
                gridAutoColumns: "minmax(160px, 1fr)",
                scrollbarWidth: 100
            }}
        >
            {categories.map((category) => (
                <ImageListItem key={category}>
                    <h3>{category}</h3>
                    {filterByCategory(quizzes, category).map((quiz) => (
                        <div>
                            <img
                                srcSet={quiz.image}
                                src={quiz.image}
                                alt={quiz.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={quiz.title}
                                subtitle={<span>by: {quiz.description}</span>}
                                position="below"
                            />
                        </div>
                    ))}
                </ImageListItem>
            ))}

        </ImageList>
    );
}