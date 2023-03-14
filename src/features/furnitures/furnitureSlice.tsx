import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import produce from "immer"
import { RootState } from '../../app/store'
import { fetchFurnitures, createFurniture, destroyFurniture, updateFurniture } from './furnitureAPI';

export enum Statuses {
    Initial = "Not Fetched",
    Loading = "Loading",
    UpToDate = "Up To Date",
    Deleted = "Deleted",
    Error = "Error"
}

export interface FurnitureFormData {
    furniture: {
        id?: number;
        title?: string;
        body?: string;
        image?: string;
        price?: number;
        color?: string;
    }
}

export interface FurnitureState {
    id?: number;
    title?: string;
    body?: string;
    image?: string;
    price?: number;
    color?: string;
    created_at?: any;
    updated_at?: any;
}

export interface FurnituresState {
    furnitures: FurnitureState[];
    status: string;
    
}

export interface FurnitureUpdateData {
    furniture_id: number;
    furniture: FurnitureState;

}

export interface FurnitureDeleteData {
    furniture: {
        furniture_id: number;
    }
}


const initialState: FurnituresState = {
    furnitures: [
        {
            id: 0,
            title: "",
            body: "",
            image: "",
            price: 0,
            color: "",
            created_at: "",
            updated_at: "",

        }
    ],
    status: Statuses.Initial
}

export const fetchFurnituresAsync = createAsyncThunk(
    'furnitures/fetchFurnitures',
    async () => {
        const response = await fetchFurnitures();
        return response
    }
)

export const createFurnitureAsync = createAsyncThunk(
    'furnitures/createFurniture',
    async (payload: FurnitureFormData) => {
        const response = await createFurniture(payload);
        return response
    }
)
//update
export const updateFurnitureAsync = createAsyncThunk(
    'furnitures/updateFurniture',
    async (payload: FurnitureFormData) => {
        const response = await updateFurniture(payload);

        return response;
    }
)
export const destroyFurnitureAsync = createAsyncThunk(
    'furnitures/destroyFurniture',
    async (payload: FurnitureDeleteData) => {
        const response = await destroyFurniture(payload);

        return response;
    }
)

export const furnitureSlice = createSlice({
    name: "furnitures",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFurnituresAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(fetchFurnituresAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.furnitures = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            }).addCase(fetchFurnituresAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            // this is for update
            .addCase(createFurnitureAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(createFurnitureAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.furnitures.push(action.payload)
                    draftState.status = Statuses.UpToDate;
                })
            }).addCase(createFurnitureAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            /** Destroy Section */
            .addCase(destroyFurnitureAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(destroyFurnitureAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.furnitures = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(destroyFurnitureAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            /** Update Section */
            .addCase(updateFurnitureAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(updateFurnitureAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    const index = draftState.furnitures.findIndex(
                        furniture => furniture.id === action.payload.id
                    );
                    draftState.furnitures[index] = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(updateFurnitureAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })

    }


})

export const { } = furnitureSlice.actions;

export const selectFurnitures = (state: RootState) => state.furnitures.furnitures;
export const selectStatus = (state: RootState) => state.furnitures.status;

export default furnitureSlice.reducer;