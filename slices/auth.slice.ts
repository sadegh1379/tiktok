import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type User = {
     userProfile: {
          _id: String
          userName: String
          image: String
     } | null
}

const initialState: User = {
     userProfile: null,
}

export const authSlice: any = createSlice({
     name: 'auth',
     initialState,
     reducers: {
          addUser: (state, action: PayloadAction<any>) => {
               state.userProfile = action.payload
          },
     },
})

// Action creators are generated for each case reducer function
export const { addUser } = authSlice.actions

export default authSlice.reducer