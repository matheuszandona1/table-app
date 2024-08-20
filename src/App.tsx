import React, { useState, useEffect } from 'react';
import FilterPanel from './components/FilterPanel';
import DataTable from './components/DataTable';
import { aggregateData, applyConversionAndBudget } from './utils/DataAggregator';
import { mockData, Filters, DataItem, LegalEntity } from './data/mockData'; // Removed 'Currency'


const ParentComponent: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({ legalEntity: '11', version: 'Actual', currency: 'BRL' });
  const [regions, setRegions] = useState<string[]>(mockData.regions[filters.legalEntity as LegalEntity]);
  const [filteredData, setFilteredData] = useState<DataItem[]>(() =>
    aggregateData(mockData.data, filters) // Pass filters as the second argument
  );
  
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    const newRegions = mockData.regions[filters.legalEntity as LegalEntity];
    setRegions(newRegions);

    const filteredData = mockData.data
      .filter((item: DataItem) => item.legalEntity === filters.legalEntity)
      .map(item => applyConversionAndBudget(item, filters.currency, filters.version === 'Budget'));

    setFilteredData(aggregateData(filteredData, filters)); // Pass filters as the second argument
  }, [filters]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  
  

  return (
    <div className={nightMode ? 'night-mode' : ''}>
      <div className="container buttonContainer">
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
