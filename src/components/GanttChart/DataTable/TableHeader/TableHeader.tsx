import React from 'react'
import { AppDate } from '../../../../assets/types/appdate'
import { getWeekString, addWeeksN, getWeekDays } from '../../../../assets/utils/date'

type TableHeaderProps = {
  rootDay: AppDate
}

const WEEKS = 10
const WEEKS_LIST = [...Array(WEEKS).keys()]

const TableHeader: React.FC<TableHeaderProps> = (props) => {



  function weekTitle(monday: AppDate) {

    const weekStr = getWeekString(monday)
    return (
      <th colSpan={ 7 } className="week__title" key={ weekStr }>
        { weekStr }
      </th>
    )
  }

  function weekDays(monday: AppDate) {
    return (
      <>
        { getWeekDays(monday).map((weekDay, index) => <th className="week__day" data-dayindex={ index } key={`${weekDay}-${index}` }>{ weekDay }</th>) }
      </>
    )
  }

  return (
    <thead className={ 'table_header' }>
      <tr>
        <th rowSpan={ 2 } className={ 'title_cell' }>Work Item</th>
        { WEEKS_LIST.map(weekIndex => weekTitle(addWeeksN(props.rootDay, weekIndex))) }
      </tr>
      <tr className={ 'days_header' }>
        { WEEKS_LIST.map(weekIndex => weekDays(addWeeksN(props.rootDay, weekIndex))) }
      </tr>

    </thead>

  )

}

export default TableHeader

