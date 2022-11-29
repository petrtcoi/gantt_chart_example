import React from 'react'
import { WorkId, WorkLevel, WorkStatus } from '../../../../assets/types/worksState'
import { useAppDispatch } from '../../../../assets/redux/hooks/index'
import { setStatus } from '../../../../assets/redux/slices/works'



type WorkItem__HeaderProps = {
  workId: WorkId
  title: string
  status: WorkStatus
  level: WorkLevel
  childQnty: number
}

const WorkItem__Header: React.FC<WorkItem__HeaderProps> = (props) => {

  const dispatch = useAppDispatch()
  const paddingLeft = props.level * 20
  const handleToggleStatus = () => {
    dispatch(setStatus({ workId: props.workId, status: props.status === WorkStatus.Collapsed ? WorkStatus.Expanded : WorkStatus.Collapsed }))
  }


  return (
    <td className='work__header' style={ { paddingLeft } }>
      <div
        className='pict icon_collapse'
        data-hidden={ props.status === WorkStatus.Collapsed ? 'hidden' : 'showing' }
        onClick={() => handleToggleStatus()}
      />

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

