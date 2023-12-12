import {createSlice} from "@reduxjs/toolkit";
import {createQuestion, findAll, findByContent, findById} from "../../service/QuestionService";
import {toast} from "react-toastify";


const initialState = {
    questions: [],
    question: {},
    createdQuestion: {}

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
            state.createdQuestion = action.payload
        })
        builder.addCase(findByContent.fulfilled, (state, action)=>{
            console.log(state)
            state.questions = action.payload
        })
    }
})

export default questionSlide.reducer