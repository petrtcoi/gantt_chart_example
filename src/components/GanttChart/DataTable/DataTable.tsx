import React from 'react'
import TableHeader from './TableHeader/TableHeader'

import './data_table.scss'
import { isError } from '../../../assets/utils/errors'
import EmptyCells from './EmptyCells/TableGrid'
import { getRootDay } from './utils/getRootDay'
import { useAppSelector } from '../../../assets/redux/hooks/index'
import { getWorkIdList } from '../../../assets/redux/slices/works/selectors'
import WorkItem from './WorkItem/WorkItem'


type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const worksIdList = useAppSelector(getWorkIdList)
  const rootDay = getRootDay()
  if (!rootDay) return null



  return (
    <div id="data_table">
      <table>
        <TableHeader rootDay={ rootDay } />
        <tbody style={ { height: "100%" } }>
          <>
            { emptyRow() }
            {
              worksIdList.map(workId => {
                return <WorkItem key={ workId } workId={ workId } />
              })
            }
            
            { emptyRow() }
          </>
        </tbody>
      </table>

    </div>
  )
}

export default DataTable


function emptyRow() {
  return (
    <tr>
      { <EmptyCells lineN={ -999 } /> }
    </tr>
  )
}