import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { deleteClientRecord, fetchClients, updateClientRecord } from '../../services/clientsAPI';

export interface ClientsState {
    clients: any
    status: 'idle' | 'loading' | 'success' | 'failed' | 'deleted' | 'updated';
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

export const deleteClient = createAsyncThunk(
    'client/deleteClient',
    async (id: any) => {

        const response = deleteClientRecord(id);

        return response;
    }
);

export const updateClient = createAsyncThunk(
    'client/updateClient',
    async (client: any) => {

        const response = updateClientRecord(client);

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
        resetStatus: (state) => {
            state.status = 'idle'
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
            }).addCase(deleteClient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteClient.fulfilled, (state, action: any) => {
                state.status = 'deleted';
                state.clients = action.payload;
            })
            .addCase(deleteClient.rejected, (state) => {
                state.status = 'failed';
            }).addCase(updateClient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateClient.fulfilled, (state, action: any) => {
                state.status = 'updated';
                state.clients = action.payload;
            })
            .addCase(updateClient.rejected, (state) => {
                state.status = 'failed';
            });;
    },
});

export const { rest, resetStatus } = clientsSlice.actions;


export const allClients = (state: RootState) => state.clients;


export default clientsSlice.reducer;
