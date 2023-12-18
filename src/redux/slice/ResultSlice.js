import {createSlice} from "@reduxjs/toolkit";
import {createResult, findAllResult, findResultById} from "../service/ResultService";


const initialState = {
    results: [],
    result: {},
    currentResult: {}
}
const ResultSlice = createSlice({
    name: 'result',
    initialState,
    extraReducers: builder => {
        builder.addCase(createResult.fulfilled, (state, action) => {
            state.result = action.payload
        })
        builder.addCase(findAllResult.fulfilled, (state, action) => {
            state.results = action.payload
        })
        builder.addCase(findResultById.fulfilled, (state, action) => {
            state.currentResult = action.payload
        })
    }
})
export default ResultSlice.reducer