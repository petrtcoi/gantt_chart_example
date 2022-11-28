import { createSlice } from "@reduxjs/toolkit"
import { Project, WorkId, WorkItem, WorkMeta } from "../../../types/chart"
import { fetchAllWorks } from "./asyncThunks/fetchAllWorks"




export type WorksState = {
  project: Project | null
  rootNodeId: WorkId | null,
  fetched: boolean,
  workbyId: { [keyId: string]: Omit<WorkItem, 'sub'> },
  metaById: { [keyId: string]: WorkMeta },

}
const initialState: WorksState = {
  project: null,
  rootNodeId: null,
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
      // state = { ...state, ...action.payload }
      console.log(action.payload)
    })
  }

})


export default worksSlice.reducer
