import { Project } from '../types/chart'
import { httpClient } from "./httpClient"

export async function apiGetWorks(): Promise<Project> {
  const result = await httpClient.get<Project>('/')
  if (result.status !== 200) throw new Error('Не удалось загрузить список')
  return result.data
}
