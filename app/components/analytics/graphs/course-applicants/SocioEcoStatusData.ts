// Filters mapping for dynamic selection
export const studentsEcoStatusDatafiltersMapping = {
  yellow: 'studentsSocioStatus',
  red: 'malesStudentData',
  blue: 'femalesStudentData',

};

export const studentsEcoStatusDataFilterOptions = [
  { description: 'All Statuses', color: 'yellow' },
  { description: 'Females', color: 'red' },
  { description: 'Males', color: 'blue' },


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
  yaxis: {
    title: {
      text: 'Number of Students by Employment Status',
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
      borderRadius: 10, 
    },
  },
};

export const studentsSocioEcoData = ({studentsSocioStatusData, malesStudentData, femalesStudentData}:any) => ({
  studentsSocioStatus: {
    series: [{ name: 'Number of Students', data: studentsSocioStatusData }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          "Employed",
          "Unemployed",
          "Home Maker",
          "Scholar",
          "Unemployed(Disabled)",
          "Employed(Disabled)",
          "Other",
          "Unspecified",
        ],
      },
    },
  },
  malesStudentData: {
    series: [{ name: 'Number of Students', data: malesStudentData }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          "Employed",
          "Unemployed",
          "Home Maker",
          "Scholar",
          "Unemployed(Disabled)",
          "Employed(Disabled)",
          "Other",
          "Unspecified",
        ],
      },
    },
  },
  femalesStudentData: {
    series: [{ name: 'Number of Students', data: femalesStudentData }],
    options: {
      ...commonOptions,
      xaxis: {
        categories: [
          "Employed",
          "Unemployed",
          "Home Maker",
          "Scholar",
          "Unemployed(Disabled)",
          "Employed(Disabled)",
          "Other",
          "Unspecified",
        ],
      },
    },
  },
});
