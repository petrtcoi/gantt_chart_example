import { createSlice } from "@reduxjs/toolkit"
import { Project, WorkId, WorkItem, WorkMeta } from "../../../types/worksState"
import { fetchAllWorks } from "./asyncThunks/fetchAllWorks"




export type WorksState = {
  project?: Project
  rootNodeId?: WorkId,
  rootDay?: string,
  fetched?: boolean,
  workbyId: { [keyId: string]: WorkItem },
  metaById: { [keyId: string]: WorkMeta },

}
const initialState: WorksState = {
  project: undefined,
  rootNodeId: undefined,
  rootDay: undefined,
  fetched: false,
  workbyId: {},
  metaById: {},
}


export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      state = { ...state, ...action.payload }
      return state
    })
  }

})


export default worksSlice.reducer
