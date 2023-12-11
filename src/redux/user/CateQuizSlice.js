import {createSlice} from "@reduxjs/toolkit";
import {showAllCategoryQuiz} from "../../service/CateQuizService";

const initialState = {
    categories: [],
}
const CateQuizSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: builder => {
        builder.addCase( showAllCategoryQuiz.fulfilled, (state, action) =>{
            state.categories = action.payload
        })
    }
})
export default CateQuizSlice.reducer