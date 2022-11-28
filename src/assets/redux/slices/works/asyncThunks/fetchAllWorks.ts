import { createAsyncThunk } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { WorksState } from '..'
import { apiGetWorks } from '../../../../api'
import { Project, WorkItem, WorkMeta, WorkId, WorkLevel, nextLevel, WorkStatus } from '../../../../types/chart'



export const fetchAllWorks = createAsyncThunk(
  'works/fetchAll',
  async () => {
    console.log('fetchAllWorks dispatched')
    return R.pipeWith(R.andThen, [
      apiGetWorks,
      validateData,
      extractWorks
    ])()
  }
)


function extractWorks(data: Project): Pick<WorksState, 'project' | 'workbyId'> {


  return {
    project: data,
    workbyId: getWork(data.chart, Object.create(null))
  }
}

function getWork(work: WorkItem, workById: WorksState['workbyId']): WorksState['workbyId'] {
  const { sub, ...workWithoutSub } = work
  return {
    [work.id]: workWithoutSub,
    ...workById,
    ...(sub || [])
      .reduce((acc: WorksState['workbyId'], work: WorkItem) => {
        return getWork(work, acc)
      }, Object.create(null))
  }

}


function validateData(data: Project) {
  // Добавить проверки ?
  return data
}


// function extractMeta(data: Project) {
//   const metaById: WorksState['metaById'] = Object.create(null)





// }
// type GetWorkMetaProps = {
//   metaById: WorksState['metaById'],
//   works: WorkItem,
//   workMeta: Pick<WorkMeta, 'parentNode' | 'prevNode'>

// }
// function getWorkMeta(props: GetWorkMetaProps): WorksState["metaById"] {

//   const workId = props.work.id
//   const metaById = { ...props.metaById }

//   const workMeta: WorkMeta = {
//     ...props.workMeta,
//     nextNode: null,
//     firstChildNode: null,
//     status: WorkStatus.Showing,
//     level: props.workMeta.parentNode
//       ? nextLevel(metaById[props.workMeta.parentNode].level)
//       : props.workMeta.prevNode
//         ? metaById[props.workMeta.prevNode].level
//         : 1,
//   }

//   if (workMeta.parentNode) metaById[workMeta.parentNode].firstChildNode = workId
//   if (workMeta.prevNode) metaById[workMeta.prevNode].nextNode = workId




// }



// export type WorkMeta = {
//   parentNode: WorkId | null
//   firstChildNode: WorkId | null
//   nextNode: WorkId | null
//   prevNode: WorkId | null

//   status: WorkStatus
//   level: WorkLevel
// }