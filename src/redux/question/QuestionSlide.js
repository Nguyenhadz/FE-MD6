import {createSlice} from "@reduxjs/toolkit";
import {createQuestion, findAll, findById} from "../../service/QuestionService";
import {toast} from "react-toastify";


const initialState = {
    questions: [],
    question: {}

}

const questionSlide = createSlice({
    name: 'questionSlide',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAll.fulfilled, (state, action)=>{
            state.questions = action.payload
        })
        builder.addCase(findById.fulfilled, (state, action)=>{
            state.question = action.payload
        })
        builder.addCase(createQuestion.fulfilled, (state, action)=>{
            toast.success("Tạo câu hỏi mới thành công!", {})
        })
        builder.addCase(createQuestion.rejected, (state, action)=>{
            toast.error("Tạo câu hỏi mới thất bại!", {})
        })
    }
})

export default questionSlide.reducer