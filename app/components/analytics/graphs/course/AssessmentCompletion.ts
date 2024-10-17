export const AssessmentCompletionDataFiltersMapping = {
  yellow: 'AssessmentCompletionData',
  red: 'JanAssessmentCompletionData',
  blue: 'FebAssessmentCompletionData',
  green: 'MarAssessmentCompletionData',
  orange: 'AprAssessmentCompletionData',
  purple: 'MayAssessmentCompletionData',
  pink: 'JunAssessmentCompletionData',
  brown: 'JulAssessmentCompletionData',
  cyan: 'AugAssessmentCompletionData',
  magenta: 'SepAssessmentCompletionData',
  teal: 'OctAssessmentCompletionData',
  lavender: 'NovAssessmentCompletionData',
  gray: 'DecAssessmentCompletionData',
};

export const AssessmentCompletionDataFilterOptions = [
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

export const AssessmentCompletionData = {
  AssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 60)) }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
      },
    },
  },
  JanAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  FebAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 28 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 28 }, (_, i) => (i + 1).toString()) },
    },
  },
  MarAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  AprAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  MayAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  JunAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  JulAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  AugAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  SepAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  OctAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
  NovAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
    },
  },
  DecAssessmentCompletionData: {
    series: [{ name: 'Assessment Completion', data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: { categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
    },
  },
};
