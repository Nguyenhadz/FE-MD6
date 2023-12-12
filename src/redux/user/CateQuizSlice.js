import {createSlice} from "@reduxjs/toolkit";
import {
    createCateQuiz,
    deleteCateQuiz,
    findCateQuizById,
    showAllCategoryQuiz,
    updateCateQuiz
} from "../../service/CateQuizService";
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
            toast.error("Trùng tên danh mục cũ", {})
        })
        builder.addCase(showAllCategoryQuiz.fulfilled, (state, action) =>{
            state.cateQuizzes = action.payload
        })
        builder.addCase(deleteCateQuiz.fulfilled, (state, action) =>{
            state.cateQuizzes = action.payload
        })
        builder.addCase(findCateQuizById.fulfilled, (state, action) =>{
            state.cateQuiz = action.payload
        })
        builder.addCase(updateCateQuiz.fulfilled, (state, action) =>{
            state.cateQuiz = action.payload
            toast.success("Cập nhật thành công!", {})
        })
        builder.addCase(updateCateQuiz.rejected, (state, action) =>{
            toast.error("Trùng tên danh mục cũ", {})
        })
    }
})
export default CateQuizSlice.reducer