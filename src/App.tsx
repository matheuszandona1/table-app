import React, { useState, useEffect } from 'react';
import FilterPanel from './components/FilterPanel'; 
import { aggregateData } from './utils/DataAggregator'; 
import DataTable from './components/DataTable'; 

import { mockData, Filters, DataItem, LegalEntity, Currency, currencyConversionRates } from './data/mockData'; 
const applyConversionAndBudget = (item: DataItem, conversionRate: number, isBudget: boolean): DataItem => {
  
  if (!item.originalMetrics) {
    item.originalMetrics = JSON.parse(JSON.stringify(item.metrics)); // Preserve original metrics
  }

  item.metrics = Object.keys(item.metrics).reduce((acc: any, metric: string) => {
    acc[metric] = Object.keys(item.metrics[metric]).reduce((acc2: any, region: string) => {
      let value = item.metrics[metric][region];

      if (typeof value === 'number') {
        // Ensure originalMetrics is defined
        if (item.originalMetrics && item.originalMetrics[metric]) {
          value = item.originalMetrics[metric][region]; // Reset to original value before applying conversion
        }

        // Apply Budget 50% increase for all metrics, including Units
        if (isBudget) {
          value *= 1.5;
        }

        // Apply currency conversion to Unit Price and Gross Revenue
        if (metric !== 'Units') {
          value *= conversionRate;
        }
      }
      acc2[region] = value;
      return acc2;
    }, {});
    return acc;
  }, {});

  // Recursively apply conversion and budget adjustments to nestedRows if they exist
  if (item.nestedRows) {
    item.nestedRows = item.nestedRows.map((nestedItem) =>
      applyConversionAndBudget(nestedItem, conversionRate, isBudget)
    );
  }

  return item;
};




const ParentComponent: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({ legalEntity: '11', version: 'Actual', currency: 'BRL' });
  const [regions, setRegions] = useState<string[]>(mockData.regions[filters.legalEntity as LegalEntity]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  useEffect(() => {
    const newRegions = mockData.regions[filters.legalEntity as LegalEntity];
    setRegions(newRegions);

    const conversionRate = currencyConversionRates[filters.currency as Currency];
    const isBudget = filters.version === 'Budget';

    const filteredData = mockData.data
      .filter((item: DataItem) => item.legalEntity === filters.legalEntity)
      .map(item => applyConversionAndBudget(item, conversionRate, isBudget));



    setFilteredData(aggregateData(filteredData));
  }, [filters]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      <DataTable data={filteredData} regions={regions} />
    </div>
  );
};

export default ParentComponent;
