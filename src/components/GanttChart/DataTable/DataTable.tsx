import React from 'react'
import TableHeader from './TableHeader/TableHeader'

import './data_table.scss'


type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {
  return (
    <div id="data_table">
      <table>
        <TableHeader />
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