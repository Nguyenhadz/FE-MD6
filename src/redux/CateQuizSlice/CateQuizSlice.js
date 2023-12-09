import {createSlice} from "@reduxjs/toolkit";
import {createCateQuiz} from "../../service/CateQuizService";

const initialState = {
    cateQuizzes: [],
    cateQuiz: {}

}

const cateQuizSlice = createSlice({
    name: 'cateQuiz',
    initialState,
    extraReducers: builder => {
        builder.addCase(createCateQuiz.fulfilled, (state, action)=>{
            state.cateQuizzes = action.payload
        })
    }
})

export default cateQuizSlice.reducer