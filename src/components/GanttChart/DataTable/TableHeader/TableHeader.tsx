import React from 'react'
import { getWeekString, addWeeksN, getWeekDays } from '../../../../assets/utils/date'
import { AppDate } from '../../../../assets/types/appDate'
import { WEEKS_LIST } from '../utils/weeksQnty'



type TableHeaderProps = {
  rootDay: AppDate
}



const TableHeader: React.FC<TableHeaderProps> = (props) => {

  const getMonday = (weeksQnty: number) => addWeeksN(props.rootDay, weeksQnty)
  const mondays = WEEKS_LIST.map(x => getMonday(x))

  return (
    <thead className={ 'table_header' }>
      <tr>
        <th rowSpan={ 2 } className={ 'title_cell' }>Work Item</th>
        { mondays.map((monday, index) => <WeekTitle monday={ monday } key={ index } />) }
      </tr>
      <tr className={ 'days_header' }>
        { WEEKS_LIST.map(weekIndex => {
          const weekMonday = addWeeksN(props.rootDay, weekIndex)
          return getWeekDays(weekMonday).map((day, index) => {
            return (
              <th className="week__day" data-dayindex={ index % 7  } key={ index }>{ day }</th>
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

