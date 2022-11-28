import React from 'react'

type TableHeaderProps = {}

const TableHeader: React.FC<TableHeaderProps> = (_props) => {

  return (
    <thead className={ 'table_header' }>
      <tr>
        <th rowSpan={ 2 } className={ 'title_cell' }>Work Item</th>
        <th colSpan={ 7 } style={{minWidth: "200px"}}>WEEK</th>
        <th colSpan={ 7 } style={{minWidth: "200px"}}>WEEK</th>
        <th colSpan={ 7 } style={{minWidth: "200px"}}>WEEK</th>
        <th colSpan={ 7 } style={{minWidth: "200px"}}>WEEK</th>
        <th colSpan={ 7 } style={{minWidth: "200px"}}>WEEK</th>
        <th colSpan={ 7 } style={{minWidth: "200px"}}>*WEEK</th>
        <th colSpan={ 7 } style={{minWidth: "200px"}}>*WEEK</th>
      </tr>
      <tr className={'days_header'}>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th> 
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
      </tr>

    </thead>

  )

}

export default TableHeader