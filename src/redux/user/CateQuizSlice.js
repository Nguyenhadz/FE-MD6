import {createSlice} from "@reduxjs/toolkit";
import {createCateQuiz, showAllCategoryQuiz} from "../../service/CateQuizService";

const initialState = {
    cateQuizzes: [],
    cateQuiz: {}

}

const CateQuizSlice = createSlice({
    name: 'cateQuiz',
    initialState,
    extraReducers: builder => {
        builder.addCase(createCateQuiz.fulfilled, (state, action)=>{
            state.cateQuizzes = action.payload
        })
        builder.addCase(showAllCategoryQuiz.fulfilled, (state, action) =>{
            state.cateQuizzes = action.payload
        })
    }
})
export default CateQuizSlice.reducer