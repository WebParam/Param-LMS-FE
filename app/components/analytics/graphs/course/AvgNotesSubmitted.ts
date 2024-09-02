export const AvgNotesSubmittedDataFiltersMapping = {
  yellow: 'AvgNotesSubmittedData',
  red: 'JanAvgNotesSubmittedData',
  blue: 'FebAvgNotesSubmittedData',
  green: 'MarAvgNotesSubmittedData',
  orange: 'AprAvgNotesSubmittedData',
  purple: 'MayAvgNotesSubmittedData',
  pink: 'JunAvgNotesSubmittedData',
  brown: 'JulAvgNotesSubmittedData',
  cyan: 'AugAvgNotesSubmittedData',
  magenta: 'SepAvgNotesSubmittedData',
  teal: 'OctAvgNotesSubmittedData',
  lavender: 'NovAvgNotesSubmittedData',
  gray: 'DecAvgNotesSubmittedData',
};

export const AvgNotesSubmittedDataFilterOptions = [
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
    type: 'bar',
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
  stroke: {
    show: false,
    width: 2,
    colors: ['#007bff', '#ff0000'],
  },
  title: { align: 'left' },
  grid: {
    borderColor: '#e7e7e7',
    row: { colors: ['#f3f3f3', 'transparent'] },
  },
  markers: { size: 1 },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
      borderRadius: 10,
    },
  },
};


export const AvgNotesSubmittedData = {
  AvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 60)) }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
      },
    },
  },
  JanAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  FebAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 28 }, (_, i) => (i + 1).toString()) },
    },
  },
  MarAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  AprAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  MayAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  JunAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  JulAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  AugAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  SepAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  OctAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  NovAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  DecAvgNotesSubmittedData: {
    series: [{ name: 'Average Notes Submitted', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
};
