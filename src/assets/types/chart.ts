
/**  
"project": "DMS 2.0",
"period": "02.09.2022-31.12.2022",
"chart": {}
*/
export type Project = {
  project: string
  period: string
  chart: WorkItem
}

/**
"id": 1,
"title": "Marketing Launch",
"period_start": "2022-09-02",
"period_end": "2022-09-08",
"sub":
 */
export type WorkItem = {
  id: number
  title: string
  period_start: string
  period_end: string
  sub: WorkItem[]
}

