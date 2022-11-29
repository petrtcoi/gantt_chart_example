import React from 'react'
import * as R from 'ramda'

import { getWeekString, addWeeksN, getWeekDays, getDateFromString } from './../../../../assets/utils/date'
// import { AppDate } from './../../../../assets/types/appDate'
import { WEEKS_LIST } from './../utils/weeksQnty'
import { useAppSelector } from './../../../../assets/redux/hooks'
import { selectRootDate } from './../../../../assets/redux/slices/works/selectors'
import { AppDate } from '../../../../assets/types/appDate'



type TableHeaderProps = {}


const TableHeader: React.FC<TableHeaderProps> = (_props) => {

  const rootDay = useAppSelector(selectRootDate)
  const rootDayDate = getDateFromString(rootDay)
  if (!rootDayDate) return null

  const getMonday = (weeksQnty: number) => addWeeksN(rootDayDate, weeksQnty)
  const mondays = WEEKS_LIST.map(x => getMonday(x))

  return (
    <thead className={ 'table_header' }>
      <tr>
        <th rowSpan={ 2 } className={ 'title_cell' }>Work Item</th>
        { mondays.map((monday, index) => <WeekTitle monday={ monday } key={ index } />) }
      </tr>
      <tr className={ 'days_header' }>
        { WEEKS_LIST.map(weekIndex => {
          const weekMonday = addWeeksN(rootDayDate, weekIndex)
          return getWeekDays(weekMonday).map((day, index) => {
            return (
              <th className="week__day" data-dayindex={ index % 7 } key={ index }>{ day }</th>
            )
          })
        }) }

      </tr>

    </thead>

  )

}

export default TableHeader



const WeekTitle: React.FC<{ monday: AppDate }> = (props) => {
  const weekStr = getWeekString(props.monday)
  return (
    <th colSpan={ 7 } className="week__title" >
      { weekStr }
    </th>
  )
}

