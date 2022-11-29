import React from 'react'
import { WorkId, WorkStatus } from '../../../../assets/types/worksState'
import WorkItem__Header from './WorkItem__Header'
import { useAppDispatch, useAppSelector } from '../../../../assets/redux/hooks/index'
import { selectWork, selectMeta, getChildQnty, selectUpperControlerNodeStatus } from '../../../../assets/redux/slices/works/selectors/index'
import { setStatus, setUpperNodeStatus } from '../../../../assets/redux/slices/works'

type WorkItemProps = {
  workId: WorkId
}

const WorkItem: React.FC<WorkItemProps> = (props) => {

  const dispatch = useAppDispatch()

  const work = useAppSelector(selectWork(props.workId))
  const meta = useAppSelector(selectMeta(props.workId))
  const childQnty = useAppSelector(getChildQnty(props.workId))

  const controledStatus = useAppSelector(selectUpperControlerNodeStatus(props.workId))

  React.useEffect(() => {
    dispatch(setUpperNodeStatus({ workId: props.workId, status: controledStatus }))
  }, [controledStatus])

  if (meta.upperNodeStatus === WorkStatus.Collapsed) return null

  return (
    <tr>
      <WorkItem__Header
        workId={ work.id }
        title={ work.title }
        level={ meta.level }
        status={ meta.status }
        childQnty={ childQnty }
      />
    </tr>
  )

}

export default WorkItem