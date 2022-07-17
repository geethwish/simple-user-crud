import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import clientsReducer from '../redux/Clients/clientsSlice';
import clientReducer from '../redux/Clients/clientSlice'
export const store = configureStore({
    reducer: {
        clients: clientsReducer,
        client: clientReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
