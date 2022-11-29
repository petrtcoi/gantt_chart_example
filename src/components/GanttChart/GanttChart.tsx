import React from 'react'
import DataTable from './DataTable/DataTable'
import ProjectHeader from './ProjectHeader/ProjectHeader'

import './gantt_chart.scss'
import { useAppDispatch } from '../../assets/redux/hooks/index'
import { fetchAllWorks } from '../../assets/redux/slices/works/asyncThunks/fetchAllWorks'


type GanttChartProps = {}

const GanttChart: React.FC<GanttChartProps> = (_props) => {

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    (async () => {
      await dispatch(fetchAllWorks())
    })()
  }, [])

  return (
    <div id='gantt_chart'>
      <ProjectHeader
        title={ 'DMS 2.0' }
        period={ '02.09.2022-31.12.2022' }
      />
      <DataTable />
    </div>
  )

}


export default GanttChart