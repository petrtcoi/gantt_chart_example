import React from 'react'
import * as R from 'ramda'

import { useAppSelector } from '../../../../assets/redux/hooks'
import { selectMetaLevel, selectProjectRootDay, selectWork } from '../../../../assets/redux/slices/works/selectors'
import { WorkId } from '../../../../assets/types/worksState'
import { daysDiff, getDateFromString } from '../../../../assets/utils/date'
import EmptyCells from '../EmptyCells/TableGrid'

import './workitem.scss'

type WorkItem__RowProps = {
  workId: WorkId
}

const WorkItem__Row: React.FC<WorkItem__RowProps> = (props) => {

  const work = useAppSelector(selectWork(props.workId))
  const rootDayString = useAppSelector(selectProjectRootDay)
  const level = useAppSelector(selectMetaLevel(props.workId))

  const startDay = getDateFromString(work.period_start)
  const endDay = getDateFromString(work.period_end)
  const rootDay = getDateFromString(rootDayString)


  const startIndex = (startDay && rootDay) ? daysDiff(rootDay, startDay) : null
  const durationDays = (endDay && startDay) ? daysDiff(startDay, endDay) + 1 : null


  if (!work || !durationDays || startIndex === null) return null
  if (durationDays < 0) return null

  const getClass = R.cond([
    [() => durationDays === 1, R.always('el_graph el_graph__single')],
    [R.equals(durationDays - 1), R.always('el_graph el_graph__end')],
    [R.equals(0), R.always('el_graph el_graph__start')],
    [R.T, R.always('el_graph el_graph__middle')]
  ])


  return (
    <>
      <EmptyCells lineN={ `${props.workId}-before-` } qnty={ startIndex } />
      {
        [...Array(durationDays).keys()].map(index => {
          return (
            <td key={ `${props.workId}-${index}` }>
              <div
                className={ getClass(index) }
                data-level={ level }
                data-title={ work.title }
              />
            </td>
          )
        })
      }
      <EmptyCells lineN={ `${props.workId}-after-` } qnty={ 70 } />

    </>
  )
}

export default WorkItem__Row