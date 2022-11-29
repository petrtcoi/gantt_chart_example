import { createAsyncThunk } from '@reduxjs/toolkit'
import * as R from 'ramda'

import { apiGetWorks } from '../../../../api'

import { WorksState } from '..'
import {  WorkItem, WorkStatus } from '../../../../types/worksState'
import { GetWorksDto, WorkItemDto } from '../../../../api/apiGetWorks'

type ApiData = { apiDto: GetWorksDto }
type WithProject = ApiData & Pick<WorksState, 'project'>
type WithRootNodeId = ApiData & Pick<WorksState, 'rootNodeId'>
type WithProjectWorks = WithRootNodeId & Pick<WorksState, 'workbyId'>
type WithProjectWorksMeta = WithProjectWorks & Pick<WorksState, 'metaById'>
type withError = { error?: string }

const defLevel1 = R.defaultTo(1)


export const fetchAllWorks = createAsyncThunk<Promise<WorksState & withError>>(
  'works/fetchAll',
  async () => {

    const apiData = await apiGetWorks()
    const getState = R.tryCatch(
      R.pipe(
        () => apiData,
        validateData,
        toApiData,
        getRootNodeId,
        getProjectData,
        getWorksById,
        getMetaById,
        setRootDay,
        setFetchedTrue
      ),
      handleError
    )
    return getState()
  }
)




/**
 * Написать  позже - должна быть валидация JOI или что-то подобное
 */
function validateData(data: GetWorksDto): GetWorksDto {
  return data
}

/**
 * Конвертирует ответ сервера в объект для дальнейшей работы
 */
function toApiData(data: GetWorksDto): ApiData {
  return { apiDto: data }
}

/**
 * Устанавливаем корневой WorkId
 */
function getRootNodeId(props: ApiData): WithRootNodeId {
  return {
    ...props,
    rootNodeId: props.apiDto.chart.id
  }
}

/**
 * Устанавливаем данные по проекту WorksState["project"]
 */
function getProjectData(props: WithRootNodeId): WithProject {
  return {
    ...props,
    project: {
      title: props.apiDto.project,
      period: props.apiDto.period
    }
  }
}


/**
 * Устанавливаем работы по проекту WorksState["worksById"]
 */
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



/**
 * Устанавливаем мета-данные по проекту WorksState["metaById"]
 */
function getMetaById(props: WithProjectWorks): WithProjectWorksMeta {
  const metaById = scanWorkForMeta(props.apiDto.chart, Object.create(null))
  return {
    ...props,
    metaById
  }
}
function scanWorkForMeta(workDto: WorkItemDto, metaById: WorksState['metaById']): WorksState['metaById'] {
  const { sub, id: workId } = workDto
  const updatedMeta = { ...metaById }

  if (!sub || sub.length === 0) return updatedMeta

  const workLevel = defLevel1(metaById[workId]?.level)
  const childLevel = workLevel + 1
  return sub.reduce((meta, child, index) => {
    return scanWorkForMeta(
      child,
      {
        ...meta,
        [child.id]: {
          ...updatedMeta[child.id],
          level: childLevel,
          parentNode: index === 0 ? workId : undefined,
          prevNode: sub[index - 1]?.id || undefined,
          nextNode: sub[index + 1]?.id || undefined
        }
      }
    )
  }, {
    ...updatedMeta,
    [workId]: { ...updatedMeta[workId], firstChildNode: sub[0].id, level: workLevel, status: WorkStatus.Expanded, upperNodeStatus: WorkStatus.Expanded },
    [sub[0].id]: { ...updatedMeta[sub[0].id], parentNode: workId, level: childLevel }
  })
}


/**
 *  Устанавливаем RootDay проекта (предполагаем, что раньше корневого задания другие не начинаются)
 */
function setRootDay(props: WithProjectWorksMeta) {
  return {
    ...props,
    rootDay: props.apiDto.chart.period_start
  }
}


/**
 * Устанавливаем значение Fetched = true
 */
function setFetchedTrue(props: WorksState) {
  return {
    ...props,
    fetched: true
  }
}





/** 
 * Ошибка - возвращаем пустой state и сообщение  об ошибке 
 * */
function handleError(err: any) {
  return {
    ...getEmptyState(),
    error: `fetchAllWorks: ${err}`
  }
}

function getEmptyState(): WorksState {
  return {
    fetched: true,
    workbyId: {},
    metaById: {}
  }
}
