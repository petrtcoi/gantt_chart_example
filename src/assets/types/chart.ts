import * as R from 'ramda'

/**  
* @example
*{
*  "project": "DMS 2.0",
*  "period": "02.09.2022-31.12.2022",
*  "chart": {WorkItem}
*}
*/
export type Project = {
  project: string
  period: string
  chart: WorkItem
}



/**
* @example
* {
*   "id": 1,
*   "title": "Marketing Launch",
*   "period_start": "2022-09-02",
*   "period_end": "2022-09-08",
*   "sub": //  WorkItem[]
*}
*/
export type WorkItem = {
  id: WorkId
  title: string
  period_start: string
  period_end: string
  sub?: WorkItem[]
}


export type WorkMeta = {
  parentNode: WorkId | null
  firstChildNode: WorkId | null
  nextNode: WorkId | null
  prevNode: WorkId | null

  status: WorkStatus
  level: WorkLevel
}




export type WorkId = number
export enum WorkStatus {
  Showing = 'showing',
  Hidden = 'hidden'
}
export type WorkLevel = number
export function nextLevel(level: WorkLevel) {
  return level + 1
}
/** Входит ли число в разрешенный диапазон номеров. Криво - просто пробую Ramda... */
// export function isCorrectLevel(level: number): level is WorkLevel {
//   return R.allPass([
//     (x: number) => x >= 1,
//     (x: number) => x <= 5,
//     (x: number) => Number.isInteger(x)
//   ])(level)
// }


// DTO

