import React from 'react';

interface TableCellProps {
  content: React.ReactNode;
  onClick?: () => void;
  colSpan?: number;
  style?: React.CSSProperties;  
}

const TableCell: React.FC<TableCellProps> = ({ content, onClick, colSpan, style }) => {
  return (
    <td onClick={onClick} colSpan={colSpan} style={style}>
      {content}
    </td>
  );
};

export default TableCell;
