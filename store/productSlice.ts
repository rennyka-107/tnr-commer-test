import { createSlice } from '@reduxjs/toolkit'
import { PTGResponse } from 'interface/product'


interface initialState {
  productItem: PTGResponse[]

}
const initialState = {
	productItem:[],

}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
	  getProductPTG: (state,action) => {
		state.productItem= action.payload
	  },
  }
})

export const { getProductPTG } = productSlice.actions

export default productSlice.reducer