import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import DataTable from './components/DataTable';
import { aggregateData } from './utils/DataAggregator';
import { mockData, Filters } from './data/mockData';

const ParentComponent: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({ legalEntity: '11', version: 'Actual', currency: 'BRL' });
  const [nightMode, setNightMode] = useState(false); // Night mode state
  const [regions, setRegions] = useState<string[]>(mockData.regions[filters.legalEntity as keyof typeof mockData.regions]);
  const [filteredData, setFilteredData] = useState(() =>
    aggregateData(mockData.data.filter(item => item.legalEntity === filters.legalEntity && item.version === filters.version))
  );

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div className={nightMode ? 'night-mode' : ''}>
      <div className='container buttonContainer'>
        <button onClick={toggleNightMode} className="toggle-night-mode">
          {nightMode ? 'Day Mode' : 'Night Mode'}
        </button>

      </div>
      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      <DataTable data={filteredData} regions={regions} />
    </div>
  );
};

export default ParentComponent;
