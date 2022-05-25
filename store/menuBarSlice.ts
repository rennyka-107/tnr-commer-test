import { createSlice } from '@reduxjs/toolkit'
import {MenuBar,MenuBarProjectType} from '../src/interface/menuBarList'

interface initialState {
  listMenuBarType: MenuBar[]
  listMenuBarProjectType: MenuBarProjectType[]
}
const initialState = {
	listMenuBarType:[],
	listMenuBarProjectType: []
}

export const menuBarSlice = createSlice({
  name: 'menubar',
  initialState,
  reducers: {
	  getListMenuBarType: (state,action) => {
		state.listMenuBarType= action.payload
	  },
	  getListMenuBarProjectType: (state,action) => {
		state.listMenuBarProjectType= action.payload
	  },
  }
})

export const { getListMenuBarType,getListMenuBarProjectType } = menuBarSlice.actions

export default menuBarSlice.reducer