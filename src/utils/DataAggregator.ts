import { DataItem, Currency, currencyConversionRates } from '../data/mockData';

export const applyConversionAndBudget = (item: DataItem, currency: string, isBudget: boolean): DataItem => {
  const conversionRate = currencyConversionRates[currency as Currency];

  if (!item.originalMetrics) {
    item.originalMetrics = JSON.parse(JSON.stringify(item.metrics)); // Initialize originalMetrics if not already done
  }

  item.metrics = Object.keys(item.metrics).reduce((acc: any, metric: string) => {
    acc[metric] = Object.keys(item.metrics[metric]).reduce((acc2: any, region: string) => {
      // Type assertion to ensure TypeScript understands originalMetrics is defined
      let value = (item.originalMetrics as DataItem['metrics'])[metric][region]; // Reset to original BRL value before conversion

      if (typeof value === 'number') {
        // Apply Budget 50% increase for all metrics
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

  if (item.nestedRows) {
    item.nestedRows = item.nestedRows.map(nestedItem =>
      applyConversionAndBudget(nestedItem, currency, isBudget)
    );
  }

  return item;
};






export const aggregateData = (data: DataItem[], filters: { currency: Currency; version: string }) => {
  const convertedData = data.map(item => applyConversionAndBudget(item, filters.currency, filters.version === 'Budget'));

  // Calculate the aggregated metrics for "All Products"
  const allProductsMetrics = convertedData.reduce(
    (acc: any, item: any) => {
      Object.keys(item.metrics).forEach((metric: string) => {
        acc[metric] = acc[metric] || {}; // Initialize metric object if it doesn't exist

        Object.keys(item.metrics[metric]).forEach((region: string) => {
          if (metric === "Units" || metric === "Gross Revenue") {
            acc[metric][region] = (acc[metric][region] || 0) + (item.metrics[metric][region] || 0);
          }

          if (metric === "Unit Price") {
            acc[metric][region] = (acc[metric][region] || 0) + item.metrics[metric][region] / 2;
          }
        });
      });
      return acc;
    },
    {} // Start with an empty object to dynamically handle any regions
  );

  // Create the "All Products" item with the calculated metrics
  const allProductsItem = {
    article: "All Products",
    metrics: allProductsMetrics,
    nestedRows: convertedData,
  };

  // Return the aggregated data with "All Products" as the first item
  return [allProductsItem];
};
