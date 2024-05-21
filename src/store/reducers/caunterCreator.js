import {createAsyncThunk} from "@reduxjs/toolkit"

const fetchCounter = createAsyncThunk('counter/fetch',async(payload, thunkApi)=>{
    try {
        const {message} = thunkApi.getState().counter
        console.log(message);
        if (payload.count >= 10) return {count: 10, id: payload.id}
        return{ count: payload.count+1, id: payload.id} 
    } catch (error) {
        return thunkApi.rejectWithValue('Try again')
    }
})

export default fetchCounter