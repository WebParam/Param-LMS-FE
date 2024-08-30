// Filters mapping for dynamic selection
export const studentsDisabilitiesDatafiltersMapping = {
  yellow: 'allDisabilities',
  red: 'malesDisabilities',
  blue: 'femalesDisabilities',
};

export const studentsDisabilitiesDataFilterOptions = [
  { description: 'All Disabilities', color: 'yellow' },
  { description: 'Males', color: 'red' },
  { description: 'Females', color: 'blue' },
];

const commonOptions = {
  chart: {
    height: 350,
    type: 'bar', // Ensure the type is set to 'bar' to display as a bar graph
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
  yaxis: {
    title: {
      text: 'Number of Students with Disabilities',
    },
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
      borderRadius: 10, // Added for a nice rounded edge
    },
  },
};

// Data for each disability category using the same common options
export const studentsDisabilitiesData = {
  allDisabilities: {
    series: [{ name: 'All Disabilities', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 60)) }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'Blind',
          'Deaf',
          'Dumb',
          'Physical',
          'Emotional',
          'Intellectual',
          'Multiple Disabilities',
        ],
      },
    },
  },
  malesDisabilities: {
    series: [{ name: 'Males', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 60)) }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'Blind',
          'Deaf',
          'Dumb',
          'Physical',
          'Emotional',
          'Intellectual',
          'Multiple Disabilities',
        ],
      },
    },
  },
  femalesDisabilities: {
    series: [{ name: 'Females', data: Array.from({ length:7 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'Blind',
          'Deaf',
          'Dumb',
          'Physical',
          'Emotional',
          'Intellectual',
          'Multiple Disabilities',
        ],
      },
    },
  },
};
