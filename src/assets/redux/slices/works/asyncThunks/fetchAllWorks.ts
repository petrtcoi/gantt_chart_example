import { createAsyncThunk } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { WorksState } from '..'
import { apiGetWorks } from '../../../../api'
import { Project, WorkItem, WorkMeta, WorkId, WorkLevel, nextLevel, WorkStatus } from '../../../../types/worksState'
import { GetWorksDto, WorkItemDto } from '../../../../api/apiGetWorks'

type ApiData = { apiDto: GetWorksDto }
type WithProject = ApiData & Pick<WorksState, 'project'>
type WithProjectWorks = WithProject & Pick<WorksState, 'workbyId'>
type WithProjectWorksMeta = WithProjectWorks & Pick<WorksState, 'metaById'>




export const fetchAllWorks = createAsyncThunk<Promise<WithProjectWorks>>(
  'works/fetchAll',
  async () => {
    return R.pipeWith(R.andThen, [
      apiGetWorks,
      validateData,
      toApiData,
      addProject,
      getWorksById
    ])()
  }
)



function validateData(data: GetWorksDto): GetWorksDto {
  return data
}

function toApiData(data: GetWorksDto): ApiData {
  return { apiDto: data }
}

function addProject(props: ApiData): WithProject {
  return {
    apiDto: props.apiDto,
    project: {
      title: props.apiDto.project,
      period: props.apiDto.period
    }
  }
}

/** Получает объект workById */
function getWorksById(props: WithProject): WithProjectWorks {
  const { chart } = props.apiDto
  return {
    ...props,
    workbyId: getWork(chart, Object.create(null))
  }
}
function getWork(workDto: WorkItemDto, workById: WorksState['workbyId']): WorksState['workbyId'] {
  const { sub, ...rest } = workDto
  const workItem: WorkItem = rest
  return {
    [workDto.id]: workItem,
    ...workById,
    ...(sub || [])
      .reduce((acc: WorksState['workbyId'], workDto: WorkItem) => {
        return getWork(workDto, acc)
      }, Object.create(null))
  }
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


