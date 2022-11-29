import React from 'react'
import TableHeader from './TableHeader/TableHeader'

import './data_table.scss'
import EmptyCells from './EmptyCells/TableGrid'
import { useAppSelector } from '../../../assets/redux/hooks/index'
import { getWorkIdList } from '../../../assets/redux/slices/works/selectors'
import WorkItem from './WorkItem/WorkItem'
import { shallowEqual } from 'react-redux'



type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const worksIdList = useAppSelector(getWorkIdList, shallowEqual)

  return (
    <div id="data_table">
      <table>
        <TableHeader />
        <tbody style={ { height: "100%" } }>
          <>
            <tr> <EmptyCells lineN='header' qnty={ 70 } /></tr>
            {
              worksIdList.map(workId => {
                return <WorkItem key={ workId } workId={ workId } />
              })
            }
            <tr><EmptyCells lineN='footer' qnty={ 70 } /></tr>
          </>
        </tbody>
      </table>
      <div className='fade_right' />
    </div>
  )
}

export default DataTable

