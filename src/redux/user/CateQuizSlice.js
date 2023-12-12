import {createSlice} from "@reduxjs/toolkit";
import {createCateQuiz, deleteCateQuiz, showAllCategoryQuiz} from "../../service/CateQuizService";
import {toast} from "react-toastify";

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
            toast.success("Tạo Thành Công", {})
        })
        builder.addCase(createCateQuiz.rejected, (state, action)=>{
            toast.error("Tạo Thất Bại", {})
        })
        builder.addCase(showAllCategoryQuiz.fulfilled, (state, action) =>{
            state.cateQuizzes = action.payload
        })
        builder.addCase(deleteCateQuiz.fulfilled, (state, action) =>{
            state.cateQuizzes = action.payload
        })
    }
})
export default CateQuizSlice.reducer