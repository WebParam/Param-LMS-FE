// Filters mapping for dynamic selection
export const AvgPDFsDownloadedDataFiltersMapping = {
  yellow: 'AvgPDFsDownloadedData',
  red: 'JanAvgPDFsDownloadedData',
  blue: 'FebAvgPDFsDownloadedData',
  green: 'MarAvgPDFsDownloadedData',
  orange: 'AprAvgPDFsDownloadedData',
  purple: 'MayAvgPDFsDownloadedData',
  pink: 'JunAvgPDFsDownloadedData',
  brown: 'JulAvgPDFsDownloadedData',
  cyan: 'AugAvgPDFsDownloadedData',
  magenta: 'SepAvgPDFsDownloadedData',
  teal: 'OctAvgPDFsDownloadedData',
  lavender: 'NovAvgPDFsDownloadedData',
  gray: 'DecAvgPDFsDownloadedData',
};

export const AvgPDFsDownloadedFilterOptions = [
  { description: 'Year', color: 'yellow' },
  { description: 'Jan', color: 'red' },
  { description: 'Feb', color: 'blue' },
  { description: 'Mar', color: 'green' },
  { description: 'Apr', color: 'orange' },
  { description: 'May', color: 'purple' },
  { description: 'Jun', color: 'pink' },
  { description: 'Jul', color: 'brown' },
  { description: 'Aug', color: 'cyan' },
  { description: 'Sep', color: 'magenta' },
  { description: 'Oct', color: 'teal' },
  { description: 'Nov', color: 'lavender' },
  { description: 'Dec', color: 'gray' },
];

const commonOptions = {
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    zoom: { enabled: false },
  },
  colors: ['#007bff'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  title: { align: 'left' },
  grid: {
    borderColor: '#e7e7e7',
    row: { colors: ['#f3f3f3', 'transparent'] },
  },
  markers: { size: 1 },
};

export const AvgPDFsDownloadedData = {
  AvgPDFsDownloadedData: {
    series: [{ data: [10, 41, 35, 51, 49, 62, 40, 91, 48, 55, 65, 70] }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
      },
    },
  },
  JanAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  FebAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 28 }, (_, i) => (i + 1).toString()) },
    },
  },
  MarAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  AprAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  MayAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  JunAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  JulAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  AugAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  SepAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  OctAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  NovAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  DecAvgPDFsDownloadedData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
};
