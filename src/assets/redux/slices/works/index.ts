import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Project, WorkId, WorkItem, WorkMeta, WorkStatus } from "../../../types/worksState"
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
  reducers: {
    setStatus: (state, action: PayloadAction<{ workId: WorkId, status: WorkStatus }>) => {
      state.metaById[action.payload.workId].status = action.payload.status
    },
    setUpperNodeStatus: (state, action: PayloadAction<{ workId: WorkId, status: WorkStatus }>) => {
      state.metaById[action.payload.workId].upperNodeStatus = action.payload.status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      state = { ...state, ...action.payload }
      return state
    })
  }

})

export const { setStatus, setUpperNodeStatus } = worksSlice.actions
export default worksSlice.reducer
