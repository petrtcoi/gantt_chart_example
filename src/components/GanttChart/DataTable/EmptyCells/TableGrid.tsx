import React from 'react'
import { DAYS_LIST } from '../utils/weeksQnty'

type EmptyCellsProps = {
  lineN: number
}


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