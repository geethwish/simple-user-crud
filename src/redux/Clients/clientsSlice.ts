import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchClients } from '../../services/clientsAPI';

export interface ClientsState {
    clients: any
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: ClientsState = {
    clients: [],
    status: 'idle',
};


export const getClients = createAsyncThunk(
    'clients/getClients',
    async () => {

        console.log("here");

        const response = await fetchClients();

        return response;
    }
);


export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        rest: (state) => {
            state = initialState
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getClients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.status = 'success';
                state.clients = action.payload;
            })
            .addCase(getClients.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { rest } = clientsSlice.actions;


export const allClients = (state: RootState) => state.clients;


export default clientsSlice.reducer;
