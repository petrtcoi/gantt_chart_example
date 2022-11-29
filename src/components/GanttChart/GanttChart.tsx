import React from 'react'
import DataTable from './DataTable/DataTable'
import ProjectHeader from './ProjectHeader/ProjectHeader'

import './gantt_chart.scss'
import { useAppDispatch, useAppSelector } from '../../assets/redux/hooks/index'
import { fetchAllWorks } from '../../assets/redux/slices/works/asyncThunks/fetchAllWorks'
import { selectProject } from '../../assets/redux/slices/works/selectors'


type GanttChartProps = {}

const GanttChart: React.FC<GanttChartProps> = (_props) => {

  const project = useAppSelector(selectProject)
  if (!project) return <>Loading...</>

  return (
    <div id='gantt_chart'>
      <ProjectHeader
        title={ project.title }
        period={ project.period }
      />
      <DataTable />
    </div>
  )

}


export default GanttChart