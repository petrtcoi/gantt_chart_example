import React from 'react'
import { WorkId } from '../../../../assets/types/worksState'
import WorkItem__Header from './WorkItem__Header'
import { useAppSelector } from '../../../../assets/redux/hooks/index'
import { selectWork, selecMeta, getChildQnty } from '../../../../assets/redux/slices/works/selectors/index'

type WorkItemProps = {
  workId: WorkId
}

const WorkItem: React.FC<WorkItemProps> = (props) => {

  const work = useAppSelector(selectWork(props.workId))
  const meta = useAppSelector(selecMeta(props.workId))
  const childQnty = useAppSelector(getChildQnty(props.workId))


  return (
    <tr>
      <WorkItem__Header
        title={ work.title }
        level={ meta.level }
        status={ meta.status }
        childQnty={ childQnty }
      />
    </tr>
  )

}

export default WorkItem