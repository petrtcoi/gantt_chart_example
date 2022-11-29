import React from 'react'
import * as R from 'ramda'

import { useAppSelector } from '../../../../assets/redux/hooks'
import { selectProjectRootDay, selectWork } from '../../../../assets/redux/slices/works/selectors'
import { WorkId } from '../../../../assets/types/worksState'
import { daysDiff, getDateFromString } from '../../../../assets/utils/date'
import EmptyCells from '../EmptyCells/TableGrid'
import { DAYS_LIST } from '../utils/weeksQnty'

import './workitem.scss'

type WorkItem__RowProps = {
  workId: WorkId
}

const WorkItem__Row: React.FC<WorkItem__RowProps> = (props) => {

  const work = useAppSelector(selectWork(props.workId))
  const rootDayString = useAppSelector(selectProjectRootDay)

  const startDay = getDateFromString(work.period_start)
  const endDay = getDateFromString(work.period_end)
  const rootDay = getDateFromString(rootDayString)


  const startIndex = (startDay && rootDay) ? daysDiff(rootDay, startDay) : null
  const durationDays = (endDay && startDay) ? daysDiff(startDay, endDay) + 1 : null

  if (props.workId === 1) {
    console.log(startDay)
    console.log(endDay)
    console.log(startIndex, durationDays)
  }


  if (!work || !durationDays || startIndex === null) return null
  if (durationDays < 0) return null

  const beforeDays = DAYS_LIST.slice(0, startIndex)


  return (
    <>
      <EmptyCells lineN={ props.workId } listOfIndexes={ beforeDays } />
      <td >
        <div className="workitem_row" data-position-start={"true"} />
      </td>
      <EmptyCells lineN={ props.workId } />

    </>
  )
}

export default WorkItem__Row