// Filters mapping for dynamic selection
export const studentsCitizenshipDatafiltersMapping = {
  yellow: 'allCitizenships',
  red: 'malesCitizenships',
  blue: 'femalesCitizenships',
};

export const studentsCitizenshipDataFilterOptions = [
  { description: 'All Citizenships', color: 'yellow' },
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
      text: 'Number of Students by Citizenship',
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

// Data for each citizenship category using the same common options
export const studentsCitizenshipData = {
  allCitizenships: {
    series: [{ name: 'All Citizenships', data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 60)) }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'South Africa',
          'Other',
          'Dual(SA Plus Other)',
          'Permanent Residence',
          'Unknown',
        ],
      },
    },
  },
  malesCitizenships: {
    series: [{ name: 'Males', data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 60)) }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'South Africa',
          'Other',
          'Dual(SA Plus Other)',
          'Permanent Residence',
          'Unknown',
        ],
      },
    },
  },
  femalesCitizenships: {
    series: [{ name: 'Females', data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 50)) }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          'South Africa',
          'Other',
          'Dual(SA Plus Other)',
          'Permanent Residence',
          'Unknown',
        ],
      },
    },
  },
};
