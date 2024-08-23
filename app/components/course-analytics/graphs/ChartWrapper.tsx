"use client"
import { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import BarGraph from "@/components/course-dashboard/graphs/BarGraph";
type barDescriptionType = { description: string; color: string };
export default function ChartWrapper({
  title,
  barDescriptions,
  options,
  data,
  type,
}: {
  title: string;
  barDescriptions: barDescriptionType[];
  options?: any;
  data: any;
  type: string;
}) {
  const [chartData, setChartData] = useState({
    series: [{
      name: "Quiz Attempts",
      data: [10, 41, 35, 51, 49, 62, 40, 91, 48]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
        },
        zoom: {
          enabled: false
        }
      },
      colors:['#800080'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Quiz Attempts',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    }
  });

  return (
    <div className="card card-group-row__card">
      <div className="card-header d-flex align-items-center">
        <strong>{title}</strong>
      </div>
      <div className="card-body text-muted flex d-flex flex-column align-items-center justify-content-center">
        <div className="chart w-100" style={{ height: "300px" }}>
          <div className="chartjs-size-monitor">
            <div className="chartjs-size-monitor-expand">
              <div className=""></div>
            </div>
            <div className="chartjs-size-monitor-shrink">
              <div className=""></div>
            </div>
          </div>
          {type == "bar" && <BarChart options={options} data={data} />}
          {type == "line" && <LineChart chartData={chartData} />}
        </div>
        <div
          id="repeatCustomerRateChartLegend"
          className="chart-legend chart-legend--horizontal mt-16pt"
        >
       
        </div>
      </div>
    </div>
  );
}
