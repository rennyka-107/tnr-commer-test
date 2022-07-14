import { createSlice } from "@reduxjs/toolkit";
import { SpecialOfferI } from "interface/SpecialOffers";

interface initialState {
  SearchSpecialOffer: SpecialOfferI[];
  SearchAllSpecialOffer: SpecialOfferI[];
  SearchSpecialOfferById: SpecialOfferI;
  totalElement: number;
}
const initialState: initialState = {
  SearchSpecialOffer: [],
  SearchAllSpecialOffer: [],
  SearchSpecialOfferById: {
    id: "",
    name: "",
    status: 0,
    description: "",
    avatar: "",
    startDate: "",
    endDate: "",
    video: "",
  },
  totalElement: 0,
};

export const SpecialOffersSlice = createSlice({
  name: "specialoffer",
  initialState,
  reducers: {
    getSearchSpecialOffers: (state, action) => {
      state.SearchSpecialOffer = action.payload;
    },
    getAllSearchSpecialOffers: (state, action) => {
      state.SearchAllSpecialOffer = action.payload;
    },
    getSpecialOfferById: (state, action) => {
		state.SearchSpecialOfferById = action.payload;
	},
    getPaggingSearch: (state, action) => {
      state.totalElement = action.payload;
    },
  },
});

export const {
  getSearchSpecialOffers,
  getPaggingSearch,
  getAllSearchSpecialOffers,
  getSpecialOfferById
} = SpecialOffersSlice.actions;

export default SpecialOffersSlice.reducer;
