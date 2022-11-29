import React from 'react'


type EmptyCellsProps = {
  lineN: string
  qnty?: number
}


const EmptyCells: React.FC<EmptyCellsProps> = (props) => {
  return (
    <>
      {
        [...Array(props.qnty).keys()].map(day => {
          return (<td key={ `${props.lineN}-${day}` } />)
        })
      }
    </>
  )
}

export default EmptyCells