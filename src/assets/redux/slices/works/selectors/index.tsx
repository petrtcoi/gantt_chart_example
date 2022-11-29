import * as R from 'ramda'
import { WorksState } from '..'
import { WorkId, WorkStatus } from '../../../../types/worksState'
import { RootState } from '../../../store'


const defEmptyArr = R.defaultTo([])
const defZero = R.defaultTo(0)


// получает rootDate проекта
export const selectRootDate = (state: RootState) => state.works.rootDay
// данные о работе (work)
export const selectWork = (workId: WorkId) => (state: RootState) => state.works.workbyId[workId]
//  мета-данные работы 
export const selectMeta = (workId: WorkId) => (state: RootState) => state.works.metaById[workId]
//  controlledUppedNode Status
export const selectUpperNodeStatus = (workId: WorkId) => (state: RootState) => state.works.metaById[workId].upperNodeStatus

export const selectProjectRootDay = (state: RootState) => state.works.rootDay

export const selectMetaLevel = (workId: WorkId) => (state: RootState) => state.works.metaById[workId].level


/**
 * Проверяет "upperNodeStatus" у Node, расположенных выше
 * Если это sibling (prevNode), то просто берем его upperNodeStatus
 * Есди это родитель (parentNode), 
 *        (upperNodeStatus OR status) === Collapsed  -> Collapsed
 *        (в противном случае) -> Expanded
 * На всякий случай по-умолчанию вернет Collapsed
 */
export const selectSupervisorNodeUpperNodeStatus = (workId: WorkId) => (state: RootState) => {
  const parentNode = state.works.metaById[workId].parentNode
  const prevNode = state.works.metaById[workId].prevNode

  if (prevNode) return state.works.metaById[prevNode].upperNodeStatus

  if (parentNode) {
    const parentMeta = state.works.metaById[parentNode]
    return (
      (parentMeta.status === WorkStatus.Collapsed || parentMeta.upperNodeStatus === WorkStatus.Collapsed)
        ? WorkStatus.Collapsed
        : WorkStatus.Expanded
    )
  }

  return WorkStatus.Collapsed
}




/**
 * getChildQnty
 */
export const getChildQnty = (workId: WorkId) => (state: RootState) => {

  return calcChildQnty(workId, 0)

  function calcChildQnty(workId: WorkId, qnty: number): number {
    const workMeta = state.works.metaById[workId]
    if (!workMeta) return defZero(qnty)
    const nextNode = qnty === 0 ? workMeta.firstChildNode : workMeta.nextNode
    if (!nextNode) return defZero(qnty)

    return calcChildQnty(nextNode, qnty + 1)
  }
}


/**
 * Получаем список ID работ, развернутый в порядка: сначала дети (child), потом siblings (nextNode)
 * Возвращаем пустой массив, если почему-то нет rootNodeId
 */
export const getWorkIdList = (state: RootState) => {
  return (
    R.ifElse(
      () => R.isNil(state.works.rootNodeId),
      R.always([]),
      R.always(getListOfIds(state))
    )()
  )
}


const getListOfIds = (state: RootState) => getIdsList(state.works.metaById, state.works.rootNodeId)
function getIdsList(metaById: WorksState['metaById'], workId?: WorkId) {

  return workId ? addWork(workId) : []

  function addWork(workId: WorkId, list?: WorkId[]): WorkId[] {
    const meta = metaById[workId]

    if (!meta) return defEmptyArr(list)

    const nextNode = meta.firstChildNode || meta.nextNode || undefined
    if (!nextNode) return ([...defEmptyArr(list), workId])

    return addWork(nextNode, [...defEmptyArr(list), workId])
  }

}