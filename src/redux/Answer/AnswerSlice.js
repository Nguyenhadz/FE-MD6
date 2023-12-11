import {createSlice} from "@reduxjs/toolkit";
import {findAll, findAllAnswer} from "../../service/AnswerService";

const initialState = {
    answers: [],
    answer: {}

}

const answersSlice = createSlice({
    name: 'answerSlice',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAllAnswer.fulfilled, (state, action)=>{
            state.answers = action.payload
            console.log(action.payload)
        })
    }
})

export default answersSlice.reducer