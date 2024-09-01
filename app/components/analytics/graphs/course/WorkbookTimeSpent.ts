// Filters mapping for dynamic selection
export const filtersMapping = {
  yellow: 'workbookTimeSpentData',
  red: 'JanworkbookTimeSpentData',
  blue: 'FebworkbookTimeSpentData',
  green: 'MarworkbookTimeSpentData',
  orange: 'AprworkbookTimeSpentData',
  purple: 'MayworkbookTimeSpentData',
  pink: 'JunworkbookTimeSpentData',
  brown: 'JulworkbookTimeSpentData',
  cyan: 'AugworkbookTimeSpentData',
  magenta: 'SepworkbookTimeSpentData',
  teal: 'OctworkbookTimeSpentData',
  lavender: 'NovworkbookTimeSpentData',
  gray: 'DecworkbookTimeSpentData',
};

export const filterOptions = [
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

export const workbookData = {
  workbookTimeSpentData: {
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
  JanworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  FebworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 28 }, (_, i) => (i + 1).toString()) },
    },
  },
  MarworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  AprworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  MayworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  JunworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  JulworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  AugworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  SepworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  OctworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  NovworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  DecworkbookTimeSpentData: {
    series: [{ data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 24)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
};
