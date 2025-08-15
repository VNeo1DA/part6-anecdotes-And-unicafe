import { createSlice } from '@reduxjs/toolkit'
/*
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_FILTER':
      return action.payload
    default:
      return state
  }
}

//action creator function
export const filterChange = characters => {
  return {
    type: 'SEARCH_FILTER',
    payload: characters,
  }
}
*/
const initialState =''
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }

})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
//export default filterReducer