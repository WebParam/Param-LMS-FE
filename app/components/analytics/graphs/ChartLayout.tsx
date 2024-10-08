import React, { useState } from 'react';

type FilterOption = { description: string; color: string };

type ChartLayoutProps = {
  title?: any;
  children: React.ReactNode;
  type?: string;
  hasFilter?: boolean;
  chartData?: Record<string, any>;
  filterOptions?: FilterOption[]; // Options for the select dropdown
  defaultFilter?: string; // Default filter value
  filtersMapping?: Record<string, string>; // Mapping of filters to the corresponding data keys
};

export default function ChartLayout({
  title,
  children,
  type,
  hasFilter = false,
  chartData,
  filterOptions = [],
  defaultFilter,
  filtersMapping = {},
}: ChartLayoutProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>(
    defaultFilter || filterOptions[0]?.color || ''
  );

  const getFilteredData = (filter: string) => {
    if (!filter || !chartData) return chartData;
    const key = filtersMapping[filter];
    return key ? chartData[key] : chartData;
  };

  const filteredChartData = getFilteredData(selectedFilter);

  return (
    <div className="card card-group-row__card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <label className="mr-sm-2 form-label" htmlFor="inlineFormFilterBy">
          {title}
        </label>
        {hasFilter && (
          <div className="d-flex align-items-center justify-content-between">
            
            <div className="filter-dropdown">
              <select
                className="form-control"
                onChange={(e) => setSelectedFilter(e.target.value)}
                value={selectedFilter}
              >
                <option className="form-label" disabled value="">
                  Filter by:
                </option>
                {filterOptions.map((option) => (
                  <option key={option.color} value={option.color}>
                    {option.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {!type && <div className="card-body">{children}</div>}

      <div className="card-body text-muted d-flex flex-column align-items-center justify-content-center" style={{ zIndex: 1 }}>
        {type && (
          <div
            className={type === 'pie' ? 'chart' : 'chart w-100'}
            style={{ height: '300px' }}
          >
            {children &&
              React.cloneElement(children as React.ReactElement<any>, {
                chartData: filteredChartData, // Pass the filtered chart data to the child component
              })}
          </div>
        )}
      </div>
    </div>
  );
}
