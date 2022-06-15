import { createSlice } from '@reduxjs/toolkit'
import {MenuBar,MenuBarProjectType,MenuBarLocation} from '../src/interface/menuBarList'

interface initialState {
  listMenuBarType: MenuBar[]
  listMenuBarProjectType: MenuBarProjectType[]
  listMenuLocation: MenuBarLocation[]
}
const initialState = {
	listMenuBarType:[],
	listMenuBarProjectType: [],
	listMenuLocation: []
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
	  getListMenuLocation: (state, action) => {
		state.listMenuLocation = action.payload
	  }
  }
})

export const { getListMenuBarType,getListMenuBarProjectType,getListMenuLocation } = menuBarSlice.actions

export default menuBarSlice.reducer