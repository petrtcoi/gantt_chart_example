import React from 'react'
import TableHeader from './TableHeader/TableHeader'

import './data_table.scss'
import { isError } from '../../../assets/utils/errors'
import EmptyCells from './EmptyCells/TableGrid'
import { getRootDay } from './utils/getRootDay'


type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const rootDay = getRootDay()
  if (isError(rootDay)) return null

  return (
    <div id="data_table">
      <table>
        <TableHeader rootDay={ rootDay } />
        <tbody style={ { height: "100%" } }>
          { emptyRow() }
          <tr>
            <td>Пример</td>
            <td>asda</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          { emptyRow() }
        </tbody>
      </table>

    </div>
  )
}

export default DataTable


function emptyRow() {
  return (
    <tr >
      <td></td>
      { <EmptyCells lineN={ -999 } /> }
    </tr>
  )
}