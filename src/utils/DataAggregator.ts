export const aggregateData = (data: any) => {
  // Calculate the aggregated metrics for "All Products"
  const allProductsMetrics = data.reduce(
    (acc: any, item: any) => {
      Object.keys(item.metrics).forEach((metric: string) => {
        if (metric === "Units" || metric === "Gross Revenue") {
          acc[metric] = {
            Germany: (acc[metric].Germany || 0) + (item.metrics[metric].Germany || 0),
            Italy: (acc[metric].Italy || 0) + (item.metrics[metric].Italy || 0),
            Europe: (acc[metric].Europe || 0) + (item.metrics[metric].Germany || 0) + (item.metrics[metric].Italy || 0),
          };
        }

        if (metric === "Unit Price") {
          acc[metric] = {
            Germany: ((acc[metric].Germany || 0) + item.metrics[metric].Germany) / 2,
            Italy: ((acc[metric].Italy || 0) + item.metrics[metric].Italy) / 2,
            Europe: ((acc[metric].Germany || 0) + (acc[metric].Italy || 0)) / 2,
          };
        }
      });
      return acc;
    },
    { Units: {}, "Unit Price": {}, "Gross Revenue": {} }
  );

  // Create the "All Products" item with the calculated metrics
  const allProductsItem = {
    article: "All Products",
    metrics: allProductsMetrics,
    nestedRows: data,
  };

  // Return the aggregated data with "All Products" as the first item
  return [allProductsItem];
};
