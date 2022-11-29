import React from 'react'
import { WorkId, WorkStatus } from '../../../../assets/types/worksState'
import WorkItem__Header from './WorkItem__Header'
import { useAppDispatch, useAppSelector } from '../../../../assets/redux/hooks/index'
import { selectUpperNodeStatus, selectSupervisorNodeUpperNodeStatus } from '../../../../assets/redux/slices/works/selectors/index'
import { setUpperNodeStatus } from '../../../../assets/redux/slices/works'
import WorkItem__Row from './WorkItem__Row'

type WorkItemProps = {
  workId: WorkId
}

const WorkItem: React.FC<WorkItemProps> = (props) => {

  const dispatch = useAppDispatch()


  const supervisorNodeUpperStatus = useAppSelector(selectSupervisorNodeUpperNodeStatus(props.workId))
  const upperNodeStatus = useAppSelector(selectUpperNodeStatus(props.workId))

  React.useEffect(() => {
    dispatch(
      setUpperNodeStatus({
        workId: props.workId,
        status: supervisorNodeUpperStatus
      })
    )
  }, [supervisorNodeUpperStatus])


  if (upperNodeStatus === WorkStatus.Collapsed) return null
  return (
    <tr key={ props.workId }>
      <WorkItem__Header
        workId={ props.workId }
      />
      <WorkItem__Row
        workId={ props.workId }
      />
    </tr>
  )

}

export default WorkItem