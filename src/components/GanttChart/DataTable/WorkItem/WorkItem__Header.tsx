import React from 'react'
import { WorkId, WorkStatus } from '../../../../assets/types/worksState'
import { useAppDispatch, useAppSelector } from '../../../../assets/redux/hooks/index'
import { setStatus } from '../../../../assets/redux/slices/works'
import { getChildQnty, selectMeta, selectWork } from '../../../../assets/redux/slices/works/selectors'



type WorkItem__HeaderProps = {
  workId: WorkId
}

const WorkItem__Header: React.FC<WorkItem__HeaderProps> = (props) => {

  const work = useAppSelector(selectWork(props.workId))
  const meta = useAppSelector(selectMeta(props.workId))
  const childQnty = useAppSelector(getChildQnty(props.workId))


  const dispatch = useAppDispatch()
  const paddingLeft = meta.level * 20
  const handleToggleStatus = () => {
    dispatch(setStatus({ workId: props.workId, status: meta.status === WorkStatus.Collapsed ? WorkStatus.Expanded : WorkStatus.Collapsed }))
  }

  if (!work || !meta) return null
  return (
    <td style={ { paddingLeft } }>
      <div className="work__header">
        { meta.firstChildNode &&
          <div
            className='pict icon_collapse'
            data-hidden={ meta.status === WorkStatus.Collapsed ? 'hidden' : 'showing' }
            onClick={ () => handleToggleStatus() }
          />
        }

        <div className={ `pict icon_level-${meta.level}` } />

        { childQnty > 0 &&
          <div className='pict child_qnty' >
            { childQnty }
          </div>
        }

        { work.title }
      </div>
    </td>
  )

}

export default WorkItem__Header

