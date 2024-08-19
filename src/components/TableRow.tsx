import React, { useState } from 'react';
import TableCell from './TableCell';

interface TableRowProps {
  data: any;
  regions: string[];
  nestedRows?: any[];
  level?: number;  // Add level prop to distinguish hierarchy levels
}

const TableRow: React.FC<TableRowProps> = ({ data, regions, nestedRows, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Determine padding based on the level
  const paddingLeft = level === 0 ? '80px' : level === 1 ? '120px' : '150px';

  return (
    <>
      <tr
        onClick={toggleExpand}
        style={{ cursor: 'pointer', paddingLeft }}
        className={`table-row ${expanded ? 'dropdown' : ''}`}
      >
        <TableCell content={data.article} colSpan={regions.length + 1} style={{ paddingLeft }} />
      </tr>
      {expanded && (
        <>
          {Object.keys(data.metrics).map((metric, index) => (
            <tr key={index}>
              <TableCell content={metric} style={{ paddingLeft }} />
              {regions.map((region, index) => (
                <TableCell key={index} content={data.metrics[metric][region]} />
              ))}
            </tr>
          ))}
          {nestedRows && nestedRows.map((nestedRow, index) => (
            <TableRow
              key={index}
              data={nestedRow}
              regions={regions}
              nestedRows={nestedRow.nestedRows}
              level={level + 1}  // Increase the level for nested rows
            />
          ))}
        </>
      )}
    </>
  );
};

export default TableRow;
