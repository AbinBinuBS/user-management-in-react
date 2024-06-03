import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVerifiedUser: false,
  accessToken: '',
  refreshToken: '',
};

const initialAdminTokenState = {
  isVerifiedAdmin: false,
  adminAccessToken: '',
  adminRefreshToken: '',
};

const InitialState = {
  email:''
}

const initialUserDataState = {};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.isVerifiedUser = action.payload.isVerifiedUser;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    removeItems: (state, action) => {
      state.isVerifiedUser = action.payload.isVerifiedUser;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

const adminTokenSlice = createSlice({
  name: 'adminToken',
  initialState: initialAdminTokenState,
  reducers: {
    addAdminItems: (state, action) => {
      state.isVerifiedAdmin = action.payload.isVerifiedAdmin;
      state.adminAccessToken = action.payload.adminAccessToken;
      state.adminRefreshToken = action.payload.adminRefreshToken;
    },
    removeAdminItems: (state) => {
      state.isVerifiedAdmin = false;
      state.adminAccessToken = '';
      state.adminRefreshToken = '';
    },
    resetAdmin: (state) => {
      Object.assign(state, initialAdminTokenState);
    },
  },
});

const userDataSlice = createSlice({
  name: 'userData',
  initialState: initialUserDataState,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
    resetUserData: () => {
      return initialUserDataState;
    },
  },
});

const emilReducer = createSlice({
  name:'email',
  initialState:InitialState,
  reducers:{
    addEmail(state,action){
      state.email = action.payload
    }
  }
})

export const {addEmail} = emilReducer.actions;

export const { setUserData, resetUserData } = userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;
export const { addItems, removeItems, reset } = tokenSlice.actions;
export const { addAdminItems, removeAdminItems, resetAdmin } = adminTokenSlice.actions;
export const userTokenReducer = tokenSlice.reducer;
export const adminTokenReducer = adminTokenSlice.reducer;
export const emailReducer =  emilReducer.reducer
