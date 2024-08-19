# Dynamic Data Table Visualization with Filters

## Overview

This project is a dynamic web application built using React and TypeScript that visualizes hierarchical data in a collapsible table format. The application features filtering options to customize the view based on legal entities, versions (actual or budget), and currency. It also includes an "All Products" overview that aggregates and summarizes the data across all products.

## Features

- **Collapsible/Expandable Table**: The table headers (both rows and columns) have a hierarchical tree structure. Users can expand or collapse these levels horizontally for columns and vertically for rows.
- **Data Aggregation**: An "All Products" entry is provided, which aggregates all metrics, such as total units, average unit price, and total gross revenue across all products.
- **Filtering**: Users can filter the data by legal entity (region), version (Actual or Budget), and currency (BRL, USD, EUR). These filters dynamically update the table content.
- **Currency Conversion**: The application converts values according to the selected currency and adjusts for the "Budget" version, applying a 50% increase where applicable.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing and better development experience.
- **SCSS**: For styling the components with advanced features like variables, nesting, and mixins.
- **Material-UI**: For UI components, icons, and layout.
- **Bootstrap**: For additional styling and layout options.

## Project Structure

- **src/components**: Contains React components like `FilterPanel` and `DataTable`.
- **src/data**: Contains the mock data and type definitions (`mockData.ts`).
- **src/utils**: Contains utility functions such as `DataAggregator` for data processing.
- **public**: Contains static files like `index.html`.

## How to Run

1. **Clone the Repository**:

   git clone https://github.com/matheuszandona1/table-app
   cd table-app

2. **Install Dependencies**:

   npm install or yarn

3. **Start the Development Server**:

   npm start or yarn start

   The application will be available at http://localhost:3000.

## Usage

1. **Viewing Data**: The main table displays data in a collapsible format. Click on the arrow icons to expand or collapse rows and columns.

2. **Filtering Data**: Use the filter panel to select the desired legal entity, version, and currency. The table will update automatically based on your selections.

3. **"All Products" View**: The topmost item, "All Products," provides a summarized view of all products' metrics. Click on it to view individual products within.

## Future Enhancements

Advanced Sorting: Add functionality to sort columns and rows based on specific metrics.
Customizable Metrics: Allow users to select which metrics (Units, Unit Price, Gross Revenue) they want to view.
Export Data: Provide an option to export the displayed table data to a CSV or Excel file.
Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

### Explanation:

- **Overview**: Describes the purpose of the project.
- **Features**: Lists the key features like the collapsible table, filtering, and currency conversion.
- **Technologies Used**: Specifies the technologies and libraries used.
- **Project Structure**: Outlines the organization of the project files.
- **How to Run**: Provides instructions for cloning, installing dependencies, and running the project.
- **Usage**: Explains how to interact with the application.
- **Future Enhancements**: Suggests potential improvements.
