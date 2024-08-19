import React from 'react';
import TableRow from './TableRow';

interface DataTableProps {
  data: any[];
  regions: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, regions }) => {
  return (
    <table className='container containerList'>
      <thead>
        <tr >
          <th className='thSize' ></th>
          {regions.map((region, index) => (
            <th key={index}>{region}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, index) => (
          <TableRow key={index} data={rowData} regions={regions} nestedRows={rowData.nestedRows} />
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
