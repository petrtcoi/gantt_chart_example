import React from 'react'
import * as R from 'ramda'

import { DAYS_LIST } from '../utils/weeksQnty'

type EmptyCellsProps = {
  lineN: number
  listOfIndexes?: number[]
}

const defDaysList = R.defaultTo(DAYS_LIST)

const EmptyCells: React.FC<EmptyCellsProps> = (props) => {


  return (
    <>
      {
        DAYS_LIST.map(day => {
          return (<td key={ `${props.lineN}-${day}` } />)
        })
      }
    </>
  )
}

export default EmptyCells