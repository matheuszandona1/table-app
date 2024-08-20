import React, { useState } from 'react';
import TableRow from './TableRow';

interface DataTableProps {
  data: any[];
  regions: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, regions }) => {
  const [visibleRegions, setVisibleRegions] = useState<boolean[]>(regions.map(() => true));

  const toggleRegionVisibility = (index: number) => {
    const newVisibility = [...visibleRegions];
    newVisibility[index] = !newVisibility[index];
    setVisibleRegions(newVisibility);
  };

  return (
    <table className='container containerList'>
      <thead>
        <tr>
          <th className='thSize'></th>
          {regions.map((region, index) => (
            <th key={index} onClick={() => toggleRegionVisibility(index)} style={{ cursor: 'pointer' }}>
              {visibleRegions[index] ? '▼ ' : '▶ '} {/* Collapse/Expand icon */}
              {region}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, rowIndex) => (
          <TableRow key={rowIndex} data={rowData} regions={regions.filter((_, index) => visibleRegions[index])} nestedRows={rowData.nestedRows} />
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
