import {createSlice} from "@reduxjs/toolkit";
import {findResultByQuiz} from "../service/ResultService";


const initialState = {
    results: [],
    result: {}
}
const ResultSlice = createSlice({
    name: 'quiz',
    initialState,
    extraReducers: builder => {
        builder.addCase(findResultByQuiz.fulfilled, (state, action) => {
            state.results = action.payload
        })
        builder.addCase(findResultByQuiz.rejected, (state, action) => {
            state.results = action.payload
        })
    }
})
export default ResultSlice.reducer