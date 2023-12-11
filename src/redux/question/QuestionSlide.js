import {createSlice} from "@reduxjs/toolkit";
import {findAll, findById} from "../../service/QuestionService";


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
    }
})

export default questionSlide.reducer