import React from 'react';
import { Filters } from '../data/mockData'; 

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className='container filter'>
      <label>Legal Entity:
        <select className='form-select' name="legalEntity" value={filters.legalEntity} onChange={handleFilterChange}>
          <option value="11">Europe</option>
          <option value="12">South America</option>
        </select>
      </label>

      <label>Version:
        <select className='form-select' name="version" value={filters.version} onChange={handleFilterChange}>
          <option value="Actual">Actual</option>
          <option value="Budget">Budget</option>
        </select>
      </label>

      <label>Currency:
        <select className='form-select' name="currency" value={filters.currency} onChange={handleFilterChange}>
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </label>
    </div>
  );
};

export default FilterPanel;
