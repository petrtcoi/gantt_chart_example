import React from 'react'
import TableHeader from './TableHeader/TableHeader'

import './data_table.scss'
import { getDateFromString } from '../../../assets/utils/date'
import { isError } from '../../../assets/utils/errors'


type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const rootDay = getDateFromString('2022-09-29')
  if (isError(rootDay)) return null

  return (
    <div id="data_table">
      <table>
        <TableHeader rootDay={ rootDay } />
        <tbody style={ { height: "100%" } }>
          <tr >
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
          <tr >
            <td>Последний</td>
            <td></td>
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
        </tbody>
      </table>

    </div>
  )
}

export default DataTable

