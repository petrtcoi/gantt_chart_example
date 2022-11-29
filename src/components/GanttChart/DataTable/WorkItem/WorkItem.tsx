import React from 'react'
import { WorkId } from '../../../../assets/types/worksState'
import WorkItem__Header from './WorkItem__Header'
import { useAppDispatch, useAppSelector } from '../../../../assets/redux/hooks/index'
import { selectWork, selectMeta, getChildQnty } from '../../../../assets/redux/slices/works/selectors/index'
import { setStatus } from '../../../../assets/redux/slices/works'

type WorkItemProps = {
  workId: WorkId
}

const WorkItem: React.FC<WorkItemProps> = (props) => {

  const dispatch = useAppDispatch()

  const work = useAppSelector(selectWork(props.workId))
  const meta = useAppSelector(selectMeta(props.workId))
  const childQnty = useAppSelector(getChildQnty(props.workId))

  const upperMeta = meta.parentNode ?
    useAppSelector(selectMeta(meta.parentNode))
    : meta.prevNode ?
      useAppSelector(selectMeta(meta.prevNode))
      : null

  React.useEffect(() => {
    dispatch(setStatus({ workId: props.workId, status: upperMeta?.status }))
  }, [upperMeta?.status])

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