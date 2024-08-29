"use client"
import React from 'react';

type barDescriptionType = { description: string; color: string };

type ChartLayoutProps = {
  title?: string;
  children: React.ReactNode;
  type?: string;
  hasFilter?: boolean;
  chartData?: any;
};

export default function ChartLayout({
  title,
  children,
  type,
  hasFilter = false,
  chartData,
}: ChartLayoutProps) {
  return (
    <div className="card card-group-row__card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <label className="mr-sm-2 form-label" htmlFor="inlineFormFilterBy">
          {title}
        </label>
        {hasFilter && (
          <div className="d-flex align-items-center justify-content-between">
            <div className="filter-dropdown">
              <select className="form-control">
                <option className="form-label" disabled selected value="">
                  Filter by:
                </option>
                {[
                  { description: "Option 1", color: "red" },
                  { description: "Option 2", color: "blue" },
                  { description: "Option 3", color: "green" },
                ].map((data: barDescriptionType) => (
                  <option key={data.color} value={data.color}>
                    {data.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {!type && <div className="card-body">{children}</div>}

      <div className="card-body text-muted d-flex flex-column align-items-center justify-content-center">
        {type && (
          <div
            className={type === 'pie' ? 'chart' : 'chart w-100'}
            style={{ height: '300px' }}
          >
            {children && React.cloneElement(children as React.ReactElement<any>, { chartData })}
          </div>
        )}

       
      </div>
    </div>
  );
}
