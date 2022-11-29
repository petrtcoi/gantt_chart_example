import * as R from 'ramda'
import { WorksState } from '..'
import { WorkId } from '../../../../types/worksState'
import { RootState } from '../../../store'


const defEmptyArr = R.defaultTo([])
const defZero = R.defaultTo(0)

export const selectRootDate = (state: RootState) => state.works.rootDay
export const selectWork = (workId: WorkId) => (state: RootState) => state.works.workbyId[workId]
export const selecMeta = (workId: WorkId) => (state: RootState) => state.works.metaById[workId]




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
 * getWorkIdList
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