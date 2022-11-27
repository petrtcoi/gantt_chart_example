import React from 'react'
import './data_table.scss'
import TableHeader from './TableHeader/TableHeader'

type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {
  return (
    <div id="data_table">
      <table>
        <TableHeader />
      </table>
    </div>
  )
}

export default DataTable