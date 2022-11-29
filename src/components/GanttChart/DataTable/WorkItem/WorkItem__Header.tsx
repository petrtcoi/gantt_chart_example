import React from 'react'
import { WorkLevel, WorkStatus } from '../../../../assets/types/worksState'


type WorkItem__HeaderProps = {
  title: string
  status: WorkStatus
  level: WorkLevel
  childQnty: number
}

const WorkItem__Header: React.FC<WorkItem__HeaderProps> = (props) => {


  const paddingLeft = props.level * 20


  return (
    <td className='work__header' style={ { paddingLeft } }>
      <div className='pict icon_collapse' data-hidden={props.status === WorkStatus.Hidden ? 'hidden' : 'showing'} />

      <div className={ `pict icon_level-${props.level}` } />

      { props.childQnty > 0 &&
        <div className='pict child_qnty' >
          { props.childQnty }
        </div>
      }

      { props.title }
    </td>
  )

}

export default WorkItem__Header

