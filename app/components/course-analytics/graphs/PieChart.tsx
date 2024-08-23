import React from "react";
import Chart from "react-apexcharts";

export default function PieChart({options,series}:any) {
  return <Chart options={options} series={series} type="pie" width={380} />;
}