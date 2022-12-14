import dayjs from 'dayjs'
import * as R from 'ramda'
// import { AppDate } from '../types/appDate'


export function getDateFromString(dateString?: string) {
  const date =  dayjs(dateString)
  return R.isNil(date) ? null : date 
}


/**
 * Добавляет weeksN число дней (по-умолчанию = 7)
 * @example
 * ```typescript
 * const date = dayjs('01-01-2000')
 * addDaysN(date, 14) => '15 Jan 2000'
 * addDaysN(date) => '08 Jan 2000'
 * ```
 */
export function addDaysN(date: dayjs.Dayjs , daysN: number = 1): dayjs.Dayjs  {
  return dayjs(date).add(daysN, 'day')
}

/**
 * Добавляет weeksN число дней (по-умолчанию = 7)
 * @example
 * ```typescript
 * const date = dayjs('01-01-2000')
 * addWeeksN(date, 2) => '15 Jan 2000'
 * addWeeksN(date) => '08 Jan 2000'
 * ```
 */
export function addWeeksN(date: dayjs.Dayjs , weeksN: number = 1): dayjs.Dayjs  {
  return dayjs(date).add(7 * weeksN, 'day')
}


/**
 * Переводит в строку для вывода в приложении в формате 'DD MMM'
 * @example
 * ```typescript
 * getDDMMMString(someDate: AppDate) => '01 Jan'
 * ```
 */
export function getDDMMMString(date: dayjs.Dayjs ): string {
  return dayjs(date).format(`DD MMM`)
}

/**
 * Готовит строку для вывода недели, основываясь на дне - понедельника, например '01 Jan - 07 Jan'
 * @example
 * ```typescript
 * getDDMMMString(someDate: AppDate) => '22 Sep - 28 Sep'
 * ```
 */
export function getWeekString(monday: dayjs.Dayjs ): string {
  const sunday = addDaysN(monday, 6)
  return `${getDDMMMString(monday)} - ${getDDMMMString(sunday)}`
}


/**
 * Выводит список дней (с пн. по вск.) - их даты - массив номеров
 * @example
 * ```typescript
 * monday = 29 Sep
 * getWeekDays(monday: AppDate) => [29, 30, 1, 2, 3, 4, 5]
 * ```
 */
export function getWeekDays(monday: dayjs.Dayjs ): number[] {
  const mondayDate = dayjs(monday).get('date')
  return [...Array(6).keys()].reduce((arr, index) => {
    return [...arr, dayjs(addDaysN(monday, index + 1)).get('date')]
  }, [ mondayDate])
}


/**
 * Разница в днях между двумя датами
 */
export function daysDiff(start:dayjs.Dayjs , end: dayjs.Dayjs ): number {
  return end.diff(start, 'days')
}