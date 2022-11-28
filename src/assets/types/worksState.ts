export type WorkId = number
export enum WorkStatus {
  Showing = 'showing',
  Hidden = 'hidden'
}
export type WorkLevel = number
export function nextLevel(level: WorkLevel) {
  return level + 1
}




export type Project = {
  title: string
  period: string
}



export type WorkItem = {
  id: WorkId
  title: string
  period_start: string
  period_end: string
}


export type WorkMeta = {
  parentNode?: WorkId 
  firstChildNode?: WorkId 
  nextNode?: WorkId 
  prevNode?: WorkId 

  status: WorkStatus
  level: WorkLevel
}






