import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { saveClientsDetails } from '../../services/clientsAPI';

export interface ClientObject {
    name: string,
    amount: Number,
    image: any
}

export interface ClientState {
    client: ClientObject | {}
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: ClientState = {
    client: {},
    status: 'idle',
};


export const saveClient = createAsyncThunk(
    'client/saveClient',
    async (data: any) => {

        const response = await saveClientsDetails(data);

        return response;
    }
);

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        rest: (state) => {
            state.status = 'idle'
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(saveClient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveClient.fulfilled, (state, action: any) => {
                state.status = 'success';
                state.client = action.payload;
            })
            .addCase(saveClient.rejected, (state) => {
                state.status = 'failed';
            });

    },
});

export const { rest } = clientSlice.actions;

export const clientDetails = (state: RootState) => state.client;

export default clientSlice.reducer;
