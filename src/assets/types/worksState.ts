export type WorkId = number
export enum WorkStatus {
  Expanded = 'expanded',
  Collapsed = 'collapsed'
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
  upperNodeStatus: WorkStatus
  level: WorkLevel
}






