import { httpClient } from "./httpClient"

export async function apiGetWorks(): Promise<GetWorksDto> {
  const result = await httpClient.get<GetWorksDto>('/')
  if (result.status !== 200) throw new Error('Не удалось загрузить список')
  return result.data
}


/**  Данные с API запроса
* @example
*{
*  "project": "DMS 2.0",
*  "period": "02.09.2022-31.12.2022",
*  "chart": {WorkItem}
*}
*/
export type GetWorksDto = {
  project: string
  period: string
  chart: WorkItemDto
}


/** Формат,получаемый с API
* @example
* {
*   "id": 1,
*   "title": "Marketing Launch",
*   "period_start": "2022-09-02",
*   "period_end": "2022-09-08",
*   "sub": //  WorkItem[]
*}
*/
export type WorkItemDto = {
  id: number
  title: string
  period_start: string
  period_end: string
  sub?: WorkItemDto[]
}